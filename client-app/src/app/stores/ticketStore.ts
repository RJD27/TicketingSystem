import { makeAutoObservable, runInAction } from "mobx";
import { Ticket } from "../models/ticket";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class TicketStore {
  ticketRegistry = new Map<string, Ticket>();
  selectedTicket: Ticket | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get ticketsByDate() {
    return Array.from(this.ticketRegistry.values()).sort(
      (a, b) => Date.parse(b.dateCreated) - Date.parse(a.dateCreated)
    );
  }

  loadTickets = async () => {
    this.setLoadingInitial(true);
    try {
      const tickets = await agent.Tickets.list();
        tickets.forEach((ticket) => {
          this.setTicket(ticket);
        this.setLoadingInitial(false);
      });
    } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
    }
  };

  loadTicket = async (id: string) => {
    let ticket = this.getTicket(id);
    if (ticket) {
      this.selectedTicket = ticket;
      return ticket;
    }
    else {
      this.setLoadingInitial(true);
      try {
        ticket = await agent.Tickets.details(id);
        this.setTicket(ticket);
        runInAction(() => this.selectedTicket = ticket);
        this.setLoadingInitial(false);
        return ticket;
      } catch (error) {
        runInAction(() => {
          console.log(error);
          this.setLoadingInitial(false);
        })
      }
    }
  };

    private setTicket = (ticket: Ticket) => {
    ticket.dateCreated = ticket.dateCreated.split("T")[0];
    this.ticketRegistry.set(ticket.id, ticket);
  };

  private getTicket = (id: string) => {
    return this.ticketRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createTicket = async (ticket: Ticket) => {
    this.loading = true;
    ticket.id = uuid();
    try {
      await agent.Tickets.create(ticket);
      runInAction(() => {
        this.ticketRegistry.set(ticket.id, ticket);
        this.selectedTicket = ticket;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  updateTicket = async (ticket: Ticket) => {
    this.loading = true;
    try {
      await agent.Tickets.update(ticket);
      runInAction(() => {
        this.ticketRegistry.set(ticket.id, ticket);
        this.selectedTicket = ticket;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteTicket = async (id: string) => {
    this.loading = true;
    try {
      await agent.Tickets.delete(id);
      runInAction(() => {
        this.ticketRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

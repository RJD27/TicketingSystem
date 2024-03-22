import { useEffect, useState } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { Ticket } from '../models/ticket';
import NavBar from './NavBar';
import TicketDashboard from '../../features/tickets/dashboard/TicketDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Tickets.list().then(response => {
      let tickets: Ticket[] = [];
      response.forEach(ticket => {
        ticket.dateCreated = ticket.dateCreated.split('T')[0];
        tickets.push(ticket);
      })
      setTickets(tickets);
      setLoading(false);
      })
  }, [])

  function handleSelectTicket(id: string) {
    setSelectedTicket(tickets.find(x => x.id === id))
  }

  function handleCancelSelectTicket() {
    setSelectedTicket(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectTicket(id) : handleCancelSelectTicket();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditTicket(ticket: Ticket) {
    setSubmitting(true);
    if(ticket.id) {
      agent.Tickets.update(ticket).then(() => {
        setTickets([...tickets.filter(x => x.id !== ticket.id), ticket])
        setSelectedTicket(ticket);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      ticket.id = uuid();
      agent.Tickets.create(ticket).then(() => {
        setTickets([...tickets, ticket])
        setSelectedTicket(ticket);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteTicket(id: string) {
    setSubmitting(true);
    agent.Tickets.delete(id).then(() => {
      setTickets([...tickets.filter(x => x.id !== id)])
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading app'/>

  return (
    <Grid >
      <Grid.Column >
        <Container>
          <NavBar openForm={handleFormOpen} />
        </Container>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={13} computer={13} floated="right" id="content">
        <TicketDashboard
          tickets={tickets}
          selectedTicket={selectedTicket}
          selectTicket={handleSelectTicket}
          cancelSelectTicket={handleCancelSelectTicket}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditTicket}
          deleteTicket={handleDeleteTicket}
          submitting={submitting}
        />
      </Grid.Column>
    </Grid>
  )
}

export default App
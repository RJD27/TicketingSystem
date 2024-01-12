import { Grid } from "semantic-ui-react";
import { Ticket } from "../../../app/models/ticket";
import TicketList from "./TicketList";
import TicketDetails from "../details/TicketDetails";
import TicketForm from "../form/TicketForm";

interface Props {
    tickets: Ticket[];
    selectedTicket: Ticket | undefined;
    selectTicket: (id: string) => void;
    cancelSelectTicket: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (ticket: Ticket) => void;
}

export default function TicketDashboard({ tickets, selectedTicket,
    selectTicket, cancelSelectTicket, editMode, openForm, closeForm, createOrEdit }: Props) {
    return (
        <Grid>
            <Grid.Column width={10}>
                <TicketList tickets={tickets} selectTicket={selectTicket} />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedTicket && !editMode &&
                    <TicketDetails
                        ticket={selectedTicket}
                        cancelSelectTicket={cancelSelectTicket}
                        openForm={openForm}
                    />}
                    {editMode && 
                        <TicketForm closeForm={closeForm} ticket={selectedTicket} createOrEdit={createOrEdit}/>}
            </Grid.Column>
        </Grid>
    )
}
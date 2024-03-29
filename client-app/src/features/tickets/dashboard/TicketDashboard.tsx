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
    deleteTicket: (id: string) => void;
    submitting: boolean;
}

export default function TicketDashboard({ tickets, selectedTicket, deleteTicket,
    selectTicket, cancelSelectTicket, editMode, openForm, closeForm, createOrEdit, submitting }: Props) {
    return (
        <Grid style={{ marginTop: '5px' }}>
            <Grid.Column width={15}>
                <TicketList tickets={tickets}
                    selectTicket={selectTicket}
                    deleteTicket={selectTicket}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedTicket && !editMode &&
                    <TicketDetails
                        ticket={selectedTicket}
                        cancelSelectTicket={cancelSelectTicket}
                        openForm={openForm}
                        deleteTicket={deleteTicket}
                        submitting={submitting}
                    />}
                {editMode &&
                    <TicketForm
                        submitting={submitting}
                        closeForm={closeForm}
                        ticket={selectedTicket}
                        createOrEdit={createOrEdit}
                    />}
            </Grid.Column>
        </Grid>
    )
}
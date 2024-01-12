import { Button, Container, Divider, Segment } from "semantic-ui-react";
import { Ticket } from "../../../app/models/ticket";

interface Props{
    ticket: Ticket;
    cancelSelectTicket: () => void;
    openForm: (id: string) => void;
}

export default function TicketDetails({ticket, cancelSelectTicket, openForm}: Props) {
    return (
        <Segment>
            <Container textAlign='justified' fluid>
                <b>{ticket.title}</b>
                <Divider />
                <b>Full Name</b>
                <p>{ticket.name}</p>
                
                <b>Date</b>
                <p>{ticket.dateCreated}</p>

                <b>Email</b>
                <p>{ticket.email}</p>

                <b>Phone Number</b>
                <p>{ticket.phoneNumber}</p>
                <Divider />
                <p>
                    {ticket.description}
                </p>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(ticket.id)} basic color="blue" content='Edit' />
                    <Button onClick={cancelSelectTicket} basic color="grey" content='Cancel' />
                </Button.Group>
            </Container>
        </Segment>
    )
}
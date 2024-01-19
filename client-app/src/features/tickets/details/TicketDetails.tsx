import { Button, Divider, Grid, GridColumn, Header, Segment } from "semantic-ui-react";
import { Ticket } from "../../../app/models/ticket";

interface Props {
    ticket: Ticket;
    cancelSelectTicket: () => void;
    openForm: (id: string) => void;
    deleteTicket: (id: string) => void;
}


export default function TicketDetails({ ticket, cancelSelectTicket, openForm, deleteTicket }: Props) {
    return (
        <Segment>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Header>{ticket.title}</Header>
                        <Divider />
                    </Grid.Column>
                    <GridColumn>
                        <Button
                            icon="trash"
                            inverted
                            color="red"
                            onClick={() => { cancelSelectTicket(); deleteTicket(ticket.id) }}
                            style={{ float: 'right' }}
                        />
                    </GridColumn>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <b>Full Name</b>
                        <p>{ticket.name}</p>
                    </Grid.Column>
                    <Grid.Column>
                        <b>Date</b>
                        <p>{ticket.dateCreated}</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <b>Email</b>
                        <p>{ticket.email}</p>
                    </Grid.Column>
                    <Grid.Column>
                        <b>Phone Number</b>
                        <p>{ticket.phoneNumber}</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                    <Grid.Column width={8}>
                        <b>Assigned To</b>
                        <p>{ticket.assignedTo}</p>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <b>Priority</b>
                        <p>{ticket.status}</p>
                    </Grid.Column>
                    <Grid.Column>
                        <b>Status</b>
                        <p>{ticket.status}</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Divider />
            <p>{ticket.description}</p>
            <Button.Group widths='2'>
                <Button onClick={() => openForm(ticket.id)} basic color="blue" content='Edit' />
                <Button onClick={cancelSelectTicket} basic color="grey" content='Cancel' />
            </Button.Group>
        </Segment>
    )
}
import { Button, Divider, Grid, GridColumn, Header, Modal } from "semantic-ui-react";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";

export default observer(function TicketDetails() {
    const {ticketStore} = useStore();
    const {selectedTicket: ticket, deleteTicket, loading, loadTicket, loadingInitial, } = ticketStore;
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) loadTicket(id);
    }, [id, loadTicket])

    if (loadingInitial || !ticket) return <LoadingComponent />

    return (
        <>
            <Modal open={true}>
                <Modal.Content>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Header>{ticket.title}</Header>
                                <Divider />
                            </Grid.Column>
                            <GridColumn>
                                <Button
                                    name={ticket.id}
                                    icon="trash"
                                    inverted
                                    color="red"
                                    loading={loading}
                                    onClick={() => deleteTicket(ticket.id).then(() => navigate(`/tickets/`))}
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
                                <p>{ticket.priority}</p>
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
                        <Button as={Link} to={`/manage/${ticket.id}`} basic color="blue" content='Edit'/>
                        <Button as={Link} to={`/tickets`} basic color="grey" content='Cancel' />
                    </Button.Group>
                </Modal.Content>
            </Modal>
        </>
    )
})
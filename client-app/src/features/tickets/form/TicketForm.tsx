import { Segment, Form, Button, Divider, Menu, Grid, Dropdown } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Ticket } from "../../../app/models/ticket";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';

export default observer(function TicketForm() {

    const { ticketStore } = useStore();
    const { createTicket, updateTicket, loading,
        loadTicket, loadingInitial } = ticketStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [ticket, setTicket] = useState<Ticket>({
        id: '',
        title: '',
        name: '',
        dateCreated: '',
        email: '',
        phoneNumber: '',
        description: '',
        priority: '',
        assignedTo: '',
        status: 'Open',
    });

    const ticketStatusOptions = [
        { key: "low", text: "Low", value: "Low" },
        { key: "medium", text: "Medium", value: "Medium" },
        { key: "high", text: "High", value: "High" },
        { key: "urgent", text: "Urgent", value: "Urgent" },
    ];

    useEffect(() => {
        if (id) loadTicket(id).then(ticket => setTicket(ticket!))
    }, [id, loadTicket])

    function handleSubmit() {
        if (!ticket.id) {
            ticket.id = uuid();
            createTicket(ticket).then(() => navigate(`/tickets/${ticket.id}`))
        } else {
            updateTicket(ticket).then(() => navigate(`/tickets/${ticket.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setTicket({ ...ticket, [name]: value })
    }

    if (loadingInitial) return <LoadingComponent content="Loading ticket..." />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Grid padded>
                    <Grid.Row>
                        <Form.Input width={16} placeholder='Title' value={ticket.title} name='title' onChange={handleInputChange} />
                    </Grid.Row>
                    <Grid.Row>
                        <Form.Input width={16} placeholder='Name' value={ticket.name} name='name' onChange={handleInputChange} />
                    </Grid.Row>
                    <Grid.Row>
                        <Form.Input type='date' width={16} placeholder='Date' value={ticket.dateCreated} name='dateCreated' onChange={handleInputChange} />
                    </Grid.Row>
                    <Grid.Row>
                        <Form.Input width={16} placeholder='Email' value={ticket.email} name='email' onChange={handleInputChange} />
                    </Grid.Row>
                    <Grid.Row>
                        <Form.Input width={16} placeholder='Phone Number' value={ticket.phoneNumber} name='phoneNumber' onChange={handleInputChange} />
                    </Grid.Row>
                    <Grid.Row>
                        <Form.TextArea width={16} placeholder='Description' value={ticket.description} name='description' onChange={handleInputChange} />
                    </Grid.Row>
                    <Grid.Row>
                        <Form.Input width={16} placeholder='Assigned To' value={ticket.assignedTo} name='assignedTo' onChange={handleInputChange} />
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <p>Status</p>
                            <Button.Group floated='left'>
                                <Button
                                    inverted
                                    color="green"
                                    type="button"
                                    content='Open'
                                    active={ticket.status === 'Open'}
                                    onClick={() => setTicket({ ...ticket, status: 'Open' })}
                                />
                                <Button
                                    inverted
                                    color="orange"
                                    type="button"
                                    content='Pending'
                                    active={ticket.status === 'Pending'}
                                    onClick={() => setTicket({ ...ticket, status: 'Pending' })} />
                                <Button
                                    inverted color="red"
                                    type="button"
                                    content='Closed'
                                    active={ticket.status === 'Closed'}
                                    onClick={() => setTicket({ ...ticket, status: 'Closed' })} />
                            </Button.Group>
                        </Grid.Column>
                        <Grid.Column>
                            <p>Priority</p>
                            <Menu compact>
                                <Dropdown
                                    text={ticket.priority}
                                    options={ticketStatusOptions}
                                    simple item onChange={(_, data) => setTicket({ ...ticket, priority: data.value as string })}
                                />
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/tickets' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
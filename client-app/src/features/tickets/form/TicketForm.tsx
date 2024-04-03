import { Segment, Form, Button, Divider, Menu, Grid, Dropdown, Modal } from "semantic-ui-react";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function TicketForm() {

    const {ticketStore} = useStore();
    const {selectedTicket, closeForm, createTicket, updateTicket, loading} = ticketStore;

    const initialState = selectedTicket ?? {
        id: '',
        title: '',
        name: '',
        dateCreated: '',
        email: '',
        phoneNumber: '',
        description: '',
        comments: '',
        assignedTo: '',
        status: 'Open',
    }

    const ticketStatusOptions = [
        { key: "low", text: "Low", value: "Low" },
        { key: "medium", text: "Medium", value: "Medium" },
        { key: "high", text: "High", value: "High" },
        { key: "urgent", text: "Urgent", value: "Urgent" },
    ];

    const [ticket, setTicket] = useState(initialState);

    function handleSubmit() {
        ticket.id ? updateTicket(ticket) : createTicket(ticket);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setTicket({ ...ticket, [name]: value })
    }

    return (
        <Modal
        onClose={closeForm}
            open={true}
        >
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
                                        text={ticket.comments}
                                        options={ticketStatusOptions}
                                        simple item onChange={(_, data) => setTicket({ ...ticket, comments: data.value as string })}
                                    />
                                </Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider />
                    <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                    <Button onClick={closeForm} floated='right' type='button' content='Cancel' />

                </Form>
            </Segment>
        </Modal>
    )
})
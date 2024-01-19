import { Segment, Form, Button, Dropdown, Divider, Select } from "semantic-ui-react";
import { Ticket } from "../../../app/models/ticket";
import { ChangeEvent, useState } from "react";

interface Props {
    ticket: Ticket | undefined;
    closeForm: () => void;
    createOrEdit: (ticket: Ticket) => void;
}

export default function TicketForm({ ticket: selectedTicket, closeForm, createOrEdit }: Props) {

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
        { key: "open", text: "Open", value: "Open" },
        { key: "inProgress", text: "In Progress", value: "In Progress" },
        { key: "closed", text: "Closed", value: "Closed" },
    ];

    const [ticket, setTicket] = useState(initialState);

    function handleSubmit() {
        createOrEdit(ticket);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setTicket({ ...ticket, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={ticket.title} name='title' onChange={handleInputChange} />
                <Form.Input placeholder='Name' value={ticket.name} name='name' onChange={handleInputChange} />
                <Form.Input placeholder='Date' value={ticket.dateCreated} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Email' value={ticket.email} name='email' onChange={handleInputChange} />
                <Form.Input placeholder='Phone Number' value={ticket.phoneNumber} name='phoneNumber' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={ticket.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='No Status' value={ticket.status} name='status' options={ticketStatusOptions} onChange={handleInputChange} />
                <Form.Input placeholder='Assigned To' value={ticket.assignedTo} name='assignedTo' onChange={handleInputChange} />
                <Divider/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />

            </Form>
        </Segment>
    )
}
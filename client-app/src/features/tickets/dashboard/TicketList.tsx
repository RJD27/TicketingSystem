import { Button, Header, Table } from "semantic-ui-react";
import { Ticket } from "../../../app/models/ticket";

interface Props {
    tickets: Ticket[];
    selectTicket: (id: string) => void;
}

export default function TicketList({ tickets, selectTicket }: Props) {
    return (
        <div>
            <Header as='h6'>0 Tickets Listed</Header>
            <Table singleLine striped selectable unstackable fluid>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Requester</Table.HeaderCell>
                        <Table.HeaderCell>Subject</Table.HeaderCell>
                        <Table.HeaderCell>Assigned To</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Date Created</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body >
                    {tickets.map((ticket) => (
                        <Table.Row selectable key={ticket.id} onClick={() => selectTicket(ticket.id)}>
                            <Table.Cell>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button circular disabled icon='user' />
                                    <div style={{ marginLeft: '0.5em' }}>
                                        {ticket.name}
                                        <div>{ticket.email}</div>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell>{ticket.title}</Table.Cell>
                            <Table.Cell>{ticket.assignedTo}</Table.Cell>
                            <Table.Cell>{ticket.assignedTo}</Table.Cell>
                            <Table.Cell>{ticket.dateCreated}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}
import { Button, Grid, Header, Table } from "semantic-ui-react";
import { Ticket } from "../../../app/models/ticket";

interface Props {
    tickets: Ticket[];
    selectTicket: (id: string) => void;
    deleteTicket: (id: string) => void;
}

export default function TicketList({ tickets, selectTicket }: Props) {
    // const [activePage, setActivePage] = useState(1);
    // const itemsPerPage = 12

    // const indexOfLastTicket = activePage * itemsPerPage;
    // const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
    // const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket); currentTickets
        
    return (
        <div>
            <Grid.Row>
                <Header dividing size="huge" as='h1'>
                    All Tickets
                </Header>
            </Grid.Row>
            <Table singleLine striped selectable unstackable color="blue">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Requester</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Priority</Table.HeaderCell>
                        <Table.HeaderCell>Assigned To</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Date Created</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tickets.map((ticket) => (
                        <Table.Row key={ticket.id}>
                            <Table.Cell key={ticket.id}>
                                <Button basic icon='external alternate' onClick={() => selectTicket(ticket.id)} />
                                {ticket.title}
                            </Table.Cell>
                            <Table.Cell>
                                <div style={{ marginLeft: '0.5em' }}>
                                    {ticket.name}
                                </div>
                            </Table.Cell>

                            <Table.Cell style={{ whiteSpace: "nowrap", width: "300px", overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                                {ticket.description}
                            </Table.Cell>
                            <Table.Cell>{ticket.comments}</Table.Cell>
                            <Table.Cell>{ticket.assignedTo}</Table.Cell>
                            <Table.Cell>{ticket.status}</Table.Cell>
                            <Table.Cell>{ticket.dateCreated}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}
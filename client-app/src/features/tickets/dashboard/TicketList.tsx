import { Grid, Header, Table } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useNavigate } from "react-router-dom";

export default observer(function TicketList() {
    // const [activePage, setActivePage] = useState(1);
    // const itemsPerPage = 12

    // const indexOfLastTicket = activePage * itemsPerPage;
    // const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
    // const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket); currentTickets
    const {ticketStore} = useStore()
    const {ticketsByDate} = ticketStore;
    const navigate = useNavigate();

    const handleRowClick = (id: string) => {
        navigate(`/tickets/${id}`);
      };

    return (
        <div>
            <Grid.Row>
                <Header dividing size="huge" as='h1'>
                    All Tickets
                </Header>
            </Grid.Row>
            <Table striped selectable unstackable color="blue">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={{width: "250px"}}>Title</Table.HeaderCell>
                        <Table.HeaderCell>Requester</Table.HeaderCell>
                        <Table.HeaderCell style={{width: "500px"}}>Description</Table.HeaderCell>
                        <Table.HeaderCell>Priority</Table.HeaderCell>
                        <Table.HeaderCell>Assigned To</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Date Created</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {ticketsByDate.map((ticket) => (
                        <Table.Row key={ticket.id}  onClick={() => handleRowClick(ticket.id)}>
                            <Table.Cell>
                                {ticket.title}
                            </Table.Cell>
                            <Table.Cell>
                                <div style={{ marginLeft: '0.5em' }}>
                                    {ticket.name}
                                </div>
                            </Table.Cell>
                            <Table.Cell style={{ whiteSpace: "nowrap", width: "500px", display: 'block'  }}>
                                <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                    {ticket.description}
                                </div>
                            </Table.Cell>
                            <Table.Cell>{ticket.priority}</Table.Cell>
                            <Table.Cell>{ticket.assignedTo}</Table.Cell>
                            <Table.Cell>{ticket.status}</Table.Cell>
                            <Table.Cell>{ticket.dateCreated}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
})
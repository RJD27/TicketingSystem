import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react';
import { Ticket } from '../models/ticket';
import NavBar from './NavBar';
import TicketDashboard from '../../features/tickets/dashboard/TicketDashboard';
import { v4 as uuid } from 'uuid';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Ticket[]>('http://localhost:5000/api/tickets')
      .then(response => {
        console.log(response);
        setTickets(response.data)
      })
  }, [])

  function handleSelectTicket(id: string) {
    setSelectedTicket(tickets.find(x => x.id === id))
  }

  function handleCancelSelectTicket() {
    setSelectedTicket(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectTicket(id) : handleCancelSelectTicket();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditTicket(ticket: Ticket) {
    ticket.id
      ? setTickets([...tickets.filter(x => x.id !== ticket.id), ticket])
      : setTickets([...tickets, {...ticket, id: uuid()}]);
    setEditMode(false);
    setSelectedTicket(ticket);
  }

  function handleDeleteTicket(id: string) {
    setTickets([...tickets.filter(x => x.id !== id)])
  }

  return (
    <Grid>
      <Grid.Column >
        <Container>
          <NavBar openForm={handleFormOpen} />
        </Container>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={13} computer={13} floated="right" id="content">
        <TicketDashboard
          tickets={tickets}
          selectedTicket={selectedTicket}
          selectTicket={handleSelectTicket}
          cancelSelectTicket={handleCancelSelectTicket}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditTicket}
          deleteTicket={handleDeleteTicket}
        />
      </Grid.Column>
    </Grid>
  )
}

export default App
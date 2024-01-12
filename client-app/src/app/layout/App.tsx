import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Ticket } from '../models/ticket';
import NavBar from './NavBar';
import TicketDashboard from '../../features/tickets/dashboard/TicketDashboard';

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
      : setTickets([...tickets,  ticket]);
    setEditMode(false);
    setSelectedTicket(ticket);
  }

  return (
    <div>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ paddingLeft: '13.5em' }}>
        <TicketDashboard
          tickets={tickets}
          selectedTicket={selectedTicket}
          selectTicket={handleSelectTicket}
          cancelSelectTicket={handleCancelSelectTicket}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditTicket}
        />
      </Container>
    </div>
  )
}

export default App

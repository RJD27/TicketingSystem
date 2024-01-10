import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Ticket } from '../models/ticket';
import NavBar from './NavBar';
import TicketDashboard from '../../features/tickets/dashboard/TicketDashboard';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    axios.get<Ticket[]>('http://localhost:5000/api/tickets')
      .then(response => {
        console.log(response);
        setTickets(response.data)
      })
  }, [])

  return (
    <div>
      {/* <Header as='h2' icon='handshake outline' content='Ticketing System' /> */}
      <NavBar />
      <Container style={{ marginTop: '-1em', paddingLeft: '13.5em' }}>
        <List>
            <TicketDashboard tickets={tickets} />
        </List>
      </Container>

    </div>
  )
}

export default App

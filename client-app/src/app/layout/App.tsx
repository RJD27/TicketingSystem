import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tickets')
      .then(response => {
        setTickets(response.data)
      })
  }, [])

  return (
    <div>
        <Header as='h2' icon='handshake outline' content='Ticketing System' />
      <List>
        {tickets.map((ticket: any) => (
          <List.Item key={ticket.id}>
            {ticket.title}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default App

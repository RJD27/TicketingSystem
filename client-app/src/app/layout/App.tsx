import { useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import NavBar from './NavBar';
import TicketDashboard from '../../features/tickets/dashboard/TicketDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';

function App() {
  const {ticketStore} = useStore();

  useEffect(() => {
    ticketStore.loadTickets();
  }, [ticketStore])

  if (ticketStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    <Grid >
      <Grid.Column >
        <Container>
          <NavBar />
        </Container>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={13} computer={13} floated="right" id="content">
        <TicketDashboard />
      </Grid.Column>
    </Grid>
  )
}

export default App
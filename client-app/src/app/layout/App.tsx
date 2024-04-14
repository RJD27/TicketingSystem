import { Container, Grid } from 'semantic-ui-react';
import NavBar from './NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname == '/' ? <HomePage /> : (
        <Grid>
          <Grid.Column>
            <Container>
              <NavBar />
            </Container>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={13} computer={13} floated="right" id="content">
            <Outlet />
          </Grid.Column>
        </Grid>
      )}
    </>
  )
}

export default App
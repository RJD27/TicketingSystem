import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Icon, Menu } from "semantic-ui-react";
import "./NavBar.css";
import { useStore } from "../stores/store";

export default function NavBar() {

  const {ticketStore} = useStore();

  return (
    <div className="App">
      <Grid padded className="tablet computer only">
        <Menu borderless inverted fluid fixed="top">
          <Menu.Item header as="a">
            <Icon name="ticket" size="large" />
            Ticketing System
          </Menu.Item>
          <Menu.Menu position="right" >
            <Menu.Item>
              <Button circular color='red' icon='user' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Grid>
      <Grid padded>
        <Grid.Column tablet={3} computer={3} only="tablet computer" id="sidebar" >
          <Menu vertical borderless fluid text>
            <Menu.Item as="a">
              <Icon name='th' />
              Overview
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="users" />
              All Tickets
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="user" />
              Assigned to Me
            </Menu.Item>
            <Menu.Item as="a" onClick={() => ticketStore.openForm()}>
              <Icon name="plus circle" />
              Create Ticket
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="chart bar" />
              Stats
            </Menu.Item>
          </Menu>
        </Grid.Column>
      </Grid>
    </div>
  );
}

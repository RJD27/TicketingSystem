import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Icon, Menu } from "semantic-ui-react";
import "./NavBar.css";

interface Props {
  openForm: () => void;
}

export default function NavBar({openForm}: Props) {
  return (
    <div>
      <Grid padded>
        <Menu borderless inverted fluid fixed="top">
          <Menu.Item header as="a">
            <Icon name="ticket" size="large" />
            Ticketing System
          </Menu.Item>
          <Menu.Menu position="right" >
            {/* <Button circular color='red' icon='user' /> */}
            <Menu.Item>
              <Button color="green" size='small' style={{ marginRight: '9px' }}>
                Login
              </Button>
              <Button color="blue" size='small' style={{ marginRight: '-9px' }}>
                Sign Up
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Grid>
      <Grid padded>
        <Grid.Column computer={3} id="sidebar" >
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
            <Menu.Item as="a" onClick={openForm}>
              <Icon name="plus circle"/>
              Create Ticket
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="chart bar" />
              Stats
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column computer={13} floated="right" id="content" >
          {/* Content goes here. */}
        </Grid.Column>
      </Grid>
    </div>
  );
}

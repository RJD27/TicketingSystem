import { Segment, Item, Button, Label, Grid, Menu, Input, Divider, Header, Table } from "semantic-ui-react";
import { Ticket } from "../../../app/models/ticket";

interface Props {
    tickets: Ticket[];
}

export default function TicketList({ tickets }: Props) {
    return (
        <div>
            <Grid.Row>
                <Menu.Item>
                    <Menu.Item>
                        <Input placeholder="Search..." size="small" />
                    </Menu.Item>
                </Menu.Item>
            </Grid.Row>
            <Grid.Row>
                <Header as='h6'>0 Tickets Listed</Header>
                <Table singleLine striped selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Requester</Table.HeaderCell>
                            <Table.HeaderCell>Subject</Table.HeaderCell>
                            <Table.HeaderCell>Assigned To</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>OS</Table.HeaderCell>
                            <Table.HeaderCell>Date Created</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {tickets.map((ticket, index) => (
                            <Table.Row key={ticket.id}>
                                <Table.Cell>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button circular disabled icon='user' />
                                        <div style={{marginLeft: '0.5em'}}>
                                            {ticket.name}
                                            <div>{ticket.email}</div>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>{ticket.title}</Table.Cell>
                                <Table.Cell>{ticket.name}</Table.Cell>
                                <Table.Cell>{ticket.name}</Table.Cell>
                                <Table.Cell>{ticket.userOperatingSystem}</Table.Cell>
                                <Table.Cell>{ticket.dateCreated}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Grid.Row>
        </div>
    )
}
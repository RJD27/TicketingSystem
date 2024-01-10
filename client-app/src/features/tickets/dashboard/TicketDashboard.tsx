import { Grid, List, Menu } from "semantic-ui-react";
import { Ticket } from "../../../app/models/ticket";
import TicketList from "./TicketList";

interface Props {
    tickets: Ticket[];
}

export default function TicketDashboard({tickets}: Props) {
    return (
        <Menu borderless>
            <TicketList tickets={tickets}/>
        </Menu>
    )
}
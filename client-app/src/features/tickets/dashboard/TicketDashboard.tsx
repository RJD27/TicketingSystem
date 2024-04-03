import { Grid } from "semantic-ui-react";
import TicketList from "./TicketList";
import TicketDetails from "../details/TicketDetails";
import TicketForm from "../form/TicketForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function TicketDashboard() {

    const {ticketStore} = useStore();
    const {selectedTicket, editMode, deleteTicket, loading} = ticketStore;

    return (
        <Grid style={{ marginTop: '5px' }}>
            <Grid.Column width={15}>
                <TicketList />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedTicket && !editMode &&
                    <TicketDetails
                        deleteTicket={deleteTicket}
                        submitting={loading}
                    />}
                {editMode &&
                    <TicketForm />}
            </Grid.Column>
        </Grid>
    )
})
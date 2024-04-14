import { Grid } from "semantic-ui-react";
import TicketList from "./TicketList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function TicketDashboard() {
    const {ticketStore} = useStore();
    const {loadTickets, ticketRegistry} = ticketStore;

    useEffect(() => {
      if(ticketRegistry.size <= 1) loadTickets();
    }, [loadTickets])
  
    if (ticketStore.loadingInitial) return <LoadingComponent content='Loading app'/>

    return (
        <Grid style={{ marginTop: '5px' }}>
            <Grid.Column width={15}>
                <TicketList />
            </Grid.Column>
            <Grid.Column width={6}>
            </Grid.Column>
        </Grid>
    )
})
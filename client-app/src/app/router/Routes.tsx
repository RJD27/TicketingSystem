import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import TicketDashboard from "../../features/tickets/dashboard/TicketDashboard";
import TicketForm from "../../features/tickets/form/TicketForm";
import TicketDetails from "../../features/tickets/details/TicketDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'tickets', element: <TicketDashboard />},
            {path: 'tickets/:id', element: <TicketDetails />},
            {path: 'createTicket', element: <TicketForm key='create' />},
            {path: 'manage/:id', element: <TicketForm key='manage' />},
        ]
    },
]

export const router = createBrowserRouter(routes);
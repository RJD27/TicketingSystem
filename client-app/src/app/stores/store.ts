import { createContext, useContext } from "react";
import TicketStore from "./ticketStore";

interface Store {
    ticketStore: TicketStore
}

export const store: Store = {
    ticketStore: new TicketStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
} 
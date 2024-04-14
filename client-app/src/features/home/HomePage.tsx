import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage() {
    return(
        <Container>
            <h1>Home Page</h1>
            <h3>Go to <Link to='/tickets'>Tickets</Link></h3>
        </Container>
    )
}
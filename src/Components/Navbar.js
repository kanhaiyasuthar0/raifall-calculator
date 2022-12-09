import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./singledrop.jpg"
function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <ul style={{ listStyle: "none", height: "100vh" }}>
                            <li>
                                <Navbar.Brand href="/"><img src={logo} style={{ height: "30px", width: "30px" }} /></Navbar.Brand>
                            </li>
                            <li>
                                <Nav.Link href="/allData">All Rain Data</Nav.Link>
                            </li>
                            <li>
                                <Nav.Link href="/projectData">New Entry</Nav.Link>
                            </li>
                        </ul>
                        {/* <Nav.Link href="/projectData">Project Data</Nav.Link> */}
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
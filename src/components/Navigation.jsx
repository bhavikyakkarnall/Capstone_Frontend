import { useContext } from 'react'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoImg from '../assets/track.png';
import { useAuthenticator } from '@aws-amplify/ui-react';


function Navigation() {

    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();

    const userType = user.attributes.zoneinfo;
    const isAdminOrStaff = userType === 'admin' || userType === 'staff';
    const isAdminOrSubbie = userType === 'admin' || userType === 'Subbie';

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" >
            <Container>
                <Navbar.Brand href="/">
                    <img style={{width: "40px", height: "40px"}} src={LogoImg} alt='Logo'></img>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink style={{color:"black", marginRight: "10px", marginLeft: "10px", textDecoration: "none"}} to="/products">Products</NavLink>
                        {isAdminOrStaff && <NavLink style={{color:"black", marginRight: "10px", marginLeft: "10px", textDecoration: "none"}}  to="/dispatches">Dispatches</NavLink>}
                        {isAdminOrSubbie && (<NavLink style={{color:"black", marginRight: "10px", marginLeft: "10px", textDecoration: "none"}}  to="/orders">Orders</NavLink>)}
                        <NavLink style={{color:"black", marginRight: "10px", marginLeft: "10px", textDecoration: "none"}}  to="/inventory-items">Inventory</NavLink>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                <NavDropdown title={<><AccountCircleIcon></AccountCircleIcon>{user.attributes.name}</>} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={signOut}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}

export default Navigation;
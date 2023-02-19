import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';

 

function NavigationBar() {
   const Firebase = useFirebase();
   const currentUser = Firebase.user;
  
    const logoutHandler = () =>{
        Firebase.userLogout();
    }

    
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/UserHome">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href=""></Nav.Link>
            <Nav.Link href=""></Nav.Link>
          </Nav>
        {
           currentUser ? (
            <Nav>
            <NavLink style={{margin:'10px'}} >{currentUser.email}</NavLink>
            <NavLink style={{margin:'10px'}} to="/SignIn"><span onClick={logoutHandler}>LogOut</span></NavLink>
            {/* <Nav.Link >{currentUser.email}</Nav.Link>
            <Nav.Link eventKey={2} href="./SignIn">
            <span onClick={logoutHandler}>LogOut</span>
            </Nav.Link> */}
          </Nav>
           ) : (
        <Nav>    
           <NavLink style={{margin:'10px'}} to="/SignIn">Login</NavLink>
           <NavLink style={{margin:'10px'}} to="/SignUp">Register</NavLink>
             </Nav>
           )

        }
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
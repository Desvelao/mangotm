import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import routes from '../constants/routes'
import { auth, db } from '../firebase'
import {  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Mango from '../img/mango.jpg'
// let authUser = false

class Navigation extends Component{
  constructor(props){
    super(props)
    this.state = {collapsed : false}
  }
  handleToggleNavbar(){
    this.setState({collapsed : !this.state.collapsed})
  }
  render(){
    return (
      <Navbar color="light" fixed='' light expand="md">
        <Link className='navbar-brand ml-2' to={routes.HOME}><img height={30} width={30} className='dv-border-circle d-inline-block align-top' src={Mango}/> Mango</Link>
        <NavbarToggler onClick={()=> this.handleToggleNavbar()} className="" />
        <Collapse isOpen={this.state.collapsed} navbar>
          { this.props.authUser ? <MenuAdmin {...this.props}/> : <MenuPublic />}
        </Collapse>
      </Navbar>
    )
  }
}

// <NavbarBrand href={routes.HOME} className='ml-2'>Mango</NavbarBrand>


const MenuPublic = ({ history }) => (
  <Nav className='ml-auto text-center' navbar>
    <NavItem className='mx-2'>
      <Link className='d-inline align-middle' to={routes.PLAYERS}>Jugadores</Link>
    </NavItem>
    <NavItem className='mx-2'>
      <Link className='align-middle' to={routes.TEAMS}>Equipos</Link>
    </NavItem>
    <NavItem className='mx-2'>
      <Link className='align-middle' to={routes.ADMIN}>Admin</Link>
    </NavItem>
  </Nav>
)

// <NavItem>
//   <NavLink href={routes.HOME}>Inicio</NavLink>
// </NavItem>


const MenuAdmin = (props) => {
    // console.log();
    const { history, mangoUpdated } = props
    console.log('MENUADMIN',mangoUpdated,props);
    return (
      <Nav className='ml-auto text-center' navbar>
        <NavItem className='mx-2'>
          <Link className='align-bottom' to={routes.PLAYERS}>Jugadores</Link>
        </NavItem>
        <NavItem className='mx-2'>
          <Link className='align-bottom'to={routes.TEAMS}>Equipos</Link>
        </NavItem>
        <NavItem className='mx-2'>
          <Link className='align-bottom'to={routes.ADMIN_REQUESTS}>Peticiones</Link>
        </NavItem>
        <Button size='sm' color={mangoUpdated ? 'success' :'primary'} className="" onClick={() => db.refreshMango()}><i className='fas fa-sync-alt'></i></Button>
        <Button size='sm' color='link' className="text-danger" onClick={() => logout(history)}>Salir</Button>
      </Nav>
    )
  }

function logout(history){
  auth.logout().then(() => history.push(routes.HOME))
}

function login(history){
  auth.login().then(() => history.push(routes.ADMIN))
}


const mapStateToProps = (state) => ({
  authUser: state.authUser,
  mangoUpdated : state.mangoUpdated
});

export default withRouter(connect(mapStateToProps)(Navigation));

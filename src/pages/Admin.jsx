import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom'
import LoginForm from '../components/LoginForm.jsx'
import AddPlayer from './AddPlayer'
import Requests from './Admin_Requests'
import routes from '../constants/routes'
import { auth } from '../firebase'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'

class Admin extends Component {
  constructor(props){
    super()
  }
  render() {
    return (
      <Switch>
        <Route exact path={routes.ADMIN} component={LoginForm}/>
        <Route exact path={routes.ADMIN_REQUESTS} component={Requests}/>
      </Switch>
    );
  }
}

export default withRouter(Admin)

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import routes from '../constants/routes'
import { auth } from '../firebase'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'

class LoginForm extends Component {
  constructor(props){
    super()
  }
  componentDidMount(){
    this.username.focus()
  }
  componentWillUnmount(){
    clearTimeout(this.timeout)
  }
  render() {
    return (
        <Row className='mx-auto text-center justify-content-center'>
          <Col md='4'>
            <div className='dv-text-title'>Administración</div>
            <Form>
              <FormGroup>
                <InputGroup className='mb-2'>
                  <Input placeholder="username" innerRef={ref => this.username = ref}/>
                  <InputGroupAddon addonType="append">@mango.io</InputGroupAddon>
                </InputGroup>
                <FormGroup>
                  <Input type='password' placeholder='password' innerRef={ref => this.password = ref}/>
                </FormGroup>
                <FormGroup>
                  <Button color='primary' onClick={() => this.handleLogin()}>Entrar</Button>
                </FormGroup>
            </FormGroup>
          </Form>
        </Col>
        </Row>

    );
  }
  handleLogin(){
    if(true){
    // if(this.username.value.length > 0 && this.password.value.length > 0){
      const {
        history,
      } = this.props;
      auth.login(this.username.value +'@mango.lie',this.password.value).then(user => {
      // auth.login('desvelao@mango.lie','desveadmin').then(user => {
        console.log('Login with', user.email);
        console.log('Roles', user.roles, user.permissions, user);
        history.push(routes.ADMIN_REQUESTS)
        // this.timeout = setTimeout(() => history.push(routes.ADMIN_REQUESTS),300)
      }).catch(err => console.log(err))
    }
  }
}

export default withRouter(LoginForm)

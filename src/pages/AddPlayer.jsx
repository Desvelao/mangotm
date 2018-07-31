import React, { Component } from 'react';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'
import { db } from '../firebase'
import AddPlayerForm from '../components/AddPlayerForm.jsx'

export default (props) => {
  return (
          <Row>
            <Col>
              <AddPlayerForm {...props}/>
            </Col>
          </Row>
      )
}

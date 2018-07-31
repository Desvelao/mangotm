import React, { Component } from 'react';
import Navigation from '../components/Navigation.jsx'
import { connect } from 'react-redux'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button } from 'reactstrap'
import { db } from '../firebase'
import AddTeamForm from '../components/AddTeamForm'
import { addTeamFirebase, deleteTeamFirebase } from '../reducers/actioncreators'
// console.log('database',database().ref());
const AddTeam = (props) => {
  return (
          <Row>
            <Col>
              <AddTeamForm/>
            </Col>
          </Row>
      )
}

// const mapStateToProps = (state) => ({
//   players : state.players,
//   teams : state.teams
// })
//
// const mapDispatchToProps = (dispatch) => ({
//   addTeam : (team,resolve,reject) => dispatch(addTeamFirebase(team,resolve,reject)),
//   deleteTeam : (team_id,resolve,reject) => dispatch(deleteTeamFirebase(team_id,resolve,reject))
// })

// export default connect(mapStateToProps,mapDispatchToProps)(AddTeam)

export default AddTeam

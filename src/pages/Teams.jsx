import React, { Component } from 'react';
import Navigation from '../components/Navigation.jsx'
import { connect } from 'react-redux';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, FormText, Button } from 'reactstrap'
import TeamCard from '../components/TeamCard'
import { getInfoTeam } from './Team'
import { sortBy } from '../utils'
import { Link } from 'react-router-dom'
import routes from '../constants/routes'
import { addTeamFirebase, deleteTeamFirebase} from '../reducers/actioncreators'
import { withRouter } from 'react-router-dom'
const _teamsForCol = 3
const teamsForCol = 12/_teamsForCol

class Teams extends Component{
  constructor(props){
    super(props)
    this.state = {filter : false , search : ''}
  }
  render(){
    return (
      <div>
        <Row className='mb-3'>
          <Col>
            <div className='dv-text-title'>Equipos</div>
            <Form inline className='mb-3'>
              <Col md={4} className='p-0 mb-2'>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text'><i className='fas fa-search'/></InputGroupText></InputGroupAddon>
                  <Input type='text'  placeholder={'Buscar/filtrar: ' + this.props.teams.length + ' equipos'} onChange={(e) => this.onChangeSearch(e)}/>
                  <InputGroupAddon addonType="append">
                    <Button className='btn bg-primary' onClick={() => this.props.history.push(routes.ADDTEAM)}><i className='fas fa-plus text-white'></i></Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
              <Col className='text-center'>
                <span><i className='fas fa-filter'></i>  </span>
                <Button size='sm' color={this.state.filter ? 'success' : 'danger'} onClick={() => this.onClickFilterRecents()} active={this.state.filter}>Recientes</Button>
              </Col>
            </Form>
          </Col>
        </Row>
        <Row>
          {this.applyFilter().map(team => (<Col className='my-3' md={teamsForCol} key = {team._id}><TeamCard {...this.props} team = {getInfoTeam(this.props,team._id)}/></Col>))}
        </Row>
      </div>
  )}
  onClickFilterRecents(){
    this.setState({filter : !this.state.filter})
  }
  onChangeSearch(e){
    this.setState({ search : e.target.value.toLowerCase()})
  }
  applyFilter(){
    const {search , filter} = this.state
    let filtered = []
    filtered = search ? this.props.teams.filter(team => team._id.toLowerCase().includes(search)) : [...this.props.teams]
    if(filter){
      filtered = filtered.sort(sortBy('number','a','ts'))
    }
    return filtered
  }
}




const mapStateToProps = (state) => ({
  authUser : state.authUser,
  players : state.players,
  teams : state.teams
})

// const mapDispatchToProps = (dispatch) => ({ //TODO
//   deleteTeam : ,
//   editTeam :
// })

const mapDispatchToProps = (dispatch) => ({
  addTeam : (player,resolve,reject) => dispatch(addTeamFirebase(player,resolve,reject)),
  deleteTeam : (team,resolve,reject) => dispatch(deleteTeamFirebase(team,resolve,reject))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Teams))

import React, { Component } from 'react';
import Navigation from '../components/Navigation.jsx'
import { connect } from 'react-redux';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button, Table } from 'reactstrap'
import TeamCard from '../components/TeamCard'
import { getPlayer, getInfoTeam , getRawInfoTeam } from './Team'
import { sortBy } from '../utils'
import { PlayerSteamLink , PlayerDotaLink} from '../components/TeamCard'
import { Link } from 'react-router-dom'
import routes from '../constants/routes'
import { ButtonsAcceptRemove } from '../components/ButtonEditDelete'
import { addPlayerFirebase, deleteRequestPlayerFirebase , addTeamFirebase, deleteRequestTeamFirebase } from '../reducers/actioncreators'
import { withRouter } from 'react-router-dom'
import TeamProfile from '../components/TeamProfile.jsx'
import withModal from '../hocs/withModal.jsx'
import withAuthorization from '../hocs/withAuthorization.jsx'

const TeamProfileModal = withModal(TeamProfile)

class Requests extends Component{
  constructor(props){
    super(props)
    console.log('HOME',this.props);
    this.state = {filter : false , search : '', team_modal : false}
  }
  render(){
    console.log('STATEMODAL',this.state.team_modal);
    return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col>
              {this.props.request_players.length > 0 && (
                <div>
                  <div className='dv-text-title'>Jugadores/as sugeridos/as</div>
                  <Table className='text-center'>
                    <thead>
                      <tr>
                        <th>Jugador/a</th>
                        <th>Dota ID</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.request_players.map(player => (<tr key={player._id}>
                        <td>{player.name}</td>
                        <td>{player._id}</td>
                        <td><ButtonsAcceptRemove onClickAccept={() => {this.props.deleteRequestPlayer(player,() => this.props.addPlayer(player))}} onClickDelete={() => this.props.deleteRequestPlayer(player)}/></td>
                      </tr>))}
                    </tbody>
                  </Table>
                </div>

              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.props.request_teams.length > 0 && (
                <div>
                  <div className='dv-text-title'>Equipos sugeridos</div>
                  <Table className='text-center'>
                    <thead>
                      <tr>
                        <th>Equipo</th>
                        <th>Jugadores</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.request_teams.map(team => (<tr key={team._id}>
                        <td>{team._id}</td>
                        <td>{team.roster.split(',').map(player => {const p = getPlayer(this.props.players,player); return p.name}).join(', ')}</td>
                        <td><ButtonsAcceptRemove onClickAccept={() => {this.props.deleteRequestTeam(team,() => this.props.addTeam(team))}} onClickDelete={() => this.props.deleteRequestTeam(team)}/>
                          <Button className='mx-1' color='warning' size='sm' onClick={() => this.setState({team_modal : team._id})}><i className='fas fa-eye'></i></Button>
                        </td>
                      </tr>))}
                    </tbody>
                  </Table>
                  {this.state.team_modal && (<TeamProfileModal onClickClose={() => this.setState({team_modal : false})} title={`${this.state.team_modal} - Info`} data={getRawInfoTeam(this.props.request_teams,this.props.players,this.state.team_modal)}/>)}
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>>
    </Container>
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
    filtered = search ? this.props.players.filter(player => player.name.toLowerCase().includes(search)) : [...this.props.players]
    if(filter){
      filtered = filtered.sort(sortBy('number','a','updated'))
    }
    return filtered
  }
}

const mapStateToProps = (state) => ({
  authUser : state.authUser,
  players : state.players,
  teams : state.teams,
  request_players : state.request_players,
  request_teams : state.request_teams
})

// const mapDispatchToProps = (dispatch) => ({ //TODO
//   deleteTeam : ,
//   editTeam :
// })

const mapDispatchToProps = (dispatch) => ({
  addPlayer : (player,resolve,reject) => dispatch(addPlayerFirebase(player,resolve,reject)),
  deleteRequestPlayer : (player,resolve,reject) => dispatch(deleteRequestPlayerFirebase(player,resolve,reject)),
  addTeam : (team,resolve,reject) => dispatch(addTeamFirebase(team,resolve,reject)),
  deleteRequestTeam : (team,resolve,reject) => dispatch(deleteRequestTeamFirebase(team,resolve,reject))
})

export default withAuthorization(withRouter(connect(mapStateToProps,mapDispatchToProps)(Requests)))

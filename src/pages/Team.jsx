import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation.jsx'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button,
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import { db } from '../firebase'
import routes from '../constants/routes'
import TeamProfile from '../components/TeamProfile'
import { addTeamFirebase, deleteTeamFirebase } from '../reducers/actioncreators'
// import '../dv-styles.css'

class TeamPage extends Component{
  constructor(props){
    super(props)
    // console.log('TEAMPAGE',this.props.match.params.team_id)
  }
  render(){
    const team = getInfoTeam(this.props,this.props.match.params.team_id)
    return (
          <Container className=''>
            <Row>
              <Col>
                {team && (<TeamProfile addTeam={this.props.addTeam} deleteTeam={this.props.deleteTeam} history={this.props.history} team={team}/>)}
              </Col>
            </Row>
          </Container>
        )
  }
}

const mapStateToProps = (state) => ({
  players : state.players,
  teams : state.teams
});

const mapDispatchToProps = (dispatch) => ({
  addTeam : (team,resolve,reject) => dispatch(addTeamFirebase(team,resolve,reject)),
  deleteTeam : (team_id,resolve,reject) => dispatch(deleteTeamFirebase(team_id,resolve,reject))
})

export default connect(mapStateToProps,mapDispatchToProps)(TeamPage)


const getTeam = (teams,query) => {
  // console.log('TEAMS',teams,query);
  return teams.find(team => {
    // console.log('INNER GET TEAM',team._id.toLowerCase() === query,team);
    return team._id.toLowerCase() === query.toLowerCase()
  })
}

const getPlayer = (players,query) => players.find(player => player._id === query)

const getInfoTeam = (state,query) => {
  const team = getTeam(state.teams,query)
  // console.log('GETINFOTEAM',team);
  if(!team){return null}
  return {...team,
    roster : team.roster.split(',').map(player => getPlayer(state.players,player)),
    standins : team.standins.split(',').map(player => getPlayer(state.players,player)).filter(player => player)
  }
}

const getRawInfoTeam = (teams,players,query) => {
  const team = teams.find(t => t._id.toLowerCase() === query.toLowerCase())
  if(!team){return null}
  return {...team,
    roster : team.roster.split(',').map(player => getRawPlayer(players,player)),
    standins : team.standins.split(',').map(player => getRawPlayer(players,player)).filter(player => player)
    }
}
const getRawPlayer = (players,query) => {
  return players.find(player => player._id === query)
}

export {getTeam , getPlayer, getInfoTeam, getRawInfoTeam, getRawPlayer}

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import routes from '../constants/routes'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button,
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import { auth, db } from '../firebase'
import { ButtonsEdit } from '../components/ButtonEditDelete'
// <CardImg top width="50%" src={team.logo} alt={`${team._id}'s logo`}/>
const TeamCard = (props) => {
    const { authUser, team, history , deleteTeam } = props
    // dv-team-card-img
    return (
      <Card className='text-center dv-team-card-bg'>
        <div className='dv-team-card-img'>
          <img className='' src={team.logo} alt={`${team._id}'s logo`}/>
        </div>
        <CardBody>
          <CardTitle className='text-primary App-title'><Link to={`${routes.TEAMS}/${team._id}`}>{team._id}</Link></CardTitle>
          <div className='font-weight-bold text-success'>Roster</div>
          <ul className='list-group dv-list-nodeco'>
            {team.roster.map((player,index) => (<li key={index} value={player._id}><PlayerLink steam_id = {player.steam} dota_id ={player._id} name = {player.name}/></li>))}
          </ul>
          {authUser ? (
            <ButtonsEdit onClickEdit={() => history.push({pathname : routes.ADDTEAM, state : {edit : team}})} onClickDelete={() => deleteTeam(team)}/>
            ) : null}
        </CardBody>
      </Card>
    )
  }

  // {team.standins.length > 0 &&
  //   (<div>
  //     <div className='font-weight-bold text-danger'>Standins</div>
  //     <ul className='list-group dv-list-nodeco'>
  //       {team.standins.map((player,index) => (<li className='text-danger' key={index} value={player._id}><PlayerLink steam_id = {player.steam} dota_id ={player._id} name = {player.name}/></li>))}
  //     </ul>
  //   </div>)
  // }

const PlayerSteamLink = (props) => (
  <a href={steamLink(props.steam_id)} target='_blank'>{props.name}</a>
)


const steamLink = (steam_id) => (steam_id.match(new RegExp('[^0-9]')) ? "http://steamcommunity.com/id/" : "http://steamcommunity.com/profiles/") + steam_id

const PlayerDotaLink  = (props) => (
  <a href={dotaLink(props.dota_id)} target='_blank'>DB</a>
)

const PlayerLink = (props) => (
  <span><PlayerSteamLink {...props}/> - <PlayerDotaLink {...props}/></span>
)

const dotaLink = (dota_id) => ("https://www.dotabuff.com/players/") + dota_id

export default TeamCard

export { TeamCard , PlayerSteamLink , PlayerDotaLink }

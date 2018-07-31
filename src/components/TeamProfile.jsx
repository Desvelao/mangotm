import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import routes from '../constants/routes'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button,
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import { auth, db } from '../firebase'
import ButtonEditDelete from '../components/ButtonEditDelete'
import { secondsToDate } from '../utils'
const TeamProfile = (props) => {
  // const {team} = props
  // console.log('TEAMPROFILEEXISTS',props.team,props.data);
  const team = props.team || props.data
  // console.log('TEAMPROFILEEXISTS',team);
  // console.log('TEAMCARD',props);
  // console.log('DATE',date);
  const dateString = secondsToDate(team.ts)
  return (
    <Row className='mt-1'>
      <Col md='3'>
        <Row className='justify-content-center'>
          <Col className='text-center'>
            <img className='mb-3 dv-team-profile-img'src={team.logo} onError={(e) => {e.target.onError=null;e.target.src="https://pbs.twimg.com/profile_images/819691338635603968/zXMHzluz_bigger.jpg"}}/>
            <div className='mb-1 font-weight-bold'>{team._id}</div>
            {team.division && (<div className='text-muted'>División:{team.division}</div>)}
            <div className='mb-3'>
              {team.twitter && (<div><a href={`https://twitter.com/${team.twitter}`}><i className='fab fa-twitter'></i> <span>{team.twitter}</span></a></div>)}
              {team.email && (<div><span><i className='fas fa-envelope'></i> <span>{team.email}</span></span></div>)}
            </div>
            <div className='text-muted'>{dateString}</div>
          </Col>
        </Row>
      </Col>
      <Col md='9'>
        <div className='font-weight-bold text-success'>Roster</div>
        <ul className='list-group dv-list-nodeco'>
          {team.roster.map((player,index) => (<li key={index} value={player._id}><PlayerLink steam_id = {player.steam} dota_id ={player._id} name = {player.name}/></li>))}
        </ul>
        {team.standins.length > 0 && (
          <div>
            <hr/>
            <div className='font-weight-bold text-danger'>Standins</div>
            <ul className='list-group dv-list-nodeco'>
              {team.standins.map((player,index) => (<li className='text-danger' key={index} value={player._id}><PlayerLink steam_id = {player.steam} dota_id ={player._id} name = {player.name}/></li>))}
            </ul>
          </div>)
        }
        {team.info && (
          <div>
            <hr/>
            <div className='font-weight-bold'>Información</div>
            <div className='mb-2'>{team.info}</div>
          </div>
          )
        }
      </Col>
    </Row>
  )
}

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

export default TeamProfile

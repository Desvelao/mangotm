import React, { Component } from 'react';
import { connect } from 'react-redux';
import routes from '../constants/routes'

import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'
import Navigation from '../components/Navigation.jsx'
import { Link } from 'react-router-dom'
import TeamCard from '../components/TeamCard'
import { getInfoTeam } from './Team'
import AddPlayerForm from '../components/AddPlayerForm'
import ProfileCard, { ProfileSocial } from '../components/ProfileCard'
import Patreon from '../img/patreon.png'
import { DESVELAO_PROFILE, DESVELAO_BE_PATRON, FED_DISCORD } from '../constants/links'

class Home extends Component{
  constructor(props){
    super(props)
    console.log('HOME',this.props);
  }
  render(){
    return (
      <div>
        <Row className='justify-content-center' id='dv-home-bg'>
          <Col className='text-center mx-auto'>
            <h1 className='dv-text-title mb-2'>Mango Team Manager</h1>
            <hr className='mb-4'/>
            <p>
              ⚙️ Este es el manejador de equipos de 🤖 <strong>Mango Bot</strong>.<br/><br/>

            Es una aplicación para controlar los <strong>datos de jugadores y equipos</strong> a los que tiene acceso el bot en Discord (necesario admin). A pesar de ello puedes, <strong>sugerir</strong> <Link to={routes.ADDPLAYER}>jugadores</Link> y <Link to={routes.ADDPLAYER}>equipos</Link> para incluirlos. Estas sugerencias tienen que ser aprobadas para que se añadan a la información que tendrá acceso Mango.<br/><br/>

            <strong>Mango</strong> es un 🤖 bot para Discord que actúa en el servidor de la <a href={FED_DISCORD}>FED</a>.
            </p>
            {(this.props.players.length > 0 || this.props.players.length > 0) && (
              <div className='mb-2'>
                <div className='font-weight-bold'>Registro</div>
                {this.props.players.length > 0 && (<span>Jugadores: <Link to={routes.PLAYERS} className='text-primary'>{this.props.players.length}</Link>  </span>)}
                {this.props.teams.length > 0 && (<span>Equipos: <Link to={routes.PLAYERS} className='text-primary'>{this.props.teams.length}</Link></span>)}
              </div>
            )}
          </Col>
        </Row>
        <hr/>
        <Row className='justify-content-between'>
          <Col className='mx-auto text-center mb-2'>
            <div className="mb-2">Creado por <a href='https://desvelao.github.io/profile/' target='_blank'>Desvelao^^</a> con mucho ❤️</div>
          </Col>
          <Col md='' className='mx-auto text-center mb-2'>
            <ProfileSocial/>
          </Col>
          <Col md='' className='mx-auto text-center v-align-bottom'>
            <a className='' href={DESVELAO_BE_PATRON} data-patreon-widget-type="become-patron-button" target='_blank'><img className='dv-patreon-button mb-2' src={Patreon} alt='Become a Patron!' target='_blank'/></a><script async src="https://c6.patreon.com/becomePatronButton.bundle.js"></script>
          </Col>
        </Row>
      </div>
  )}
}
// <Col className='mx-auto text-center justify-content-center'>
// </Col>
// <ProfileCard/>
// <div><a href={DESVELAO_PROFILE} target='_blank'>Patreon</a></div>
const mapStateToProps = (state) => ({
  players : state.players,
  teams : state.teams
})

export default connect(mapStateToProps)(Home)

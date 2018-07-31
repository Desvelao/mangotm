import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import routes from '../constants/routes'
import { Alert, Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button } from 'reactstrap'
import { auth, db } from '../firebase'
import { addTeamFirebase, deleteTeamFirebase } from '../reducers/actioncreators'
import { nowToSeconds } from '../utils'

const initialState = {log : {message : '', type : ''}, __id : '', edit : false, _id : '', division : '', twitter : '', email : '', info : '', private : '', roster : [], standins : [], logo : 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7c/7c03b2a4a28c59d8bce9759de24334e87cf73d7a_full.jpg'}

class AddTeamForm extends Component{
  constructor(props){
    super(props)
    const { state } = this.props.location
    this.state = !state ? {...initialState} : {...initialState,...state.edit,edit : true, __id : state.edit._id}
    this.playersByTeam = 5
  }
  componentWillUnmount(){
    if(this.timeout){clearTimeout(this.timeout)}
  }
  componentDidMount(){
  }
  render(){
    const { players , teams } = this.props
    const { _id, logo, division, twitter, email, info, roster, standins, log } = this.state
    return (
      <Col className='mx-auto'>
        <div className='dv-text-title'>{this.props.authUser ? 'Añade' : 'Sugiere'} un equipo</div>
        <hr/>
        <Form>
          <Row>
            <Col md='6'>
                <FormGroup row>
                  <Col xs='9'>
                    <Label for='team_name'>Nombre del equipo</Label>
                    <Input type='text' id='team_name' placeholder='Nombre del equipo' onChange={(e) => this.handleState('_id',e)} value={_id}/>
                  </Col>
                  <Col xs='3'>
                    <Label for='team_division'>División</Label>
                      <Input type='text' id='team_division' placeholder='División' onChange={(e) => this.handleState('division',e)} innerRef={(input) => this.division = input} value={division}/>
                  </Col>
                </FormGroup>
              <FormGroup row>
                <Col xs={8}>
                  <Label for='logo'>Logo (url)</Label>
                  <Input type='text' id='logo' placeholder='Logo' value={logo} onChange={(e) => this.handleState('logo',e)}/>
                </Col>
                <Col xs={4} className='h-100'>
                  <img src={logo} className='w-100' />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs={5} md={4}>
                  <Label for='twitter'>Twitter</Label>
                  <Input type='text' id='twitter' placeholder='Twitter' onChange={(e) => this.handleState('twitter',e)} innerRef={(input) => this.twitter = input} value={twitter}/>
                </Col>
                <Col>
                  <Label for='email'>Email</Label>
                  <Input type='email' id='email' placeholder='Email' onChange={(e) => this.handleState('email',e)} innerRef={(input) => this.email = input} value={email}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for='info'>Información</Label>
                <Input type='textarea' id='info' placeholder='Información pública' onChange={(e) => this.handleState('info',e)} innerRef={(input) => this.info = input} value={info}/>
              </FormGroup>
            </Col>
            <Col md='6'>
              <FormGroup>
                <Label for='roster'>Roster: <span className='text-success'>{roster.map(player => player.name).join(', ')}</span></Label>
                <Input type='select' name='roster' id='roster' multiple innerRef={(input) => this.roster = input} onChange={(e) => this.handleRoster(e.target.options)}>
                  {players.map(player => (<option data-name={player.name} value={player._id} key={player._id}>{player.name} - {player._id}</option>))}
                </Input>
                <FormText color='muted'>Usa <code>CTRL+click</code> para añadir/eliminar de la selección más jugadores</FormText>
              </FormGroup>
              <FormGroup>
                <Label for='standins'>Standins: <span className='text-danger'>{standins.map(player => player.name).join(', ')}</span></Label>
                <Input type='select' name='standins' id='standins' multiple innerRef={(input) => this.standins = input} onChange={(e) => this.handleStandins(e.target.options)}>
                  {players.map(player => (<option data-name={player.name} value={player._id} key={player._id}>{player.name} - {player._id}</option>))}
                </Input>
                <FormText color='muted'>Usa <code>CTRL+click</code> para añadir/eliminar de la selección más jugadores</FormText>
              </FormGroup>
              <FormGroup>
                <Label for='info_private'>Información privada</Label>
                <Input type='textarea' id='info_private' placeholder='Información privada que no será mostrada por el bot en Discord' onChange={(e) => this.handleState('private',e)} innerRef={(input) => this.private = input} value={this.state.private}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup row className='text-center'>
                <Col className='mx-auto'>
                  <Button color={this.conditionValidate() ? 'success' : 'danger'} onClick={() => this.handleAddTeam()}>{this.props.authUser ? 'Enviar' : 'Sugerir'}</Button>
                  {log.message ? <Alert color={log.type}>{log.message}</Alert> : ''}
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        {this.props.authUser ? null : (<div className='text-muted'>*Después de sugerir tiene que ser aprobado por un admin</div>)}
      </Col>
    )
  }
  handleState(prop,e){
    this.setState({[prop] : e.target.value})
  }
  handleRoster(options){
    let roster = []
    for (var i = 0; i < options.length; i++) {
      if(options[i].selected){
        roster.push({name : options[i].dataset.name, _id : options[i].value})
      }
    }
    // const roster = options.filter(option => option.selected).map(option => ({name : option.name, _id : option.value}))
    if(roster.length < 6){
      this.setState({roster})
    }
  }
  handleStandins(options){
    let standins = []
    for (var i = 0; i < options.length; i++) {
      if(options[i].selected){
        standins.push({name : options[i].dataset.name, _id : options[i].value})
      }
    }
    // const roster = options.filter(option => option.selected).map(option => ({name : option.name, _id : option.value}))
    if(standins.length < 6){
      this.setState({standins})
    }
  }
  conditionValidate(){
    return this.state._id && this.state.roster.length === this.playersByTeam
  }
  handleAddTeam(){
    if(!this.state._id){return this.log('ERROR: No se ha establecido el nombre del equipo','danger')}
    if(this.state.roster.length !== this.playersByTeam){return this.log('ERROR: El roster debe tener 5 jugadores','danger')}
    const team = {_id : this.state._id, logo : this.state.logo, roster : this.state.roster.map(player => player._id).join(','),
      standins : this.state.standins.map(player => player._id).join(','), division : this.state.division,
      twitter : this.state.twitter, email : this.state.email, info : this.state.info, private : this.state.private, ts : nowToSeconds()}
    // console.log(update);
    // db.addTeam(team).then(() => {
    //   this.success(`${team.name} añadido`)
    //   this.setState({roster : [], standins : [], logo : ''})
    //   this.resetForm()
    // }).catch((err) => this.error('ERROR al guardar en la base de datos'))
    const teamExists = this.props.teams.find(t => t._id === team._id) ? true : false
    if(this.props.authUser){
      this.props.deleteTeam(team,() => {
        console.log('AFTERDELETE',team);
        this.props.addTeam(team,() => {
          this.log(`${team._id} añadido`,'success')
        }, () => {
          this.log('ERROR al guardar en la base de datos','danger')
        })
      }
      )
    }else{
      db.addTeamFirebase(team,true).then(() => this.log(`${team._id} enviado`,'success'))
    }



    this.resetForm()


    // db.onceBot().then(snap => {console.log('hi BOT',snap.val());})
    // firebase.db().child('test').update(update).then(() => console.log('Update',update[this.dotaID]))
    // console.log(this.button);
  }
  log(message,type){
    this.setState({log : {message, type}})
    this.timeout = setTimeout(() => this.setState({log : {message : ''}}),5000)
  }
  selectOptions(select,options){
    for (var i = 0; i < select.length; i++) {
      if(options.includes(select[i].value)){
        select[i].selected = true
      }
    }
  }
  resetOptions(select){
    for (var i = 0; i < select.length; i++) {
      select[i].selected = false
    }
  }
  resetForm(){
    this.setState({...initialState, log : this.state.log})
    this.resetOptions(this.roster.options)
    this.resetOptions(this.standins.options)
    // this.teamname.value = ''
    // this.division.value = ''
    // this.twitter.value = ''
    // this.email.value = ''
    // this.info.value = ''
    // this.private.value = ''
  }
}

const mapStateToProps = (state) => ({
  authUser : state.authUser,
  players : state.players,
  teams : state.teams
})

const mapDispatchToProps = (dispatch) => ({
  addTeam : (team,resolve,reject) => dispatch(addTeamFirebase(team,resolve,reject)),
  deleteTeam : (team,resolve,reject) => dispatch(deleteTeamFirebase(team,resolve,reject))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddTeamForm))

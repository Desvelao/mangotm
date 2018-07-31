import React, { Component } from 'react';
import Navigation from '../components/Navigation.jsx'
import { connect } from 'react-redux';
import { Container, Row, Col, Input, InputGroupText, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button, Table } from 'reactstrap'
import TeamCard from '../components/TeamCard'
import { getInfoTeam } from './Team'
import { sortBy } from '../utils'
import { PlayerSteamLink , PlayerDotaLink} from '../components/TeamCard'
import { Link } from 'react-router-dom'
import routes from '../constants/routes'
import { ButtonsEdit } from '../components/ButtonEditDelete'
import { addPlayerFirebase, deletePlayerFirebase} from '../reducers/actioncreators'
import { withRouter } from 'react-router-dom'

class Players extends Component{
  constructor(props){
    super(props)
    console.log('HOME',this.props);
    this.state = {filter : false , search : ''}
  }
  render(){
    return (
      <div>
        <Row className='mb-3'>
          <Col>
            <div className='dv-text-title'>Jugadores</div>
            <Form inline className='mb-3'>
              <Col md={4} className='p-0 mb-2'>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text'><i className='fas fa-search'/></InputGroupText></InputGroupAddon>
                  <Input type='text'  placeholder={'Buscar/filtrar: ' + this.props.players.length + ' jugadores'} onChange={(e) => this.onChangeSearch(e)}/>
                  <InputGroupAddon addonType="append">
                    <Button className='btn bg-primary' onClick={() => this.props.history.push(routes.ADDPLAYER)}><i className='fas fa-plus text-white'></i></Button>
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
          <Col>
            {this.props.players && (this.applyFilter().map(player => (
              <span className="mb-3 mr-3 text-center d-inline-blick" key={player._id}>
                <strong>{player.name}</strong> <PlayerDotaLink dota_id={player._id}/> <PlayerSteamLink name="S" steam_id={player.steam}/>
                <span>
                  {this.props.authUser ? (
                    <ButtonsEdit onClickEdit={() => this.props.history.push({pathname : routes.ADDPLAYER, state : {edit : player}})} onClickDelete={() => this.props.deletePlayer(player)}/>
                  ) : null}
                </span>
              </span>
            )))}
          </Col>
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
    filtered = search ? this.props.players.filter(player => player.name.toLowerCase().includes(search)) : [...this.props.players]
    if(filter){
      filtered = filtered.sort(sortBy('number','a','ts'))
    }
    return filtered
  }
}

// <Col>
//   <Table className='text-center'>
//     <thead>
//       <tr>
//         <th>Jugador/a</th>
//       </tr>
//     </thead>
//     <tbody>
//       {this.props.players && (this.applyFilter().map(player =>
//         (<tr key = {player._id}>
//           <td>{player.name} <PlayerDotaLink dota_id={player._id}/> <PlayerSteamLink name="S" steam_id={player.steam}/>
//           {this.props.authUser ? (
//             <ButtonsEdit onClickEdit={() => this.props.history.push({pathname : routes.ADDPLAYER, state : {edit : player}})} onClickDelete={() => this.props.deletePlayer(player)}/>
//             ) : null}
//           </td>
//         </tr>))
//         )
//       }
//     </tbody>
//   </Table>
// </Col>


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
  addPlayer : (player,resolve,reject) => dispatch(addPlayerFirebase(player,resolve,reject)),
  deletePlayer : (player,resolve,reject) => dispatch(deletePlayerFirebase(player,resolve,reject))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Players))

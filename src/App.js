import React, { Component } from 'react';
import { HashRouter as Router, BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Team from './pages/Team.jsx'
import AddPlayer from './pages/AddPlayer.jsx'
import AddTeam from './pages/AddTeam.jsx'
import Teams from './pages/Teams.jsx'
import Players from './pages/Players.jsx'
import Admin from './pages/Admin.jsx'
import logo from './logo.svg';
import routes from './constants/routes'
import { db } from './firebase'
import * as actions from './reducers/actioncreators'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'
import './App.css';
import { sortBy } from './utils'
import Navigation from './components/Navigation'
import withAuthentication from './hocs/withAuthentication.jsx'
import createHistory from "history/createBrowserHistory";
console.log('PUBLIC_URL',process.env.PUBLIC_URL);
class App extends Component {
  // constructor(){
  //   super()
  //   db.load().then(snap => {
  //     if(!snap.exists()){return}
  //     const { players, teams, timestamp } = snap.val()
  //     const { addPlayer, addTeam } = this.props
  //     db.collection(players).forEach(player => addPlayer(player))
  //     db.collection(teams).forEach(team => addTeam(team))
  //   })
  //   console.log('innerAPPDidMount');
  //   console.log(this.props);
  // }
  componentDidMount(){
    // db.load().then(snap => {
    //   if(!snap.exists()){return}
    //   const { players, teams, timestamp } = snap.val()
    //   const { addPlayer, addTeam } = this.props
    //   console.log('ORDERED',db.collection(players),db.collection(players).sort(sortBy('alpha','d','name')));
    //   db.collection(players).forEach(player => addPlayer(player))
    //   db.collection(teams).forEach(team => addTeam(team))
    // })
    // return ;
    this.props.loadPlayers()
    this.props.loadTeams()
    this.props.loadRequestPlayers()
    this.props.loadRequestTeams()
    this.props.mangoUpdatedListener()
    db.listenerMangoUpdated((snap) => console.log('APPMANGOUPDATED',snap.exists(),snap.val()))
  }
  render() {
    // console.log('CDM',this.props);
    return (
      <Router>
        <div>
          <Navigation/>
          <Container className='content'>
            <Row>
              <Col className='mt-3'>
                <Switch>
                  <Route exact path={routes.HOME} component={Home}/>
                  <Route exact path={routes.PLAYERS} component={Players}/>
                  <Route exact path={routes.ADDPLAYER} component={AddPlayer}/>
                  <Route exact path={routes.TEAMS} component={Teams}/>
                  <Route path={routes.TEAMS+'/:team_id'} component={Team}/>
                  <Route exact path={routes.ADDTEAM} component={AddTeam}/>
                  <Route path={routes.ADMIN} component={Admin}/>
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  players : state.players,
  teams : state.teams
});

const mapDispatchToProps = (dispatch) => ({
  addPlayer : (player) => dispatch(actions.addPlayer(player)),
  addTeam : (team) => dispatch(actions.addTeam(team)),
  loadPlayers : () => dispatch(actions.loadPlayersFirebase()),
  loadTeams : () => dispatch(actions.loadTeamsFirebase()),
  loadRequestPlayers : () => dispatch(actions.loadRequestPlayersFirebase()),
  loadRequestTeams : () => dispatch(actions.loadRequestTeamsFirebase()),
  mangoUpdatedListener : () => dispatch(actions.mangoUpdatedFirebase())
})

// const withAuthCondition = (authUser) => !!authUser
// export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App))
export default compose(
  withAuthentication, //TODO
  connect(mapStateToProps,mapDispatchToProps)
)(App)
// export default App
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <h1 className="App-title">Welcome to React</h1>
//   </header>
//   <p className="App-intro">
//     To get started, edit <code>src/App.js</code> and save to reload.
//   </p>
// </div>

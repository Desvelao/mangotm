import actiontypes from './actiontypes'
import { db } from '../firebase'

export const login = function(authUser){
  return {type : actiontypes.LOGIN, authUser}
}

export const addPlayer = function(player){
  return {type : actiontypes.ADD_PLAYER,player}
}

export const deletePlayer = function(player){
  return {type : actiontypes.DELETE_PLAYER, player}
}

export const loadPlayers = function(players){
  return {type : actiontypes.LOAD_PLAYERS,players}
}

export const addRequestPlayer = function(player){
  return {type : actiontypes.ADD_REQUEST_PLAYER,player}
}

export const deleteRequestPlayer = function(player){
  return {type : actiontypes.DELETE_REQUEST_PLAYER, player}
}

export const loadRequestPlayers = function(players){
  return {type : actiontypes.LOAD_REQUEST_PLAYERS,players}
}

export const addTeam = function(team){
  return {type : actiontypes.ADD_TEAM,team}
}

export const deleteTeam = function(team){
  return {type : actiontypes.DELETE_TEAM, team}
}

export const loadTeams = function(teams){
  return {type : actiontypes.LOAD_TEAMS,teams}
}

export const addRequestTeam = function(team){
  return {type : actiontypes.ADD_REQUEST_TEAM,team}
}

export const deleteRequestTeam = function(team){
  return {type : actiontypes.DELETE_REQUEST_TEAM, team}
}

export const loadRequestTeams = function(teams){
  return {type : actiontypes.LOAD_REQUEST_TEAMS,teams}
}

export const addPlayerFirebase = function(player,resolve,reject){
  return function(dispatch){
    //TODO add steam with long
    // player = {...player, steam}
    db.addPlayerFirebase(player).then(() => {
      dispatch(addPlayer(player))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const loadPlayersFirebase = function(resolve,reject){
  return function(dispatch){
    //TODO add steam with long
    db.loadPlayers().then((snap) => {
      if(!snap.exists()){return}
      console.log('COLLECTION_PLAYERS',snap.val(),db.collection(snap.val()));
      dispatch(loadPlayers(db.collection(snap.val())))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const editPlayer = function(player,resolve,reject){ //TODO
  return function(dispatch){
    db.addPlayerFirebase(player).then(() => {
      dispatch(addPlayer(player))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const deletePlayerFirebase = function(player,resolve,reject){ //TODO
  return function(dispatch){
    db.deletePlayerFirebase(player._id).then(() => {
      console.log('AC DELETE_PLAYER',player);
      dispatch(deletePlayer(player))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const addTeamFirebase = function(team,resolve,reject){
  return function(dispatch){
    console.log('ADD TEAM FIREBASE', team);
    db.addTeamFirebase(team).then(() => {
      console.log('INNERFIREBASE',team);
      dispatch(addTeam(team))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const deleteTeamFirebase = function(team,resolve,reject){
  return function(dispatch){
    console.log('DELETETEAMFIREBASE',team);
    db.deleteTeamFirebase(team._id,false).then(() => {
      console.log('INNERFIREBASE',team);
      dispatch(deleteTeam(team))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const loadTeamsFirebase = function(resolve,reject){
  return function(dispatch){
    db.loadTeams().then((snap) => {
      if(!snap.exists()){return}
      console.log('COLLECTION_TEAMS',snap.val(),db.collection(snap.val()));
      dispatch(loadTeams(db.collection(snap.val())))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const deleteRequestPlayerFirebase = function(player,resolve,reject){ //TODO
  return function(dispatch){
    db.deletePlayerFirebase(player._id,true).then(() => {
      console.log('AC DELETE_PLAYER',player);
      dispatch(deleteRequestPlayer(player))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const deleteRequestTeamFirebase = function(team,resolve,reject){
  return function(dispatch){
    db.deleteTeamFirebase(team._id,true).then(() => {
      dispatch(deleteRequestTeam(team))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const loadRequestPlayersFirebase = function(resolve,reject){
  return function(dispatch){
    //TODO add steam with long
    db.loadRequestPlayers().then((snap) => {
      if(!snap.exists()){return}
      dispatch(loadRequestPlayers(db.collection(snap.val())))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const loadRequestTeamsFirebase = function(resolve,reject){
  return function(dispatch){
    //TODO add steam with long
    db.loadRequestTeams().then((snap) => {
      if(!snap.exists()){return}
      dispatch(loadRequestTeams(db.collection(snap.val())))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const mangoUpdated = function(payload){
  console.log('AC MANGOUPDATED',payload);
  return {type : actiontypes.MANGO_UPDATED, mangoUpdated : payload}
}

export const mangoUpdatedFirebase = function(resolve,reject){
  return function(dispatch){
    //TODO add steam with long
    db.listenerMangoUpdated((snap) => {
      console.log('listenerMangoUpdated',snap,snap.exists(),snap.val());
      if(!snap.exists()){return}
      dispatch(mangoUpdated(snap.val()))
      if(resolve){resolve()}
    })
  }
}

import { combineReducers } from 'redux'
import actioncreators from './actioncreators'
import actiontypes from './actiontypes'
import { sortBy, addSteamToPlayer } from '../utils'

const authUser = (state = null, action) => {
    switch(action.type) {
        case(actiontypes.LOGIN):
            // const { user: { uid: userId} } = action;
            // return { loggedIn : true, userId }
            return action.authUser
        default:
            return state;
    }
}



const players = (state = [],action) => {
  switch(action.type) {
      case(actiontypes.ADD_PLAYER):
          // const { user: { uid: userId} } = action;
          // const player = {...action.player, steam : } //TODO get steam with long
          return [ ...state, addSteamToPlayer(action.player)].sort(sortBy('alpha','d','name'))
      case(actiontypes.DELETE_PLAYER):
          // const { user: { uid: userId} } = action;
          // const player = {...action.player, steam : } //TODO get steam with long
          console.log('FIND DELETE PLAYER',state,state.filter(player => player._id !== action.player._id));
          return state.filter(player => player._id !== action.player._id)
      case(actiontypes.LOAD_PLAYERS):
          // const { user: { uid: userId} } = action;
          console.log(action.players);
          const players = action.players.map(player => addSteamToPlayer(player))
          console.log(players);
          return [...players].sort(sortBy('alpha','d','name'))
      default:
          return state;
  }
}

const teams = (state = [],action) => {
  switch(action.type) {
      case(actiontypes.ADD_TEAM):
          // const { user: { uid: userId} } = action;
          const exists = state.findIndex(team => team._id === action.team._id)
          if(!exists){
            return [...state,action.team]
          }else{
            let results = [...state,action.team]
            results[exists] = action.team
            return results
          }
          return !exists ? [ ...state, action.team] : state
      case(actiontypes.DELETE_TEAM):
          console.log('REDUCTOR DELETE_TEAM',action.team);
          return state.filter(team => team._id !== action.team._id)
      case(actiontypes.LOAD_TEAMS):
        console.log('REDUCER LOAD_TEAMS',action);
          // const { user: { uid: userId} } = action;
          return [...action.teams]
      default:
          return state;
  }
}

const request_players = (state = [],action) => {
  switch(action.type) {
      // case(actiontypes.ADD_REQUEST_PLAYER):
      //     // const { user: { uid: userId} } = action;
      //     // const player = {...action.player, steam : } //TODO get steam with long
      //     return [ ...state, addSteamToPlayer(action.player)].sort(sortBy('alpha','d','name'))
      case(actiontypes.DELETE_REQUEST_PLAYER):
          // const { user: { uid: userId} } = action;
          // const player = {...action.player, steam : } //TODO get steam with long
          // console.log('FIND DELETE PLAYER',state,state.filter(player => player._id !== action.player._id));
          return state.filter(player => player._id !== action.player._id)
      case(actiontypes.LOAD_REQUEST_PLAYERS):
          // const { user: { uid: userId} } = action;
          console.log(action.players);
          const players = action.players.map(player => addSteamToPlayer(player))
          console.log(players);
          return [...players].sort(sortBy('alpha','d','name'))
      default:
          return state;
  }
}

const request_teams = (state = [],action) => {
  switch(action.type) {
      case(actiontypes.ADD_REQUEST_TEAM):
          // const { user: { uid: userId} } = action;
          const exists = state.findIndex(team => team._id === action.team._id)
          if(!exists){
            return [...state,action.team]
          }else{
            let results = [...state,action.team]
            results[exists] = action.team
            return results
          }
          return !exists ? [ ...state, action.team] : state
      case(actiontypes.DELETE_REQUEST_TEAM):
          console.log('REDUCTOR DELETE_TEAM',action.team);
          return state.filter(team => team._id !== action.team._id)
      case(actiontypes.LOAD_REQUEST_TEAMS):
        console.log('REDUCER LOAD_TEAMS',action);
          // const { user: { uid: userId} } = action;
          return [...action.teams]
      default:
          return state;
  }
}

export const mangoUpdated = (state = false, action) => {
  switch(action.type) {
    case(actiontypes.MANGO_UPDATED):
    console.log('REDUCER MANGO UPDATED',action);
      return action.mangoUpdated
    default:
      return state
  }
}

export default combineReducers({authUser,players,teams, request_players, request_teams, mangoUpdated})

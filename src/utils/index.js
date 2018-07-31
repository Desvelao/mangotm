// import { sortBy } from './sort'
import Long from 'long'

const STEAM64 = new Long.fromString("76561197960265728")

export const toSteamID = (dotaID) => {
  return STEAM64.add(dotaID).toString()
}

export const nowToSeconds = () => Math.round(new Date().getTime()/1000)

export const secondsToDate = (seconds) => {const date = new Date(seconds*1000); return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
export const addSteamToPlayer = (player) => {
  console.log('ADDSTEAMTOPLAYER',player);
  return ({...player, steam : toSteamID(player._id)})
}

export const sortBy = (by = 'alpha', mode = 'd',param='_id') => {
  switch (by) {
    case 'alpha':
      return sortAlpha(v => v[param].toLowerCase(),mode)
    case 'number':
      return sortAlpha(v => parseInt(v[param]),mode)
    default:

  }
}

function sortAlpha(callback,mode){
  mode = mode === 'd' ? 'd' : 'a'
  return function(a,b){
    a = callback(a)
    b = callback(b)
    if(mode === 'd'){
      if(a < b){return -1}else if(a > b){return 1}else{return 0}
    }else{
      if(a < b){return 1}else if(a > b){return -1}else{return 0}
    }
  }
}

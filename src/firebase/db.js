import { db } from './firebase';
import { nowToSeconds } from '../utils'
// Sign In
export const onceBot = () => db.ref('bot').once('value');

export const addPlayer = (player) => db.ref(`tm/players/${player.dota}`).update({name : player.name})

export const addPlayerFirebase = (player,request) =>
  db.ref(`${!request ? 'tm' : 'tm_request'}/players/${player._id}`).update({name : player.name, ts : player.ts})

export const deletePlayerFirebase = (id,request) => db.ref(`${!request ? 'tm' : 'tm_request'}/players/${id}`).remove()

export const loadPlayers = () => db.ref(`tm/players`).once('value')

export const deleteRequestPlayerFirebase = (id) => db.ref(`tm_request/players/${id}`).remove()

export const loadRequestPlayers = () => db.ref(`tm_request/players`).once('value')

export const addTeamFirebase = (team,request) => {
  return db.ref(`${!request ? 'tm' : 'tm_request'}/teams/${team._id}`).update({
    roster : team.roster, logo : team.logo, standins : team.standins, division : team.division,
    info : team.info, private : team.private, twitter : team.twitter, email : team.email, ts : team.ts
  })
}

export const deleteTeamFirebase = (id,request) => {
  const path = !request ? 'tm' : 'tm_request'
  const refpath = `${path}/teams/${id}`
  console.log('PATH',request,path,refpath);
  return db.ref(refpath).remove()
}

export const loadTeams = (player) => db.ref(`tm/teams`).once('value')

export const loadRequestTeams = (player) => db.ref(`tm_request/teams`).once('value')

export const addTeam = (team) =>
db.ref(`tm/teams/${team.name}`).update({
  roster : team.roster, logo : team.logo, standins : team.standins, division : team.division,
  info : team.info, private : team.private, twitter : team.twitter, email : team.email
})

export const refreshMango = () => db.ref('tm').update({ts : nowToSeconds()});

export const load = () => db.ref('tm').once('value');

export const collection = (obj) => Object.keys(obj).map(k => ({...obj[k], _id : k}))

export const listenerMangoUpdated = (callback) => db.ref('tm/tsm').on('value',(snap) => callback(snap))

export const sortbyNamePlayers = (collection) => collection.sort(function(a,b){
  a = a.toLowerCase(); b = b.toLowerCase();
  if(a < b){return 1}else if(a > b){return -1}else{return 0}
})

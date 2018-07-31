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

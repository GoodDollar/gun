(function(){

  /**
  Radix AsyncStorage adapter
  make sure to pass AsyncStorage instance in opt.AsyncStorage
  example:
  import AsyncStorage from 'react-native'
  const store = Store({AsyncStorage})
  const gun = new Gun({store,peers:[...]})
  **/
  function Store(opt){
    opt = opt || {};
    const store = function(){}
    const as = opt.AsyncStorage;
    store.put = function(key, data, cb)
      { 
        as.setItem(''+key,data)
          .then(_ => cb(null,1))
          .catch(_ => {
            console.error(`failed saving to asyncstorage`,{key, data})
            cb(null,0)
          })
      }

    store.get = (key,cb) => {
        as.getItem(''+key)
          .then(data => cb(null,data))
          .catch(_ => {
            console.error(`failed fetching from asyncstorage`,{key})
            cb(null,0)
          })
      }
    
    return store;
  }

  module.exports = Store

}());
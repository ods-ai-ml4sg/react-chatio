import Storage from '../components/Storage';

// Some comprehensive data structure should be used instead
// and imported from Storage singleton
let profiles = {
  id: {},
  username: {}
};

// Doing this way, because ES6 Singleton pattern didn't work somehow
module.exports = {

  add(id, user) {
    if(profiles.username[user]) {
      throw new Error('User already exists');
    }

    // This should be atomic in perfect world
    profiles['id'][id] = user;
    profiles['username'][user] = id;
  },

  get() {
    return [ ...Object.keys(profiles['username']) ];
  },

  getById(id) {
    if(profiles.id[id]) {
      return profiles.id[id]
    }
    throw new Error('ID is not registered');
  },

  getByUsername(user) {
    if(profiles.username[user]) {
      return profiles.username[user]
    }
    throw new Error('Username is not registered');
  },

  remove(id) {
    const username = profiles.id[id];
    delete profiles.id[id];
    delete profiles.username[username];
  }

};
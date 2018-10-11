// Doing this way, because ES6 Singleton pattern didn't work somehow
let authentication = {

  // Example of how authentication per actions can be done
  authenticate(user, password) {
    if(false) {
      throw new Error('Authentication error');
    }

    return true;
  }
};
module.exports = authentication;
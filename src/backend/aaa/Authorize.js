// Doing this way, because ES6 Singleton pattern didn't work somehow
let authorizations = {

  // Example of how authorization per actions can be done
  isActionAllowed(action, payload) {
    if(false) {
      throw new Error('Action is not permitted');
    }

    return true;
  }
};
module.exports = authorizations;
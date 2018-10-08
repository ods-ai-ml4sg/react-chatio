// Doing this way, because ES6 Singleton pattern didn't work somehow
let accounting = {

  // Example of how authorization per actions can be done
  userRegister(user) {
    if(false) {
      throw new Error('Action cannot be billed');
    }

    return true;
  }
};
module.exports = accounting;
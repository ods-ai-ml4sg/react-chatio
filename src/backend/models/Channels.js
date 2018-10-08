import Storage from '../components/Storage';

// TODO Schema should be used here
let channels = [
  {name: "public", meta: {unread: 0}},
  {name: "general", meta: {unread: 0}}
];

// Doing this way, because ES6 Singleton pattern didn't work somehow
module.exports = {

  create(channel) {
    if(channels.filter(e => e.name === channel)) {
      throw new Error('Channel already exists');
    }

    // TODO Schema should be used here
    channels.push(
      {name: channel, meta: {unread: 0}}
    );

    return channels;
  },

  list() {
    return channels;
  },

  remove(channel) {
    channels = channels.filter(e => e !== channel)
  }

};
module.exports = {
  generate: function (user, channel, message) {

    let date = Math.floor(Date.now() / 1000);

    return {
      channel: channel,
      user: user,
      message: message,
      date: date
    }
  },
};
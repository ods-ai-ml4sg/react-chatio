const {
  REQUEST_USER_REGISTER,
  RESPONSE_USER_REGISTER
} = require('../../src/common/actions');

// For true tests server should be restarted after each test
// and client should be connected fresh for each test

const io = require('socket.io-client');
const socketURL = 'http://localhost:8080';
let client;
const options = {
  'reconnection delay': 0,
  'reopen delay': 0,
  'force new connection': true,
  transports: ['websocket'],
};

beforeEach((done) => {
  client = io.connect(socketURL, options);
  client.on('connect', () => { done(); });
});

afterEach((done) => {
  if (client.connected) {
    client.disconnect();
  }
  done();
});

describe('User api', () => {

  it('should register', (done) => {
    const registerMessage = {
      user:'test'
    };

    const expectedRegister = {
      type: 'USER_REGISTERED',
      payload: [ 'test' ]
    };

    let answer;

    client.on(RESPONSE_USER_REGISTER, (msg) => {
      answer = msg;
    });

    client.emit(REQUEST_USER_REGISTER, registerMessage);

    setTimeout(() => {
      expect(answer).toEqual(expectedRegister);
      done();
    }, 5);
  });
});

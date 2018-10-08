const {
  RESPONSE_CHANNEL
} = require('../../src/common/actions');
const {default: rootReducer} = require('../../src/frontend/reducers');

describe('reducers', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  });

  it('Returns initial state', () => {
    const initialState = {
      channels: [],
      error: {'errorMessage': '', 'isError': false},
      messages: {},
      user: {isRegistered: false, users: []}
    };
    const newState = rootReducer({}, {});

    expect(newState).toBeTruthy();
    expect(newState).toEqual(initialState);
  });

  it('Channels are initialized on servers update', () => {
    const expectedState = {
      channels: [],
      error: {'errorMessage': '', 'isError': false},
      messages: {
        general: [],
        public: []
      },
      user: {isRegistered: false, users: []}
    };

    const channelUpdate = {
      type: RESPONSE_CHANNEL,
      payload: [
        {name: 'public', meta: {unread: 0}},
        {name: 'general', meta: {unread: 0}}]
    };

    expectedState.channels = channelUpdate.payload;

    const newState = rootReducer(
      {},
      channelUpdate,
    );

    expect(newState).toBeTruthy();
    expect(newState).toEqual(expectedState);
  });
})
;

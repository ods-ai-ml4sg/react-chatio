// Channel actions
export const CHANNEL_LIST = 'CHANNEL_LIST';
export const CHANNEL_CREATE = 'CHANNEL_CREATE';
export const CHANNEL_DELETE = 'CHANNEL_DELETE';
export const CHANNEL_SUCCESS = 'CHANNEL_SUCCESS';
export const CHANNEL_FAILURE = 'CHANNEL_FAILURE';

// UI actions
export const CHANNEL_RESET_UNREAD = 'CHANNEL_RESET_UNREAD';

// Backend channel actions
export const REQUEST_CHANNEL_LIST = 'CHANNEL_LIST';
export const REQUEST_CHANNEL_CREATE = 'CHANNEL_CREATE';
export const REQUEST_CHANNEL_DELETE = 'CHANNEL_DELETE';
export const RESPONSE_CHANNEL = 'CHANNEL_UPDATE';


// Message actions
export const MESSAGE_POST = 'MESSAGE_POST';
export const MESSAGE_SUCCESS = 'MESSAGE_SUCCESS';
export const MESSAGE_FAILURE = 'MESSAGE_FAILURE';

// Backend message actions
export const REQUEST_MESSAGE_POST = 'MESSAGE_REQUEST';

export const RESPONSE_MESSAGE = 'MESSAGE_UPDATE';
export const RESPONSE_MESSAGE_SELF = 'MESSAGE_UPDATE_SELF';


// User actions
export const USER_LIST = 'USER_LIST';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_DELETE = 'USER_DELETE';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

// Backend user actions
export const REQUEST_USER_LIST = 'USER_LIST';
export const REQUEST_USER_REGISTER = 'USER_REGISTER';
export const REQUEST_USER_DELETE = 'USER_DELETE';

export const RESPONSE_USER_REGISTER = 'USER_REGISTERED';
export const RESPONSE_USER_UPDATE = 'USER_UPDATE';
export const RESPONSE_USER_LIST = 'USER_LIST';


// Error handlers
export const RESPONSE_ERROR = 'RESPONSE_ERROR';
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// using 'resocket' middleware reducers API to manage listeners
export const ADD_LISTENERS_TO = 'ADD_LISTENERS_TO';
export const REMOVE_LISTENER_FROM = 'REMOVE_LISTENER_FROM';
export const REMOVE_ALL_LISTENERS = 'REMOVE_ALL_LISTENERS';

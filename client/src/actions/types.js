//= =====================
// Auth Actions
//= =====================
export const AUTH_USER = 'auth_user',
  UNAUTH_USER = 'unauth_user',
  AUTH_ERROR = 'auth_error',
  FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
  RESET_PASSWORD_REQUEST = 'reset_password_request',
  PROTECTED_TEST = 'protected_test';

//= =====================
// User Profile Actions
//= =====================
export const FETCH_USER = 'fetch_user';
export const REQ_USER_DATA = 'REQ_USER_DATA';
export const RECV_USER_DATA = 'RECV_USER_DATA';

//======================
//  Entry
//======================
export const FETCH_ENTRY = 'FETCH_ENTRY';
export const REQ_ENTRY_DATA = 'REQ_ENTRY_DATA';
export const RECV_ENTRY_DATA = 'RECV_ENTRY_DATA';
export const REQ_VIEW_DATA = 'REQ_VIEW_DATA';
export const RECV_VIEW_DATA = 'RECV_VIEW_DATA';

//===================
//   Block
export const REQ_BLOCK_LIST = 'REQ_BLOCK_LIST'; 
export const RECV_BLOCK_LIST = 'RECV_BLOCK_LIST'; 
export const REQ_BLOCK_INFO = 'REQ_BLOCK_INFO';
export const RECV_BLOCK_INFO = 'RECV_BLOCK_INFO';

//= =====================
// Messaging Actions
//= =====================
export const FETCH_CONVERSATIONS = 'fetch_conversations',
  FETCH_RECIPIENTS = 'fetch_recipients',
  START_CONVERSATION = 'start_conversation',
  FETCH_SINGLE_CONVERSATION = 'fetch_single_conversation',
  CHAT_ERROR = 'chat_error',
  SEND_REPLY = 'send_reply';

//= =====================
// Page Actions
//= =====================
export const SEND_CONTACT_FORM = 'send_contact_form',
  STATIC_ERROR = 'static_error';

//= =====================
// Customer Actions
//= =====================
export const CREATE_CUSTOMER = 'create_customer',
  FETCH_CUSTOMER = 'fetch_customer',
  CANCEL_SUBSCRIPTION = 'cancel_subscription',
  UPDATE_BILLING = 'update_billing',
  BILLING_ERROR = 'billing_error',
  CHANGE_SUBSCRIPTION = 'change_subscription';

  export const ERROR_RESPONSE = 'error_response';
  export const LANG_CHANGE = 'LANG_CHANGE';
  
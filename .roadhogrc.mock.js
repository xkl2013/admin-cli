import { login, currentUser } from './mock/api';
export default {
  'POST /api/fakeAccountLogin': login,
  'POST /api/currentUser': currentUser,
};

import storage from '../storage';

async function setToken(token: string): Promise<void> {
  storage.setItem('token', token);
}

async function getToken(): Promise<string> {
  return storage.getItem('token');
}

export default {
  setToken,
  getToken,
};

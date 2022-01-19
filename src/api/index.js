import { login, logout } from './rest/auth.js';
import * as products from './rest/products.js';

import { setToken } from './config.js';

export default {
  products
};

export { setToken };
export { login };
export { logout };

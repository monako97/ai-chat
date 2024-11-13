import { persistence } from '@moneko/common';
import sso from 'shared-store-object';

import '@/services';

const OPENROUTER_API_KEY = 'OPENROUTER_API_KEY';
const DEFAULT_OPENROUTER_KEY = persistence.load<string>(
  OPENROUTER_API_KEY,
  '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',
);

sso.config({
  next(next, key, data) {
    if (key === OPENROUTER_API_KEY) {
      persistence.set(OPENROUTER_API_KEY, data[key]);
    }
    next();
  },
});
export const global = sso({
  OPENROUTER_API_KEY: DEFAULT_OPENROUTER_KEY,
  apiModal: !DEFAULT_OPENROUTER_KEY,
  // 错误信息
  error: void 0 as
    | {
        message: string;
        code: number;
      }
    | undefined,
  closeModal() {
    global.apiModal = false;
  },
  menuOpen: true,
  toggleMenu() {
    global.menuOpen = !global.menuOpen;
  },
});

import { persistence } from "@moneko/common";
import sso from "shared-store-object";

import "@/services";

const OPENROUTER_API_KEY = "OPENROUTER_API_KEY";
const DEFAULT_OPENROUTER_KEY = persistence.load<string>(
  OPENROUTER_API_KEY,
  "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",
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
  closeModal() {
    global.apiModal = false;
  },
  menuOpen: true,
  toggleMenu() {
    global.menuOpen = !global.menuOpen;
  },
});

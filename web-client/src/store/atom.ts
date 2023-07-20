import { atom } from "recoil";

const navLinkActiveState = atom({
  key: "navLinkActive",
  default: window.location.pathname,
});

export { navLinkActiveState };

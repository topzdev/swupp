import AwesomeDebouncePromise from "awesome-debounce-promise";
import authAPI from "../api/auth";

export const isUsernameExist = AwesomeDebouncePromise(authAPI.isUserExist, 500);
export const isContaining = (value: string, contains: string) =>
  value.toLowerCase().includes(contains.toLowerCase());

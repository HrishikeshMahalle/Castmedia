import { getAuthData } from "../Utilities/AuthUtil/authUtil";

const initialState = {
  isUser: getAuthData() ? true : false,
  token: getAuthData(),
};
const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGGED_IN":
    case "SIGNED_UP":
      return {
        ...state,
        isUser: payload ? true : false,
        token: payload,
      };
    case "LOGGED_OUT":
      return {
        ...state,
        isUser: false,
        token: null,
      };
    default:
      return state;
  }
};

export { initialState, authReducer };

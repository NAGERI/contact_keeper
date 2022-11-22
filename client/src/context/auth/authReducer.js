import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS } from "../types";

//eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        error: action.payload,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

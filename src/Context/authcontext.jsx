import { createContext, useContext, useReducer } from "react";
import { authReducer, initialState } from "./authReducer";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const value = {
    isUser: state.isUser,
    token: state.token,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };

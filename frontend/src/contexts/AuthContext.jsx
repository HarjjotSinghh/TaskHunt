import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  // console.log("Dispatched action:", action);
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload }
    case "LOGOUT":
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch({
        type: "LOGIN",
        payload: {
          token,
        }
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", state.user?.token || "");
  }, [state.user]);

  // console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

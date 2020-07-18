import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export const AuthContext = React.createContext();

const App = () => {
  const [auth, setAuth] = useState(false);

  const checkAuth = () => {
    const authState = localStorage.getItem("auth");
    if (authState) setAuth(authState);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const PrivateRoute = ({ auth, component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => (auth ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />)}
      />
    );
  };

  const PrivateLogin = ({ auth, component: Component, ...rest }) => {
    return (
      <Route {...rest} render={(props) => (!auth ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />)} />
    );
  };

  const Routes = () => {
    const Auth = React.useContext(AuthContext);

    return (
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} auth={Auth.auth} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} auth={Auth.auth} />
        <PrivateLogin exact path="/login" component={Login} auth={Auth.auth} />
        {/* <Route exact component={NotFound} /> */}
      </Switch>
    );
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300&display=swap" rel="stylesheet" />
        <Routes />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

import React from 'react'
import {Route, Redirect } from 'react-router-dom'
export const Auth = {
    isAuthenticated: window.localStorage.getItem('token') ? true : false,
    authenticate(cb) {
      Auth.isAuthenticated = true;
      setTimeout(cb, 100);
    },
    signout(cb) {
      Auth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

  export function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          Auth.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  
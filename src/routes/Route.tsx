import React from 'react';
import { RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import Layout from '../components/Layout';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (user && isPrivate) {
          return (
            <>
              <Layout>
                <Component />
              </Layout>
            </>
          );
        }

        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/home',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;

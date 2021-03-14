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
  const role = (user?.permission === 'PROVIDER');

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (user && isPrivate && role) {
          return (
            <>
              <Layout>
                <Component />
              </Layout>
            </>
          );
        }

        return isPrivate === !!user && role ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;

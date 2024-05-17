import { Redirect } from "react-router-dom";
import { Route } from 'react-router-dom';

function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route {...rest} render={(props) => (
      auth ? <Component {...props} />
    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
  );
}

export default PrivateRoute;
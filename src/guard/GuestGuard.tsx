import { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../helper/userToken';

const GuestGuard: FunctionComponent<PropsWithChildren<unknown>> = ({ children }) => {
  const userToken = getToken();

  if (!userToken || userToken === '') {
    return children as ReactElement;
  }

  return <Navigate to="/dashboard"/>;

};

export default GuestGuard;

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { withRouter } from 'react-router-dom';

const Autorize = ({
  login,
  children,
  toggleIsOpenLogin,
  history: { push },
}) => {

  const renderAutorize = () => {
    if(login || window.localStorage.getItem('token')) {
      return children;
    } else {
      toggleIsOpenLogin(true);
      push('/');
      return null;
    }
  }

  return renderAutorize();
};

export default withRouter(Autorize)

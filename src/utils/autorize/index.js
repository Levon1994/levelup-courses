import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { toggleIsOpenLogin } from 'actions';

const mapStateToProps = ({ login }) => ({ login });

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

export default connect(mapStateToProps, {
  toggleIsOpenLogin,
})(withRouter(Autorize));

import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  Paper,
  Modal,
  Button,
  TextField,
  BusyLoader,
} from 'components';

import { loginToAdmin } from 'actions';
import { useTranslator } from 'utils/translator';

import logo from 'assets/levelup-logo.svg';

import './style.scss';

const mapStateToProps = ({ login }) => ({ login });

const Login = ({
  login,
  loginToAdmin,
}) => {

  const { t } = useTranslator();

  const [filter, setFilter] = useState({ email: null, password: null });
  const [isBusy, setIsBusy] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFilter({ ...filter , [name]: value  });
  };

  const onSave = () => {
    setIsBusy(true);
    loginToAdmin(filter);
  };

  return (
    <Modal className="Login" forLogin>
      <BusyLoader isBusy={isBusy}>
        <Paper className="image-block" flexName="flexible jCenter">
          <img src={logo} alt="" />
        </Paper>
        <Paper className="autorize-block" flexName="flexible vertical aCenter">
          <TextField
            name="email"
            label={t('_Username_')}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label={t('_Password_')}
            onChange={handleChange}
            type="password"
          />
          <Paper flexName="flexible jBetween" className="buttons-block">
            <Button bgColor="orange" onClick={onSave}>
              {t('_SignIn_')}
            </Button>
          </Paper>
        </Paper>
      </BusyLoader>
    </Modal>
  )
};

export default connect(mapStateToProps, {
  loginToAdmin
})(Login);

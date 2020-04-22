import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { connect } from 'react-redux';

import {
  Icon,
  Text,
  Paper,
  Button,
  TextField,
  BusyLoader,
} from 'components';

import { passwordReset } from 'actions';

import './style.scss';

const mapStateToProps = ({ darkMode }) => ({ darkMode });

const PasswordReset = ({
  darkMode,
  passwordReset,
}) => {
  const { key } = useParams();
  const { push } = useHistory();
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [filter, setFilter] = useState({ password: '', password_confirmation: '' });
  const [success, setSuccess] = useState(false);
  const { password, password_confirmation } = filter;

  const handleChange = ({ target: { name, value } }) => {
    setFilter({ ...filter , [name]: value  });
  };

  useEffect(() => {
    const valid = password.length && password_confirmation.length && (password === password_confirmation);
    setIsValid(valid);
  }, [password, password_confirmation]);

  const onPassSave = () => {
    setIsBusy(true);
    passwordReset({ ...filter, key }).then((res) => {
      if (res.status > 209) {
        setError(true);
        setIsBusy(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          push('/');
        }, 2000);
      }
    })
  }

  return (
    <section className="PasswordReset">
      <h1><Text className="doubleExtraLarge" darkMode={darkMode}>Reset Password</Text></h1>
      {
        !success
        ?  <Paper className="PasswordReset_body" >
            <BusyLoader isBusy={isBusy} className="flexible vertical aCenter">
              {error && <Text className="errorText">Error*</Text>}
              <TextField
                name="password"
                darkMode={darkMode}
                placeholder="New Password"
                onChange={handleChange}
                type="password"
                autoComplete="off"
                value={password}
              />
              <TextField
                name="password_confirmation"
                darkMode={darkMode}
                placeholder="Confirm New Password"
                onChange={handleChange}
                type="password"
                autoComplete="off"
                value={password_confirmation}
              />
              <Button disabled={!isValid} onClick={onPassSave}>
                Reset Password
              </Button>
            </BusyLoader>
          </Paper>
        : <Paper className="success" flexName="flexible vertical aCenter">
            <Text darkMode={darkMode}>Congrats!!!</Text>
            <Icon className="icon-feather-check-circle"/>
            <Text darkMode={darkMode}>Your password changed successfully!</Text>
          </Paper>
      }
    </section>
  )
};

export default connect(mapStateToProps, {
  passwordReset,
})(PasswordReset);

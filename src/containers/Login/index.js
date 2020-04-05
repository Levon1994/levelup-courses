import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  Icon,
  Paper,
  Modal,
  Button,
  TextField,
  BusyLoader,
} from 'components';

import { loginToAdmin, toggleIsOpenLogin } from 'actions';
import { useTranslator } from 'utils/translator';

import './style.scss';

const mapStateToProps = ({ login }) => ({ login });

const Login = ({
  login,
  loginToAdmin,
  toggleIsOpenLogin,
}) => {

  const { t } = useTranslator();

  const [filter, setFilter] = useState({ email: null, password: null });
  const [isLoign, setIsLogin] = useState(true);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if(login) {
      window.localStorage.setItem('token', login.data.token);
      toggleIsOpenLogin(false);
    }
  },[login, toggleIsOpenLogin]);

  const handleChange = ({ target: { name, value } }) => {
    setFilter({ ...filter , [name]: value  });
  };

  const onSave = () => {
    setIsBusy(true);
    loginToAdmin(filter);
  };

  const onToggleIsLogin = () => setIsLogin(!isLoign);

  return (
    <Modal className="Login" forLogin closeModal={() => toggleIsOpenLogin(false)}>
      <BusyLoader isBusy={isBusy}>
        <Paper className="image-block" flexName="flexible vertical aCenter">
          {
            isLoign
            ? <Text>{t('_LoginInTo_')}</Text>
            : <Text>{t('_SignUpAnd_')}</Text>
          }
        </Paper>
        <Paper className="autorize-block" flexName="flexible vertical aCenter">
          {
            isLoign
            ? <>
                <Button className="fb-button share-button flexible aCenter jCenter" onClick={onSave}>
                  {t('_SignInWith_')}
                  <Icon fill="#fff" width="30" name="facebook" />
                </Button>
                <Button className="google-button share-button flexible aCenter jCenter" onClick={onSave}>
                  {t('_SignInWith_')}
                  <Icon width="34" height="34" name="gmail" />
                </Button>
                <TextField
                  name="email"
                  placeholder={t('_Username_')}
                  onChange={handleChange}
                />
                <TextField
                  name="password"
                  placeholder={t('_Password_')}
                  onChange={handleChange}
                  type="password"
                />
              </>
            : <>
                <TextField
                  name="first_name"
                  placeholder={t('_FirstName_')}
                  onChange={handleChange}
                />
                <TextField
                  name="last_name"
                  placeholder={t('_LastName_')}
                  onChange={handleChange}
                />
                <TextField
                  name="email"
                  placeholder={t('_Username_')}
                  onChange={handleChange}
                />
                <TextField
                  name="password"
                  placeholder={t('_Password_')}
                  onChange={handleChange}
                  type="password"
                />
              </>
          }
          <Paper flexName="flexible vertical aCenter jCenter" className="buttons-block">
            <Button bgColor="orange" onClick={onSave}>
              {isLoign ? t('_SignIn_') : t('_SignUp_')}
            </Button>
            {
              isLoign
              ? <Text>
                  {t('_DontHaveAccount_')}
                  <Text className="signup-btn" onClick={onToggleIsLogin}>{t('_SignUp_')}</Text>
                </Text>
              : <Text>
                {t('_AlreadyHaveAccount_')}
                <Text className="signup-btn" onClick={onToggleIsLogin}>{t('_SignIn_')}</Text>
              </Text>
            }
          </Paper>
        </Paper>
      </BusyLoader>
    </Modal>
  )
};

export default connect(mapStateToProps, {
  loginToAdmin,
  toggleIsOpenLogin,
})(Login);

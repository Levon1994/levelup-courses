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

import {
  loginAsUser,
  registerAsUser,
  toggleIsOpenLogin,
} from 'actions';
import { useTranslator } from 'utils/translator';

import './style.scss';

const defaultData = {
  singIn: {
    email: '',
    password: '',
  },
  signUp: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  },
};

const mapStateToProps = ({ login }) => ({ login });

const Login = ({
  login,
  loginAsUser,
  registerAsUser,
  toggleIsOpenLogin,
}) => {

  const { t } = useTranslator();

  const [filter, setFilter] = useState({ ...defaultData.singIn });
  const [isLogin, setIsLogin] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if(login && login.status < 209) {
      window.localStorage.setItem('token', login.data.token);
      toggleIsOpenLogin(false);
    } else if(login) {
      setIsBusy(false);
      setHasError(true);
    }
  },[login, toggleIsOpenLogin]);

  useEffect(() => {
    const { email, password } = filter;

    const valid = email.length && password.length;

    setIsValid(valid);
  }, [filter]);

  const handleChange = ({ target: { name, value } }) => {
    setFilter({ ...filter , [name]: value  });
  };

  const onSetRegister = ({ token }) => {
    setIsRegistered(true);
    setTimeout(() => {
      window.localStorage.setItem('token', token);
      toggleIsOpenLogin(false);
    }, 2000);
  };

  const onSave = () => {
    if(isLogin) {
      setIsBusy(true);
      loginAsUser(filter);
    } else {
      setIsBusy(true);
      registerAsUser(filter).then(res => {
        setIsBusy(false);
        if(res.status > 209){
          setHasError(true);
        } else {
          onSetRegister(res.data);
        }
      });
    }
  };

  return (
    <Modal className="Login" forLogin closeModal={() => toggleIsOpenLogin(false)}>
      <BusyLoader isBusy={isBusy}>
        <Paper className="image-block" flexName="flexible vertical aCenter">
          {
            isRegistered
            ? <Text>{t('_Congrats_')}</Text>
            : (isLogin
            ? <Text>{t('_LoginInTo_')}</Text>
            : <Text>{t('_SignUpAnd_')}</Text>)
          }
        </Paper>
        <Paper className="autorize-block" flexName="flexible vertical aCenter">
          {
            isLogin
            ? <>
                <Button className="fb-button share-button flexible aCenter jCenter" onClick={onSave}>
                  {t('_SignInWith_')}
                  <Icon fill="#fff" width="30" name="facebook" />
                </Button>
                <Button className="google-button share-button flexible aCenter jCenter" onClick={onSave}>
                  {t('_SignInWith_')}
                  <Icon width="34" height="34" name="gmail" />
                </Button>
                {hasError && <Text className="errorText">Wrong Email or Password*</Text>}
                <TextField
                  name="email"
                  placeholder={t('_Username_')}
                  onChange={handleChange}
                  value={filter.email}
                  type="email"
                />
                <TextField
                  name="password"
                  placeholder={t('_Password_')}
                  onChange={handleChange}
                  type="password"
                  value={filter.password}
                />
              </>
            : <>
                {isRegistered &&
                  <Paper className="isRegistered" flexName="flexible vertical aCenter">
                    <Text>Your account created successfully!</Text>
                    <Icon className="icon-feather-check-circle" />
                  </Paper>
                }
                {!isRegistered &&
                  <>
                    {hasError && <Text className="errorText">Email already exist!</Text>}
                    <TextField
                      name="first_name"
                      placeholder={t('_FirstName_')}
                      onChange={handleChange}
                      value={filter.first_name}
                    />
                    <TextField
                      name="last_name"
                      placeholder={t('_LastName_')}
                      onChange={handleChange}
                      value={filter.last_name}
                    />
                    <TextField
                      name="email"
                      placeholder={t('_Username_')}
                      onChange={handleChange}
                      value={filter.email}
                      type="email"
                    />
                    <TextField
                      name="password"
                      placeholder={t('_Password_')}
                      onChange={handleChange}
                      type="password"
                      value={filter.password}
                    />
                  </>
                }
              </>
          }
          <Paper flexName="flexible vertical aCenter jCenter" className="buttons-block">
            {(!isRegistered || isLogin) &&
              <Button bgColor="orange" onClick={onSave} disabled={!isValid}>
                {isLogin ? t('_SignIn_') : t('_SignUp_')}
              </Button>
            }
            {
              isLogin
              ? <Text>
                  {t('_DontHaveAccount_')}
                  <Text
                    className="signup-btn"
                    onClick={() => {
                      setFilter(defaultData.signUp)
                      setIsLogin(!isLogin);
                    }}
                  >{t('_SignUp_')}</Text>
                </Text>
              : <>
                  {!isRegistered &&
                    <Text>
                      {t('_AlreadyHaveAccount_')}
                      <Text
                        className="signup-btn"
                        onClick={() => {
                          setFilter(defaultData.singIn)
                          setIsLogin(!isLogin);
                        }}
                      >{t('_SignIn_')}</Text>
                    </Text>
                  }
                </>
            }
          </Paper>
        </Paper>
      </BusyLoader>
    </Modal>
  )
};

export default connect(mapStateToProps, {
  loginAsUser,
  registerAsUser,
  toggleIsOpenLogin,
})(Login);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

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
  signInGoogle,
  signInFacebook,
  registerAsUser,
  forgotPassword,
  toggleIsOpenLogin,
} from 'actions';
import { isMobile } from 'utils';
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

const validateEmail = (email) => {
    // eslint-disable-next-line no-unused-vars
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const mapStateToProps = ({ login }) => ({ login });

const Login = ({
  login,
  loginAsUser,
  signInGoogle,
  signInFacebook,
  registerAsUser,
  forgotPassword,
  toggleIsOpenLogin,
  location: { pathname },
  history: { push }
}) => {

  const mobile = isMobile();

  const { t } = useTranslator();

  const [filter, setFilter] = useState({ ...defaultData.singIn });
  const [isLogin, setIsLogin] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [fbData, setFbData] = useState();
  const [googleData, setGoogleData] = useState();
  const [isForgotPassword, setIsForgotPassword] = useState();
  const [forgotedUsername, setForgotedUsername] = useState({ email: '' });
  const [isValidForgot, setIsValidForgot] = useState();
  const [checkEmail, setCheckEmail] = useState(false);

  useEffect(() => {
    if(login && login.status < 209) {
      window.localStorage.setItem('token', login.data.token);
      toggleIsOpenLogin(false);
    } else if(login) {
      setIsBusy(false);
    }
  },[login, toggleIsOpenLogin]);

  useEffect(() => {
    const valid = forgotedUsername.email.length && validateEmail(forgotedUsername.email);
    setIsValidForgot(valid);
  },[forgotedUsername])

  useEffect(() => {
    if (fbData) {
      setIsBusy(true);
      signInFacebook({
        fbId: fbData.id,
        accessToken: fbData.accessToken,
        fbEmail: fbData.email,
      }).then(res => {
        if (res.status > 209) {
          setHasError(res.message);
          setIsBusy(false);
        }
      })
    }
  },[fbData, signInFacebook]);

  useEffect(() => {
    if (googleData) {
      setIsBusy(true);
      signInGoogle({
        googleId: googleData.googleId,
        accessToken: googleData.accessToken,
        googleEmail: googleData.profileObj.email,
      }).then(res => {
        if (res.status > 209) {
          setHasError(res.message);
          setIsBusy(false);
        }
      })
    }
  },[googleData, signInGoogle]);

  useEffect(() => {
    const { email, password } = filter;

    const valid = email.length && password.length && validateEmail(email);

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
      loginAsUser(filter).then((res) => {
        if(res.status > 209) {
          console.log('res.message', res.message);
          setHasError(res.message);
        } else {
          push(pathname);
        }
      });
    } else {
      setIsBusy(true);
      registerAsUser(filter).then(res => {
        setIsBusy(false);
        if(res.status > 209){
          setHasError(res.message);
        } else {
          onSetRegister(res.data);
        }
      });
    }
  };

  const handleForgotChange = ({ target: { name, value } }) => {
    setHasError(null);
    setForgotedUsername({ [name]: value });
  };

  const onSendForgotPass = () => {
    setIsBusy(true);
    forgotPassword(forgotedUsername).then(res => {
      if (res.status > 209) {
        setHasError(res.message);
        setIsBusy(false);
      } else {
        setIsBusy(false);
        setCheckEmail(true);
        setTimeout(() => {
          toggleIsOpenLogin(false);
        }, 2000);
      }
    });
  };
  
  return (
    <Modal className={classnames('Login', { 'isMobile': mobile })} forLogin closeModal={() => toggleIsOpenLogin(false)}>
      <BusyLoader isBusy={isBusy}>
        {
          !checkEmail
          ? <>
              <Paper className="image-block" flexName="flexible vertical aCenter">
                {
                  !isForgotPassword
                  ? (
                      isRegistered
                      ? <Text>{t('_Congrats_')}</Text>
                      : (isLogin
                      ? <Text>{t('_LoginInTo_')}</Text>
                      : <Text>{t('_SignUpAnd_')}</Text>)
                    )
                  : <Text>Please Enter Your Email</Text>
                }
              </Paper>
              <Paper className="autorize-block" flexName="flexible vertical aCenter">
                {
                  !isForgotPassword
                  ? (
                    isLogin
                    ? <>
                        <Text>{t('_SignInWith_')}</Text>
                        <Paper flexName="flexible vertical social-block">
                          <FacebookLogin
                            appId="215785303050748"
                            fields="name,email,picture"
                            redirectUri={`${window.location.href}/profile`}
                            callback={setFbData}
                            render={renderProps => (
                              <Button onClick={renderProps.onClick} className="fb-button share-button flexible aCenter jCenter">
                                {!mobile && t('_SignInWith_')}
                                <Icon fill="#fff" width="30" name="facebook" />
                              </Button>
                            )}
                          />
                          <GoogleLogin
                            clientId="140089550919-q3q658sq5ud11qp2dfjm6epmo2a7m7a5.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={setGoogleData}
                            onFailure={console.log}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                              <Button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-button share-button flexible aCenter jCenter">
                                {!mobile && t('_SignInWith_')}
                                <Icon width="34" height="34" name="gmail" />
                              </Button>
                            )}
                          />
                        </Paper>
                        {hasError && <Text className="errorText">{hasError}</Text>}
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
                        <Text className="forgot-pass"
                          onClick={() => {
                            setIsForgotPassword(!isForgotPassword);
                            setHasError(null);
                          }}>
                          Forgot password?
                        </Text>
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
                            {hasError && <Text className="errorText">{hasError}</Text>}
                            <TextField
                              name="first_name"
                              placeholder={t('_FirstName_')}
                              autoComplete="off"
                              onChange={handleChange}
                              value={filter.first_name}
                            />
                            <TextField
                              name="last_name"
                              autoComplete="off"
                              placeholder={t('_LastName_')}
                              onChange={handleChange}
                              value={filter.last_name}
                            />
                            <TextField
                              name="email"
                              autoComplete="off"
                              placeholder={t('_Username_')}
                              onChange={handleChange}
                              value={filter.email}
                              type="email"
                            />
                            <TextField
                              name="password"
                              autoComplete="off"
                              placeholder={t('_Password_')}
                              onChange={handleChange}
                              type="password"
                              value={filter.password}
                            />
                          </>
                        }
                      </>
                    )
                  : <>
                      {hasError && <Text className="errorText">{hasError}</Text>}
                      <TextField
                        name="email"
                        autoComplete="off"
                        placeholder="Email"
                        onChange={handleForgotChange}
                        value={forgotedUsername.email}
                        type="email"
                      />
                    </>
                }
                <Paper flexName="flexible vertical aCenter jCenter" className="buttons-block">
                  {
                    !isForgotPassword
                    ? (
                        (!isRegistered || isLogin) &&
                          <Button bgColor="orange" onClick={onSave} disabled={!isValid}>
                            {isLogin ? t('_SignIn_') : t('_SignUp_')}
                          </Button>
                      )
                    : <Button bgColor="orange" onClick={onSendForgotPass} disabled={!isValidForgot}>
                        Submit
                      </Button>
                  }
                  {
                    !isForgotPassword && (
                      isLogin
                      ? <Text>
                          {t('_DontHaveAccount_')}
                          <Text
                            className="signup-btn"
                            onClick={() => {
                              setFilter(defaultData.signUp)
                              setIsLogin(!isLogin);
                              setHasError(null);
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
                                  setHasError(null);
                                }}
                              >{t('_SignIn_')}</Text>
                            </Text>
                          }
                        </>
                    )
                  }
                </Paper>
              </Paper>
            </>
          : <Paper className="check-email" flexName="flexible vertical aCenter">
              <Text>Please check your Email</Text>
              <Icon className="icon-feather-mail" />
            </Paper>
        }
      </BusyLoader>
    </Modal>
  )
};

export default connect(mapStateToProps, {
  loginAsUser,
  signInGoogle,
  registerAsUser,
  forgotPassword,
  signInFacebook,
  toggleIsOpenLogin,
})(withRouter(Login));

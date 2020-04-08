import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import {
  Icon,
  Text,
  Paper,
  Button,
  TextField,
  BusyLoader,
  ImageUploader,
  DarkModeButton,
} from 'components';

import {
  fetchProfile,
  updateProfile,
  toggleDarkMode,
} from 'actions';
import { isMobile } from 'utils';
import { useTranslator } from 'utils/translator';

import { defaultFilter } from './defaultFilter';

import './style.scss';

const mapStateToProps = ({ darkMode, user }) => ({ darkMode, user });

const Profile = ({
  toggleDarkMode,
  updateProfile,
  fetchProfile,
  darkMode,
  user,
}) => {
  const { t } = useTranslator();

  const [isBusy, setIsBusy] = useState();
  const [filter, setFilter] = useState({ ...defaultFilter, ...(user && user.data) });

  useEffect(() => {
    if(user) {
      const newFilter = {...filter, ...user.data};
      setFilter(newFilter);
    };
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setFilter({ ...filter , [name]: value  });
  };

  const onSave = () => {
    setIsBusy(true);
    updateProfile({
      first_name: filter.first_name,
      last_name: filter.last_name,
    }).then((res) => {
      if(res){
        fetchProfile();
        setIsBusy(false);
      }
    });
  };

  const onLogOut = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <section className={classnames('Profile', { 'isMobile': isMobile(), 'darkMode': darkMode })}>
      <h1 className="flexible jBetween aCenter">
        <Text className="doubleExtraLarge" darkMode={darkMode}>My {isMobile() ? 'Account' : 'Profile'}</Text>
        <Icon className="icon-feather-log-out"  onClick={onLogOut}/>
      </h1>
      <Paper className={classnames('page-content', { 'darkMode': darkMode })} flexName="flexible">
        <Paper className="image-block" flexName="flexible vertical aCenter">
          <ImageUploader
            size={isMobile() ? 80 : 150}
            onChange={console.log}
          />
          <Text className="large" darkMode={darkMode}>{user && user.data && `${user.data.first_name || ''} ${user.data.last_name || ''}`}</Text>
          <Text className="large" darkMode={darkMode}>{user && user.data && user.data.email}</Text>
        </Paper>
        {isMobile() &&
          <Paper flexName="flexible aCenter" className="darkMode-button">
            <Text darkMode={darkMode}>Dark Mode</Text>
            <DarkModeButton
              active={darkMode}
              onClick={toggleDarkMode}
              isMobile={isMobile()}
            />
          </Paper>
        }
        <BusyLoader isBusy={isBusy}>
          <Paper className="info-block" flexName="flexible vertical aCenter">
            <TextField
              name="first_name"
              darkMode={darkMode}
              placeholder={t('_FirstName_')}
              onChange={handleChange}
              value={filter.first_name}
            />
            <TextField
              name="last_name"
              darkMode={darkMode}
              placeholder={t('_LastName_')}
              onChange={handleChange}
              value={filter.last_name}
            />
            <TextField
              name="email"
              darkMode={darkMode}
              placeholder={t('_Username_')}
              onChange={handleChange}
              value={filter.email}
            />
            <TextField
              name="password"
              darkMode={darkMode}
              placeholder={t('_Password_')}
              onChange={handleChange}
              type="password"
              value={filter.password}
            />
            <Button onClick={onSave}>
              Update Profile
            </Button>
          </Paper>
        </BusyLoader>
      </Paper>
    </section>
  )
};

export default connect(mapStateToProps, {
  fetchProfile,
  updateProfile,
  toggleDarkMode,
})(Profile);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  Paper,
  Button,
  TextField,
  BusyLoader,
  ImageUploader,
} from 'components';

import {
  fetchProfile,
  updateProfile,
} from 'actions';
import { useTranslator } from 'utils/translator';

import { defaultFilter } from './defaultFilter';

import './style.scss';

const mapStateToProps = ({ darkMode, user }) => ({ darkMode, user });

const Profile = ({
  updateProfile,
  fetchProfile,
  darkMode,
  user,
}) => {
  const { t } = useTranslator();

  const [isBusy, setIsBusy] = useState();
  const [filter, setFilter] = useState(defaultFilter);

  useEffect(() => {
    if(user) {
      setFilter({
        ...filter,
        ...user.data,
      })
    }
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

  return (
    <section className="Profile">
      <h1><Text className="doubleExtraLarge" darkMode={darkMode}>My Profile</Text></h1>
      <Paper className="page-content" flexName="flexible">
        <Paper className="image-block" flexName="flexible vertical aCenter">
          <ImageUploader
            size={150}
            onChange={console.log}
          />
          <Text className="large" darkMode={darkMode}>{user && user.data && `${user.data.first_name || ''} ${user.data.last_name || ''}`}</Text>
          <Text className="large" darkMode={darkMode}>{user && user.data && user.data.email}</Text>
        </Paper>
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
})(Profile);

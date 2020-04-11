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
  uploadImage,
  fetchProfile,
  updateProfile,
  deleteProfile,
  toggleDarkMode,
  updatePassword,
} from 'actions';
import { isMobile } from 'utils';
import { useTranslator } from 'utils/translator';

import { defaultFilter, defaultPassFilter } from './defaultFilter';

import './style.scss';

const mapStateToProps = ({ darkMode, user }) => ({ darkMode, user });

const Profile = ({
  updatePassword,
  toggleDarkMode,
  deleteProfile,
  updateProfile,
  fetchProfile,
  uploadImage,
  darkMode,
  user,
}) => {
  const { t } = useTranslator();

  const [file, setFile] = useState();
  const [isBusy, setIsBusy] = useState();
  const [isValid, setIsValid] = useState(false);
  const [filter, setFilter] = useState({ ...defaultFilter, ...(user && user.data) });
  const [passfilter, setPassFilter] = useState({ ...defaultPassFilter });
  const [isUpload, setIsUpload] = useState(filter.image_url ? true : false);

  useEffect(() => {
    if(user) {
      const newFilter = {...filter, ...user.data};
      setFilter(newFilter);
    };
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setFilter({ ...filter , [name]: value  });
  };

  const handlePassChange = ({ target: { name, value } }) => {
    setPassFilter({ ...passfilter , [name]: value  });
  };

  useEffect(() => {
    const { new_password, current_password, new_password_confirmation } = passfilter;

    const valid = current_password.length && (new_password === new_password_confirmation);
    setIsValid(valid);
  }, [passfilter]);

  const onSave = () => {
    setIsBusy(true);
    updateProfile({
      image_url: file,
      first_name: filter.first_name,
      last_name: filter.last_name,
    }).then((res) => {
      if(res){
        fetchProfile();
        setIsBusy(false);
      }
    });
  };

  const onPassSave = () => {
    setIsBusy(true);
    updatePassword(passfilter).then((res) => {
      if(res){
        fetchProfile();
        setIsBusy(false);
      }
    });
  };

  const onDeleteProfile = () => {
    deleteProfile().then(res => {
      console.log(res);
      window.localStorage.clear();
      window.location.reload();
    })
  };

  const onLogOut = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const onUpload = image => {
    let formData = new FormData();
    formData.append('file', image, image.name);

    uploadImage(formData).then(res => {
      setFile(res.data);
      setIsUpload(true);
    });
  };

  return (
    <section className={classnames('Profile', { 'isMobile': isMobile(), 'darkMode': darkMode })}>
      <h1 className={isMobile() ? 'flexible jBetween aCenter' : ''}>
        <Text className="doubleExtraLarge" darkMode={darkMode}>My {isMobile() ? 'Account' : 'Profile'}</Text>
        {isMobile() && <Icon className="icon-feather-log-out"  onClick={onLogOut}/>}
      </h1>
      <Paper className={classnames('page-content', { 'darkMode': darkMode })} flexName="flexible">
        <Paper className="image-block" flexName="flexible vertical aCenter">
          <ImageUploader
            size={isMobile() ? 80 : 150}
            onChange={onUpload}
            value={filter.image_url}
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
            <Button onClick={onSave}>
              Update Profile
            </Button>
            <TextField
              name="current_password"
              darkMode={darkMode}
              placeholder="Current Password"
              onChange={handlePassChange}
              type="password"
              value={passfilter.current_password}
            />
            <TextField
              name="new_password"
              darkMode={darkMode}
              placeholder="New Password"
              onChange={handlePassChange}
              type="password"
              value={passfilter.new_password}
            />
            <TextField
              name="new_password_confirmation"
              darkMode={darkMode}
              placeholder="Confirm New Password"
              onChange={handlePassChange}
              type="password"
              value={passfilter.new_password_confirmation}
            />
            <Button disabled={!isValid} onClick={onPassSave}>
              Reset Password
            </Button>
          </Paper>
        </BusyLoader>
      </Paper>
      <Paper className="delete-account" flexName="flexible jCenter">
        <Button className="orange" onClick={onDeleteProfile}>
          <Icon className="icon-feather-trash-2" />
          Delete Profile
        </Button>
      </Paper>
    </section>
  )
};

export default connect(mapStateToProps, {
  uploadImage,
  fetchProfile,
  updateProfile,
  deleteProfile,
  toggleDarkMode,
  updatePassword,
})(Profile);

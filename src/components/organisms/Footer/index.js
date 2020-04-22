import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import {
  Icon,
  Paper,
  Image,
} from 'components';

import { useTranslator } from 'utils/translator';

import logo from 'assets/levelup-logo.svg';

import './style.scss';

const mapStateToProps = ({ darkMode }) => ({ darkMode });

const Footer = ({ darkMode }) => {

  const { t } = useTranslator();

  return (
    <footer className={classnames('Footer', { 'darkMode': darkMode })}>
      <Paper className="page-content">
        <Paper className="Footer_logo">
          <NavLink to="/">
            <Image
              src={logo}
              width={211}
              height={58}
              alt="Level Up IT Center"
            />
          </NavLink>
        </Paper>
        <Paper flexName="flexible jBetween wrap" className="Footer_body">
          <ul className="info-block flexible jBetween vertical">
            <li className="flexible aCenter">
              <Icon name="mapsAndFlags" />
              <span>
                Hakob Hakobyan 3/2
                <br/>
                Yerevan,Armenia
              </span>
            </li>
            <li className="flexible aCenter">
              <Icon name="phone" />
              <span>+374 44 55 00 85</span>
            </li>
            <li className="flexible aCenter">
              <Icon name="envelope" />
              <span>leveluparmenia@gmail.com</span>
            </li>
          </ul>
          <Paper flexName="flexible" className="page-block">
            <ul>
              <li><a rel="noopener noreferrer" target="_blank" href="https://levelup.am/">{t('_Company_')}</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://levelup.am/academy">{t('_Courses_')}</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://levelup.am/about-us">{t('_AboutUs_')}</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://levelup.am/careers">{t('_Carrers_')}</a></li>
            </ul>
            <ul>
              <li><a rel="noopener noreferrer" target="_blank" href="https://levelup.am/contact-us">{t('_ContactUs_')}</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://levelup.am/blog">{t('_Blog_')}</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://levelup.am/academy">{t('_Academy_')}</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://levelup.am/services">{t('_Services_')}</a></li>
            </ul>
          </Paper>
          <Paper flexName="flexible vertical aEnd" className="subscribe-block">
            <Paper flexName="flexible aCenter jCenter" className="social-block">
              <a
                href="https://www.facebook.com/levelupItcenterarmenia/"
                target="_blank"
                rel="noopener noreferrer">
                <Icon name="facebook" />
              </a>
              <a
                href="https://www.instagram.com/levelup2018armenia/"
                target="_blank"
                rel="noopener noreferrer">
                <Icon name="instagram" />
              </a>
              <a
                href="https://www.linkedin.com/company/levelup-it-center-llc/"
                target="_blank"
                rel="noopener noreferrer">
                <Icon name='linkedin' />
              </a>
            </Paper>
          </Paper>
        </Paper>
        <Paper flexName="flexible jEnd" className="Footer_text">
          ©2019 Level Up IT Center
        </Paper>
      </Paper>
    </footer>
  )
};

export default connect(mapStateToProps, null)(Footer);

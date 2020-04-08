import React from 'react';
import { connect } from 'react-redux';

import {
  Text,
} from 'components';

import './style.scss';

const mapStateToProps = ({ darkMode }) => ({ darkMode });

const Search = ({ darkMode }) => {
  return (
    <section className="Search">
      <h1><Text className="doubleExtraLarge" darkMode={darkMode}>Search Course</Text></h1>
    </section>
  )
};

export default connect(mapStateToProps, null)(Search);

import React from 'react';
import PropTypes from 'prop-types';
import { ModifyGuestsContainer } from '../../../containers';

const ModifyGuests = ({ navigation }) => {
  return (
    <ModifyGuestsContainer navigation={navigation} routeName="ModifyGuests" />
  );
};

ModifyGuests.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default ModifyGuests;

import React from 'react';
import PropTypes from 'prop-types';
import { CancelReservationContainer } from '../../../containers';

const CancelReservation = ({ navigation }) => {
  console.log('navigation', navigation);
  return (
    <CancelReservationContainer
      navigation={navigation}
      routeName="CancelReservation"
    />
  );
};

CancelReservation.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default CancelReservation;

import React from 'react';
import PropTypes from 'prop-types';
import { EventReservationDetailsContainer } from '../../../containers';

const EventReservationDetails = ({ navigation }) => {
  return (
    <EventReservationDetailsContainer
      navigation={navigation}
      routeName="EventReservationDetails"
    />
  );
};

EventReservationDetails.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default EventReservationDetails;

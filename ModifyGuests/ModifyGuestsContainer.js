import React, { PureComponent } from 'react';
import {
  fetchEventAndReservationDetails,
  updateReservationRequest,
  removeGuestFromPlusOnes
} from '../../store/actions';
import { ModifyGuestsCard } from '../../components/organisms';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { enhanceContainer } from '../../hocs';
import { Spinner } from '../../components/atoms';
import styled from 'styled-components/native';

import { Alert } from 'react-native';

const Centered = styled.View`
  justify-content: center;
  align-items: center;
  height: 72%;
`;

class ModifyGuestsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { eventId } = this.props.navParams;
    await this.props.fetchEventAndReservationDetails(eventId);
    this.setState({ loading: false });
  }

  //update in redux state
  updatePlusOnes = async (rsvpId, guestId) => {
    await this.props.removeGuestFromPlusOnes(rsvpId, guestId);
    Alert.alert('add guest from contacts clicked');
  };

  //PATCH to api
  updatePlusOnesRequest = async rsvpId => {
    //need to make a thunk
    await this.props.updateReservationRequest(rsvpId);
    this.props.navigate('EventList');
  };

  render() {
    const { navigate, reservation } = this.props;
    if (this.state.loading) {
      return (
        <Centered>
          <Spinner />
        </Centered>
      );
    }

    return (
      <ModifyGuestsCard
        navigate={this.props.navigate}
        reservation={reservation}
        removeGuestFromPlusOnes={this.removeGuestFromPlusOnes}
        updatePlusOnesRequest={this.updatePlusOnesRequest}
      />
    );
  }
}

ModifyGuestsContainer.propTypes = {
  navParams: PropTypes.object,
  navigate: PropTypes.func,
  fetchEventAndReservationDetails: PropTypes.func
};

function mapStateToProps({ reservation }) {
  return {
    reservation
  };
}

export default enhanceContainer(
  connect(
    mapStateToProps,
    {
      fetchEventAndReservationDetails,
      updateReservationRequest,
      removeGuestFromPlusOnes
    }
  )(ModifyGuestsContainer)
);

import React, { PureComponent } from 'react';
import {
  fetchEventAndReservationDetails,
  deleteReservationRequest
} from '../../store/actions';
import { CancelReservationCard } from '../../components/organisms';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { enhanceContainer } from '../../hocs';
import { Spinner } from '../../components/atoms';
import styled from 'styled-components/native';

const Centered = styled.View`
  justify-content: center;
  align-items: center;
  height: 72%;
`;

class CancelReservationContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { eventId } = this.props.navParams;
    console.log('entering componentDidMount of CancelReservationContainer');
    await this.props.fetchEventAndReservationDetails(eventId);
    this.setState({ loading: false });
  }

  deleteRsvp = async rsvpId => {
    await this.props.deleteReservationRequest(rsvpId);
    this.props.navigate('EventList');
  };

  render() {
    console.log('entering render of CancelReservationContainer');
    const { reservation, navigate } = this.props;
    if (this.state.loading) {
      return (
        <Centered>
          <Spinner />
        </Centered>
      );
    }

    return (
      <CancelReservationCard
        navigate={navigate}
        reservation={reservation}
        deleteRsvp={this.deleteRsvp}
      />
    );
    // goBack={goBack}
  }
}

CancelReservationContainer.propTypes = {
  fetchEventAndReservationDetails: PropTypes.func,
  navParams: PropTypes.object,
  navigate: PropTypes.func
};

function mapStateToProps({ reservation }) {
  return {
    reservation
  };
}

export default enhanceContainer(
  connect(mapStateToProps, {
    fetchEventAndReservationDetails,
    deleteReservationRequest
  })(CancelReservationContainer)
);

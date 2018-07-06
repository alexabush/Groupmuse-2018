import React, { PureComponent } from 'react';
import { fetchEventAndReservationDetails } from '../../store/actions';
import { EventReservationDetailsCard } from '../../components/organisms';
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

class EventReservationDetailsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { id } = this.props.navParams;
    await this.props.fetchEventAndReservationDetails(id);
    this.setState({ loading: false });
  }

  render() {
    const { navigate, reservation, navParams } = this.props;

    if (this.state.loading) {
      return (
        <Centered>
          <Spinner />
        </Centered>
      );
    }

    return (
      <EventReservationDetailsCard
        navigate={navigate}
        reservation={reservation}
        eventId={navParams.id}
      />
    );
  }
}

EventReservationDetailsContainer.propTypes = {
  reservation: PropTypes.object,
  navParams: PropTypes.object,
  navigate: PropTypes.func,
  fetchEventAndReservationDetails: PropTypes.func
};

function mapStateToProps({ reservation, user }) {
  return {
    reservation,
    user
  };
}

export default enhanceContainer(
  connect(
    mapStateToProps,
    {
      fetchEventAndReservationDetails
    }
  )(EventReservationDetailsContainer)
);

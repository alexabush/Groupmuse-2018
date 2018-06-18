import React, { PureComponent } from 'react';
import * as styles from '../../../config/styles';
import styled from 'styled-components/native';
import { View, Alert } from 'react-native';
import { Text, TextLink, Button, UserThumbnail, Icons } from '../../atoms';
import Icon from 'react-native-vector-icons/Entypo';

export const StyledCardView = styled.View`
  padding: 0 25px;
  margin-top: 70px;
  flex: 1;
  justify-content: space-between;
`;

export const EventInfoView = styled.View`
  padding: 20px 0;
  flex-direction: row;
`;

export const StyledGuestTableView = styled.View`
  padding: 15px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: rgb(84, 84, 84);
  border-bottom-width: 1px;
  opacity: 0.9px;
`;

export const StyledGuestTableHeaderView = styled.View`
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: rgb(84, 84, 84);
  border-bottom-width: 1px;
  opacity: 0.9px;
`;

export const StyledEventNameText = styled.Text`
  font-size: 16px;
  width: 54%;
`;

export const StyledWaitlistRelationshipText = styled.Text`
  color: rgb(241, 171, 41);
  font-size: 16px;
  font-weight: 100;
`;

export const StyledCancelReservationTextView = styled.View`
  align-items: center;
  padding: 10px 0;
`;

export const StyledShareEventBtnView = styled.View`
  padding: 20px 0;
`;

class EventReservationDetailsCard extends PureComponent {
  render() {
    const { navigate, reservation, eventId } = this.props;

    const guestLis = reservation.plus_ones.map(({ name, email }) => (
      <StyledGuestTableView key={email}>
        <Text>{name}</Text>
        <Text>{email}</Text>
      </StyledGuestTableView>
    ));

    const eventTitle = reservation.title || 'Woo Concert! This will rock.';

    const hostPhoto =
      reservation.eventHostPhoto ||
      'https://images.pexels.com/photos/372042/pexels-photo-372042.jpeg?auto=compress&cs=tinysrgb&h=350';

    const hostName = reservation.eventHostName || 'PianoMan';

    const conditions = () => {
      //check can_view_address_now
      //if true, display address
      const { approved, waitlisted } = reservation;
      if (waitlisted) {
        return relationshipLookup['waitlisted'];
      } else if (!approved) {
        return relationshipLookup['pending'];
      } else {
        return relationshipLookup['approved'];
      }
    };

    const relationshipLookup = {
      approved: (
        <Text>
          We'll release the exact address 24 hours before the show.
          <TextLink
            text=" Sign up for text alerts."
            textSize="16px"
            onPress={() => {
              Alert.alert('btn press aya!');
            }}
          />
        </Text>
      ),
      waitlisted: (
        <View>
          <StyledWaitlistRelationshipText>
            You're currently on the waitlist.
          </StyledWaitlistRelationshipText>
          <StyledWaitlistRelationshipText>
            We'll email you if you get in.
          </StyledWaitlistRelationshipText>
        </View>
      ),
      pending: (
        <View>
          <StyledWaitlistRelationshipText>
            Your reservation is pending host approval.
          </StyledWaitlistRelationshipText>
          <StyledWaitlistRelationshipText>
            We'll email you when approved.
          </StyledWaitlistRelationshipText>
        </View>
      )
    };

    const relationshipTextComponent = conditions();

    return (
      <StyledCardView>
        <View>
          <Text
            color="rgb(84,84,84)"
            size="32"
            paddingTop="20"
            fontWeight="200"
          >
            Your reservation
          </Text>
          <EventInfoView>
            <UserThumbnail userPhoto={hostPhoto} marginRight="10" />
            <View>
              <StyledEventNameText numberOfLines={1} ellipsizeMode="tail">
                {eventTitle}
              </StyledEventNameText>
              <Text>Hosted by {hostName}</Text>
            </View>
          </EventInfoView>
          <View>{relationshipTextComponent}</View>
          <View>
            <StyledGuestTableHeaderView>
              <Text color="rgb(84,84,84)" size="18px" fontWeight="600">
                Your guests
              </Text>
              <TextLink
                text="Edit guests"
                textSize="16px"
                paddingBottom="11.5px"
                onPress={() => {
                  this.props.navigate('ModifyGuests', {
                    eventId
                  });
                }}
              />
            </StyledGuestTableHeaderView>
            <View>{guestLis}</View>
          </View>
          <StyledCancelReservationTextView>
            <TextLink
              text="Cancel reservation"
              textSize="20px"
              onPress={() => {
                this.props.navigate('CancelReservation', {
                  eventId
                });
              }}
            />
          </StyledCancelReservationTextView>
        </View>

        <StyledShareEventBtnView>
          <Button
            backgroundColor="rgb(57, 139, 0)"
            width=""
            height=""
            justifyContent="space-around"
            marginTop="0"
            padding="0px"
            onPress={() => {
              Alert.alert('Share btn pressed');
            }}
          >
            Share Event <Icons name="share-alt" color="white" />
          </Button>
        </StyledShareEventBtnView>
      </StyledCardView>
    );
  }
}

export default EventReservationDetailsCard;

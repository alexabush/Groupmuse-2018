import React, { PureComponent } from 'react';
import * as styles from '../../../config/styles';
import styled from 'styled-components/native';
import { View, Alert } from 'react-native';
import { Text, TextLink, Button, UserThumbnail, Icons } from '../../atoms';
import Icon from 'react-native-vector-icons/Entypo';

export const StyledCardView = styled.View`
  padding: 0 25px;
  margin-top: 80px;
  margin-bottom: 20px
  flex: 1;
  justify-content: space-between;
`;

export const EventInfoView = styled.View`
  padding: 20px 0;
  flex-direction: row;
`;

export const CenteredView = styled.View`
  align-items: center;
`;

export const StyledEventNameText = styled.Text`
  font-size: 16px;
  max-width: 89%;
`;

export const StyledWaitlistRelationshipText = styled.Text`
  color: rgb(241, 171, 41);
  font-size: 16px;
  font-weight: 100;
`;

export const StyledRefundText = styled.Text`
  text-align: center;
  color: rgb(84, 84, 84);
  font-size: 16px;
`;

export const StyledCancelReservationTextView = styled.View`
  align-items: center;
  padding: 10px 0;
`;

export const StyledShareEventBtnView = styled.View`
  padding: 20px 0;
`;

export const HeaderPaddingView = styled.View`
  padding-bottom: 10px;
`;

export const StyledUpdateReservationBtnText = styled.View`
  padding: 20px 0;
  align-items: center;
  text-align: center;
`;

class CancelReservationCard extends PureComponent {
  render() {
    const { reservation } = this.props;
    const eventTitle =
      reservation.title || 'Woo Concert! This will rock! YEAH WOO!';
    const hostName = reservation.eventHostName || 'PianoMan';
    const hostPhoto =
      reservation.eventHostPhoto ||
      'https://images.pexels.com/photos/372042/pexels-photo-372042.jpeg?auto=compress&cs=tinysrgb&h=350';

    return (
      <StyledCardView>
        <View>
          <HeaderPaddingView>
            <Text
              color="rgb(84,84,84)"
              size="36"
              paddingTop="20"
              fontWeight="200"
            >
              Cancel reservation
            </Text>
          </HeaderPaddingView>
          <EventInfoView>
            <UserThumbnail userPhoto={hostPhoto} marginRight="10" />
            <View>
              <StyledEventNameText numberOfLines={1} ellipsizeMode="tail">
                {eventTitle}
              </StyledEventNameText>
              <Text>Hosted by {hostName}</Text>
            </View>
          </EventInfoView>
        </View>

        <CenteredView>
          <Button
            color={styles.WHITE}
            backgroundColor="rgb(185,74,72)"
            fontSize="24px"
            borderWidth="1px"
            borderRadius="3px"
            height={60}
            onPress={() => {
              this.props.deleteRsvp(reservation.rsvpId);
            }}
          >
            Cancel reservation
          </Button>

          <TextLink
            text="Nevermind"
            textSize="24px"
            paddingBottom="11.5px"
            onPress={() => {
              Alert.alert('update to go back');
              // this.props.goBack();
              // this.props.navigateBack();
            }}
          />
        </CenteredView>

        <View>
          <StyledRefundText>
            Within two weeks, you will either see a credit on your statement, or
            the charge will disappear completely.
          </StyledRefundText>
        </View>
      </StyledCardView>
    );
  }
}

export default CancelReservationCard;

import React, { PureComponent } from 'react';
import * as styles from '../../../config/styles';
import styled from 'styled-components/native';
import { View, Alert } from 'react-native';
import { Text, TextLink, Button, UserThumbnail, Icons } from '../../atoms';
import Icon from 'react-native-vector-icons/Entypo';

export const StyledCardView = styled.View`
  margin-top: 45px;
  flex: 1;
  justify-content: space-between;
  padding-bottom: 25px;
`;

export const StyledSectionView = styled.View`
  padding: 0 25px;
`;

export const StyledBorder = styled.View`
  border-top-color: rgb(204, 204, 204);
  border-top-width: 1px;
`;

export const StyledGuestTableView = styled.View`
  padding: 15px 2px 15px 3px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: rgb(204, 204, 204);
  border-bottom-width: 1px;
  opacity: 0.9px;
`;

export const StyledTableTopView = styled.View`
  padding: 15px 2px 15px 3px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: rgb(204, 204, 204);
  border-top-color: rgb(204, 204, 204);
  border-bottom-width: 1px;
  border-top-width: 1px;
  opacity: 0.9px;
`;

export const StyledHeaderText = styled.Text`
  color: rgb(84, 84, 84);
  font-size: 36px;
  padding-top: 20;
  font-weight: 200;
`;

export const StyledDescriptionText = styled.Text`
  color: rgb(84, 84, 84);
  font-size: 16px;
  padding-top: 20;
  padding-bottom: 40;
  font-weight: 200;
`;

export const StyledRefundText = styled.Text`
  text-align: center;
  color: rgb(84, 84, 84);
  font-size: 12px;
`;

export const StyledUpdateReservationBtnText = styled.View`
  align-items: center;
  text-align: center;
`;

export const RefundTextView = styled.View`
  padding: 10px 0;
`;
export const ManualGuestBtnView = styled.View`
  padding-bottom: 20px;
`;

class ModifyGuestsCard extends PureComponent {
  render() {
    const { reservation } = this.props;
    const guestLis = this.props.reservation.plus_ones.map(
      ({ name, email }, index) => {
        return index === 0 ? (
          <StyledTableTopView key={email}>
            <Text size="22px">{name}</Text>
            <TextLink text="X" textSize="18px" color="rgb(84,84,84)" />
          </StyledTableTopView>
        ) : (
          <StyledGuestTableView key={email}>
            <Text size="22px">{name}</Text>
            <TextLink
              onPress={() => {
                this.props.removeGuestFromPlusOnes(reservation.rsvpId);
              }}
              text="X"
              textSize="18px"
              color="rgb(84,84,84)"
            />
          </StyledGuestTableView>
        );
      }
    );

    return (
      <StyledCardView>
        <StyledSectionView>
          <StyledHeaderText>Add guests</StyledHeaderText>
          <StyledDescriptionText>
            You may add up to 4 guests on your reservation. We'll need their
            contact info.
          </StyledDescriptionText>
          <View>{guestLis}</View>
          <Button
            color="rgb(84,84,84)"
            borderColor="rgb(84,84,84)"
            fontSize="18px"
            borderWidth="1px"
            borderRadius="3px"
            onPress={() => {
              Alert.alert('add guest from contacts clicked');
            }}
          >
            Add a guest from my contacts
          </Button>
          <ManualGuestBtnView>
            <Button
              color="rgb(84,84,84)"
              borderColor="rgb(84,84,84)"
              fontSize="18px"
              borderWidth="1px"
              borderRadius="3px"
              onPress={() => {
                Alert.alert('add guest manually clicked');
              }}
            >
              Add a guest manually
            </Button>
          </ManualGuestBtnView>
        </StyledSectionView>
        <StyledBorder />
        <StyledSectionView>
          <Button
            color={styles.WHITE}
            backgroundColor="rgb(57,139,0)"
            borderRadius="3px"
            padding="0px"
            height={70}
            alignItems="center"
            onPress={() => {
              this.props.updatePlusOnesRequest(reservation.rsvpId);
            }}
          >
            <StyledUpdateReservationBtnText>
              <Text color={styles.WHITE} size="22px">
                Update reservation
              </Text>
              <Text color={styles.WHITE} size="16px">
                (add/remove guests)
              </Text>
            </StyledUpdateReservationBtnText>
          </Button>
          <RefundTextView>
            <StyledRefundText>
              Reservation fees will be charged for additional guests, using the
              payment method on file.
            </StyledRefundText>
          </RefundTextView>
        </StyledSectionView>
      </StyledCardView>
    );
  }
}

export default ModifyGuestsCard;

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StatusBar,
  View,
} from 'react-native';

import { IconCircleButton } from '../../components/Buttons/IconCircleButton';
import { StackNavigation } from '../../types/navigation-types';
import { SubHeading } from '../../components/SubHeading';
import { Container } from '../../components/Container';
import { JournalEntries } from '../../components/JournalEntries';

import { TrackingEvent } from '../../services/Tracking';

import styles from './styles';

export const Home = () => {
  const navigation = useNavigation<StackNavigation>();

  const clickPlusHandler = () => {
    TrackingEvent('Home - Click', { "Name": 'Add button'});
    navigation.navigate('AddNew');
  };

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor='transparent' barStyle="dark-content" />
      <Container>
        <SubHeading>My Journal</SubHeading>
        <JournalEntries />
      </Container>
      <IconCircleButton
        icon="text-box-plus-outline"
        style={styles.addNewButton}
        onPress={clickPlusHandler}
        disabled={false}
      />
    </View>
  );
}


import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Stagger, useDisclose } from "native-base";
import {
  StatusBar,
  View,
} from 'react-native';

import { IconCircleButton } from '../../components/Buttons/IconCircleButton';
import { StackNavigation } from '../../types/navigation-types';
import { SubHeading } from '../../components/SubHeading';
import { Container } from '../../components/Container';
import { JournalEntries } from '../../components/JournalEntries';
import { Quotes } from '../../components/Quotes';

import { TrackingEvent } from '../../services/Tracking';

import styles from './styles';

export const Home = () => {
  const navigation = useNavigation<StackNavigation>();
  const {
    isOpen,
    onClose,
    onToggle,
  } = useDisclose();

  const clickPlusHandler = () => {
    TrackingEvent('Homescreen - Click', { "Name": 'Add button'});
    onToggle();
  };

  const clickAddJournalHandler = () => {
    TrackingEvent('Home - Click', { "Name": 'Add button'});
    navigation.navigate('AddNew');
    onClose();
  };

  const clickAccountHandler = () => {
    TrackingEvent('Home - Click', { "Name": 'My Account button'});
    navigation.navigate('MyAccount');
    onClose();
  };

  const clickTagsHandler = () => {
    TrackingEvent('Home - Click', { "Name": 'Tag Manager button'});
    navigation.navigate('TagManager');
    onClose();
  }

  const staggerStyles = isOpen ? [styles.stagger, { opacity: 1, height: 'auto' }] : styles.stagger;

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor='transparent' barStyle="dark-content" />
      <Container>
        <SubHeading>My Journal</SubHeading>
        <Quotes />
        <JournalEntries />
      </Container>
      <View style={staggerStyles}>
        <Stagger visible={isOpen} initial={{
          opacity: 0,
          scale: 0,
          translateX: 100,
        }} animate={{
          translateX: 0,
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            mass: 0.8,
            stagger: {
              offset: 30,
              reverse: true
            }
          }
        }} exit={{
          translateX: 100,
          scale: .5,
          opacity: 0,
          transition: {
            duration: 0,
            stagger: {
              offset: 0,
              reverse: true
            }
          }
        }}
        >
          <IconCircleButton
            icon="account-cog-outline"
            style={styles.myAccountButton}
            onPress={clickAccountHandler}
            disabled={false}
          />
          <IconCircleButton
            icon="tag-outline"
            style={styles.addNewButton}
            onPress={clickTagsHandler}
            disabled={false}
          />
        </Stagger>
      </View>
      <IconCircleButton
        icon="dots-vertical"
        style={styles.myAccountButton}
        onPress={clickPlusHandler}
        disabled={false}
      />
      <IconCircleButton
        icon="text-box-plus-outline"
        style={styles.addNewButton}
        onPress={clickAddJournalHandler}
        disabled={false}
      />
    </View>
  );
}


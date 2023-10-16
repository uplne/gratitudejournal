import {
  StatusBar,
  View,
  ImageBackground,
} from 'react-native';

import { Container } from '../../components/Container';

import emptyJournal from '../../../assets/bgs/empty_journal2.png';

import styles from './styles';

export const LockScreen = () =>
  <View style={styles.root}>
    <StatusBar translucent backgroundColor='transparent' barStyle="dark-content" />
    <Container>
      <ImageBackground source={emptyJournal} style={styles.emptyImage} />
    </Container>
  </View>;


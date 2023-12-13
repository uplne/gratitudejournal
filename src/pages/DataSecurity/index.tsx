import { View, ImageBackground, Text } from 'react-native';

import { ContainerWithHeader } from '../../components/ContainerWithHeader';

import asset from '../../../assets/bgs/data_security.png';

import styles from './styles';

export const DataSecurity = () => {
  return (
    <ContainerWithHeader
      title="Data Security"
      style={styles.root}
    >
      <View style={styles.imageWrapper}>
        <ImageBackground source={asset} style={styles.image} />
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.headline}>Your data is protected and safe with us</Text>
        <Text style={styles.emptyText}>None of your personal credentials are stored, and your data is AES-256 encrypted.</Text>
      </View>
    </ContainerWithHeader>
  );
};

import { ImageBackground, StatusBar, View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from "native-base";

import { StackNavigation } from '../../types/navigation-types';
import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { JOURNAL_TYPES } from '../../context/JournalContext';

import positive from '../../../assets/bgs/positive_journal.png';
import random from '../../../assets/bgs/random_journal.png';
import empty from '../../../assets/bgs/empty_journal.png';
import ivy from '../../../assets/bgs/hangingdplant.png';

import styles from './styles';

export const AddNew = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <ContainerWithHeader
      title="New Journal Entry"
      modal
    >
      <StatusBar translucent backgroundColor='transparent' />
      <ImageBackground source={ivy} style={styles.headerImage} />

      <View style={styles.wrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Pressable
            style={styles.pressableBox}
            onPress={() => navigation.navigate('ThreeThings')}
          >
            <View style={styles.boxTextWrapper}>
              <Text style={styles.textHeadline}>3 Positive Experiences</Text>
              <Text>A 3 positive experiences journal is important for finding the good in every day.</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.pressableBox}
            // onPress={() => navigation.navigate('PickDate', {
            //   nextPage: JOURNAL_TYPES.POSITIVE,
            // })}
          >
            <View style={styles.boxTextWrapper}>
              <Text style={styles.textHeadline}>Specific Moment</Text>
              <Text>Writing a specific moments journal involves capturing significant events or experiences in detail.</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.pressableBox}
            // onPress={() => navigation.navigate('PickDate', {
            //   nextPage: JOURNAL_TYPES.POSITIVE,
            // })}
          >
            <View style={styles.boxTextWrapper}>
              <Text style={styles.textHeadline}>One Line Gratitude</Text>
              <Text>A charming journal to jot down daily gratitude in just one line.</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.pressableBox}
            // onPress={() => navigation.navigate('PickDate', {
            //   nextPage: JOURNAL_TYPES.POSITIVE,
            // })}
          >
            <View style={styles.boxTextWrapper}>
              <Text style={styles.textHeadline}>Gratitude Letter</Text>
              <Text>A gratitude letter is a heartfelt message expressing appreciation and thankfulness towards someone or something.</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.pressableBox}
            // onPress={() => navigation.navigate('PickDate', {
            //   nextPage: JOURNAL_TYPES.RANDOM,
            // })}
          >
            <View style={styles.boxTextWrapper}>
              <Text style={styles.textHeadline}>Write With Prompt</Text>
              <Text>The Gratitude Journal will suggest a gratitude topic that you can write about.</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.pressableBox}
            // onPress={() => navigation.navigate('PickDate', {
            //   nextPage: JOURNAL_TYPES.BLANK,
            // })}
          >
            <View style={styles.boxTextWrapper}>
              <Text style={styles.textHeadline}>Blank Page</Text>
              <Text>You are welcome to journal about anything that you desire.</Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </ContainerWithHeader>
  );
};

import { ImageBackground, StatusBar, View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from "native-base";

import { StackNavigation } from '../../types/navigation-types';
import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { JOURNAL_TYPES_HUMAN_READABLE, JOURNAL_TYPES } from '../../state/JournalState';

import ivy from '../../../assets/bgs/ivy2.png';
import stars from '../../../assets/bgs/stars_square.png';
import bulb from '../../../assets/bgs/bulp_square.png';
import journal from '../../../assets/bgs/journal_square.png';
import sun from '../../../assets/bgs/sun_square.png';

import styles from './styles';

export const AddNew = () => {
  const navigation = useNavigation<StackNavigation>();

  const { width } = Dimensions.get('window');
  const gap = 20;
  const itemPerRow = 2;
  const totalGapSize = (itemPerRow - 1) * gap;
  const windowWidth = width - 40;
  const childWidth = (windowWidth - totalGapSize) / itemPerRow;

  const gridStyles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -(gap / 2),
    },
    singleItem: {
      marginHorizontal: gap / 2,
      minWidth: childWidth,
      maxWidth: childWidth,
    },
  });

  return (
    <ContainerWithHeader
      title="New Journal Entry"
      modal
    >
      <StatusBar translucent backgroundColor='transparent' />
      {/* <ImageBackground source={ivy} style={styles.headerImage} /> */}

      <View style={styles.wrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={gridStyles.container}>
          <Pressable
            style={[styles.pressableBox, gridStyles.singleItem]}
            onPress={() => navigation.navigate('ThreeThings')}
          >
            <View style={styles.boxTextWrapper}>
              <ImageBackground source={stars} style={styles.pressableImage} />
              <Text style={styles.textHeadline}>{JOURNAL_TYPES_HUMAN_READABLE[JOURNAL_TYPES.THREE_THINGS]}</Text>
              <Text style={styles.text}>A 3 positive experiences journal is important for finding the good in every day.</Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.pressableBox, gridStyles.singleItem]}
            onPress={() => navigation.navigate('Prompt')}
          >
            <View style={styles.boxTextWrapper}>
              <ImageBackground source={bulb} style={styles.pressableImage} />
              <Text style={styles.textHeadline}>{JOURNAL_TYPES_HUMAN_READABLE[JOURNAL_TYPES.PROMPT]}</Text>
              <Text style={styles.text}>The Gratitude Journal will suggest a gratitude topic that you can write about.</Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.pressableBox, gridStyles.singleItem]}
            onPress={() => navigation.navigate('Default')}
          >
            <View style={styles.boxTextWrapper}>
              <ImageBackground source={journal} style={styles.pressableImage} />
              <Text style={styles.textHeadline}>{JOURNAL_TYPES_HUMAN_READABLE[JOURNAL_TYPES.DEFAULT]}</Text>
              <Text style={styles.text}>You are welcome to journal about anything that you desire.</Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.pressableBox, gridStyles.singleItem]}
            onPress={() => navigation.navigate('OneLine')}
          >
            <View style={styles.boxTextWrapper}>
              <ImageBackground source={sun} style={styles.pressableImage} />
              <Text style={styles.textHeadline}>{JOURNAL_TYPES_HUMAN_READABLE[JOURNAL_TYPES.ONE_LINE]}</Text>
              <Text style={styles.text}>A charming journal to jot down daily gratitude in just one line.</Text>
            </View>
          </Pressable>

          {/* <Pressable
            style={[styles.pressableBox, gridStyles.singleItem]}
            // onPress={() => navigation.navigate('PickDate', {
            //   nextPage: JOURNAL_TYPES.POSITIVE,
            // })}
          >
            <View style={styles.boxTextWrapper}>
              <Text style={styles.textHeadline}>Specific Moment</Text>
              <Text style={styles.text}>Writing a specific moments journal involves capturing significant events or experiences in detail.</Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.pressableBox, gridStyles.singleItem]}
            // onPress={() => navigation.navigate('PickDate', {
            //   nextPage: JOURNAL_TYPES.POSITIVE,
            // })}
          >
            <View style={styles.boxTextWrapper}>
              <Text style={styles.textHeadline}>Gratitude Letter</Text>
              <Text style={styles.text}>A gratitude letter is a heartfelt message expressing appreciation and thankfulness towards someone or something.</Text>
            </View>
          </Pressable> */}
          </View>
        </ScrollView>
      </View>
    </ContainerWithHeader>
  );
};

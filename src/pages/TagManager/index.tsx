import { useEffect } from 'react';
import { Pressable } from "native-base";
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SheetManager } from 'react-native-actions-sheet';

import { StackNavigation } from '../../types/navigation-types';
import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { useTagsStore } from '../../state/TagsState';
import { TagsWrapper } from '../../components/TagsWrapper';
import { Container } from '../../components/Container';
import { idType } from '../../types/idtype';
import asset from '../../../assets/bgs/tags.png';

import styles from './styles';

export const TagManager = () => {
  const navigation = useNavigation<StackNavigation>();
  const { tags, getData } = useTagsStore();
  const hasTags = tags.length > 0;

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const openEditTag = (id: idType) => {
    navigation.navigate('EditTag', {
      id,
    });
  };

  const createTag = () => SheetManager.show("AddTag", {
    payload: { isCreating: true },
  });

  return (
    <ContainerWithHeader
      title="Tags"
      style={styles.root}
    >
      <View style={styles.imageWrapper}>
        <ImageBackground source={asset} style={styles.image} />
      </View>

      {!hasTags && 
        <View style={styles.center}>
          <Text>You have no tags.</Text>
        </View>
      }

      <Container>
        {hasTags &&
          <TagsWrapper>
            {tags.map((tag) => {
              return (
                <Pressable
                  style={styles.tag}
                  onPress={() => openEditTag(tag.id)}
                >
                  <Text>{tag.tag}</Text>
                </Pressable>
              )
            })}
          </TagsWrapper>
        }
        <View style={styles.addNewWrapper}>
          <Pressable
            style={styles.button}
            onPress={createTag}
          >
            <Text>Create New Tag</Text>
          </Pressable>
        </View>
      </Container>
    </ContainerWithHeader>
  );
};

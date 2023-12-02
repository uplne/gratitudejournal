import { useState, useRef, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { useTagsStore } from '../../state/TagsState';
import { RootStackParamList } from '../../../App';
import { Container } from '../../components/Container';
import { Delete } from '../../components/Alerts/Delete';
import { StackNavigation } from '../../types/navigation-types';

import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'EditJournalEntry'>;

export type RefTypesProps = {
  save: () => void,
};

export const EditTag = ({
  route,
}: Props) => {
  const navigation = useNavigation<StackNavigation>();
  const { tags, deleteTag, updateTag } = useTagsStore();
  const tagId = route.params?.id;
  const tag = tags.filter((tag) => tagId === tag.id)[0];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState('');
  
  const openDelete = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const deleteHandler = async () => {
    await deleteTag(tagId);
    onClose();
    navigation.goBack();
  };

  const saveValue = async () => {
    await updateTag(
      tagId,
      text,
    );
    await setText('');
    navigation.goBack();
  };

  useEffect(() => {
    if (tag) {
      setText(tag.tag);
    }
  }, []);

  return (
    <ContainerWithHeader
      title='Edit Tag'
      style={styles.root}
      allowDelete={openDelete}
      allowSave={saveValue}
      modal
    >
      <Container>
        <View style={styles.innerWrap}>
          <View style={styles.textInputContainer}>
            <TextInput
              value={text}
              onChangeText={setText}
              style={styles.textArea}
              selectionColor={styles.textArea.selectionColor}
            />
          </View>
        </View>
      </Container>
      <Delete
        title="Delete Tag"
        deleteButtonLabel="Delete"
        deleteHandler={deleteHandler}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </ContainerWithHeader>
  );
};
import { useState, useRef } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button, AlertDialog } from "native-base";

import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { useJournalStore, JOURNAL_TYPES, JournalTypes } from '../../state/JournalState';
import { useJournalEntryStore } from '../../state/JournalEntryState';
import { RootStackParamList } from '../../../App';
import { StackNavigation } from '../../types/navigation-types';
import { EditThreeThingsJournal } from './EditThreeThingsJournal';
import { EditOneLineJournal } from './EditOneLineJournal';
import { EditDefaultJournal } from './EditDefaultJournal';
import { EditPromptJournal } from './EditPromptJournal';
import { resetNavigationToHome } from '../../hooks/resetNavigationToHome';
import { idType } from '../../types/idtype';

import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'EditJournalEntry'>;

export type RefTypesProps = {
  save: () => void,
};

type RenderEditTypes = {
  journalItem: JournalTypes | null,
  journalId: idType,
};

const RenderEdit = ({
  journalItem,
  journalId,
}: RenderEditTypes) => {
  const navigation = useNavigation<StackNavigation>();

  if (!journalItem) {
    navigation.navigate('AddNew');
    return;
  }

  if (journalItem.type === JOURNAL_TYPES.ONE_LINE) {
    return <EditOneLineJournal id={journalId} />
  }

  if (journalItem.type === JOURNAL_TYPES.DEFAULT) {
    return <EditDefaultJournal id={journalId} />
  }

  if (journalItem.type === JOURNAL_TYPES.PROMPT) {
    return <EditPromptJournal id={journalId} />
  }

  if (journalItem.type === JOURNAL_TYPES.THREE_THINGS) {
    return <EditThreeThingsJournal id={journalId} />
  }

  return <EditThreeThingsJournal id={journalId} />;
};

export const EditJournalEntry = ({
  route,
}: Props) => {
  const navigation = useNavigation<StackNavigation>();
  const { resetToHome } = resetNavigationToHome();
  const { journal, deleteJournal, updateJournal } = useJournalStore();
  const {
    journalEditedText,
    updateJournalEditedText,
    updateJournalTags,
    journalEditedImages,
  } = useJournalEntryStore();
  const journalId = route.params?.id;
  const journalItem = journal.filter((item) => item.id === journalId)[0] || null;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const cancelRef = useRef(null);
  
  const openDelete = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const deleteHandler = async () => {
    setIsDeleting(true);
    await deleteJournal(journalId);
    resetToHome();
    setIsDeleting(false);
    onClose();
  };

  if (!journalItem) {
    navigation.navigate('AddNew');
    return;
  }

  const saveValue = async () => {
    await updateJournal(
      journalId,
      journalItem.type,
      journalEditedText,
      journalEditedImages,
    );
    await updateJournalEditedText('');
    await updateJournalTags([]);
    navigation.goBack()
  };

  return (
    <ContainerWithHeader
      title='Edit Journal Entry'
      style={styles.root}
      allowDelete={openDelete}
      allowSave={saveValue}
      modal
    >
      <RenderEdit
        journalId={journalId}
        journalItem={journalItem}
      />
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.Header>Delete Journal Entry</AlertDialog.Header>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button
                style={styles.buttonDelete}
                onPress={deleteHandler}
                isLoading={isDeleting}
              >
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </ContainerWithHeader>
  );
};

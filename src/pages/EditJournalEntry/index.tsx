import { useState, useRef } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button, AlertDialog } from "native-base";

import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { useJournalStore, JOURNAL_TYPES } from '../../state/JournalState';
import { RootStackParamList } from '../../../App';
import { StackNavigation } from '../../types/navigation-types';
import { EditThreeThingsJournal } from './EditThreeThingsJournal';
import { resetNavigationToHome } from '../../hooks/resetNavigationToHome';

import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'EditJournalEntry'>;

export const EditJournalEntry = ({
  route,
}: Props) => {
  const navigation = useNavigation<StackNavigation>();
  const { resetToHome } = resetNavigationToHome();
  const { journal, deleteJournal } = useJournalStore();
  const journalId = route.params?.id;
  const journalItem = journal.filter((item) => item.id === journalId)[0] || null;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const cancelRef = useRef(null);

  const renderEdit = () => {
    if (!journalItem) {
      navigation.navigate('AddNew');
      return;
    }

    if (journalItem.type === JOURNAL_TYPES.THREE_THINGS) {
      return <EditThreeThingsJournal id={journalId} goBack={() => navigation.goBack()} />
    }

    return <EditThreeThingsJournal id={journalId} goBack={() => navigation.goBack()} />;
  };
  
  const openDelete = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const deleteHandler = async () => {
    setIsDeleting(true);
    await deleteJournal(journalId);
    resetToHome();
    setIsDeleting(false);
    onClose();
  };

  return (
    <ContainerWithHeader
      title='Edit Journal Entry'
      style={styles.root}
      allowDelete={openDelete}
      modal
    >
      {renderEdit()}
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

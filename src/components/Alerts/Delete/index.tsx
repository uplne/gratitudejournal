import { useState, useRef } from 'react';
import { Button, AlertDialog } from "native-base";

import styles from './styles';

type PropTypes = {
  title: string,
  deleteButtonLabel?: string,
  deleteHandler: () => void,
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
};

export const Delete = ({
  title,
  deleteButtonLabel = 'Delete',
  deleteHandler,
  isOpen,
  setIsOpen,
}: PropTypes) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const cancelRef = useRef(null);
  
  const onClose = () => setIsOpen(false);
  const onDelete = async () => {
    setIsDeleting(true);
    await deleteHandler();
    setIsDeleting(false);
  };

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button
              style={styles.buttonDelete}
              onPress={onDelete}
              isLoading={isDeleting}
            >
              {deleteButtonLabel}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

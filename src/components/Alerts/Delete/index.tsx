import { useEffect } from 'react';
import { Alert } from 'react-native';

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
  const onClose = () => setIsOpen(false);
  const onDelete = async () => await deleteHandler();

  useEffect(() => {
    if (isOpen) {
      Alert.alert(title, '', [
        {
          text: 'Cancel',
          onPress: onClose,
          style: 'cancel',
        },
        {
          text: deleteButtonLabel,
          onPress: onDelete,
        },
      ]);
    }
  }, [isOpen]);

  return null;
};
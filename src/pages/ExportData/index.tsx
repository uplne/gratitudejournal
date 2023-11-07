import { View, ImageBackground } from 'react-native';
import moment from 'moment';
import {
  flow,
  groupBy,
  toPairs,
  sortBy,
} from 'lodash/fp';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { ButtonSecondary } from '../../components/Buttons/ButtonSecondary';
import { useJournalStore, JournalTypes, JournalStateType } from '../../state/JournalState';
import { useAppStateStore } from '../../state/AppState';
import { BuildHTML } from './BuildHTML';

import asset from '../../../assets/bgs/export_data.png';

import styles from './styles';

const journalSelector = (state: JournalStateType)  => flow(
  groupBy((item:JournalTypes) => moment(item.date).format('YYYY-MM-DD')),
  toPairs,
  sortBy(0)
)(state.journal);

export const ExportData = () => {
  const journalData = useJournalStore(journalSelector);
  const updateShouldLock = useAppStateStore((state) => state.updateShouldLock);

  const exportDataToPDFHandler = async () => {
    const html = await BuildHTML({
      data: journalData,
    });

    const { uri } = await Print.printToFileAsync({ html });
    const pdfName = `${uri.slice(
      0,
      uri.lastIndexOf('/') + 1
    )}journal_${moment().format('YYYY-MM-DD')}.pdf`

    await FileSystem.moveAsync({
      from: uri,
      to: pdfName,
    });

    await updateShouldLock(false);
    await shareAsync(pdfName, { UTI: '.pdf', mimeType: 'application/pdf' });
    await updateShouldLock(true);
  };

  return (
    <ContainerWithHeader
      title="Export Data"
      style={styles.root}
    >
      <View style={styles.imageWrapper}>
        <ImageBackground source={asset} style={styles.image} />
      </View>

      <View style={styles.buttonsWrapper}>
        <ButtonSecondary onPress={exportDataToPDFHandler}>Export to PDF</ButtonSecondary>
      </View>
    </ContainerWithHeader>
  );
};

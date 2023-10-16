import { useEffect, useState } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { getQuoteData, QuoteStateTypes } from '../../state/QuotesState';
import { QuoteType } from './quotes';
import asset from '../../../assets/bgs/pencil.png';

import styles from './styles';

type ComponentProps = {
  style?: TextStyle,
};

export const Quotes = ({
  style = {},
}: ComponentProps) => {
  const [data, setData] = useState<QuoteType | null>(null);


  useEffect(() => {
    const getData = async () => {
      const quoteData:QuoteStateTypes = await getQuoteData();

      if (quoteData && quoteData?.quote) {
        setData(quoteData.quote);
      }
    };

    getData();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <View style={[...[style], styles.root]}>
      <ImageBackground source={asset} style={styles.image} />
      <Text style={styles.text}>{data.quote}</Text>
      <View style={styles.authorWrapper}>
        <Text style={styles.textAuthor}>- {data.author}</Text>
      </View>
    </View>
  );
};

import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ALL_QUOTES, QuoteType } from '../../components/Quotes/quotes';

export type QuoteStateTypes = {
  quote: QuoteType | undefined,
  date: string,
};

const requestQuote = () => {
  const numberOfPrompts = ALL_QUOTES.length;
  const promptNumber = Math.floor(Math.random() * numberOfPrompts) + 1;

  return ALL_QUOTES[promptNumber] || ALL_QUOTES[0];
};

const quoteStateDefaultValues = {
  quote: requestQuote(),
  date: moment().startOf('day').toISOString(),
};

const saveQuote = async (quote: QuoteStateTypes) => {
  try {
    const jsonValue = JSON.stringify(quote);

    await AsyncStorage.setItem('@quote', jsonValue);
  } catch (e) {
    console.log('Saving error: ', e);
  }
};

export const getQuoteData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@quote');
    const parsedJSONValue  = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (parsedJSONValue) {
      if (moment(parsedJSONValue.date).isSame(moment(), 'day')) {
        return parsedJSONValue;
      }

      saveQuote(quoteStateDefaultValues);
      return quoteStateDefaultValues;
    }

    saveQuote(quoteStateDefaultValues);
    return quoteStateDefaultValues;
  } catch(e) {
    console.log('Reading error: ', e);
  }
};
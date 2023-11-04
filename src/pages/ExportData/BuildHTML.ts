import moment from 'moment';
// import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'

import { JOURNAL_TYPES_HUMAN_READABLE, JOURNAL_TYPES, ImageType } from '../../state/JournalState';
import { JournalTypes, DataType } from '../../state/JournalState';

type PropsTypes = {
  data: JournalTypes[],
};

const generateJournalItems = async (item: JournalTypes[]) => {
  let HTML = '';

  await Promise.all(item.map(async (journal, index) => {
    const mainDivMargin = index === 0 ? 60 : 30;
    HTML += `<div style="margin-top: ${mainDivMargin}px;">`;

    if (index === 0) {
      HTML += `<p><h2>${moment(journal.date).format('Do MMM YYYY')}</h2></p>`;
    }

    HTML += `<p><b>${JOURNAL_TYPES_HUMAN_READABLE[journal.type]}</b></p>`;

    if (journal.type === JOURNAL_TYPES.THREE_THINGS &&
      journal.data &&
      typeof journal.data !== 'string'
    ) {
      HTML += "<ul>";

      journal.data.forEach((three_things_item: DataType) => {
        if (three_things_item !== '') {
          HTML += `<li>${three_things_item}</li>`;
        }
      });

      HTML += "</ul>";
    } else {
      HTML += journal.data;
    }

    if (journal.images && journal.images.length > 0) {
      HTML += `<div style="width: 100%; display: grid; grid-template-columns: 30% 30% 30%; grid-template-rows: auto; column-gap: 3%; row-gap: 20px; margin-top: 20px;">`;
      const generatedImages = await generateImages(journal.images);
      HTML += generatedImages;
      HTML += `</div>`;
    }

    HTML += "</div>";
  }));

  return HTML;
};

const generateImages = async (images: ImageType[]) => {
  let HTML = '';

  await Promise.all(images.map(async (image) => {
    const resizedPhoto = await manipulateAsync(
      image.uri,
      [{ resize: { width: 300 } }],
      { base64: true, compress: 0.5, format: SaveFormat.JPEG },
    );

    HTML += `<img style="justify-self: stretch;" src="data:image/jpeg;base64,${resizedPhoto.base64}" width="100%" />`;
  }));

  return HTML;
};

const generateHTMLForPDF = async (data:JournalTypes[]) => {
  let HTML = `<style>
    @page {
      margin: 20px;
    }
  </style>`;
  HTML += '<div style="margin: 60px 40px;">';
  HTML += '<h1>My Journal</h1>';

  await Promise.all(data.map(async (journal) => {
    const result = await generateJournalItems(journal[1]);
    HTML += result;
  }));

  HTML += '</div>';

  return HTML;
};

export const BuildHTML = ({
  data,
}: PropsTypes) => {
  return generateHTMLForPDF(data);
};
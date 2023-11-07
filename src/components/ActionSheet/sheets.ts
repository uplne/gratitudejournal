import { registerSheet } from 'react-native-actions-sheet';
import { MediaGallery } from "../MediaGallery";
import { AddTag } from "../AddTags/AddTag";
 
registerSheet("MediaGallery", MediaGallery);
registerSheet("AddTag", AddTag);
 
export {};
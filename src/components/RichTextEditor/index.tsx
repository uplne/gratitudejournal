import { View } from 'react-native';
import { useRef, forwardRef, useImperativeHandle } from 'react';
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import { IconButton } from 'react-native-paper';

import theme from '../../styles/theme';
import styles from './styles';
import FontFamilyStylesheet from '../../styles/fonts';

type Props = {
  initialContentHTML?: string | '',
  setText: (value: string) => void,
};

export type RefTypes = {
  dismissKeyboard: () => void;
};

export const RichTextEditor = forwardRef<RefTypes, Props>(({
  initialContentHTML = '',
  setText,
}: Props, ref) => {
  const richText = useRef<RichEditor>(null);

  const fontFamily = 'Cera Pro';
  const initialCSSText = { initialCSSText: `${FontFamilyStylesheet}`, contentCSSText: `font-family: ${fontFamily}` };

  useImperativeHandle(ref, () => {
    return {
      dismissKeyboard() {
        richText.current?.dismissKeyboard();
      }
    }
  }, []);

  return (
    <>
      <RichToolbar
        ref={ref}
        editor={richText}
        iconTint={theme.colorSecondary}
        selectedIconTint={theme.colorPrimary}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
          actions.heading2,
          actions.setParagraph,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.blockquote,
          actions.insertLink,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }: any) => <IconButton
            icon="format-header-1"
            size={26}
            iconColor={tintColor}
          />,
          [actions.heading2]: ({ tintColor }: any) => <IconButton
            icon="format-header-2"
            size={26}
            iconColor={tintColor}
          />,
          [actions.setParagraph]: ({ tintColor }: any) => <IconButton
            icon="format-paragraph"
            size={26}
            iconColor={tintColor}
          />,
        }}
      />
      <View style={styles.root}>
        <RichEditor
          ref={richText}
          initialHeight={350}
          style={styles.richEditor}
          useContainer={false}
          editorStyle={initialCSSText}
          initialContentHTML={initialContentHTML}
          onChange={ richTextToSave => {
            setText(richTextToSave);
          }}
        />
      </View>
    </>
  );
});
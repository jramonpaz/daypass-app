import { Pressable, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';
import { SearchPrediction } from '@app/types';

type Props = {
  list: SearchPrediction[];
  onSelectOne?: (item: SearchPrediction) => void;
}

const ListLocationSearch = (props: Props) => {
  function handleSelectOne (item: SearchPrediction) {
    props.onSelectOne && props.onSelectOne(item);
  }

  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled={true}
      contentContainerStyle={styles.content}
    >
      {props.list.length > 0
        && props.list.map((item, index) => (
          <Pressable key={index} style={styles.btnItem} onPress={() => handleSelectOne(item)} >
            <TextComponent
              size="14"
            >
              {item.name}
            </TextComponent>
          </Pressable>
      ))}
    </ScrollView>
  );
};

export default ListLocationSearch;

const styles = StyleSheet.create({
  container: {
    maxHeight: 220,
    borderWidth: 0.5,
    borderColor: colors.muted,
    borderRadius: 16,
    backgroundColor: colors.light,
  },
  btnItem: {
    // backgroundColor: colors.red,
    flex: 1,
    height: normalizePixelSize(30, 'height'),
    justifyContent: 'center',
  },
  content: {
    gap: 4,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
});

import { ActivityIndicator } from 'react-native';
import React from 'react';

import FieldBase, { FiledBaseProps } from './FieldBase';
import { normalizeFontSize } from '@app/utils/normalize';

import { colors } from '@app/theme';
import { useTranslation } from 'react-i18next';

export type FieldSearchProps = FiledBaseProps & {
  onSearch?: (text: string) => void;
  isLoading?: boolean;
}

const FieldSearch = (props: FieldSearchProps) => {

  const { t } = useTranslation();

  const handleOnChange = (text: string) => {
    // setSearchValue(text);
    // props.onSearch?.(text);
    props.onChangeText && props.onChangeText(text);
  };

  const handleOnSearch = () => {
    props.onSearch && props.onSearch(props.value ?? '');
    // setSearchValue('');
  };

  return (
    <FieldBase
      {...props}
      value={props.value}
      placeholder={props.placeholder ?? 'Search'}
      input
      type="default"
      onChangeText={handleOnChange}
      returnKeyType="search"
      returnKeyLabel={t('search_button')}
      onEndEditing={handleOnSearch}
      rightComponent={!!props.isLoading && (
        <ActivityIndicator
          color={colors.primary}
          size={normalizeFontSize(24)}
        />
      )}
    >
      {props.children}
    </FieldBase>
  );
};

export default FieldSearch;

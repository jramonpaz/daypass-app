import { Image, ImageProps, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import TextComponent from '../text/TextComponent';

import { app_logo } from '@app/utils/images';

import { colors } from '@app/theme';

type Props = ImageProps & {};

const ImageComponent = (props: Props) => {
  const { t } = useTranslation();
  const [error, setError] = useState<boolean>(false);

  function handleError() {
    setError(true);
  }

  return (
    <View>
      {!error && <Image {...props} onError={handleError} />}
      {error && (
        <View style={[props.style, styles.errorContainer]}>
          <Image
            {...props}
            style={styles.errorImage}
            source={app_logo}
            resizeMethod="scale"
            resizeMode="center"
          />
          <TextComponent size="12" color="white" textAlign="center">
            {t('image-component-error-message')}
          </TextComponent>
        </View>
      )}
    </View>
  );
};


export default ImageComponent;

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: colors.lowlight,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorImage: {
    tintColor: colors.white,
    alignSelf: 'center',
  },
});

import { Image, Platform, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

import { IHeaderProps } from './MainAppHeader';
import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';
import {
  app_com_logo,
  bell_dark_icon,
  bell_outline_active_icon,
  burger_icon,
  chevron_left__white_icon,
} from '@app/utils/images';

type Props = BottomTabHeaderProps & IHeaderProps

const DrawerAppHeader = (props: Props) => {
  if (props.theme === 'white') {
    return (
      <SafeAreaView style={styles.safeArea_white}>
        <View style={[styles.container, styles.containerThemeWhite]}>
          <Pressable
            style={styles.iconContainer}
            onPress={props.onPressLeftButton}
            disabled={props.leftIconType === 'none'}
          >
          {props.leftIconType === 'back' && (
            <Image
              source={chevron_left__white_icon}
              style={[styles.icon, styles.icon_theme_white]}
            />
          )}

          {props.leftIconType === 'menu' && (
            <Image
              source={burger_icon}
              style={[styles.icon, styles.icon_theme_white]}
            />
          )}
          </Pressable>

          <View style={styles.titleContainer}>
            { props.titleType === 'appicon' && (
              <Image
                source={app_com_logo}
                style={[styles.appLogo, styles.icon_theme_white]}
              />
            )}
            { props.titleType === 'text' && props.title &&
              <TextComponent
                size="18"
                color={'dark'}
                weight="bold"
              >
                {props.title}
              </TextComponent>
            }
          </View>

          <Pressable
            style={styles.iconContainer}
            onPress={props.onPressRightButton}
            disabled={props.rightIconType === 'none'}
          >
            {props.rightIconType === 'bell_active' && (
              <Image source={bell_dark_icon} style={styles.icon}/>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable
          style={styles.iconContainer}
          onPress={props.onPressLeftButton}
          disabled={props.leftIconType === 'none'}
        >
          {props.leftIconType === 'back' && (
            <Image
              source={chevron_left__white_icon}
              style={[styles.icon]}
            />
          )}
          {props.leftIconType === 'menu' && (
            <Image source={burger_icon} style={styles.icon} />
          )}
        </Pressable>

        <View style={styles.titleContainer}>
          { props.titleType === 'appicon' && (
            <Image
              source={app_com_logo}
              style={styles.appLogo}
              resizeMethod="resize"
            />
          )}

          { props.titleType === 'text' && props.title &&
            <TextComponent
              size="18"
              color={'white'}
              weight="bold"
              textAlign="center"
            >
              {props.title}
            </TextComponent>
          }
        </View>

        <Pressable
          style={styles.iconContainer}
          onPress={props.onPressRightButton}
          disabled={props.rightIconType === 'none'}
        >
          {props.rightIconType === 'bell_active' && (
            <Image source={bell_outline_active_icon} style={styles.borderIcons} />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DrawerAppHeader;


const ICON_SIZE = normalizePixelSize(24,'height');

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    backgroundColor: colors.primary,
    // height: normalizePixelSize(100, 'height'),
  },
  safeArea_white: {
    backgroundColor: colors.white,
  },
  container: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: normalizePixelSize(20, 'width'),
    alignItems: 'center',
    paddingBottom: normalizePixelSize(20, 'height'),
    paddingTop: normalizePixelSize(Platform.OS === 'ios' ? 10 : 20, 'height'),
  },
  titleContainer: {},
  appIcon: {},
  iconContainer: {
    width: 24,
    height: ICON_SIZE,
    // flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderIcons: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: 'contain',
  },
  icon: {
    width: 24,
    height: ICON_SIZE,
    resizeMode: 'contain',
  },
  appLogo: {
    height: ICON_SIZE,
    maxWidth: 200,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  // THEME: WHITE
  containerThemeWhite: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: normalizePixelSize(20, 'width'),
    alignItems: 'center',
    paddingBottom: normalizePixelSize(20, 'height'),
    paddingTop: normalizePixelSize(Platform.OS === 'ios' ? 10 : 20, 'height'),
  },
  icon_theme_white: {
    tintColor: colors.dark,
  },
});

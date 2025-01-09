import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';

import {IconProps} from 'react-native-vector-icons/Icon';
import {Colors} from '../utils/System/Constants';

type Props = {
  onPress?: () => void;
  size: number;
  color: string;
  disabled?: boolean;
  style?: ViewStyle;
};

const createIcon =
  (iconComponent: React.ComponentType<IconProps>, iconName: string) =>
  ({onPress, size, color, disabled, style}: Props) =>
    (
      <TouchableOpacity
        disabled={disabled || false}
        style={[styles(size || 18).wrapper, style]}
        onPress={onPress}>
        {React.createElement(iconComponent, {
          name: iconName,
          color: color || Colors.primaryDark,
          size: size || 18,
        })}
      </TouchableOpacity>
    );

const AppIcons = {
  PlusIcon: createIcon(Entypo, 'plus'),
  MinusIcon: createIcon(Ionicons, 'remove'),
  PlusCircleIcon: createIcon(AntDesign, 'pluscircleo'),
  SearchIcon: createIcon(EvilIcons, 'search'),
  EmailIcon: createIcon(MaterialCommunityIcons, 'email-outline'),
  ChevronLeftIcon: createIcon(Entypo, 'chevron-left'),
  ChevronRightIcon: createIcon(Entypo, 'chevron-right'),
  ChevronDownIcon: createIcon(Ionicons, 'chevron-down'),
  ChevronUpIcon: createIcon(Ionicons, 'chevron-up'),
  ChevronUpDownIcon: createIcon(Ionicons, 'chevron-expand-outline'),
  ChevronRightCircleO: createIcon(AntDesign, 'rightcircleo'),
  ChevronRightCircleFill: createIcon(AntDesign, 'rightcircle'),
  CopyIcon: createIcon(Ionicons, 'copy-outline'),
  LinkIcon: createIcon(Feather, 'link'),
  CloseIcon: createIcon(MaterialIcons, 'close'),
  DeleteIcon: createIcon(MaterialIcons, 'delete'),
  EyeIcon: createIcon(MaterialCommunityIcons, 'eye-outline'),
  EyeOffIcon: createIcon(MaterialCommunityIcons, 'eye-off-outline'),
  BackArrowIcon: createIcon(AntDesign, 'arrowleft'),
  UserIcon: createIcon(FontAwesome, 'user'),
  LockIcon: createIcon(Octicons, 'lock'),
  MessageIcon: createIcon(AntDesign, 'message1'),
  MessageIcon2: createIcon(MaterialCommunityIcons, 'message-text'),
  CheckCircleIcon: createIcon(AntDesign, 'checkcircle'),
  CheckIcon: createIcon(Feather, 'check'),
  InfoIcon: createIcon(Feather, 'info'),
  DotIcon: createIcon(Entypo, 'dot-single'),
  LightBulbIcon: createIcon(MaterialCommunityIcons, 'lightbulb-on-outline'),
  ArrowSwapIcon: createIcon(Fontisto, 'arrow-swap'),
  TrophyIcon: createIcon(FontAwesome, 'trophy'),
  ThreeDotsVerticalIcon: createIcon(Entypo, 'dots-three-vertical'),
  AwardIcon: createIcon(Feather, 'award'),
  BarGraphIcon: createIcon(Entypo, 'bar-graph'),
  ClockIcon: createIcon(MaterialCommunityIcons, 'clock-time-four-outline'),
  BellIcon: createIcon(FontAwesome, 'bell-o'),
  ClipboardIcon: createIcon(Foundation, 'clipboard-notes'),
  DatabaseIcon: createIcon(MaterialCommunityIcons, 'database-lock-outline'),
  LogoutIcon: createIcon(AntDesign, 'logout'),
  CrossIcon: createIcon(Entypo, 'cross'),
  ShieldCheckMarkIcon: createIcon(Ionicons, 'shield-checkmark'),
  SendIcon: createIcon(Feather, 'send'),
  AlertIcon: createIcon(MaterialCommunityIcons, 'alert'),
  ScrollDown: createIcon(AntDesign, 'arrowdown'),

  MenuIcon: createIcon(Entypo, 'menu'),
  HistoryIcon: createIcon(MaterialCommunityIcons, 'history'),
  FavoriteIcon: createIcon(Fontisto, 'heart-alt'),
  StarIcon: createIcon(AntDesign, 'staro'),
  AlertCircle: createIcon(Ionicons, 'alert-circle-outline'),
  DragIcon: createIcon(MaterialCommunityIcons, 'drag-horizontal-variant'),
  StarIconFill: createIcon(FontAwesome, 'star'),
  StarIconOutline: createIcon(FontAwesome, 'star-o'),
  SortAscending: createIcon(FontAwesome5, 'sort-amount-up-alt'),
  SortDescending: createIcon(FontAwesome5, 'sort-amount-down'),
};

export default AppIcons;

const styles = (width: number) =>
  StyleSheet.create({
    wrapper: {
      width: width + 4,
      // padding: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

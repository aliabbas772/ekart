import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import React, { FC, useState } from 'react';
import Animated, { interpolate, useAnimatedStyle, SharedValue } from 'react-native-reanimated';
import { menuData } from '@utils/db';
import MenuItem from '../atoms/MenuItem';
import Icon from '@components/atoms/Icon';
import { Colors } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

interface MenuHeaderProps {
  scrollY: SharedValue<number>;
}

const MenuHeader: FC<MenuHeaderProps> = ({ scrollY }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const opacityFadingStyles = useAnimatedStyle(() => {
    const opacityValue = interpolate(scrollY.value, [0, 80], [1, 0]);
    return {
      opacity: isNaN(opacityValue) ? 1 : opacityValue,
    };
  });

  if (!menuData || menuData.length === 0) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, opacityFadingStyles]}>
      <SafeAreaView />
        <View style={styles.flexRow}>
          {menuData.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              isFocused={focusedIndex === index}
              onSelect={() => setFocusedIndex(index)}
            />
          ))}
        </View>
      <View style={styles.addressContainer}>
          <Icon color={'black'} size={16} name='home' iconFamily='Ionicons' />
          <Text style={styles.homeText}>HOME</Text>
          <Text numberOfLines={1} style={styles.addressText}>Dongri, Mumbai</Text>
          <Icon color={'black'} size={16} name='chevron-forward-sharp' iconFamily='Ionicons' />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  addressContainer:{
    flexDirection:'row',
    alignItems: "center",
    marginVertical: 5,
  },
  homeText:{
    marginHorizontal:5,
    fontWeight: 'bold',
    color:Colors.text,
  },
  addressText: {
    flex: 1,
    fontSize:RFValue(9),
    color: '#000'
  }
});

export default MenuHeader
// import { View, Text, StyleSheet, Platform } from 'react-native'
// import { getHomeContent } from './api/actions'
// import { useAppDispatch, useAppSelector } from '@store/reduxHook'
// import { useEffect } from 'react'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
// import MenuHeader from './molecules/MenuHeader'

// const Home = () => {
//   const insets = useSafeAreaInsets();

//   const scrollYGlobal = useSharedValue(0)

//   const moveupStyle = useAnimatedStyle(() => {
//     const translateY = interpolate(
//       scrollYGlobal.value,
//       [0, 100],
//       [0, -100],
//       Extrapolate.CLAMP
//     )
//     return {
//       transform : [{ translateY: translateY }],
//     }
//   })

//   return (
//     <View style={styles.container}>
//     <View style={{ height : Platform.OS === 'android' ? insets.top: 0}} />
   
//    <Animated.View style={[moveupStyle]}>
//     <View>
//       <MenuHeader scrollY={[scrollYGlobal]} />
//     </View>

//    </Animated.View>

//    <Animated.View style={[moveupStyle]}>
    
//    </Animated.View>

//    </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   }
// })

// export default Home



import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import MenuHeader from './molecules/MenuHeader';
import  SearchBar  from './molecules/SearchBar';
import { screenHeight } from '@utils/Constants';
import MainList from './templates/MainList';

const Home = () => {
  const insets = useSafeAreaInsets();
  const scrollYGlobal = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYGlobal.value = event.contentOffset.y;
    },
  });

  const moveupStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollYGlobal.value, [0, 100], [0, -100], Extrapolate.CLAMP);
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
      {/* <ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      > */}
        <Animated.View style={[moveupStyle]}>
          <View>
          <MenuHeader scrollY={scrollYGlobal} />
          <SearchBar />
          </View>
        </Animated.View>
      {/* </ScrollView> */}

      <Animated.View style={[moveupStyle, {height:screenHeight}]}>
      <MainList scrollYGlobal= {scrollYGlobal} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;
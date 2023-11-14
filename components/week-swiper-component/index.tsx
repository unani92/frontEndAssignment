import React from 'react'
import { StyleSheet, View, Dimensions, Text, Pressable } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  useDerivedValue,
} from 'react-native-reanimated'
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler'

const { width } = Dimensions.get('window')
const ITEM_WIDTH = width / 2
const ITEM_HEIGHT = 200

const WeekCarouselComponent = () => {
  const translateX = useSharedValue(0)

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX
    },
    onEnd: (event, context) => {
      translateX.value = context.startX + event.translationX
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const onCenterButtonClick = () => {
    // 클릭한 View를 화면 정중앙으로 이동
    translateX.value = withSpring(-1 * ITEM_WIDTH, { velocity: 500 })
  }

  return (
    <View style={styles.container}>
      <TapGestureHandler onHandlerStateChange={onCenterButtonClick}>
        <Animated.View style={styles.centerButton}>
          <Text style={styles.centerButtonText}>Center</Text>
        </Animated.View>
      </TapGestureHandler>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onHandlerStateChange={gestureHandler}>
        <Animated.View style={[styles.carousel, animatedStyle]}>
          {Array.from({ length: 10 }, () => 0).map((_, idx) => (
            <Pressable key={idx} onPress={event => console.log(event)}>
              <View style={[styles.item, { backgroundColor: '#3498db' }]}>
                {/* Content for slide 1 */}
              </View>
            </Pressable>
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flexDirection: 'row',
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
  centerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default WeekCarouselComponent

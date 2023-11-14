import React, { useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Store } from '../../lib/context/store'

const ITEM_WIDTH = 50
const ITEM_MARGIN = 15
const MAX_WEEK = 45
const FIRST_WEEK_TRANSLATE_X =
  (MAX_WEEK * ITEM_WIDTH + (MAX_WEEK - 1) * ITEM_MARGIN - ITEM_WIDTH) / 2
const WeekCarouselComponent = () => {
  const { selectedWeek, setSelectedWeek } = useContext(Store)
  const translateX = useSharedValue(
    FIRST_WEEK_TRANSLATE_X - 14 * (ITEM_WIDTH + ITEM_MARGIN),
  )

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

  const onItemPress = (index: number) => {
    const value = FIRST_WEEK_TRANSLATE_X - index * (ITEM_WIDTH + ITEM_MARGIN)
    translateX.value = withSpring(value)
    setSelectedWeek(index + 1)
  }

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onHandlerStateChange={gestureHandler}>
        <Animated.View style={[styles.carousel, animatedStyle]}>
          {Array.from({ length: MAX_WEEK }, () => 0).map((_, idx) => (
            <TouchableOpacity key={idx} onPress={() => onItemPress(idx)}>
              <View style={[styles.item]}>
                <View>
                  <Text style={{ color: 'white', fontSize: 11 }}>Week</Text>
                </View>
                <Text
                  style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
                  {idx + 1}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  carousel: {
    flexDirection: 'row',
  },
  item: {
    width: 50,
    height: 62,
    marginHorizontal: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#44CEC6',
    borderRadius: 20,
  },
  itemText: {
    color: 'white',
  },
})

export default WeekCarouselComponent

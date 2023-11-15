import { useCallback, useMemo, useState } from 'react'
import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const Carousel = ({
  itemWidth = 50,
  itemHeight = 62,
  itemMargin = 15,
  itemBgColor = '#44CEC6',
  onClickItem,
  itemLen,
  defaultItemIdx = 1,
  itemComponent,
}: {
  itemWidth?: number
  itemHeight?: number
  itemMargin?: number
  itemBgColor?: ColorValue
  onClickItem: (idx: number) => void
  itemLen: number
  defaultItemIdx?: number
  itemComponent?: ({
    idx,
    selected,
  }: {
    idx: number
    selected?: boolean
  }) => JSX.Element
}) => {
  const [selectedIdx, setSelectedIdx] = useState(defaultItemIdx)
  const firstItemTranslateX = useMemo(
    () => (itemLen * itemWidth + (itemLen - 1) * itemMargin - itemWidth) / 2,
    [itemLen, itemWidth, itemMargin],
  )
  const _onClickItem = useCallback(
    (index: number) => {
      const value = firstItemTranslateX - index * (itemWidth + itemMargin)
      translateX.value = withSpring(value)
      setSelectedIdx(index + 1)
      onClickItem(index + 1)
    },
    [firstItemTranslateX, itemWidth, itemMargin],
  )
  const translateX = useSharedValue(
    firstItemTranslateX - (defaultItemIdx - 1) * (itemWidth + itemMargin),
  )
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value
    },
    onActive: (event, context) => {
      translateX.value = withSpring(context.startX + event.translationX)
    },
    onEnd: (event, context) => {
      const value = context.startX + event.translationX
      translateX.value = withSpring(
        value > firstItemTranslateX
          ? firstItemTranslateX
          : value < -firstItemTranslateX
          ? -firstItemTranslateX
          : value,
      )
    },
  })

  const carouselStyle = StyleSheet.create({
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
      width: itemWidth,
      height: itemHeight,
      marginHorizontal: itemMargin / 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: itemBgColor,
      borderRadius: 20,
    },
    itemText: {
      color: 'white',
    },
  })
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })
  return (
    <PanGestureHandler
      onGestureEvent={gestureHandler}
      onHandlerStateChange={gestureHandler}>
      <Animated.View style={[carouselStyle.carousel, animatedStyle]}>
        {Array.from({ length: itemLen }, () => 0).map((_, idx) => (
          <TouchableOpacity key={idx} onPress={() => _onClickItem(idx)}>
            {itemComponent ? (
              itemComponent({ idx, selected: selectedIdx === idx + 1 })
            ) : (
              <View style={[carouselStyle.item]}>
                <View>
                  <Text style={{ color: 'white', fontSize: 11 }}>Week</Text>
                </View>
                <Text
                  style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
                  {idx + 1}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </Animated.View>
    </PanGestureHandler>
  )
}

export default Carousel

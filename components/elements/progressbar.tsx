import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const progressbarStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: 10,
    backgroundColor: '#F6F5F8',
    borderRadius: 20,
    marginVertical: 16,
  },
  box: {
    height: 10,
    backgroundColor: '#44CEC6',
    borderRadius: 20,
  },
})

const ProgressbarComponent = ({
  checkedCount,
  checkListCount,
}: {
  checkedCount: number
  checkListCount: number
}) => {
  const width = useSharedValue(0)
  useEffect(() => {
    width.value = checkedCount
      ? withSpring((checkedCount / checkListCount) * 100)
      : withSpring(0)
  }, [checkedCount, checkListCount])
  const animatedStyle = useAnimatedStyle(() => {
    const val = width.value
    return {
      width: checkedCount ? `${val}%` : '0%',
    }
  })
  return (
    <View style={progressbarStyle.container}>
      <Animated.View style={[{ ...progressbarStyle.box }, animatedStyle]} />
    </View>
  )
}

export default ProgressbarComponent

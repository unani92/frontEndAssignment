import { StyleSheet, View, Text, Pressable } from 'react-native'
import { CheckList, ChecklistsMode } from '../../lib/types'
import SvgUri from 'react-native-svg-uri'
import { useContext, useEffect } from 'react'
import { Store } from '../../lib/context/store'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import ItemText from './item-text'

const itemStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  checked: {
    color: '#C4C4C4',
    textDecorationLine: 'line-through',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.2,
  },
  unChecked: {
    color: '#333',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.2,
  },
})

const ChecklistItem = ({
  checklistItem,
  onPressCheck,
  onPressDelete,
}: {
  checklistItem: CheckList
  onPressCheck: (item: CheckList) => void
  onPressDelete: (item: CheckList) => void
}) => {
  const { checklistMode, snackBarActivation } = useContext(Store)
  const opacity = useSharedValue(0)
  const _onPressDelete = (item: CheckList) => {
    opacity.value = withDelay(0, withTiming(0, { duration: 350 }))
    onPressDelete(item)
  }
  useEffect(() => {
    if (checklistItem) {
      opacity.value = withDelay(0, withTiming(1, { duration: 350 }))
    }
  }, [checklistItem])
  return (
    <Animated.View style={[itemStyles.container, { opacity }]}>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
        {checklistMode === ChecklistsMode.ModeCheck && (
          <Pressable
            onPress={() => onPressCheck(checklistItem)}
            style={{ width: 24, height: 24 }}>
            {checklistItem.checked ? (
              <SvgUri source={require('../../public/icon/checked.svg')} />
            ) : (
              <SvgUri source={require('../../public/icon/unChecked.svg')} />
            )}
          </Pressable>
        )}
        <ItemText
          isChecked={checklistItem.checked}
          content={checklistItem.data.content}
        />
      </View>
      {checklistMode === ChecklistsMode.ModeEdit && (
        <Pressable
          onPress={() => !snackBarActivation && _onPressDelete(checklistItem)}
          style={{ width: 24, height: 24 }}>
          <SvgUri source={require('../../public/icon/delete.svg')} />
        </Pressable>
      )}
    </Animated.View>
  )
}

export default ChecklistItem

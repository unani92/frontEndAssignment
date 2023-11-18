import { StyleSheet, View, Text, Pressable } from 'react-native'
import { CheckList, ChecklistsMode } from '../../lib/types'
import SvgUri from 'react-native-svg-uri'
import { useContext } from 'react'
import { Store } from '../../lib/context/store'
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

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
  const opacity = useSharedValue(1)
  const _onPressDelete = (item: CheckList) => {
    opacity.value = withDelay(0, withTiming(0, { duration: 250 }))
    onPressDelete(item)
  }
  return (
    <Animated.View
      style={[
        itemStyles.container,
        { display: opacity.value === 1 ? undefined : 'none', opacity },
      ]}>
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
        <View style={{ maxWidth: '90%' }}>
          <Text
            style={
              checklistItem.checked ? itemStyles.checked : itemStyles.unChecked
            }>
            {checklistItem.data.content}
          </Text>
        </View>
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

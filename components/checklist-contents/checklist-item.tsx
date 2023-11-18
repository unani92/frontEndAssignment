import { StyleSheet, View, Text, Pressable } from 'react-native'
import { CheckList, ChecklistsMode } from '../../lib/types'
import SvgUri from 'react-native-svg-uri'
import { useContext } from 'react'
import { Store } from '../../lib/context/store'

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
  const { checklistMode } = useContext(Store)
  return (
    <View style={[itemStyles.container]}>
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
          onPress={() => onPressDelete(checklistItem)}
          style={{ width: 24, height: 24 }}>
          <SvgUri source={require('../../public/icon/delete.svg')} />
        </Pressable>
      )}
    </View>
  )
}

export default ChecklistItem

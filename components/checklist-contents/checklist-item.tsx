import { StyleSheet, View, Text } from 'react-native'
import { CheckList } from '../../lib/types'
import SvgUri from 'react-native-svg-uri'

const itemStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
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

const ChecklistItem = ({ checklistItem }: { checklistItem: CheckList }) => {
  return (
    <View style={[itemStyles.container]}>
      <View style={{ width: 24, height: 24 }}>
        {checklistItem.checked ? (
          <SvgUri source={require('../../public/icon/checked.svg')} />
        ) : (
          <SvgUri source={require('../../public/icon/unChecked.svg')} />
        )}
      </View>
      <View style={{ maxWidth: '90%' }}>
        <Text
          style={
            checklistItem.checked ? itemStyles.checked : itemStyles.unChecked
          }>
          {checklistItem.data.content}
        </Text>
      </View>
    </View>
  )
}

export default ChecklistItem

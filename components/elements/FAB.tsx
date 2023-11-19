import { useContext } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { Store } from '../../lib/context/store'
import ModalInput from './modal-input'

const FAB = () => {
  const { checkListGroupByWeeks, selectedWeek } = useContext(Store)
  const addChecklist = () => {
    const checklistsGroupByWeek = checkListGroupByWeeks[(selectedWeek || 0) - 1]
    checklistsGroupByWeek.checkLists
  }
  return (
    <Pressable style={fabStyle.fab} onPress={() => addChecklist()}>
      <SvgUri source={require('../../public/icon/Plus.svg')} />
    </Pressable>
  )
}

const fabStyle = StyleSheet.create({
  fab: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 52,
    borderRadius: 100,
    right: 20,
    bottom: 110,
    backgroundColor: '#44CEC6',
    // iOS 그림자
    shadowColor: 'rgba(0, 0, 0, 0.10)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
})

export default FAB

import { useContext } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { Store } from '../../lib/context/store'
import ModalInput, { useModal } from './modal-input'

const FAB = () => {
  const {
    checkListGroupByWeeks,
    selectedWeek,
    lastId,
    updateLastId,
    setCheckListGroupByWeeks,
  } = useContext(Store)
  const { modalOpen, openModal, closeModal, text, saveTextBeforeClose } =
    useModal({ defaultText: '' })
  const addChecklist = (content: string) => {
    const newCheckListGroupByWeeks = [...checkListGroupByWeeks]
    const checklistsGroupByWeek =
      newCheckListGroupByWeeks[(selectedWeek || 0) - 1]
    checklistsGroupByWeek.checkLists = [
      {
        id: lastId + 1,
        checked: false,
        data: { weekNumber: selectedWeek as number, content },
      },
      ...checklistsGroupByWeek.checkLists,
    ]
    updateLastId(lastId + 1)
    newCheckListGroupByWeeks[(selectedWeek || 0) - 1] = checklistsGroupByWeek
    setCheckListGroupByWeeks(newCheckListGroupByWeeks)
  }
  return (
    <>
      <Pressable style={fabStyle.fab} onPress={() => openModal()}>
        <SvgUri source={require('../../public/icon/Plus.svg')} />
      </Pressable>
      <ModalInput
        open={modalOpen}
        value={text}
        closeModal={() => closeModal()}
        onSubmitText={text => {
          addChecklist(text)
          closeModal()
        }}
      />
    </>
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

import { View, Text, Pressable } from 'react-native'
import ModalInput from '../elements/modal-input'
import { StyleSheet } from 'react-native'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Store } from '../../lib/context/store'
import { ChecklistsMode } from '../../lib/types'

const itemTextStyle = StyleSheet.create({
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

const ItemText = ({
  isChecked,
  content,
}: {
  isChecked: boolean
  content: string
}) => {
  const { checklistMode } = useContext(Store)
  const [modalOpen, setModalOpen] = useState(false)
  const [text, setText] = useState(content)
  const openModal = useCallback(() => {
    setModalOpen(true)
  }, [])
  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])
  useEffect(() => {
    if (checklistMode === ChecklistsMode.ModeCheck && content !== text) {
      console.log('need to saved')
    }
  }, [checklistMode])
  return (
    <View style={{ maxWidth: '90%' }}>
      {checklistMode === ChecklistsMode.ModeCheck ? (
        <Text
          style={isChecked ? itemTextStyle.checked : itemTextStyle.unChecked}>
          {text}
        </Text>
      ) : (
        <Pressable onPress={openModal}>
          <Text
            style={isChecked ? itemTextStyle.checked : itemTextStyle.unChecked}>
            {text}
          </Text>
        </Pressable>
      )}
      <ModalInput
        value={text}
        open={modalOpen}
        closeModal={closeModal}
        onSubmitText={text => {
          setText(text)
          closeModal()
        }}
      />
    </View>
  )
}

export default ItemText

import { View, Text, Pressable } from 'react-native'
import ModalInput, { useModal } from '../elements/modal-input'
import { StyleSheet } from 'react-native'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Store } from '../../lib/context/store'
import { CheckList, ChecklistsMode } from '../../lib/types'

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
  checklistItem,
  onPressEdit,
}: {
  checklistItem: CheckList
  onPressEdit: (item: CheckList) => void
}) => {
  const { checklistMode } = useContext(Store)
  const { modalOpen, openModal, closeModal, text, saveTextBeforeClose } =
    useModal({ defaultText: checklistItem.data.content })
  const _onPressEdit = (item: CheckList, text: string) => {
    saveTextBeforeClose(text)
    onPressEdit(item)
  }
  return (
    <View style={{ maxWidth: '90%' }}>
      {checklistMode === ChecklistsMode.ModeEdit ? (
        <Text
          style={
            checklistItem.checked
              ? itemTextStyle.checked
              : itemTextStyle.unChecked
          }>
          {text}
        </Text>
      ) : (
        <Pressable onPress={openModal}>
          <Text
            style={
              checklistItem.checked
                ? itemTextStyle.checked
                : itemTextStyle.unChecked
            }>
            {text}
          </Text>
        </Pressable>
      )}
      <ModalInput
        value={text}
        open={modalOpen}
        closeModal={() => closeModal(checklistItem.data.content)}
        onSubmitText={text =>
          _onPressEdit(
            {
              ...checklistItem,
              data: { ...checklistItem.data, content: text },
            },
            text,
          )
        }
      />
    </View>
  )
}

export default ItemText

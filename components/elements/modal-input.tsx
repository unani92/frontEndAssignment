import { useCallback, useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { flexShortcuts } from '../../lib/styles'
import SvgUri from 'react-native-svg-uri'

const modalInputStyle = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#44CEC6',
  },
})

export const useModal = ({ defaultText }: { defaultText: string }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [text, setText] = useState(defaultText)
  const openModal = useCallback(() => {
    setModalOpen(true)
  }, [])
  const closeModal = useCallback((rollbackedText: string) => {
    console.log(rollbackedText)
    setText(rollbackedText)
    setModalOpen(false)
  }, [])
  const saveTextBeforeClose = useCallback((text: string) => {
    setText(text)
    setModalOpen(false)
  }, [])
  return { modalOpen, openModal, closeModal, text, saveTextBeforeClose }
}

const ModalInput = ({
  open,
  closeModal,
  onSubmitText,
  value,
}: {
  open: boolean
  closeModal: () => void
  onSubmitText: (text: string) => void
  value: string
}) => {
  const [_text, setText] = useState<string>(value)
  useEffect(() => {
    setText(value)
  }, [open])
  return (
    <Modal visible={open} transparent animationType="slide">
      <TouchableOpacity style={{ flex: 1 }} onPress={closeModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}></View>
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior="position"
        enabled
        style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <View
            style={[
              flexShortcuts.justifyBetween,
              {
                backgroundColor: '#FAFAFA',
                borderColor: '#EAE9ED',
                borderRadius: 12,
                gap: 8,
                padding: 4,
              },
            ]}>
            <TextInput
              style={{
                height: 40,
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 16,
              }}
              onSubmitEditing={() => onSubmitText(_text || '')}
              showSoftInputOnFocus={true}
              value={_text}
              onChangeText={setText}
              placeholder="텍스트 입력"
              autoFocus
            />
            <Pressable
              onPress={() => onSubmitText(_text || '')}
              style={[
                modalInputStyle.button,
                flexShortcuts.justifyCenter,
                { flexShrink: 0 },
              ]}>
              <SvgUri
                source={require('../../public/icon/arrow-up-white.svg')}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default ModalInput

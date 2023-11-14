import { View, Text, StyleSheet, Button } from 'react-native'
import { flexShortcuts } from '../../lib/styles'
import { useCallback, useContext, useState } from 'react'
import ModalInput from '../elements/modal-input'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Store } from '../../lib/context/store'

const appHeaderStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  title: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    width: 28,
    color: '#333',
    fontWeight: '400',
  },
})

const AppHeader = ({
  isDarkMode,
  label,
}: {
  isDarkMode: boolean
  label: string
}) => {
  const [text, setText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const openModal = useCallback(() => {
    setModalVisible(true)
  }, [])
  const closeModal = useCallback(() => {
    setModalVisible(false)
  }, [])
  return (
    <View
      style={[
        flexShortcuts.justifyBetween,
        appHeaderStyle.container,
        { backgroundColor: isDarkMode ? Colors.darker : 'white' },
      ]}>
      <View style={[{ width: 47 }]}></View>
      <Text style={[appHeaderStyle.title]}>{label}</Text>
      <Button onPress={openModal} color="#333" title="Edit" />
      <ModalInput
        value={text}
        open={modalVisible}
        closeModal={closeModal}
        onSubmitText={text => {
          setText(text)
          closeModal()
        }}
      />
    </View>
  )
}

export default AppHeader

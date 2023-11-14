import { View, Text, StyleSheet, Button } from 'react-native'
import { flexShortcuts } from '../lib/styles'
import Icon from 'react-native-ico-material-design'

const appHeaderStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 20,
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

// Pressable 사용해서 리팩터링 해도 될듯
const AppHeader = ({ label }: { label: string }) => {
  return (
    <View style={[flexShortcuts.justifyBetween, appHeaderStyle.container]}>
      <View style={[{ width: 47 }]}></View>
      <Text style={[appHeaderStyle.title]}>{label}</Text>
      <Button color="#333" title="Edit" />
    </View>
  )
}

export default AppHeader

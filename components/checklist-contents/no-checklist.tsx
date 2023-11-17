import { Dimensions, StyleSheet, View, Image, Text } from 'react-native'

const WindowHeight = Dimensions.get('window').height
const noChecklistStyle = StyleSheet.create({
  container: {
    paddingTop: 72,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#84858F',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Noto Sans',
    marginTop: 28,
    marginBottom: 8,
  },
  desc: {
    color: '#999',
    fontFamily: 'Noto Sans',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
})
const NoChecklist = () => {
  return (
    <View style={[noChecklistStyle.container]}>
      <Image source={require('../../public/Checklists.webp')} />
      <Text style={[noChecklistStyle.headerText]}>No checklists</Text>
      <Text style={[noChecklistStyle.desc]}>
        Add checklists that should be checked weekly.
      </Text>
    </View>
  )
}

export default NoChecklist

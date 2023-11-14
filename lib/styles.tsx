import { StyleSheet } from 'react-native'

export const globalStyle = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})

export const flexShortcuts = StyleSheet.create({
  flexCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  justifyBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemsCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})

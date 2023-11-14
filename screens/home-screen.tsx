import { ScrollView, View, Text, useColorScheme } from 'react-native'
import AppHeader from '../components/app-header'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import WeekSwiperComponent from '../components/week-swiper-component'

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }
  return (
    <View>
      <AppHeader isDarkMode={isDarkMode} label="Checklists" />
      <WeekSwiperComponent />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}></ScrollView>
    </View>
  )
}

export default HomeScreen

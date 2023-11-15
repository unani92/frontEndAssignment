import { ScrollView, View, useColorScheme, Dimensions } from 'react-native'
import AppHeader from '../components/app-header'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import WeekSwiperComponent from '../components/week-swiper-component'
import { useEffect, useState } from 'react'
import { CheckList, CheckListData } from '../lib/types'
import { useQuery } from 'react-query'
import HomeService from '../lib/api/homescreen'

const ScreenHeight = Dimensions.get('window').height
const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'white',
  }
  const [checkLists, setCheckLists] = useState<CheckList[]>()
  const {
    data: res,
    isLoading,
    isError,
  } = useQuery('queryCheckListsAll', HomeService.getAllCheckLists)
  useEffect(() => {
    if (res && !isLoading && !isError) {
      console.log(res.data)
    }
  }, [res])

  return (
    <View style={{ backgroundColor: 'white', height: ScreenHeight }}>
      <AppHeader isDarkMode={isDarkMode} label="Checklists" />
      <WeekSwiperComponent />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}></ScrollView>
    </View>
  )
}

export default HomeScreen

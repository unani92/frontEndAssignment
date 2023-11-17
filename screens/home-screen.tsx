import { ScrollView, View, useColorScheme, Dimensions } from 'react-native'
import AppHeader from '../components/app-header'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import WeekCarouselComponent from '../components/week-carousel-component'
import { useContext, useEffect, useState } from 'react'
import { CheckList, CheckListData, CheckListGroupByWeek } from '../lib/types'
import { useQuery } from 'react-query'
import HomeService from '../lib/api/homescreen'
import { Store } from '../lib/context/store'
import { MAX_WEEK } from '../lib/constants'
import Progressbar from '../components/progressbar'
import CheckListContents from '../components/checklist-contents'

const WindowHeight = Dimensions.get('window').height
const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'white',
  }
  const { setCheckListGroupByWeeks } = useContext(Store)
  const {
    data: res,
    isLoading,
    isError,
  } = useQuery('queryCheckListsAll', HomeService.getAllCheckLists)
  useEffect(() => {
    if (res && !isLoading && !isError) {
      // 1. 1주부터 40주까지 주차가 추가되는 경우는 없다고 가정
      // 2. 시간 순서대로 데이터 넘겨받는다고 가정
      const checkListsGroupByWeeks: CheckListGroupByWeek[] = Array.from(
        { length: MAX_WEEK },
        (_, idx) => ({
          weekNumber: idx + 1,
          checkLists: [],
        }),
      )
      const data = res.data as CheckListData[]
      const checkLists: CheckList[] = data.map((data, idx) => ({
        id: idx + 1,
        checked: Math.random() > 0.5 ? false : true,
        data,
      }))
      checkLists.forEach(checkList => {
        checkListsGroupByWeeks[checkList.data.weekNumber - 1].checkLists.push(
          checkList,
        )
      })
      setCheckListGroupByWeeks(checkListsGroupByWeeks)
    }
  }, [res])

  return (
    <View style={{ backgroundColor: 'white', height: WindowHeight }}>
      <AppHeader isDarkMode={isDarkMode} label="Checklists" />
      <WeekCarouselComponent />
      <Progressbar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <CheckListContents />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

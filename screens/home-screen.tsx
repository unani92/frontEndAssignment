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
import Snackbar from '../components/elements/snackbar'
import FAB from '../components/elements/FAB'
import ChecklistSeeds from '../public/checklist_seeds.json'

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
  const checkListGroupByWeeksFromData = (data: CheckListData[]) => {
    const checkListsGroupByWeeks: CheckListGroupByWeek[] = Array.from(
      { length: MAX_WEEK },
      (_, idx) => ({
        weekNumber: idx + 1,
        checkLists: [],
      }),
    )
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
  useEffect(() => {
    if (res && !isLoading && !isError) {
      console.log(res)
      checkListGroupByWeeksFromData(res)
    } else if (isError) {
      console.log(isError)
      const data = ChecklistSeeds as CheckListData[]
      checkListGroupByWeeksFromData(data)
    }
  }, [res, isError, isLoading])
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: WindowHeight,
      }}>
      <AppHeader isDarkMode={isDarkMode} label="Checklists" />
      <WeekCarouselComponent />
      <Progressbar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <CheckListContents />
      </ScrollView>
      <Snackbar />
      <FAB />
    </View>
  )
}

export default HomeScreen

import React, { useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Store } from '../../lib/context/store'
import Carousel from '../elements/carousel'
import { MAX_WEEK } from '../../lib/constants'

const ITEM_WIDTH = 50
const ITEM_HEIGHT = 62
const ITEM_MARGIN = 15

const WeekItem = ({ idx, selected }: { idx: number; selected?: boolean }) => {
  return (
    <View style={[selected ? styles.itemSelected : styles.item]}>
      <View>
        <Text
          style={[
            selected ? styles.itemTextSelected : styles.itemText,
            { fontSize: 11 },
          ]}>
          Week
        </Text>
      </View>
      <Text
        style={[
          selected ? styles.itemTextSelected : styles.itemText,
          { fontSize: 18, fontWeight: '700' },
        ]}>
        {idx + 1}
      </Text>
    </View>
  )
}
const WeekCarouselComponent = () => {
  const { selectedWeek, setSelectedWeek } = useContext(Store)
  return (
    <View style={styles.container}>
      <Carousel
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        itemMargin={ITEM_MARGIN}
        itemBgColor={'#44CEC6'}
        onClickItem={idx => setSelectedWeek(idx + 1)}
        itemLen={MAX_WEEK}
        defaultItemIdx={selectedWeek}
        itemComponent={({ idx, selected }) => WeekItem({ idx, selected })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  item: {
    width: 50,
    height: 62,
    marginHorizontal: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F5F8',
    borderRadius: 20,
  },
  itemSelected: {
    width: 50,
    height: 62,
    marginHorizontal: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#44CEC6',
  },
  itemText: {
    color: '#999999',
  },
  itemTextSelected: {
    color: 'white',
  },
})

export default WeekCarouselComponent

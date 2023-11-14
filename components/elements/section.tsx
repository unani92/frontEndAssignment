import type { PropsWithChildren } from 'react'
import { Text, View, useColorScheme } from 'react-native'
import { flexShortcuts, globalStyle } from '../../lib/styles'
import { Colors } from 'react-native/Libraries/NewAppScreen'

type SectionProps = PropsWithChildren<{
  title: string
}>
export default function Section({
  children,
  title,
}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'
  return (
    <View style={[globalStyle.sectionContainer]}>
      <Text
        style={[
          globalStyle.sectionTitle,
          {
            color: isDarkMode ? Colors.white : 'blue',
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          globalStyle.sectionDescription,

          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  )
}

import { useContext } from 'react'
import { Snackbar } from 'react-native-paper'
import { Store } from '../../lib/context/store'

const SnackbarWrapper = () => {
  const { snackBarActivation, setSnackbarActivation } = useContext(Store)
  return (
    <Snackbar
      style={{ bottom: 20 }}
      visible={!!snackBarActivation}
      onDismiss={() => {
        snackBarActivation?.onDismiss && snackBarActivation.onDismiss()
        setSnackbarActivation(undefined)
      }}
      duration={2500}
      // @ts-ignore
      action={snackBarActivation?.action}>
      {snackBarActivation?.label}
    </Snackbar>
  )
}

export default SnackbarWrapper

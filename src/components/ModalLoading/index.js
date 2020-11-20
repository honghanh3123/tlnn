import { Modal, Spinner } from '@ui-kitten/components';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import styles from './styles'

export default forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const _onBackdropPress = () => {
    if (typeof props.onBackdropPress === 'function') {
      setVisible(false)
      props.onBackdropPress()
    }
  }

  useImperativeHandle(ref, () => ({
    visible,
    setVisible
  }))

  return (
    <>
      {props.children}
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={_onBackdropPress}
      >
        <Spinner size={props.size} status={props.status} />
      </Modal>
    </>
  )
})
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Spinner } from '@ui-kitten/components';
import styles from './styles';

/**
 * 
 * @param {import('@ui-kitten/components').ButtonProps} props 
 */
const AsyncButton = ({
  onPress,
  children,
  ...props
}) => {
  const [loading, setLoading] = useState(false)
  const _onPress = async () => {
    if (typeof onPress === 'function') {
      setLoading(true)
      await onPress()
      setLoading(false);
    }
  }

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size='small' status={props.status !== "basic" && "basic"} />
    </View>
  );

  return (
    <Button
      {...props}
      onPress={_onPress}
      accessoryLeft={loading && LoadingIndicator}
    >
      {children}
    </Button>
  );
}

export default AsyncButton
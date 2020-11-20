import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';

export default ({
  value,
  label,
  placeholder,
  caption,
  status,
  onChangeText,
  style
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      value={value}
      label={label}
      status={status}
      style={style}
      placeholder={placeholder}
      caption={caption}
      accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
    />
  );
};
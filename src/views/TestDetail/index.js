import React, { Fragment } from 'react';
import { Button, Avatar } from '@ui-kitten/components';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import styles from './styles';

export default () => {
  const _onPress = () => {
    
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.wrapperTitle}>
        Câu 1/15
    </Text>
      <Text style={styles.question}>Chọn cái ấm nước</Text>
      <TouchableNativeFeedback onPress={_onPress}>
        <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
          <View style={styles.wrapTopic}>
            <Avatar size='giant' source={require('../../assets/images/cai_am.png')} />
          </View>
          <View style={{ width: 20 }}></View>
          <View style={styles.wrapTopic}>
            <Avatar size='giant' source={require('../../assets/images/cai_bat.png')} />
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
        <View style={styles.wrapTopic}>
          <Avatar size='giant' source={require('../../assets/images/cai_phich.png')} />
        </View>
        <View style={{ width: 20 }}></View>
        <View style={styles.wrapTopic}>
          <Avatar size='giant' source={require('../../assets/images/item.png')} />
        </View>
      </View>
      <View>
        <Button>Đồng ý</Button>
    </View>
    </View>
  )
}
import React, { Fragment } from 'react';
import { Button, Avatar } from '@ui-kitten/components';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';

export default () => (
  <View style={styles.wrapper}>
    <Text style={styles.wrapperTitle}>
      Chọn chủ đề
    </Text>
    <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
      <View style={styles.wrapTopic}>
        <Avatar size='giant' source={require('../../assets/images/animal.png')} />
        <Text style={styles.textTopic}>Động vật</Text>
      </View>
      <View style={{ width: 20 }}></View>
      <View style={styles.wrapTopic}>
        <Avatar size='giant' source={require('../../assets/images/tree.png')} />
        <Text style={styles.textTopic}>Cây</Text>
      </View>
    </View>

    <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
      <View style={styles.wrapTopic}>
        <Avatar size='giant' source={require('../../assets/images/flower.png')} />
        <Text style={styles.textTopic}>Hoa</Text>
      </View>
      <View style={{ width: 20 }}></View>
      <View style={styles.wrapTopic}>
        <Avatar size='giant' source={require('../../assets/images/item.png')} />
        <Text style={styles.textTopic}>Đồ vật</Text>
      </View>
    </View>
  </View>
)
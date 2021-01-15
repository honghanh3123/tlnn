import React, { Fragment } from 'react';
import { Button } from '@ui-kitten/components';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { STARTTEST } from 'consts/screens';

export default () => {
  const navigation = useNavigation();

  const _onPress = () => {
    navigation.navigate(STARTTEST)
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.wrapperTitle}>
        Bài kiểm tra
      </Text>
      <View style={styles.inlineButton}>
        <Button style={styles.btnNotDo}>Chưa làm</Button>
        <Button style={styles.btnDone} appearance='outline' status='basic'>Đã làm</Button>
      </View>
      <View style={styles.wrapperTest}>
        <TouchableNativeFeedback onPress={_onPress}>
          <View style={styles.testItem}>
            <View style={styles.testBorderLeftGreen}></View>
            <View style={styles.testContent}>
              <Text style={styles.testTitleGreen}>Bài 1</Text>
              <Text style={styles.testTime}>Thời gian: 20 phút</Text>
              <Text>Số câu hỏi: 15</Text>
            </View>
            <View>
              <Text style={styles.createTime}>08:00 02/12/2020</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
  
        <View style={styles.testItem}>
          <View style={styles.testBorderLeftBlue}></View>
          <View style={styles.testContent}>
            <Text style={styles.testTitleBlue}>Bài 2</Text>
            <Text style={styles.testTime}>Thời gian: 20 phút</Text>
            <Text>Số câu hỏi: 15</Text>
          </View>
          <View>
            <Text style={styles.createTime}>08:00 02/12/2020</Text>
          </View>
        </View>
  
        <View style={styles.testItem}>
          <View style={styles.testBorderLeftRed}></View>
          <View style={styles.testContent}>
            <Text style={styles.testTitleRed}>Bài 3</Text>
            <Text style={styles.testTime}>Thời gian: 20 phút</Text>
            <Text>Số câu hỏi: 15</Text>
          </View>
          <View>
            <Text style={styles.createTime}>08:00 02/12/2020</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
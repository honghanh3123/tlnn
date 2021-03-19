import React, { Fragment, useState, useEffect } from 'react';
import { Button, List } from '@ui-kitten/components';
import { View, Text, Modal, Alert, TouchableHighlight, StyleSheet, TouchableNativeFeedback, StatusBar, VirtualizedList, RefreshControl } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { STARTTEST } from 'consts/screens';
import { set } from 'react-native-reanimated';
import { getExams } from 'service/test';
import { FlatList } from 'react-native-gesture-handler';

export default () => {
  const navigation = useNavigation();
  const [mode, setMode] = useState("DOING")
  const [exam, setExam] = useState(0);
  const [processExam, setProcessExam] = useState({
    dataSource: [],
    loading: true
  });
  // const [availabelExam, setAvailabelExam] = useState([
  //   {
  //     apiQuestion: "",
  //     nameTest: "",
  //     timeTest: "",
  //     attempts: ""
  //   }
  // ]);

  const [availabelExam, setAvailabelExam] = useState({
    dataSource: [],
    loading: true
  })

  useEffect(() => {
    loadExam();
  }, [])

  const loadExam = async () => {
    setProcessExam({
      ...processExam,
      loading: true
    })
    setAvailabelExam({
      ...availabelExam,
      loading: true
    })
    response = await getExams();
    setExam(response);
    setProcessExam({
      dataSource: response.processExam,
      loading: false
    });
    setAvailabelExam({
      dataSource: response.availabelExam,
      loading: false
    });
  }

  const [visible, setVisiable] = useState(false);

  setModalVisible = () => {
    setVisiable(!this.visible);
  }

  const _onPress = () => {
    navigation.navigate(STARTTEST)
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.wrapperTitle}>
        Bài kiểm tra
      </Text>
      <View style={styles.inlineButton}>
        <Button
          onPress={() => setMode("DOING")}
          status={mode === "DOING" ? "primary" : "basic"}
        >
          Chưa làm
          </Button>
        <Button
          onPress={() => setMode("DONE")}
          status={mode === "DONE" ? "primary" : "basic"}
        >
          Đã làm
          </Button>
      </View>
      <View style={styles.wrapperTest}>
        {(mode == "DOING") ? (
        <FlatList
          keyExtractor={item => item.nameTest}
          data={processExam.dataSource}
          refreshControl={(
            <RefreshControl 
              colors={["#0082ff"]}
              refreshing={processExam.loading}
            />
          )}
          renderItem={({ item }) => {
            return <View style={styles.testItem}>
              <View style={styles.testBorderLeftGreen}></View>
              <View style={styles.testContent}>
                <Text style={styles.testTitleGreen}>{item.nameTest}</Text>
                <Text style={styles.testTime}>{item.timeTest}</Text>
                <Text style={styles.createTime}>{item.attempts}</Text>
                <View style={{width: "100%", display: "flex", alignItems: "flex-end"}}>
                <Button onPress={_onPress}
                  style={styles.btnFooter}>
                    Bắt đầu
                  </Button>
                  </View>
              </View>
            </View>
          }}
        />
        ) : (
            <FlatList
              keyExtractor={item => item.nameTest}
              data={availabelExam.dataSource}
              refreshControl={(
                <RefreshControl 
                  colors={["#0082ff"]}
                  refreshing={availabelExam.loading}
                />
              )}
              renderItem={({ item }) => {
                return <View>
                  <View style={styles.testItem}>
                    <View style={styles.testBorderLeftBlue}></View>
                    <View style={styles.testContent}>
                      <Text style={styles.testTitleBlue}>{item.nameTest}</Text>
                      <Text style={styles.testTime}>{item.timeTest}</Text>
                      <Text style={styles.createTime}>{item.attempts}</Text>
                      <View style={{width: "100%", display: "flex", alignItems: "flex-end"}}>
                      <Button style={styles.btnFooter}>
                          Bắt đầu
                      </Button>
                      </View>
                    </View>
                  </View>
                </View>
              }}
            />
          )}
      </View>
    </View>
  )
}
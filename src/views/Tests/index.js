import React, { useState, useEffect, useCallback } from 'react';
import { Button, Spinner, Layout, Tab, TabView } from '@ui-kitten/components';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { STARTTEST } from 'consts/screens';
import { getExams } from 'service/test';

// tab đang làm
const TabDoing = ({
  dataExam
}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [dataResource, setDataResource] = useState([]);

  useEffect(() => {
    loadData();
  }, [dataExam]);

  const loadData = () => {
    try {
      let data = [];
      dataExam.map(item => {
        if(item.type == 1) {
          data.push(item);
        }
      });
      setDataResource(data);
      setLoading(false);
    } catch (error) {
      console.log("Error loadData doing", error);
    }
  }

  const _onPress = (apiQuestion) => {
    navigation.navigate(STARTTEST, {
      apiQuestion: apiQuestion
    })
  }

  return (
    <View style={styles.wrapperTest}>
      {
        loading ? (
          <View style={{ width: "100%", height: "50%", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
            <Text style={{ color: "#0072bc", marginTop: 20 }}>Vui lòng chờ giây lát.</Text>
          </View>
        ) : (
            <ScrollView>
              {
                dataResource.map((item, key) => (
                  <View style={styles.testItem} key={key}>
                    <View style={[styles.testBorderLeft, { backgroundColor: "#0E47BA" }]}></View>
                    <View style={styles.testContent}>
                      <Text style={[styles.testTitle, { color: "#0E47BA" }]}>{item.nameTest}</Text>
                      <Text>{item.timeTest}</Text>
                      <Text>{item.attempts}</Text>
                      <View style={{ width: "100%", display: "flex", alignItems: "flex-end" }}>
                        <Button onPress={() => _onPress(item.apiQuestion)}
                          style={styles.btnFooter}>
                          Bắt đầu
                        </Button>
                      </View>
                    </View>
                  </View>
                ))
              }
            </ScrollView>
          )
      }
    </View>
  )
}

// tab chưa làm
const TabUnfinish = ({
  dataExam
}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [dataResource, setDataResource] = useState([]);

  useEffect(() => {
    loadData();
  }, [dataExam]);

  const loadData = () => {
    try {
      let data = [];
      dataExam.map(item => {
        if(item.type == 2) {
          data.push(item);
        }
      });

      setDataResource(data);
      setLoading(false);
    } catch (error) {
      console.log("Error loadData doing", error);
    }
  }

  const _onPress = (apiQuestion) => {
    navigation.navigate(STARTTEST, {
      apiQuestion: apiQuestion
    })
  }

  return (
    <View style={styles.wrapperTest}>
      {
        loading ? (
          <View style={{ width: "100%", height: "50%", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
            <Text style={{ color: "#0072bc", marginTop: 20 }}>Vui lòng chờ giây lát.</Text>
          </View>
        ) : (
            <ScrollView>
              {
                dataResource.map((item, key) => (
                  <View style={styles.testItem} key={key}>
                    <View style={[styles.testBorderLeft, { backgroundColor: "#45BA0E" }]}></View>
                    <View style={styles.testContent}>
                      <Text style={[styles.testTitle, { color: "#45BA0E" }]}>{item.nameTest}</Text>
                      <Text>{item.timeTest}</Text>
                      <Text>{item.attempts}</Text>
                      <View style={{ width: "100%", display: "flex", alignItems: "flex-end" }}>
                        <Button style={styles.btnFooter} onPress={() => _onPress(item.apiQuestion)}>
                          Bắt đầu
                        </Button>
                      </View>
                    </View>
                  </View>
                ))
              }
            </ScrollView>
          )
      }
    </View>
  )
}

// tab hoàn thành
const TabFinished = ({
  dataExam
}) => {

  const [loading, setLoading] = useState(true);
  const [dataResource, setDataResource] = useState([]);

  useEffect(() => {
    loadData();
  }, [dataExam]);

  const loadData = () => {
    try {
      let data = [];
      dataExam.map(item => {
        if(item.type == 3) {
          data.push(item);
        }
      });

      setDataResource(data);
      setLoading(false);
    } catch (error) {
      console.log("Error loadData doing", error);
    }
  }

  return (
    <View style={styles.wrapperTest}>
      {
        loading ? (
          <View style={{ width: "100%", height: "50%", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
            <Text style={{ color: "#0072bc", marginTop: 20 }}>Vui lòng chờ giây lát.</Text>
          </View>
        ) : (
            <ScrollView>
              {
                dataResource.map((item, key) => (
                  <View style={styles.testItem} key={key}>
                    <View style={[styles.testBorderLeft, { backgroundColor: "#949292" }]}></View>
                    <View style={styles.testContent}>
                      <Text style={[styles.testTitle, { color: "#949292" }]}>{item.nameTest}</Text>
                      <Text>{item.timeTest}</Text>
                      <Text>{item.attempts}</Text>
                      <View style={{ width: "100%", display: "flex", alignItems: "flex-end" }}>
                        <Button style={styles.btnFooter} disabled={true}>
                          Hoàn thành
                        </Button>
                      </View>
                    </View>
                  </View>
                ))
              }
            </ScrollView>
          )
      }
    </View>
  )
}

export default () => {
  const [dataExam, setDataExam] = useState([]);
  const [countProcessExam, setCountProcessExam] = useState(0);
  const [countAvailabelExam, setCountAvailabelExam] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    loadExam();
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadExam()
    }, [])
  );

  const loadExam = async () => {
    response = await getExams();
    if(response) {
      if(response.resultData) {
        setDataExam(response.resultData);
      }
      
      if(response.countProcessExam) {
        setCountProcessExam(response.countProcessExam);
      }

      if(response.countAvailabelExam) {
        setCountAvailabelExam(response.countAvailabelExam);
      }
    }
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.wrapperTitle}>
        Bài kiểm tra
      </Text>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        style={{width: "100%", height: "100%"}}>
        <Tab title='Đang làm'>
          <Layout style={styles.layout}>
            <TabDoing dataExam={dataExam}></TabDoing>
          </Layout>
        </Tab>
        <Tab title='Chưa làm'>
          <Layout style={styles.layout}>
            <TabUnfinish dataExam={dataExam}></TabUnfinish>
          </Layout>
        </Tab>
        <Tab title='Hoàn thành'>
          <Layout style={styles.layout}>
            <TabFinished dataExam={dataExam}></TabFinished>
          </Layout>
        </Tab>
      </TabView>
    </View>
  )
}
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button, Spinner, Layout, Tab, TabView, List } from '@ui-kitten/components';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { STARTTEST } from 'consts/screens';
import { getExams } from 'service/test';
import useListTest from 'service/hooks/useListTest';

const TabTest = ({
  dataExam,
  type,
  loading
}) => {
  const navigation = useNavigation();
  const [_, dataResource] = useListTest(dataExam, type)

  const tagColor = useMemo(() => {
    switch (type) {
      case 1:
        return "#0E47BA"
      case 2:
        return "#45BA0E"
      default:
        return "#949292"
    }
  }, [type])

  const _onPress = (apiQuestion) => {
    navigation.navigate(STARTTEST, {
      apiQuestion: apiQuestion
    })
  }

  const renderItem = useCallback(({ item, key }) => (
    <View style={[styles.testItem]} key={key}>
      <View style={[styles.testBorderLeft, { backgroundColor: tagColor }]}></View>
      <View style={styles.testContent}>
        <Text style={[styles.testTitle, { color: tagColor }]}>{item.nameTest}</Text>
        <Text>{item.timeTest}</Text>
        <Text>{item.attempts}</Text>
        <View style={{ width: "100%", display: "flex", alignItems: "flex-end" }}>
          <Button
            onPress={() => _onPress(item.apiQuestion)}
            style={[styles.btnFooter, {display: type == 3 ? "none" : "flex"}]}
          >
            {"Bắt đầu"}
          </Button>
        </View>
      </View>
    </View>
  ))
  return (
    <View style={styles.wrapperTest}>
      {
        loading ? (
          <View style={{ width: "100%", height: "50%", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
            <Text style={{ color: "#0072bc", marginTop: 20 }}>Vui lòng chờ giây lát.</Text>
          </View>
        ) : (
          <List
            data={dataResource}
            renderItem={renderItem}
            style={{ backgroundColor: "white" }}
            ItemSeparatorComponent={() => (<View style={{ margin: 8 }} />)}
            ListHeaderComponent={() => (<View style={{ margin: 8 }} />)}
            ListFooterComponent={() => (<View style={{ margin: 8 }} />)}
          />
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
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    loadExam();
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadExam()
    }, [])
  );

  const loadExam = async () => {
    setLoading(true)
    response = await getExams();
    if (response) {
      if (response.resultData) {
        setDataExam(response.resultData);
      }

      if (response.countProcessExam) {
        setCountProcessExam(response.countProcessExam);
      }

      if (response.countAvailabelExam) {
        setCountAvailabelExam(response.countAvailabelExam);
      }
    }
    setLoading(false)
  }

  return (
    <Layout level="1" style={styles.wrapper}>
      <Text style={styles.wrapperTitle}>
        Bài kiểm tra
      </Text>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        style={{ width: "100%", height: "100%" }}>
        <Tab title='Đang làm'>
          <Layout level="1" style={styles.layout}>
            <TabTest dataExam={dataExam} type={1} loading={loading} />
          </Layout>
        </Tab>
        <Tab title='Chưa làm'>
          <Layout level="1" style={styles.layout}>
            <TabTest dataExam={dataExam} type={2} loading={loading} />
          </Layout>
        </Tab>
        <Tab title='Hoàn thành'>
          <Layout level="1" style={styles.layout}>
            <TabTest dataExam={dataExam} type={3} loading={loading} />
          </Layout>
        </Tab>
      </TabView>
    </Layout>
  )
}
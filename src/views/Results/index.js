import React, { Fragment, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { Spinner, Button } from '@ui-kitten/components';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { RESULTS, RESULTDETAIL } from 'consts/screens';
export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [dataResult, setDataResult] = useState({
    "id": "",
    "time": "",
    "ttaker": ""
  });

  useEffect(() => {
    loadResult(route.params)
  }, [])

  const loadResult = async (data) => {
    try {
      setLoading(true);
      const endPoint = "http://aigle.blife.ai/taoOutcomeUi/Results/getResults";
      const cookie = await AsyncStorage.getItem("@cookie");
      const response = await Axios.get(endPoint, {
        headers: {
          Cookie: cookie,
          'X-Requested-With': 'XMLHttpRequest'
        },
        params: {
          'classUri': data.name.attributes["data-uri"],
          'rows': 25,
          'page': 1,
          'sortby': 'id',
          'sortorder': 'asc',
          'sorttype': 'string'
        }
      })
      _readResult(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }

  _readResult = (result) => {
    console.log("readResult", result.data);
    setDataResult(result.data);
  }

  _onPressViewDetail = (item) => {
    navigation.navigate(RESULTDETAIL, {
      detail: item,
      classUri: route.params.name.attributes["data-uri"]
    })
  }
 
  return (
    <View>
      {
        loading ? (
          <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
          </View>
        ) : (
          <View style={styles.wrapperTest}>
            <FlatList
          keyExtractor={item => item.id}
          data={dataResult}
          // refreshControl={(
          //   <RefreshControl 
          //     colors={["#0082ff"]}
          //     refreshing={processExam.loading}
          //   />
          // )}
          renderItem={({ item }) => {
            return <View style={styles.testItem}>
              <View style={styles.testBorderLeftGreen}></View>
              <View style={styles.testContent}>
                <Text style={styles.testTitleGreen}>{item.ttaker}</Text>
                <Text style={styles.testTime}>{item.time}</Text>
                <View style={{width: "100%", display: "flex", alignItems: "flex-end"}}>
                <Button onPress={() => _onPressViewDetail(item)}
                  style={styles.btnFooter}>
                    Xem chi tiết
                  </Button>
                  </View>
              </View>
            </View>
          }}
        />
          </View>
        )
      }
    </View>
  )
}
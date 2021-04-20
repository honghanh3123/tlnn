import React, { Fragment, useState, useEffect } from 'react';
import { Button, List } from '@ui-kitten/components';
import { View, Text, RefreshControl } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { RESULTS } from 'consts/screens';
import { FlatList } from 'react-native-gesture-handler';
import dataResult from 'service/hooks/dataResult';
import he from "he";
import { getUserResults } from 'service/userResult';

export default () => {
  const navigation = useNavigation();
  const [timeLoad, setTimeLoad] = useState(Date.now());
  const [result, setResult] = useState({
    dataResource: [],
    loading: true
  })

  useEffect(() => {
    loadResult();
  }, [])

  const loadResult = async () => {
    setResult({
      ...result,
      loading: true
    })
    const result = await dataResult();
    const resultData = await loadResultByUser(result.children);

    setResult({
      dataResource: resultData,
      loading: false
    })
  }

  loadResultByUser = async (resultData) => {
    try {
      const userName = "nobita";
      console.log("result", resultData);
      let data = [];
      data = resultData.map(async item => {
        let details = await getUserResults(item.attributes["data-uri"]);
        let check = false;
        details.data.map(detail => {
          if (detail.ttaker == userName) {
            check = true;
          }
        })

        if(check){
          return item;
        }
      })
      
      data = await Promise.all(data);
      data = data.filter(item => item != undefined);
      console.log("resultData", data);
      console.log("time", Date.now() - timeLoad);
      return data;
    } catch (error) {
      console.log("Error load result by user", error);
    }
  }

  const _handleViewResult = (item) => {
    console.log("item", item);
    navigation.navigate(RESULTS, {
      name: item
    })
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.wrapperTitle}>
        Kết quả
      </Text>
      <View style={styles.wrapperTest}>
        <FlatList
          keyExtractor={item => item.attributes.id}
          data={result.dataResource}
          refreshControl={(
            <RefreshControl
              colors={["#0082ff"]}
              refreshing={result.loading}
            />
          )}
          renderItem={({ item }) => {
            return <View>
              <View style={styles.testItem}>
                <View style={styles.testBorderLeftBlue}></View>
                <View style={styles.testContent}>
                  <Text style={styles.testTitleBlue}>{he.decode(item.data)}</Text>
                  <View style={{ width: "100%", display: "flex", alignItems: "flex-end" }}>
                    <Button style={styles.btnFooter} onPress={() => _handleViewResult(item)}>
                      Xem kết quả
                      </Button>
                  </View>
                </View>
              </View>
            </View>
          }}
        />
      </View>
    </View>
  )
}
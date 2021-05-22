import React, { Fragment, useState, useEffect } from 'react';
import { Button, List, Spinner } from '@ui-kitten/components';
import { View, Text, RefreshControl } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { RESULTS } from 'consts/screens';
import { FlatList } from 'react-native-gesture-handler';
import dataResult from 'service/hooks/dataResult';
import he from "he";
import { getUserResults } from 'service/userResult';
import { xor } from 'lodash';

export default () => {
  const navigation = useNavigation();
  const [timeLoad, setTimeLoad] = useState(Date.now());
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
    setResult({
      dataResource: resultData,
      loading: false
    })
  }

  loadResultByUser = async (children) => {
    try {
      const userName = "nobita";
      console.log("children", children);
      let data = [];
      data = children.map(async item => {
        let details = await getUserResults(item.attributes["data-uri"]);
        var length = details.data.length;
        if (length > 0) {
          for (var i = 0; i < length; i++) {
            var detailItem = details.data[i];
            if (detailItem.ttaker == userName) {
              return item;
            }
          }
        }
      })

      dataResultTest = await Promise.all(data);
      console.log("dataResultTest", dataResultTest);
      dataResultTest = dataResultTest.filter(item => item != undefined);
      // console.log("time", Date.now() - timeLoad);
      return dataResultTest;
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
      {
        loading ? (
          <View style={{ width: "100%", height: "50%", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
            <Text style={{ color: "#0072bc", marginTop: 20 }}>Vui lòng chờ ít phút.</Text>
          </View>
        ) : (
            <View style={styles.wrapperTest}>
              <FlatList
                keyExtractor={item => item.attributes.id}
                data={result.dataResource}
                // refreshControl={(
                //   <RefreshControl
                //     colors={["#0082ff"]}
                //     refreshing={result.loading}
                //   />
                // )}
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
          )
      }
    </View>
  )
}



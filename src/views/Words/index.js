import React, { Fragment, useState, useEffect } from 'react';
import { Button, List } from '@ui-kitten/components';
import { View, Text, RefreshControl } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { RESULTS } from 'consts/screens';
import { FlatList } from 'react-native-gesture-handler';
import dataResult from 'service/hooks/dataResult';

export default () => {
  const navigation = useNavigation();

  const [result, setResult] = useState({
    attributes: {},
    children: [],
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
    setResult({
      attributes: result.attributes,
      children: result.children,
      loading: false
    })
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
          data={result.children}
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
                  <Text style={styles.testTitleBlue}>{item.data}</Text>
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
import React, { Fragment, useContext } from 'react';
import { Button } from '@ui-kitten/components';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootContext } from 'utils';
import Axios from 'axios';

export default () => {
  const context = useContext(RootContext);

  const _logout = async () => {
    await AsyncStorage.clear();
    context.setContext({
      isLogin: false
    })
  }

  const handle = async () => {
    const data = new FormData();
    data.append("itemResponse", JSON.stringify({"RESPONSE":{"list":{"identifier":["choice_3"]}}}))
    data.append("itemState", JSON.stringify({"RESPONSE":{"response":{"list":{"identifier":["choice_3"]}}}}))
    data.append("direction", "next");
    data.append("scope", "item");
    data.append("itemDuration", 5.007355000008829);
    try {
      const response = await Axios.post("http://aigle.blife.ai/taoQtiTest/Runner/move", data, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": "__cfduid=d22c2d0185402c43edd5a1f39ce7840801614697199; tao_xS2lIq62=oc2t89e6226fjhs3hd2075cbos",
        "X-Auth-Token": "26fb8d80d3598077a2579b86b007b3107e48d56e",
        "Content-Type": "multipart/form-data"
      },
      params: {
        testDefinition: "http://aigle.blife.ai/Aigle.rdf#i161184469672077879",
        testCompilation: "http://aigle.blife.ai/Aigle.rdf#i161184484581707882-|http://aigle.blife.ai/Aigle.rdf#i161184484519257883+",
        testServiceCallId: "http://aigle.blife.ai/Aigle.rdf#i161605233954628514",
        itemDefinition: "item-1"
      }
    })
    console.log("\n\n\n", response.data)
    } catch (error) {
      console.log("\n\n\n", error.response.data)
    }
  }

  return (
    <View style={styles.wrapper}>
      <View>
        <Button onPress={_logout}>
          Logout
        </Button>
      </View>
    </View>
  )
}
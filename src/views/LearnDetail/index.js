import React, { Fragment, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { LEARNDETAIL, LEARNITEM } from 'consts/screens';
import he from "he"
import { Button, Avatar, Spinner } from '@ui-kitten/components';
import styles from './styles';

const IC_ARR_DOWN = require('../../assets/icons/ic_arr_down.png');
const IC_ARR_UP = require('../../assets/icons/ic_arr_up.png');

const ExpandableComponent = ({ item, onClickFunction }) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <Text style={styles.headerText}>{item.category_name}</Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {/*Content under the header of the Expandable List Item*/}
        {item.childrens.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={styles.content}
            onPress={() => alert('Id: ' + item.id + ' val: ' + item.val)}>
            <Text style={styles.text}>
              {key}. {item.val}
            </Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


const LearnDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [dataStudy, setDataStudy] = useState([]);
  
  useEffect(() => {
    loadDataDetail(route.params.detail);
  }, [])

  const loadDataDetail = async (param) => {
    try {
      setLoading(true);
      const endPoint = "http://aigle.blife.ai/taoItems/Items/getOntologyData";
      const cookie = await AsyncStorage.getItem("@cookie");
      const response = await Axios.get(endPoint, {
        headers: {
          Cookie: cookie,
          'X-Requested-With': 'XMLHttpRequest'
        },
        params: {
          'extension': "taoItems",
          'perspective': "items",
          'section': "manage_items",
          'classUri': param.attributes["data-uri"],
          'hideInstances': 0,
          'filter': '*',
          'offset': 0,
          'limit': 30,
          'selected': "http_2_aigle_0_blife_0_ai_1_Aigle_0_rdf_3_i161762021751478855"
        }
      })
      _readLearnDetail(response.data.tree);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }

  _readLearnDetail = (result) => {
    const _dataStudy = [];
    if (result && result.length > 0) {
      result.map(item => {
        _dataStudy.push({
          "label": item.data,
          "count": item.count,
          "type": item.type,
          "attributes": {
            "data-classUri": item.attributes["data-classUri"],
            "data-uri": item.attributes["data-uri"],
            "id": item.attributes["id"]
          }
        })
      })
      setDataStudy(_dataStudy)
    }
  }

  const _onPress = (item) => {
    navigation.navigate(LEARNITEM, {
      detail: item,
      title: item.label,
      labelParent: route.params.title
    })
  }

  return (
    <View style={styles.wrapper}>
      {
        loading ? (
          <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
          </View>
        ) : (
            <View>
              {
                dataStudy.map((item, key) => (
                  <Button key={key} style={styles.wrapTopic} onPress={() => _onPress(item)}>
                    <Text style={styles.textTopic}>
                      {he.decode(item.label)}
                    </Text>
                  </Button>
                ))
              }
            </View>
          )
      }
    </View>
  )
}


export default {
  name: LEARNDETAIL,
  component: LearnDetail,
  options: ({ route }) => ({
    // headerStyle: {
    // },
    // headerTintColor: '#fff',
    // headerRight: ButtonCreateTrans,
    headerTitle: (
      <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Text category="s1">
          {route.name}
        </Text>
        <Text category="c2">
          {he.decode(route.params.title)}
        </Text>
      </View>
    )
  })
}
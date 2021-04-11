import React, { Fragment, useState, useEffect } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Button, Avatar, Spinner } from '@ui-kitten/components';
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
} from 'react-native';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { LEARN, LEARNDETAIL } from 'consts/screens';
import he from "he";
import DropDown from "components/DropDown";
import { create, read, deleteRealm, deleteById, update, bulkCreate } from "repositories";
import { SHEMAS_NAME } from "consts/schema";
export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [dataStudy, setDataStudy] = useState([]);

  useEffect(() => {
    loadResult(route.params);
  }, [])

  const loadResult = async (data) => {
    try {
      const data = await read(SHEMAS_NAME.WORDDIR);
      // const del = await deleteRealm(data);
      console.log("data WORDDIR", data);
      if (data && data.length > 0) {
        setLoading(false);
        const dataDB = data.map(element => ({
          _id: element._id,
          label: element.label,
          count: element.count,
          type: element.type,
          isExpanded: element.isExpanded,
          attributes: JSON.parse(element.attributes),
          childrens: JSON.parse(element.childrens)
        }))

        setDataStudy(dataDB);
      } else {
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
            'classUri': "http://aigle.blife.ai/Aigle.rdf#i160534465998506495",
            'hideInstances': 0,
            'filter': '*',
            'offset': 0,
            'limit': 30,
            'selected': "http_2_aigle_0_blife_0_ai_1_Aigle_0_rdf_3_i160421856834704158"
          }
        })
        _readResult(response.data.tree);
        setLoading(false);
      }

    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }

  const _readResult = async (result) => {
    const _dataStudy = [];
    if (result && result.length > 0) {
      result.map(item => {
        _dataStudy.push({
          "label": he.decode(item.data),
          "count": item.count || 0,
          "type": item.type,
          "isExpanded": false,
          "attributes": {
            "data-classUri": item.attributes["data-classUri"],
            "data-uri": item.attributes["data-uri"],
            "id": item.attributes["id"]
          },
          "childrens": []
        })
      })
      setDataStudy(_dataStudy);
      console.log("dataStudy before", _dataStudy[0]);

      const bulkCreateds = await bulkCreate(SHEMAS_NAME.WORDDIR, _dataStudy.map(item => ({
        ...item,
        _id: uuidv4(),
        attributes: JSON.stringify(item.attributes),
        childrens: JSON.stringify(item.childrens)
      })))

      console.log("\n\n\n items", bulkCreateds, "\n\n\n");
    }
  }

  const _onPress = (item) => {
    navigation.navigate(LEARNDETAIL, {
      detail: item,
      title: item.label
    })
  }

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  //(!multiSelect.isSingle && multiSelect.index !== index) && 
  const updateLayout = async (index, item) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...dataStudy];
    let children;
    console.log("array[index]", array[index]);
    if (!array[index]['childrens'] || !array[index]['childrens'].length) {
      children = await loadDataDetail(item);
    }
    console.log("children", children);
    if (children && children.length > 0) {
      array[index]['childrens'] = children;
      const dataUpdate = update(SHEMAS_NAME.WORDDIR, (words) => words.filtered(`_id = '${item._id}'`), { childrens: JSON.stringify(children) });
    }

    array[index]['isExpanded'] = !array[index]['isExpanded'];
    setDataStudy(array);
  };

  const loadDataDetail = async (param) => {
    try {
      setLoading(true);
      console.log("param", param);
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
      setLoading(false);
      console.log("tree", response.data);
      return _readLearnDetail(response.data.tree);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }

  const _readLearnDetail = (result) => {
    const _dataStudy = [];
    if (result && result.length > 0) {
      result.map(item => {
        let study = {
          "label": he.decode(item.data),
          "count": item.count,
          "type": item.type,
          "attributes": {
            "data-classUri": item.attributes["data-classUri"],
            "data-uri": item.attributes["data-uri"],
            "id": item.attributes["id"]
          }
        }
        if (study.type == "class") {
          _dataStudy.push(study);
        }
      })
      return _dataStudy;
    }
  }

  return (
    <View style={styles.wrapper}>
      {
        loading ? (
          <View style={{ width: "100%", height: "50%", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
          </View>
        ) : (
            <View>
              <View style={{ flexDirection: 'row', paddingRight: 10, paddingLeft: 0, paddingTop: 0 }}>
              </View>
              <ScrollView>
                {dataStudy.map((item, key) => (
                  <DropDown
                    key={item.label}
                    onClickFunction={() => {
                      updateLayout(key, item);
                    }}
                    item={item}
                    itemIndex={key}
                  />
                ))}
              </ScrollView>
            </View>
          )
      }
    </View>
  )
}
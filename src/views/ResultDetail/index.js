import React, { Fragment, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { DOMParser } from 'react-native-html-parser';
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
    loadDetailResult(route.params)
  }, [])

  const loadDetailResult = async (param) => {
    const data = new FormData();
    console.log("classUri", param.classUri);
    console.log("id", param.detail.id);
    data.append("classUri", param.classUri);
    data.append("id", param.detail.id);
    const cookie =await AsyncStorage.getItem("@cookie");
    const endPoint = "http://aigle.blife.ai/taoOutcomeUi/Results/viewResult";
    const response = await Axios.post(endPoint, data, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": cookie,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })

    // console.log("loadDetailResult", response);
    _readResult(response.data);
  }

  const _readResult = (data) => {
    console.log("_readResult", data);
    const parser = new DOMParser();
    const result = parser.parseFromString(data, "text/html");
    console.log("result", result);
    var results = [], totalPoint = 0;
    const questions = result.getElementsByClassName('matrix');
    console.log("questions", questions);
    for (var i = 0; i < questions.length; i++) {
      const tbody = questions[i].getElementsByTagName('tbody')[0];
      let point = tbody
      .getElementsByTagName('tr')[6]
      .getElementsByClassName('dataResult')[0]
      .firstChild.data;
      point = Number(point);

      let response = tbody
      .getElementsByTagName('tr')[3]
      .getElementsByClassName('dataResult')[0]
      .firstChild.data;
      response = response.trim();
      
      results.push({
        "response": response,
        "point": point
      });
      totalPoint += point;
    }

    console.log("results", results);
    // console.log("totalPoint", totalPoint);
    // const body = response.body;
    // console.log("data", response.data);
    // if (body == '' && response.headers.length == 12)
    //   return console.log("Phiên đăng nhập của bạn đã hết!");
    // else if (body == '') return console.log("Kết nối mạng không ổn định.");
    // return body;
  }

  return (
    <View>
      <Text>abc</Text>
    </View>
  )
}
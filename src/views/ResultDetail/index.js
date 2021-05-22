import React, { Fragment, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { DOMParser } from 'react-native-html-parser';
import styles from './styles';
export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [totalScore, setTotalScore] = useState(0);
  const [totalMaxScore, setTotalMaxScore] = useState(0);
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
    const cookie = await AsyncStorage.getItem("@cookie");
    const endPoint = "http://aigle.blife.ai/taoOutcomeUi/Results/viewResult";
    const response = await Axios.post(endPoint, data, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": cookie,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })

    _readResult(response.data);
  }

  const _readResult = (data) => {
    try {
      if (data.includes("div")) {
        const parser = new DOMParser();
        const result = parser.parseFromString(data, "text/html");
        var results = [], totalScore = 0, totalMaxScore = 0;
        const questions = result.getElementsByClassName('matrix');
        let totalCorrect = 0;
        for (var i = 0; i < questions.length; i++) {
          const tbody = questions[i].getElementsByTagName('tbody')[0];
          if (tbody.getElementsByTagName('tr')[6] && tbody.getElementsByTagName('tr')[3]) {
            let score = tbody
              .getElementsByTagName('tr')[6]
              .getElementsByClassName('dataResult')[0]
              .firstChild.data;
            score = Number(score);

            let maxScore = tbody
              .getElementsByTagName('tr')[7]
              .getElementsByClassName('dataResult')[0]
              .firstChild.data;

            maxScore = Number(maxScore);
            console.log("maxScore", maxScore);
            let response = tbody
              .getElementsByTagName('tr')[3]
              .getElementsByClassName('dataResult')[0]
              .firstChild.data;

            response = response.trim();

            results.push({
              "response": response,
              "score": score,
              "maxScore": maxScore
            });
            totalScore += score;
            totalMaxScore += maxScore;
          }
        }

        console.log("totalScore", totalScore);
        console.log("totalMaxScore", totalMaxScore);
        console.log("results", results);
        setTotalMaxScore(totalMaxScore);
        setTotalScore(totalScore);
      }
    } catch (error) {
      console.log("Lỗi đọc html _readResult", error);
    }
  }

  return (
    <View style={{ display: "flex", justifyContent: "center" }}>
      <View style={styles.info_item}>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16 }}>Tổng số câu hỏi: {totalMaxScore}</Text>
        </View>
      </View>
      <View style={styles.info_item}>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16 }}>Tổng số câu trả lời đúng: {totalScore}</Text>
        </View>
      </View>

      {
        totalMaxScore ? (
          <View style={styles.info_item}>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16 }}>Phần trăm trả lời đúng: {totalScore / totalMaxScore}</Text>
            </View>
          </View>
        ) : (<></>)
      }
    </View>
  )
}
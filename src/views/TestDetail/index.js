import React, { Fragment, useState, useEffect } from 'react';
import { Button, Avatar, Spinner } from '@ui-kitten/components';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import { getQuestions } from 'service/question';
import Choice from 'views/TemplateQuestion/Choice';
import Order from "views/TemplateQuestion/Order";
import Associate from "views/TemplateQuestion/Associate";
import Math from "views/TemplateQuestion/Match";
import Test from 'datafix/Test';
import { apiQuestionTest, apiInitTest } from "apis/questionTest";
import { TESTS } from 'consts/screens';
import dataparam from 'service/hooks/dataparam';
export default () => {
  const navigation = useNavigation();
  const [dataQuestion, setDataQuestion] = useState({
    baseUrl: "",
    token: "",
    typeQuestion: "",
    question: "",
    answers: "",
    suggestQuestion: ""
  })
  const route = useRoute();
  const [_qtiClass, setQtiClass] = useState({});
  const [loading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [totalQuestion, setTotalQuestion] = useState(0);
  useEffect(() => {
    getQuestion("", "");
  }, [])

  // lấy dữ liệu câu hỏi
  const getQuestion = async (itemIdentifier, token) => {
    try {
      setLoading(true);
      const dataParam = await dataparam(false, route.params.apiQuestion);
      console.log("itemIdentifier", itemIdentifier, "token", token);
      console.log(!itemIdentifier && !token);
      if(!itemIdentifier && !token){
        console.log("call APIHJKHKKKKK");
        const paramTest = await apiInitTest({
          testDefinition: dataParam.testDefinition,
          testCompilation: dataParam.testCompilation,
          serviceCallId: dataParam.serviceCallId
        });
        setTotalQuestion(paramTest.totalQuestion);
        itemIdentifier = paramTest.itemIdentifier;
        token = paramTest.token;
      }
      
      const response = await apiQuestionTest({
        token: token,
        testCompilation: dataParam.testCompilation,
        testDefinition: dataParam.testDefinition,
        serviceCallId: dataParam.serviceCallId,
        itemDefinition: itemIdentifier
      });

      _readQuestion(response.data, dataParam);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      return error;
    }
  }

  // đọc câu hỏi
  const _readQuestion = (data, dataParam) => {
    try {
      console.log("data", data);
      dataQuestion.baseUrl = data['baseUrl'];
      dataQuestion.token = data['token'];
      let elements = data.itemData.data.body.elements;
      let qtiClass = Object.values(elements)[0].qtiClass;
      setQtiClass(qtiClass)
      let question = Object.values(elements)[0].prompt.body;
      
      let choices = Object.values(elements)[0].choices;
      let objChoises = Object.values(choices);
      let answers = [];
      objChoises.forEach(item => {
        let answer = {};
        answer.value = item.body.body;
        answer.identifier = item.identifier;
        answer.qtiClass = item.qtiClass;
        answers.push(answer);
      });
      let suggestQuestion = "";
      if(Object.values(elements)[0] && Object.values(elements)[0].body && Object.values(elements)[0].body.body) {
        suggestQuestion = Object.values(elements)[0].body.body;
      }

      setDataQuestion({
        apiQuestion: route.params.apiQuestion,
        itemIdentifier: data.itemIdentifier,
        baseUrl: data['baseUrl'],
        token: data['token'],
        typeQuestion: "",
        question: question,
        answers: answers,
        paramTest: dataParam,
        suggestQuestion: suggestQuestion
      });
      
    } catch (error) {
      return error;
    }
  }

  // next question
  const handleNextQuestion = (itemIdentifier, token) => {
    setQuestionIndex(questionIndex + 1);
    getQuestion(itemIdentifier, token);
  }

  const hanleEndTest = () => {
    navigation.navigate(TESTS);
  }
  return (
    <View style={styles.wrapper}>
      <Text style={styles.wrapperTitle}>
        {`Câu ${questionIndex}`}
      </Text>
      <View style={{ width: "100%", height: "65%" }}>
        {
          loading ? (
            <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
              <Spinner />
            </View>
          ) : (
          _qtiClass == "choiceInteraction" 
            ? <Choice dataQuestion={dataQuestion} 
              onNextQuestion={handleNextQuestion}
              loading={loading}
              questionIndex={questionIndex}
              totalQuestion={totalQuestion}
              hanleEndTest={hanleEndTest}/>
            : _qtiClass == "orderInteraction" 
            ? <Order dataQuestion={dataQuestion} 
              onNextQuestion={handleNextQuestion}
              loading={loading}
              questionIndex={questionIndex}
              totalQuestion={totalQuestion}
              hanleEndTest={hanleEndTest}
              />
            : _qtiClass == "gapMatchInteraction"
            ? <Associate dataQuestion={dataQuestion} 
              onNextQuestion={handleNextQuestion}
              loading={loading}
              questionIndex={questionIndex}
              totalQuestion={totalQuestion}
              hanleEndTest={hanleEndTest}/>
            : <Math dataQuestion={dataQuestion} 
              onNextQuestion={handleNextQuestion}
              loading={loading}
              questionIndex={questionIndex}
              totalQuestion={totalQuestion}
              hanleEndTest={hanleEndTest}/>
            )
        }
      </View>
    </View>
  )
}
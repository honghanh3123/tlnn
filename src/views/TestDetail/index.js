import React, { Fragment, useState, useEffect } from 'react';
import { Button, Avatar, Spinner } from '@ui-kitten/components';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import styles from './styles';
import { getQuestions } from 'service/question';
import Cat from 'views/TemplateQuestion/Order';
import Choice from 'views/TemplateQuestion/Choice';
import Order from "views/TemplateQuestion/Order";
import Associate from "views/TemplateQuestion/Associate";
import Math from "views/TemplateQuestion/Match";
import Test from 'datafix/Test';
import { apiQuestionTest } from "apis/questionTest";
export default () => {
  const [dataQuestion, setDataQuestion] = useState({
    baseUrl: "",
    token: "",
    typeQuestion: "",
    question: "",
    answers: "",
    suggestQuestion: ""
  })
  const [_qtiClass, setQtiClass] = useState({});
  const [loading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(4);
  useEffect(() => {
    getQuestion();
  }, [questionIndex])

  // lấy dữ liệu câu hỏi
  const getQuestion = async () => {
    try {
      setLoading(true);
      let paramTest = await getQuestions(`item-${questionIndex}`);
      const response = await apiQuestionTest({
        ...paramTest
      });
      _readQuestion(response.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      return error;
    }
  }

  // đọc câu hỏi
  const _readQuestion = (data) => {
    try {
      
      dataQuestion.baseUrl = data['baseUrl'];
      dataQuestion.token = data['token'];
      let elements = data.itemData.data.body.elements;
      let qtiClass = Object.values(elements)[0].qtiClass;
      let question = Object.values(elements)[0].prompt.body;
      let suggestQuestion = Object.values(elements)[0].body.body;
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
      // dataQuestion.question = question;
      // dataQuestion.answers = answers;
      setDataQuestion({
        baseUrl: data['baseUrl'],
        token: data['token'],
        typeQuestion: "",
        question: question,
        answers: answers,
        suggestQuestion: suggestQuestion ? suggestQuestion : ""
      });
      setQtiClass(qtiClass)
    } catch (error) {
      return error;
    }
  }

  // next question
  const handleNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
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
              questionIndex={questionIndex}/>
            : _qtiClass == "orderInteraction" 
            ? <Order dataQuestion={dataQuestion} 
              onNextQuestion={handleNextQuestion}
              loading={loading}
              questionIndex={questionIndex}
              />
            : _qtiClass == "gapMatchInteraction"
            ? <Associate dataQuestion={dataQuestion} 
              onNextQuestion={handleNextQuestion}
              loading={loading}
              questionIndex={questionIndex}/>
            : <Math dataQuestion={dataQuestion} 
              onNextQuestion={handleNextQuestion}
              loading={loading}
              questionIndex={questionIndex}/>
            )
        }
      </View>
    </View>
  )
}
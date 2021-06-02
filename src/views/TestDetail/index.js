import React, { Fragment, useState, useEffect } from 'react';
import { Button, Avatar, Spinner } from '@ui-kitten/components';
import { View, Text, Image } from 'react-native';
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
import { getItemData, getLinkFile } from "apis/getItemLearn";
import fs from "react-native-fs"
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
      const dataParam = await dataparam(true, route.params.apiQuestion);
      if (!itemIdentifier && !token) {
        const paramTest = await apiInitTest({
          testDefinition: dataParam.testDefinition,
          testCompilation: dataParam.testCompilation,
          serviceCallId: dataParam.serviceCallId
        });
        setTotalQuestion(paramTest.totalQuestion);
        setQuestionIndex(paramTest.totalAnswer);
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
      await _readQuestion(response.data, dataParam);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      return error;
    }
  }

  // đọc câu hỏi
  const _readQuestion = async (data, dataParam) => {
    try {
      dataQuestion.baseUrl = data['baseUrl'];
      dataQuestion.token = data['token'];
      let elements = data.itemData.data.body.elements;
      let qtiClass = Object.values(elements)[0].qtiClass;
      setQtiClass(qtiClass);
      let question = {
        label: "",
        linkAudio: "",
        linkVideo: ""
      };
      question.label = Object.values(elements)[0].prompt.body;
      if (Object.values(elements)[0].prompt.elements) {
        let ele = Object.values(elements)[0].prompt.elements;
        let attr = Object.values(ele);
        if (attr && attr.length > 0) {
          //nếu nội dung gợi ý cho câu hỏi có hình ảnh hay âm thanh thì lưu file để gọi khi view
          question.label = question.label.replace("{{" + attr[0].serial + "}}", "").trim();
          let typeLink = attr[0].attributes.type.split("/")[0];
          let { tail, base64 } = await getLinkFile(data['baseUrl'] + attr[0].attributes.data);
          if (typeLink == "audio") {
            await fs.mkdir(fs.DocumentDirectoryPath + `/question/audios`);
            await fs.writeFile(fs.DocumentDirectoryPath + `/question/audios/${attr[0].attributes.data}`, base64, "base64");
            question.linkAudio = fs.DocumentDirectoryPath + `/question/audios/${attr[0].attributes.data}`;
          } else if (typeLink == "video") {
            await fs.mkdir(fs.DocumentDirectoryPath + `/question/video`);
            await fs.writeFile(fs.DocumentDirectoryPath + `/question/video/${attr[0].attributes.data}`, base64, "base64");
            question.linkVideo = fs.DocumentDirectoryPath + `/question/video/${attr[0].attributes.data}`;
          }
        }
      }
      console.log("yes");
      var maxChoices = 0;
      if(qtiClass == "choiceInteraction"){
        // check xem câu hỏi lựa chọn 1 đáp án hay nhiều đáp án
        var attributes = Object.values(elements)[0].attributes;
        if(attributes){
          maxChoices = attributes.maxChoices;
        }
      }

      let choices = Object.values(elements)[0].choices;
      let objChoises = Object.values(choices);
      var orders = [];
      objChoises.map(item => {
        orders.push(item.identifier); // id đáp án để chọn choice_1
      });
      let answers = await Promise.all(objChoises.map(async item => {
        let answer = {};
        let elements = Object.values(item.body.elements);
        if (!elements || !elements.length) {
          answer.value = item.body.body;
          answer.type = "text";
          answer.identifier = item.identifier;
          answer.qtiClass = item.qtiClass;
        } else {
          let typeLink = elements[0].attributes.type.split("/")[0];
          if (typeLink == "image") {
            let { tail, base64 } = await getLinkFile(data['baseUrl'] + elements[0].attributes.src);
            answer.value = `data:image/${tail};base64,${base64}`;
            answer.type = "img";
            answer.identifier = item.identifier;
            answer.qtiClass = item.qtiClass;
          }
        }
        return answer;
      }))

      let suggestQuestion = "";
      if (Object.values(elements)[0] && Object.values(elements)[0].body && Object.values(elements)[0].body.body) {
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
        suggestQuestion: suggestQuestion,
        maxChoices: maxChoices,
        orders: orders
      });
    } catch (error) {
      setLoading(false)
      console.log("Đã có lỗi xảy ra", error);
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
                  hanleEndTest={hanleEndTest} />
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
                      hanleEndTest={hanleEndTest} />
                    : <Math dataQuestion={dataQuestion}
                      onNextQuestion={handleNextQuestion}
                      loading={loading}
                      questionIndex={questionIndex}
                      totalQuestion={totalQuestion}
                      hanleEndTest={hanleEndTest} />
            )
        }
      </View>
    </View>
  )
}
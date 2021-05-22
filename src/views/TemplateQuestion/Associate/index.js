import React, { Fragment, useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, TouchableNativeFeedback, TouchableHighlight, Image } from 'react-native';
import { Button, Spinner, Avatar } from '@ui-kitten/components';
import dataparam from 'service/hooks/dataparam';
import { moveitem } from 'service/moveitem';
import styles from './styles';
import { LongPressGestureHandler } from 'react-native-gesture-handler';

export default ({
  dataQuestion,
  onNextQuestion,
  loading,
  questionIndex,
  totalQuestion,
  hanleEndTest
}) => {
  const [selected, setSelected] = useState({})
  const { current: startTime } = useRef(Date.now());

  const testAnswer = dataQuestion.answers;

  const handleMoveItem = async () => {
    try {
      let answerChoice = [];
    let objectValues = Object.values(selected);
    objectValues && objectValues.length > 0 && objectValues.map((item, index) => {
      answerChoice.push([
        item.identifier,
        `gap_${index + 1}`
      ]);
    })

    if (answerChoice && answerChoice.length > 0) {
      let itemResponse = {
        "RESPONSE":
        {
          "list":
          {
            "directedPair": answerChoice
          }
        }
      };

      let itemState = {
        "RESPONSE":
        {
          "response":
          {
            "list":
            {
              "directedPair": answerChoice
            }
          }
        }
      };

      let itemDuration = Date.now() - startTime;
      const dataParam = {
        testDefinition: dataQuestion.paramTest.testDefinition,
        testCompilation: dataQuestion.paramTest.testCompilation,
        serviceCallId: dataQuestion.paramTest.serviceCallId
      }; 
      dataParam.itemDefinition = dataQuestion.itemIdentifier;
      const data = await moveitem(dataQuestion.token, dataParam, {
        "itemResponse": JSON.stringify(itemResponse),
        "itemState": JSON.stringify(itemState),
        "itemDuration": itemDuration
      });

      return data;
    } else {
      alert("Bạn chưa chọn câu trả lời:))");
    }
    } catch (error) {
      console.log("Error handleMoveItem", error);
    }
  }
  const _onPress = async () => {
    const data = await handleMoveItem();
    if (data && data.success) {
      console.log("Lưu thành công!!");
      onNextQuestion(data.testContext.itemIdentifier, data.token);
    } else {
      console.log("Lưu thất bại!!");
    }
  }

  const _onPressEnd = async () => {
    const data = await handleMoveItem();
    if (data && data.success) {
      console.log("Lưu thành công!!");
      hanleEndTest();
    } else {
      console.log("Lưu thất bại!!");
    }
  }

  const handlePressItem = (item, numberSelected) => () => {
    const _selected = { ...selected }
    if (Object.keys(selected).length < numberSelected) {
      if (selected[item.value]) {
        delete _selected[item.value]
      }
      else {
        _selected[item.value] = item
      }
    } else if (Object.keys(selected).length == numberSelected) {
      delete _selected[item.value];
      _selected[item.value] = item;
    }
    setSelected(_selected)
  }

  const _onPressResult = (value) => () => {
    const _selected = { ...selected }
    if (value) {
      delete _selected[value];
    }
    setSelected(_selected)
  }
  let arrQuestion = [];
  let suggestQuestion = dataQuestion.suggestQuestion.toString().replace(/^(\<p\>)(.+)(\<\/p\>)$/g, (...args) => args[2]);
  suggestQuestion = suggestQuestion.replace("<p>", "").replace("</p>", "");
  let arrSugQues = suggestQuestion.split(/\{\{\w+\}\}/g);
  arrSugQues.forEach(element => {
    arrQuestion.push(element.trim());
  });

  const selectdValues = useMemo(() => Object.keys(selected), [selected]);
  return (
    <View style={styles.wrapper}>
      <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Text style={styles.question}>{dataQuestion.question.label || ""}</Text>
      </View>
      <View style={styles.wrapContent}>
        <View style={styles.wrapItem}>
          {
            testAnswer && testAnswer.length > 0 ? testAnswer.map((item, index) => (
              <View key={index} style={{ margin: 10 }}>
                <Button
                  size="giant"
                  status="warning"
                  appearance='outline'
                  onPress={handlePressItem(item, 2)}
                >
                  {
                    () => <View style={{ width: 110, alignItems: "center" }}>
                      <Text>{item.value}</Text>
                    </View>
                  }
                </Button>
              </View>
            )) :
              null
          }
        </View>
        <View style={styles.orderResult}>
          {
            arrQuestion && arrQuestion.length > 0 ? arrQuestion.map((item, index) => (
              <View key={index} style={{ marginRight: 5, marginBottom: 5 }}>
                {
                  (index < arrQuestion.length - 1) ? (
                    <View style={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ marginRight: 4 }}>{item}</Text>
                      <Button
                        size="tiny"
                        onPress={_onPressResult(selectdValues[index])}
                        appearance='outline'
                      >
                        {
                          () => <Text style={{ minWidth: 50 }}>
                            {selectdValues[index] ? selectdValues[index] : ""}
                          </Text>
                        }
                      </Button>
                    </View>
                  )
                    : (
                      <Text>{item}</Text>
                    )
                }
              </View>
            )) :
              null
          }
        </View>
      </View>
      <View style={{position: "absolute", bottom: 10}}>
        {
          questionIndex === totalQuestion ? (
            <Button
              disabled={loading}
              onPress={_onPressEnd}
              style={{ marginTop: 10 }}
            >
              {"Kết thúc"}
            </Button>
          ) : (
              <Button
                disabled={loading}
                onPress={_onPress}
                style={{ marginTop: 10 }}
              >
                {"Đồng ý"}
              </Button>
            )
        }
      </View>
    </View>
  );
}
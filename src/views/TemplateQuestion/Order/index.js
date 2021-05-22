import React, { Fragment, useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import { Button, Spinner, Avatar } from '@ui-kitten/components';
import styles from './styles';
import { moveitem } from 'service/moveitem';
import dataparam from 'service/hooks/dataparam';

export default ({
  dataQuestion,
  onNextQuestion,
  loading,
  questionIndex,
  totalQuestion,
  hanleEndTest
}) => {
  // const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState({})
  const { current: startTime } = useRef(Date.now())

  const [choose, setChoose] = useState("FALSE");

  const testAnswer = dataQuestion.answers;
  const handlePressItem = (item, numberSelected) => () => {
    const _selected = { ...selected }
    if (!selected[item.value]) {
      _selected[item.value] = item
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

  const handleMoveItem = async () => {
    try {
      let answerChoice = [];
      selectdValues && selectdValues.length > 0 && selectdValues.map((item, index) => {
        answerChoice.push(item.identifier);
      })

      if (answerChoice && answerChoice.length > 0) {
        let itemResponse = {
          "RESPONSE":
          {
            "list":
            {
              "identifier": answerChoice
            }
          }
        }

        let itemState = {
          "RESPONSE":
          {
            "response":
            {
              "list":
              {
                "identifier": answerChoice
              }
            }
          }
        }

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
      console.log("Error hanleMoveItem", error);
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

  const selectdValues = useMemo(() => Object.values(selected), [selected])
  return (
    <View style={styles.wrapper}>
      <Text style={styles.question}>{dataQuestion.question.label || ""}</Text>
      <View style={styles.wrapContent}>
        <View style={styles.wrapItem}>
          {
            testAnswer && testAnswer.length > 0 ? testAnswer.map((item, index) => (
              <View key={index} style={{ margin: 10 }}>
                <Button
                  size="giant"
                  status="warning"
                  appearance='outline'
                  onPress={handlePressItem(item, 4)}
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
            selectdValues && selectdValues.length > 0 ? selectdValues.map((item, index) => (
              <View key={index} style={{ marginRight: 5, marginBottom: 5 }}>
                <Button
                  size="small"
                  onPress={_onPressResult(item.value)}
                  appearance='outline'
                >{
                    () => <Text>{item.value}</Text>
                  }</Button>
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
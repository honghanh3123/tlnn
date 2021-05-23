import React, { Fragment, useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, TouchableNativeFeedback, TouchableHighlight, Image } from 'react-native';
import { Button, Spinner, Avatar, Icon } from '@ui-kitten/components';
import styles from './styles';
import dataparam from 'service/hooks/dataparam';
import { moveitem } from 'service/moveitem';
import Sound from 'react-native-sound';
export default ({
  dataQuestion,
  onNextQuestion,
  loading,
  questionIndex,
  totalQuestion,
  hanleEndTest
}) => {
  const [selected, setSelected] = useState({})
  const { current: startTime } = useRef(Date.now())

  const handleMoveItem = async () => {
    try {
      let answerChoice = [];
      let values = Object.values(selected);
      values && values.length > 0 && values.map((item, index) => {
        if (item && item.identifier) {
          answerChoice.push(item.identifier);
        }
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
      console.log("Error handleMoveItem", error);
    }
  }

  const _onPress = async () => {
    const data = await handleMoveItem();
    if (data && data.success) {
      onNextQuestion(data.testContext.itemIdentifier, data.token);
    } else {
      console.log("Lưu thất bại!!");
    }
  }

  const _onPressEnd = async () => {
    const data = await handleMoveItem();
    if (data && data.success) {
      hanleEndTest();
    } else {
      console.log("Lưu thất bại!!");
    }
  }

  const testAnswer = dataQuestion.answers;
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
      const randomValue = Object.keys(selected)[Math.floor(Math.random() * 10000) % Object.keys(selected).length]
      delete _selected[randomValue];
      _selected[item.value] = item;
    }
    setSelected(_selected)
  }
  const selectdValues = useMemo(() => Object.keys(selected), [selected]);

  const playSound = (path) => {
    const sound = new Sound(path, '', () => {
      sound.play();
    })
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.question}>{dataQuestion.question.label || ""}</Text>
      {
        dataQuestion.question.linkAudio ? (
          <Icon
            style={{ width: 32, height: 32 }}
            fill='#0072bc'
            name='volume-up-outline'
            onPress={() => { playSound(dataQuestion.question.linkAudio) }}
          />
        ) : (<></>)
      }
      <View style={styles.wrapContent}>
        <View style={styles.wrapItem}>
          {
            testAnswer && testAnswer.length > 0 ? testAnswer.map((item, index) => (
              <View key={index} style={{ margin: 10 }}>
                <Button
                  size="giant"
                  status="warning"
                  appearance={selectdValues.includes(item.value) ? 'filled' : 'outline'}
                  onPress={handlePressItem(item, 1)}
                >
                  {
                    () => <View style={{ width: 110, alignItems: "center", minHeight: 100, justifyContent: "center", display: "flex" }}>
                      {
                        item.type == "text" ? (
                          <Text>{item.value}</Text>
                        ) : item.type == "img" ? (
                          <Image
                            style={{ minHeight: 90, width: 100 }}
                            source={{
                              uri: item.value
                            }}
                          />
                        ) : (<></>)
                      }
                    </View>
                  }
                </Button>
              </View>
            )) :
              null
          }
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 10 }}>
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
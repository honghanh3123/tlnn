import React, { Fragment, useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import { Button, Spinner, Avatar } from '@ui-kitten/components';
import styles from './styles';
import dataparam from 'service/hooks/dataparam';
import { moveitem } from 'service/moveitem';
export default ({
  dataQuestion,
  onNextQuestion,
  loading,
  questionIndex
}) => {
  const [selected, setSelected] = useState({})
  const { current: startTime } = useRef(Date.now())
  const [choose, setChoose] = useState("FALSE");

  const _onPress = async () => {
    let answerChoice = [];
    selectdValues && selectdValues.length > 0 && selectdValues.map((item, index) => {
      answerChoice.push(item.identifier);
    })
    let itemResponse = `{"RESPONSE":{"list":{"identifier":${answerChoice}}}}`;

    let itemState = `{"RESPONSE":{"response":{"list":{"identifier":${answerChoice}}}}}`;

    let itemDuration = Date.now() - startTime;
    const dataParam = await dataparam(false);
    dataParam.itemDefinition = "item-" + questionIndex;
    console.log("index", dataQuestion.token);
    console.log("index", dataParam.testDefinition);
    console.log("index", dataParam.testCompilation);
    console.log("index", dataParam.serviceCallId);
    console.log("index", itemResponse);
    console.log("index", itemState);
    console.log("index", itemDuration);
    const response = moveitem(dataQuestion.token, dataParam, {
      itemResponse,
      itemState,
      itemDuration
    });
    console.log("response", response);
    onNextQuestion();
  }

  const testAnswer = dataQuestion.answers;
  const handlePressItem = (item, numberSelected) => () => {
    const _selected = {...selected}
    if(Object.keys(selected).length < numberSelected){
      if(selected[item.value]) {
        delete _selected[item.value]
      }
      else {
        _selected[item.value] = item
      }
    }else if (Object.keys(selected).length == numberSelected) {
      const randomValue = Object.keys(selected)[Math.floor(Math.random() * 10000) % Object.keys(selected).length]
      delete _selected[randomValue];
      _selected[item.value] = item;
    }
    setSelected(_selected)
  }
  const selectdValues = useMemo(() => Object.keys(selected), [selected])
  return (
    <View style={styles.wrapper}>
      <Text style={styles.question}>{dataQuestion.question || ""}</Text>
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
                    () => <View style={{ width: 110, alignItems: "center", minHeight: 60, justifyContent: "center", display: "flex" }}>
                      <Text>{item.value}</Text>
                    </View>
                  }
                </Button>
              </View>
            )) :
            null
          }
        </View>
      </View>
      <View>
        <Button
          disabled={loading}
          onPress={_onPress}
          style={{marginTop: 30}}
        >
          {"Đồng ý"}
        </Button>
      </View>
    </View>
  );
}
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
  questionIndex
}) => {
  // const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState({})
  const { current: startTime } = useRef(Date.now())

  const [choose, setChoose] = useState("FALSE");

  useEffect(() => {
    // initLoading()
  }, [])

  // const initLoading = () => {
  //   if (dataQuestion.question.trim()) {
  //     setLoading(false)
  //   }
  //   else {
  //     setLoading(true)
  //   }
  // }
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
    onNextQuestion();
  }

  const selectdValues = useMemo(() => Object.values(selected), [selected])
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
      <View>
        <Button
          disabled={loading}
          onPress={_onPress}
        >
          {"Đồng ý"}
        </Button>
      </View>
    </View>
  );
}
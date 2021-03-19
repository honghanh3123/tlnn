import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import { Button, Spinner, Avatar } from '@ui-kitten/components';
import styles from './styles';

export default ({
  dataQuestion,
  onNextQuestion,
  loading,
  questionIndex
}) => {
  const [selected, setSelected] = useState({})

  const [choose, setChoose] = useState("FALSE");

  const testAnswer = dataQuestion.answers;
  console.log("dataQuestion associate", dataQuestion);

  const _onPress = () => {
    onNextQuestion();
  }
  
  const handlePressItem = (item, numberSelected) => () => {
    const _selected = {...selected}
    
    if(Object.keys(selected) < numberSelected){
      if(selected[item.value]) {
        delete _selected[item.value]
      }
      else {
        _selected[item.value] = item
      }
    }else if (Object.keys(selected) == numberSelected) {
      delete _selected[item.value];
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
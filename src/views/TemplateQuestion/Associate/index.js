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
    const _selected = { ...selected }
    console.log("\n\n\n item", item, "numberSelected", numberSelected);
    console.log("Object.keys(selected) < numberSelected", Object.keys(selected).length, numberSelected);
    console.log("selected[item.value]", selected[item.value]);
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
    console.log("_selected 1", _selected);
    setSelected(_selected)
  }

  const _onPressResult = (value) => () => {
    const _selected = { ...selected }
    if (value) {
      delete _selected[value];
    }
    setSelected(_selected)
  }
  console.log("dataQuestion.suggestQuestion", dataQuestion.suggestQuestion);
  let arrQuestion = [];
  let suggestQuestion = dataQuestion.suggestQuestion.toString().replace(/^(\<p\>)(.+)(\<\/p\>)$/g, (...args) => args[2]); 
  suggestQuestion = suggestQuestion.replace("<p>", "").replace("</p>", "");
  let arrSugQues = suggestQuestion.split(/\{\{\w+\}\}/g);
  arrSugQues.forEach(element => {
    arrQuestion.push(element.trim());
  });
  
  console.log("arrSugQues", arrQuestion);
  const selectdValues = useMemo(() => Object.keys(selected), [selected]);
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
            arrQuestion && arrQuestion.length > 0 ? arrQuestion.map((item, index) => (
              <View key={index} style={{ marginRight: 5, marginBottom: 5 }}>
                {
                  (index < arrQuestion.length - 1) ? (
                    <View style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center"}}>
                      <Text style={{marginRight: 4}}>{item}</Text>
                      <Button
                      size="tiny"
                      onPress={_onPressResult(selectdValues[index])}
                      appearance='outline'  
                      >
                        {
                          () => <Text style={{minWidth: 50}}>
                            {console.log("selectdValues[index]", selectdValues[index])}
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
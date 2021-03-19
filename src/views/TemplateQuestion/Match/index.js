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

  const _onPress = () => {
    onNextQuestion();
  }

  const testAnswer = dataQuestion.answers;
  const handlePressItem = (item, numberSelected) => () => {
    const _selected = {...selected}
    // if(selected[item.value]) {
    //   delete _selected[item.value]
    // }
    // else {
    //   _selected[item.value] = item
    // }
    if(Object.keys(selected) < numberSelected){
      if(selected[item.value]) {
        delete _selected[item.value]
      }
      else {
        _selected[item.value] = item
      }
      // _selected[item.value] = item
      
    }else if (Object.keys(selected) == numberSelected) {
      delete _selected[item.value];
      _selected[item.value] = item;
    }
    setSelected(_selected)
  }
  const selectdValues = useMemo(() => Object.keys(selected), [selected])
  return (
    <View>
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
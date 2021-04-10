import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from './styles';
import { LEARNITEM } from 'consts/screens';
export default ({ item, onClickFunction, itemIndex }) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);
  const navigation = useNavigation();
  const [colorHeader, setColorHeader] = useState(["DEA84E", "F8F6E9", "5B621C", "AE8B65"]);
  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  const _onPress = (itemSubcategory, labelParent) => {
    navigation.navigate(LEARNITEM, {
      detail: itemSubcategory,
      title: itemSubcategory.label,
      labelParent: labelParent
    })
  }

  return (
    <View style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}
        >
        <View style={{display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row"}}>
          <Text style={styles.headerText}>{item.label}</Text>
          {
            item.isExpanded ? (
              <Image style={{ width: 20, height: 20 }} source={require("../../assets/icons/ic_arr_down.png")} />
            ) : (
              <Image style={{ width: 20, height: 20 }} source={require("../../assets/icons/ic_arr_up.png")} />
            )
          }
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden'
        }}>
        {/*Content under the header of the Expandable List Item*/}
        {item.childrens.length > 0 && item.childrens.map((itemSubcategory, key) => (
          <TouchableOpacity
            key={key}
            style={styles.content}
            onPress={() => _onPress(itemSubcategory, item.label)}>
            <Text style={styles.text}>
              {key}. {itemSubcategory.label}
            </Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
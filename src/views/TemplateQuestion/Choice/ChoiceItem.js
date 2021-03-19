import React, { useState } from 'react';

export default () => {
  const [isselectd, setIsSelected] = useState(false)
  return (
    <TouchableHighlight style={styles.wrapTopic} key={index} onPress={()=>setChoose("TRUE")}>
                <View style={choose == "TRUE" ? styles.wrapNotChoose : styles.wrapChoise}>
                  <Text>{item.value || ""}</Text>
                  </View>
              </TouchableHighlight>
  )
}
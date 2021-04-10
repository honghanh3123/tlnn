import { Divider, Icon, ListItem, Text } from "@ui-kitten/components";
import React, { useCallback } from "react";
import { View } from "react-native";

const ListItemGroup = ({
  item,
}) => {
  const renderTitle = useCallback((titlerProps) => (
    <View style={{ paddingLeft: item.isChild ? 5 : 0 }}>
      <Text {...titlerProps}>
        {item.title}
      </Text>
    </View>
  ), [item])
  const renderLeft = useCallback((leftProps) => (
    <View style={{ flexDirection: "row" }}>
      {
        item.isChild ? (
          <View style={{ position: "relative", marginRight: 20, marginLeft: 20 }}>
            <View style={{
              height: 26,
              top: -12,
              width: 16,
              borderLeftWidth: 1,
              borderBottomWidth: 1,
              borderBottomLeftRadius: 8,
              position: "absolute",
              left: 0,
              borderColor: "#c0c0c0"
            }} />
            {
              !item.isLatest ? (
                <View style={{
                  height: 36,
                  left: 0,
                  width: 0,
                  borderLeftWidth: 1,
                  position: "absolute",
                  borderColor: "#c0c0c0"
                }} />
              ) : null
            }
          </View>
        ) : null
      }
      {/* <Icon {...leftProps} {...item.icon} /> */}
    </View>
  ), [item])

  return (
    <>
      <ListItem
        title={renderTitle}
        accessoryLeft={renderLeft}
        onPress={item.onPress}
      />
      {
        item.isLatest ? (
          <Divider style={{ height: 1 }} />
        ) : null
      }
    </>
  )
}

export default (props) => <ListItemGroup {...props} />
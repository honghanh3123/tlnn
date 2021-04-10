import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, ScrollView, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { LEARNITEM } from 'consts/screens';
import he from "he"
import { Button, Avatar, Spinner, List, ListItem } from '@ui-kitten/components';
import styles from './styles';
import { getItemData, getLinkFile } from "apis/getItemLearn";
import fs from "react-native-fs"
import CardFlip from 'react-native-card-flip';
import Sound from 'react-native-sound';
import {create, read} from "repositories";
import { SHEMAS_NAME } from "consts/schema";

const Card = ({
  uri, label, width, height, pathDir, pathFile
}) => {
  const ref = useRef();

  const handleFlip = () => {
    if (ref.current) {
      ref.current.flip()
    }

    handleLoadAudio(pathDir, pathFile);
  }

  const handleLoadAudio = async (pathDir, pathFile) => {
    try {
      const files = await fs.readDir(pathDir);
      const file = files.find(file => {
        var firstLink = file.path.split(".");
        firstLink.pop();
        return firstLink.join(".") === pathFile;
      });
      
      playSound(file.path);
      //return `data:image/${file.path.split(".").pop()};base64,${file}`;
    } catch (error) {
      console.log("Error loadAudio", error);
    }
  }

  const playSound = (path) => {
    Sound.setCategory('Playback');
    const sound = new Sound(path, '', () => sound.play())
  }

  return (
    <CardFlip
      style={{
        height: height,
        width: width,
        margin: 10
      }}
      ref={ref}
    >
      <TouchableNativeFeedback onPress={handleFlip} background={TouchableNativeFeedback.Ripple('gray')}>
        <Image
          style={{ height: height, width: width }}
          source={{
            uri
          }}
        />
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={handleFlip} background={TouchableNativeFeedback.Ripple('gray')}>
        <View
          style={{ backgroundColor: "#0072bc", width: width, height: height, display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{color: "#fff", fontSize: 18}}>{label}</Text>
        </View>
      </TouchableNativeFeedback>
    </CardFlip>
  )
}

const LearnItem = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [dataStudy, setDataStudy] = useState([]);
  const [responseFile, setResponseFile] = useState([]);
  const [imgBase64s, setImgBase64s] = useState([]);

  useEffect(() => {
    loadDataDetail(route.params.detail);
    handleLoadImage();
  }, [])

  const handleLoadImage = async () => {
    try {
      const files = await fs.readDir(fs.DocumentDirectoryPath + `/images/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}`)
      const promisesGetFile = files.map(file => new Promise((resolve, reject) => {
        fs.readFile(file.path, "base64")
          .then(_base64 => {
            resolve({
              "label": file.path.split("/").pop().split(".")[0],
              "uri": `data:image/${file.path.split(".").pop()};base64,${_base64}`
            })
          })
      }));
      const _imageBase64s = await Promise.all(promisesGetFile)
      setImgBase64s(_imageBase64s);
    } catch (error) {
      console.log("Error loadImage", error);
    }
  }

  // lấy dữ liệu học tập
  const loadDataDetail = async (param) => {
    try {
      setLoading(true);
      const endPoint = "http://aigle.blife.ai/taoItems/Items/getOntologyData";
      const cookie = await AsyncStorage.getItem("@cookie");
      const response = await Axios.get(endPoint, {
        headers: {
          Cookie: cookie,
          'X-Requested-With': 'XMLHttpRequest'
        },
        params: {
          'extension': "taoItems",
          'perspective': "items",
          'section': "manage_items",
          'classUri': param.attributes["data-uri"],
          'hideInstances': 0,
          'filter': '*',
          'offset': 0,
          'limit': 30,
          'selected': "http_2_aigle_0_blife_0_ai_1_Aigle_0_rdf_3_i161762021751478855"
        }
      })

      let promisesGetItemData = await read(SHEMAS_NAME.WORDITEM);
      console.log("promisesGetItemData", promisesGetItemData);
      if(!promisesGetItemData) {
        promisesGetItemData = await _readLearnDetail(response.data.tree);
      }
      console.log("promisesGetItemData1", promisesGetItemData);
      createFileInDevice(promisesGetItemData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error loadDataDetail", error);
    }
  }

  const _readLearnDetail = async (result) => {
    try {
      const _dataStudy = [];
      let promisesGetItemData;
      if (result && result.length > 0) {
        promisesGetItemData = result.map(item => {
          _dataStudy.push({
            "label": item.data,
            "count": item.count,
            "attributes": {
              "data-classUri": item.attributes["data-classUri"],
              "data-uri": item.attributes["data-uri"],
              "id": item.attributes["id"]
            }
          })
          return getDataFile(item.attributes["data-uri"])
        })
        setDataStudy(_dataStudy);
        await create(SHEMAS_NAME.WORDITEM, promisesGetItemData);
        return promisesGetItemData;
      }
    } catch (error) {
      console.log("Error read file", error);
    }
  }

  const createFileInDevice = async () => {
    try {
      const _responseFile = await Promise.all(promisesGetItemData);
        // save file base64
        for (var i = 0; i < _responseFile.length; i++) {
          const singleLinkFile = _responseFile[i];
          // save file image
          const tailBase64Img = await getLinkFile(singleLinkFile.linkImg);
          await fs.mkdir(fs.DocumentDirectoryPath + `/images/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}`);
          await fs.writeFile(fs.DocumentDirectoryPath + `/images/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}/${singleLinkFile.label}.${tailBase64Img.tail}`, tailBase64Img.base64, "base64")
          // save file audio

          const tailBase64Audio = await getLinkFile(singleLinkFile.linkAudio)
          await fs.mkdir(fs.DocumentDirectoryPath + `/audios/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}`);
          await fs.writeFile(fs.DocumentDirectoryPath + `/audios/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}/${singleLinkFile.label}.${tailBase64Audio.tail}`, tailBase64Audio.base64, "base64")

        }

        setResponseFile(_responseFile)
    } catch (error) {
      console.log("Error createFileIndevice", error);
    }
  }

  // lấy link file img, audio
  const getDataFile = async (uri) => {
    try {
      const itemData = await getItemData(uri);
      if (itemData.itemData.body.elements) {
        const link = "http://aigle.blife.ai/taoQtiItem/QtiPreview/render/aHR0cDovL2FpZ2xlLmJsaWZlLmFpL0FpZ2xlLnJkZiNpMTYwNTM0NDgyNTcyNzk2NDk5/";
        const [linkAudio, linkImg] = Object.values(itemData.itemData.body.elements)
          .map(element => {
            if (element.qtiClass == "mediaInteraction") {
              return link + JSON.stringify(element.object.attributes.data).slice(1, -1);
            } else if (element.qtiClass == "img") {
              return link + JSON.stringify(element.attributes.src).slice(1, -1);
            }
          })
        return {
          "label": itemData.itemData.attributes.label,
          "linkAudio": linkAudio,
          "linkImg": linkImg
        }
      }
      return {
        "label": "",
        "linkAudio": "",
        "linkImg": ""
      }
    } catch (error) {
      console.log("Error getDataFile", error);
    }

  }

  return (
    <View style={styles.wrapper}>
      {
        loading ? (
          <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
          </View>
        ) : (
            <ScrollView style={styles.scrollViewImg}>
              <View style={styles.wrapImg}>
                {
                  imgBase64s
                    .filter(img => img !== "")
                    .map((item, index) => (
                      <Card 
                      key={index} 
                      uri={item["uri"]} 
                      label={item["label"]} 
                      width={150} 
                      height={150} 
                      pathDir={fs.DocumentDirectoryPath + `/audios/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}`} 
                      pathFile={fs.DocumentDirectoryPath + `/audios/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}/${item["label"]}`} />
                    ))
                }
              </View>
            </ScrollView>
          )
      }
    </View>
  )
}


export default {
  name: LEARNITEM,
  component: LearnItem,
  options: ({ route }) => ({
    // headerStyle: {
    // },
    // headerTintColor: '#fff',
    // headerRight: ButtonCreateTrans,
    headerTitle: (
      <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Text category="s1">
          {route.name}
        </Text>
        <Text category="c2">
          {he.decode(route.params.title)}
        </Text>
      </View>
    )
  })
}
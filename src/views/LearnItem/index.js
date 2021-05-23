import React, { Fragment, useState, useEffect, useRef } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, ScrollView, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { LEARNITEM } from 'consts/screens';
import he from "he"
import { Button, Avatar, Spinner, List, ListItem, Icon } from '@ui-kitten/components';
import styles from './styles';
import { getItemData, getLinkFile } from "apis/getItemLearn";
import fs from "react-native-fs"
import CardFlip from 'react-native-card-flip';
import Sound from 'react-native-sound';
import { create, read, deleteRealm, deleteById, update, bulkCreate } from "repositories";
import { SHEMAS_NAME } from "consts/schema";
import { reject, set } from 'lodash';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

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
    } catch (error) {
      console.log("Error loadAudio", error);
    }
  }

  const playSound = (path) => {
    const sound = new Sound(path, '', () => {
      sound.play();
    })
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
          <Text style={{ color: "#fff", fontSize: 18 }}>{label}</Text>
        </View>
      </TouchableNativeFeedback>
    </CardFlip>
  )
}

const ObjectStudy = ({
  _learnItems, labelParent, title
}) => {

  const [dataObject, setDataObject] = useState([]);
  const _videoRef = useRef();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    handleLoadVideo();
  }, [])

  const handleLoadVideo = async () => {
    let data = _learnItems.filter(item => item.linkVideo != "");
    const result = await Promise.all(data.map(async item => {
      const pathDirVideo = fs.DocumentDirectoryPath + `/videos/${he.decode(labelParent)}/${he.decode(title)}`;
      const pathDirAudio = fs.DocumentDirectoryPath + `/audios/${he.decode(labelParent)}/${he.decode(title)}`;
      const pathDirImg = fs.DocumentDirectoryPath + `/images/${he.decode(labelParent)}/${he.decode(title)}`;
      const tmpVideo = fs.DocumentDirectoryPath + `/videos/${he.decode(labelParent)}/${he.decode(title)}/${item.label}`;
      const tmpAudio = fs.DocumentDirectoryPath + `/audios/${he.decode(labelParent)}/${he.decode(title)}/${item.label}`;
      const tmpImg = fs.DocumentDirectoryPath + `/images/${he.decode(labelParent)}/${he.decode(title)}/${item.label}`;
      const [uriVideo, uriAudio, uriImg] = await Promise.all([
        getFilePath(pathDirVideo, tmpVideo),
        getFilePath(pathDirAudio, tmpAudio),
        getFilePath(pathDirImg, tmpImg)
      ])
      item.uriVideo = uriVideo;
      item.uriAudio = uriAudio;
      const _base64Img = await fs.readFile(uriImg, "base64");
      item.uriImg = `data:image/${uriImg.split(".").pop()};base64,${_base64Img}`;
      return item;
    }));
    setDataObject(result);
  }

  const getFilePath = async (pathDir, pathFileFirst) => {
    try {
      const isExistFile = await fs.exists(pathDir);
      if (isExistFile) {
        const files = await fs.readDir(pathDir);
        const file = files.find(file => {
          var firstLink = file.path.split(".");
          firstLink.pop();
          return firstLink.join(".") === pathFileFirst;
        });
        return file.path;
      }
      return "";
    } catch (error) {
      let data = await read(SHEMAS_NAME.WORDITEM);
      await deleteRealm(data);
    }
  }

  const playSound = (path) => {
    const sound = new Sound(path, '', () => sound.play())
  }

  const reduceIndex = (index) => {
    if (index == 0) {
      setIndex(dataObject.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  const increaseIndex = (index) => {
    if (index == dataObject.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <View style={styles.wrapper}>
      {
        dataObject && dataObject.length > 0 && (
          <View style={{ height: "100%", width: "100%"}}>
            <View style={{ width: "100%", alignItems: "center", marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#0072bc" }}>{dataObject[index].label}</Text>
            </View>
            <View style={{ height: 200, marginBottom: 20 }}>
              <VideoPlayer
                source={{
                  uri: dataObject[index].uriVideo
                }}
                style={{
                  height: 200
                }}
                videoStyle={{
                  height: 200
                }}
              />
            </View>
            <View style={{ width: "100%", alignItems: "center", marginBottom: 20 }}>
              <Image
                style={{ height: 160, width: 200 }}
                source={{
                  uri: dataObject[index].uriImg
                }}
              />
            </View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%", marginBottom: 30 }}>
              <Icon
                style={{ width: 32, height: 32 }}
                fill='#0072bc'
                name='arrow-ios-back-outline'
                onPress={() => { reduceIndex(index) }}
              />
              <Icon
                style={{ width: 32, height: 32 }}
                fill='#0072bc'
                name='volume-up-outline'
                onPress={() => { playSound(dataObject[index].uriAudio) }}
              />
              <Icon
                style={{ width: 32, height: 32 }}
                fill='#0072bc'
                name='arrow-ios-forward-outline'
                onPress={() => { increaseIndex(index) }}
              />
            </View>
          </View>
        )
      }
    </View>
  )
}

const LearnItem = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [dataStudy, setDataStudy] = useState([]);
  const [learnItems, setLearnItems] = useState([]);
  const [imgBase64s, setImgBase64s] = useState([]);
  const [isShowList, setIsShowList] = useState(true);
  useEffect(() => {
    // lấy dữ liệu
    const _learnItems = loadDataDetail(route.params.detail);
    // // tạo file ảnh, audio trên thiết bị
    // createFileInDevice(_learnItems);
  }, [])

  const handleLoadImage = async (_learnItems) => {
    try {
      let _imageBase64s = [];
      var isExistDir = await fs.exists(fs.DocumentDirectoryPath + `/images/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}`);
      if (isExistDir) {
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
        _imageBase64s = await Promise.all(promisesGetFile)
      } else {
        const promisesUri = _learnItems.map(item => new Promise((resolve, reject) => {
          getLinkFile(item.linkImg)
            .then(tailBase64Img => {
              resolve({
                "label": item.label,
                "uri": `data:image/${tailBase64Img.tail};base64,${tailBase64Img.base64}`
              })
            })
        }))
        _imageBase64s = await Promise.all(promisesUri);
      }
      setImgBase64s(_imageBase64s);
    } catch (error) {
      let data = await read(SHEMAS_NAME.WORDITEM);
      await deleteRealm(data);
      console.log("Error loadImage", error);
    }
  }

  // lấy dữ liệu học tập
  const loadDataDetail = async (param) => {
    try {
      setLoading(true);
      let data = await read(SHEMAS_NAME.WORDITEM);
      const dataPath = data.filter((item) => item.path == `/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}`);
      let _learnItems = [];
      if (dataPath && dataPath.length > 0) {
        setLoading(false);
        _learnItems = dataPath;
        setLearnItems(dataPath);
        // load ảnh
        handleLoadImage(_learnItems);
      } else {
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

        _learnItems = await _readLearnDetail(response.data.tree);
        setLearnItems(_learnItems);
        // load ảnh
        await handleLoadImage(_learnItems);
        // tạo file ảnh, audio trên thiết bị
        await createFileInDevice(_learnItems);
        setLoading(false);
      }
      return _learnItems;
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
        const _learnItems = await Promise.all(promisesGetItemData);
        await bulkCreate(SHEMAS_NAME.WORDITEM, _learnItems.map(item => ({
          ...item,
          _id: uuidv4(),
          path: `/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}`
        })))
        return _learnItems;
      }
    } catch (error) {
      console.log("Error read file", error);
    }
  }

  const createFileInDevice = async (_learnItems) => {
    try {
      // save file base64
      for (var i = 0; i < _learnItems.length; i++) {
        const singleLinkFile = _learnItems[i];
        // save file image
        if (singleLinkFile.linkImg) {
          const tailBase64Img = await getLinkFile(singleLinkFile.linkImg);
          await fs.mkdir(fs.DocumentDirectoryPath + `/images/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}`);
          await fs.writeFile(fs.DocumentDirectoryPath + `/images/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}/${singleLinkFile.label}.${tailBase64Img.tail}`, tailBase64Img.base64, "base64")
        }

        // save file audio
        if (singleLinkFile.linkAudio) {
          const tailBase64Audio = await getLinkFile(singleLinkFile.linkAudio);
          await fs.mkdir(fs.DocumentDirectoryPath + `/audios/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}`);
          await fs.writeFile(fs.DocumentDirectoryPath + `/audios/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}/${singleLinkFile.label}.${tailBase64Audio.tail}`, tailBase64Audio.base64, "base64")
        }

        //save file video
        if (singleLinkFile.linkVideo) {
          const tailBase64Video = await getLinkFile(singleLinkFile.linkVideo)
          await fs.mkdir(fs.DocumentDirectoryPath + `/videos/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}`);
          await fs.writeFile(fs.DocumentDirectoryPath + `/videos/${he.decode(route.params.labelParent)}/${he.decode(route.params.title)}/${singleLinkFile.label}.${tailBase64Video.tail}`, tailBase64Video.base64, "base64")
        }
      }
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
        let linkAudio = "", linkVideo = "", linkImg = "";
        const values = Object.values(itemData.itemData.body.elements);
        if (values.length == 2) {
          [linkAudio, linkImg] = Object.values(itemData.itemData.body.elements)
            .map(element => {
              if (element.qtiClass == "mediaInteraction") {
                return link + JSON.stringify(element.object.attributes.data).slice(1, -1);
              } else if (element.qtiClass == "img") {
                return link + JSON.stringify(element.attributes.src).slice(1, -1);
              }
            })
        } else if (values.length == 3) {
          [linkAudio, linkVideo, linkImg] = Object.values(itemData.itemData.body.elements)
            .map(element => {
              if (element.qtiClass == "mediaInteraction") {
                if (element.object.attributes.type.split("/")[0] == "audio") {
                  return link + JSON.stringify(element.object.attributes.data).slice(1, -1);
                } else if (element.object.attributes.type.split("/")[0] == "video") {
                  return link + JSON.stringify(element.object.attributes.data).slice(1, -1);
                }
              } else if (element.qtiClass == "img") {
                return link + JSON.stringify(element.attributes.src).slice(1, -1);
              }
            })
        }

        return {
          "label": itemData.itemData.attributes.label,
          "linkAudio": linkAudio,
          "linkVideo": linkVideo,
          "linkImg": linkImg
        }
      }
      return {
        "label": "",
        "linkAudio": "",
        "linkVideo": "",
        "linkImg": ""
      }
    } catch (error) {
      console.log("Error getDataFile", error);
    }

  }

  const changeShowView = (val) => {
    setIsShowList(val);
  }

  return (
    <View style={styles.wrapper}>
      {
        loading ? (
          <View style={{ width: "100%", height: "50%", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
            <Text style={{color: "#0072bc", marginTop: 20}}>Hệ thống đang thực hiện đồng bộ dữ liệu</Text>
          </View>
        ) : (
            <View style={{ width: "100%", height: "100%" }}>
              <View style={{ width: "100%", height: 40, display: "flex", justifyContent: "center", alignItems: "flex-end", marginRight: 10 }}>
                {
                  isShowList ? (
                    <Icon
                      style={{ width: 32, height: 32 }}
                      fill='#0072bc'
                      name='square-outline'
                      onPress={() => changeShowView(false)}
                    />
                  ) : (
                      <Icon
                        style={{ width: 32, height: 32 }}
                        fill='#0072bc'
                        name='grid-outline'
                        onPress={() => changeShowView(true)}
                      />
                    )
                }
              </View>
              {
                isShowList ? (
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
                ) : (
                    <ObjectStudy
                      _learnItems={learnItems}
                      labelParent={route.params.labelParent}
                      title={route.params.title}
                    >
                    </ObjectStudy>
                  )
              }

            </View>
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
import React,{useEffect,useState,useRef} from 'react'
import {
    View,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity,
    Platform,
    SafeAreaView
} from 'react-native'

import { useNavigation,useIsFocused } from '@react-navigation/native'
import { MMKV } from 'react-native-mmkv'
import BottomSheet_Main from './BottomSheet_Main'
import CalendarModal from './CalenderModal'
import SeedModal from './SeedModal'
import Seedfinish from './SeedFinish'
import styles from './style'
import flower from './flower'
import KakaoSDK from '@actbase/react-kakaosdk'
import axios from 'axios'

export const storage = new MMKV()

function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

function Main(props){
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const jsonUser = storage.getString('user')
  const userObject = JSON.parse(jsonUser)
  const [point,setPoint]=useState(userObject.point)
  const [recycle,setRecycle]=useState(userObject.countRecycle)
  const [flowerRecord,setFlowerRecord]=useState(userObject.flowerRecord)
  const [seedName_mainPage,setSeedName_mainPage]=useState((userObject.flowerRecord).length===0?'':userObject.flowerRecord.slice(-1)[0].flowerNickname)
  const [seedColor,setSeedColor]=useState('')
  const [currentTime,setCurrentTime]=useState(new Date())
  const [seedTime,setSeedTime]=useState(new Date())
  const [flowerDate,setFlowerDate]=useState('')
  const [modalVisible,setModalVisible]=useState(false)
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [seedModalVisible,setSeedModalVisible] = useState((userObject.nowFlowerSeed)===10?true:false) 
  const [finishSeed,setfinishSeed] = useState(false)
  const [asking,setasking] = useState(1)
  const calendarDate = userObject.calendarDate
  const [propcalendarDate,setPropcalendarDate] = useState([])
  const createFlowerDate = (userObject.flowerRecord).length===0?new Date():new Date((userObject.flowerRecord.slice(-1)[0].date).replace(' ','T'))
  for(key in calendarDate){
    propcalendarDate.push((calendarDate[key].date).slice(0,10))
  }

  const kaka=async()=>{
    const ee = await KakaoSDK.getProfile()
    console.log(ee)
  }
  const isSeedName=()=>{
    return <Text style={styles.tulipText}>{seedName_mainPage}와 함께 {flowerDate}일째</Text>
  }  
  useEffect(()=>{
    if(point%30===0 && point!==0 && asking==1){
      setfinishSeed(true)
      setasking(0)
    }
  },[point])
  
  useInterval(()=>{{
    setCurrentTime(new Date())
    setasking(1)
    }},60000)

  useEffect(()=>{
    let date = currentTime.getTime() - createFlowerDate.getTime()   //현재시각 - 꽃 만들었을 때 시각
    setFlowerDate(Math.floor(date/(1000*60*60*24)))
  },[currentTime])

  useEffect(()=>{  
    if((userObject.flowerRecord).length===0){
      return nullFlowerRecord()
    }else{
      return notNullFlowerRecord()
    }
  },[seedName_mainPage])

  const nullFlowerRecord=()=>{
    if(seedName_mainPage!==''){
      flowerAdd()
    }
  }

  const notNullFlowerRecord=()=>{
    if(userObject.flowerRecord.slice(-1)[0].flowerNickname!==seedName_mainPage){
      flowerAdd()
    }
  }

  const flowerAdd=()=>{
    axios.post('http://13.124.80.15/flower/add-new-flower', {
            uid:userObject.uid,
            flower:flower[userObject.nowFlowerSeed].flowername,
            flowerNickname:seedName_mainPage
          })
          .then(function (response) {
            console.log('success')
          })
          .catch(function (error) {
            console.log(error);
          });
  }
  // console.log(userObject)

  console.log('nowFlowerSeed2 : ',userObject.nowFlowerSeed)
  console.log(userObject)
  const FlowerGIF =()=>{
    var tmp =''
    var sw = recycle%30
    if (sw < 6){
      tmp = flower[userObject.nowFlowerSeed].uri1
    }
    else if (sw <14){
      tmp = flower[userObject.nowFlowerSeed].uri2
    }
    else if(sw<21){
      tmp = flower[userObject.nowFlowerSeed].uri3
    }
    else if(sw<26){
      tmp = flower[userObject.nowFlowerSeed].uri4
    }
    else {
      tmp = flower[userObject.nowFlowerSeed].uri5
    }
    return (
      <Image 
        source={tmp} 
        style={{width:300, height:400, marginLeft:5}}
      />
    )
  }

  const Iosview =()=>{
    if(Platform.OS==="ios")
    return (
      <View style={{height:"8%"}}/>
    )
  }
  if(userObject.profileImage==""){
    console.log('ff')
  }else{
    console.log(userObject.profileImgPath)
  }
  return(
    <>
      <SafeAreaView style={{flex:1,backgroundColor:"rgb(166,150,135)"}}>
          <ImageBackground 
              style={{
                  height: '100%',
                  width: '100%',
              }}
              source={require('../../imageResource/background/bg_04.png')}>
              <View >
                  <View style={styles.topLineContainer}>
                      <View style={styles.topLineLeft}>
                          <View style={styles.flexDirectionRow}>
                              <TouchableOpacity 
                                  onPress={()=>navigation.navigate('InFullBloom')}
                                  style={styles.profileImageContainer}>
                                  <Image 
                                      source={userObject.profileImgPath===''?require('../../imageResource/icon/ic_profile.png'):{uri:userObject.profileImgPath}}
                                      style={styles.profileImage}/>
                              </TouchableOpacity>
                              <View style={{justifyContent:'center',marginLeft:'5%',flexDirection:'column'}}>
                                  <Text style={styles.name}>{userObject.userName}</Text>
                                  <View style={styles.flexDirectionRow}>
                                      <Image source={require('../../imageResource/icon/ic_point.png')}/>
                                      <Text style={{marginLeft:'8%'}}>{point}</Text>
                                  </View>
                              </View>
                          </View>
                      </View>
                      <View style={styles.calenderAndNoticeBoxContainer}>
                        <View  style={{flexDirection:'row'}}>
                          <TouchableOpacity onPress={()=>navigation.navigate('UnivRanking')}>
                              <Image 
                                source={require('../../imageResource/jobDaHan/rank.png')}
                                style={{width:25,height:25}}
                              />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>setCalendarModalVisible(true)} style={{marginLeft:'10%',marginRight:'10%'}}>
                              <Image source={require('../../imageResource/icon/ic_calendar.png')}/>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>navigation.navigate('Notice')}>  
                              <Image source={require('../../imageResource/icon/ic_notice.png')}/>
                          </TouchableOpacity>  
                        </View>
                      </View>
                  </View>
                  <View style={{height:'10%'}}/>
                  <View style={{alignItems:'center',height:'55%'}}>
                      {isSeedName()}
                      {/* <Iosview/> */}
                      <FlowerGIF/>
                  </View>
                  <View style={{alignItems:'center',height:'20%',justifyContent:'center'}}>
                      <TouchableOpacity onPress={()=>setModalVisible(true)}>  
                        <View style={{height:'45%'}}/>
                        <Image style={{width:70,height:70}} source={require('../../imageResource/icon/qrcode.png')}/>
                      </TouchableOpacity>
                      {/* <TouchableOpacity onPress={()=>{setfinishSeed(true)}}>  
                        <Text>투더문</Text>
                      </TouchableOpacity> */}
                  </View>
              </View>
              <BottomSheet_Main
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setPoint={setPoint}
                setRecycle={setRecycle}
              />
              <CalendarModal
                calendarModalVisible={calendarModalVisible}
                setCalendarModalVisible={setCalendarModalVisible}
                calendarDate = {propcalendarDate}
              />
              <SeedModal
                  seedModalVisible={seedModalVisible}
                  setSeedModalVisible={setSeedModalVisible}
                  setSeedName_mainPage={setSeedName_mainPage}
                  seedColor={seedColor}
                  setSeedColor={setSeedColor}
              />
              <Seedfinish
                  finishSeed={finishSeed}
                  setfinishSeed={setfinishSeed}
                  seedName={seedName_mainPage}
                  setSeedModalVisible={setSeedModalVisible}
              />
          </ImageBackground>
      </SafeAreaView>
    </>
  )
}
export default Main
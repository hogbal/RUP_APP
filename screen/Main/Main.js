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

export const storage = new MMKV()

// function useInterval(callback, delay) {
//   const savedCallback = useRef();
//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);
//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

function Main(props){
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  
  const jsonUser = storage.getString('user')
  const [userObject, setUser] = useState(JSON.parse(jsonUser))

  // const [point,setPoint]=useState(userObject.point)
  // const [recycle,setRecycle]=useState(userObject.countRecycle)
  // const [seedName_mainPage,setSeedName_mainPage]=useState((userObject.flowerRecord).length===0?'':userObject.flowerRecord.slice(-1)[0].flowerNickname)
  // const [seedModalVisible,setSeedModalVisible] = useState((userObject.nowFlowerSeed)===10?true:false)
  // const [calendarDate, setCalendarDate] = useState(userObject.calendarDate)
  // const createFlowerDate = (userObject.flowerRecord).length===0?new Date():new Date((userObject.flowerRecord.slice(-1)[0].date).replace(' ','T'))
  // const [propcalendarDate,setPropcalendarDate] = useState([])
  
  const [point,setPoint]=useState(0)
  const [recycle,setRecycle]=useState(0)
  const [nowSeedName,setNowSeedName]=useState('')
  const [flowerDate,setFlowerDate]=useState('')
  const [flowerUri, setFlowerUri]=useState('')
  const [calendarDate, setCalendarDate] = useState([])
  const [propcalendarDate,setPropcalendarDate] = useState([])
  
  const [seedModalVisible,setSeedModalVisible] = useState(false)
  const [modalVisible,setModalVisible]=useState(false)
  const [calendarModalVisible, setCalendarModalVisible] = useState(false) 
  const [finishSeedVisible,setfinishSeedVisible] = useState(false)
  // const [asking,setasking] = useState(1)

  // for(key in calendarDate){
  //   propcalendarDate.push((calendarDate[key].date).slice(0,10))
  // }

  // console.log(propcalendarDate)

  const kaka=async()=>{
    const ee = await KakaoSDK.getProfile()
  }

  const getUser = async () => {
    try {
      const user = await JSON.parse(storage.getString('user'))
      if(user !== null) {
        setUser(user)
        return user
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  const flower_day = (user)=>{
    let date = (new Date()).getTime() - new Date(user.flowerNow[0].date.replace(' ','T')).getTime()
    return Math.floor(date/(1000*60*60*24))
  }

  const FlowerGIF =(user)=>{
    if (user.flowerNow[0].flowerPoint < 6){
      setFlowerUri(flower[user.flowerNow[0].flower].uri1)
    }
    else if (user.flowerNow[0].flowerPoint <14){
      setFlowerUri(flower[user.flowerNow[0].flower].uri2)
    }
    else if(user.flowerNow[0].flowerPoint<21){
      setFlowerUri(flower[user.flowerNow[0].flower].uri3)
    }
    else if(user.flowerNow[0].flowerPoint<26){
      setFlowerUri(flower[user.flowerNow[0].flower].uri4)
    }
    else {
      setFlowerUri(flower[user.flowerNow[0].flower].uri5)
    }
  }

  useEffect(()=>{
    getUser()
    .then((user) => {
      setPoint(user.point)
      setRecycle(user.countRecycle)

      if((user.flowerNow).length !== 0) {
        setNowSeedName((user.flowerNow).length===0?'':user.flowerNow[0].flowerNickname)
        setFlowerDate(flower_day(user))
        FlowerGIF(user)
      }

      for(key in calendarDate){
        propcalendarDate.push((calendarDate[key].date).slice(0,10))
      }
      return user
    })
    .then((user) => {
      if((user.flowerNow).length===0){
        setSeedModalVisible(true)
      }
      else {
        if(user.flowerNow[0].flowerPoint >= 30) {
          setfinishSeedVisible(true)
        }
      }
    })
  }, [])

  const isSeedName=()=>{
    return <Text style={styles.tulipText}>{nowSeedName}와 함께 {flowerDate}일째</Text>
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
              <View>
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
                      {/* <FlowerGIF/> */}
                      <Image 
                        source={flowerUri} 
                        style={{width:300, height:400, marginLeft:5}}
                      />
                  </View>
                  <View style={{alignItems:'center',height:'20%',justifyContent:'center'}}>
                      <TouchableOpacity onPress={()=>setModalVisible(true)}>  
                        <View style={{height:'45%'}}/>
                        <Image style={{width:70,height:70}} source={require('../../imageResource/icon/qrcode.png')}/>
                      </TouchableOpacity>
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
              />
              <Seedfinish
                  finishSeedVisible={finishSeedVisible}
                  setfinishSeedVisible={setfinishSeedVisible}
                  // seedName={seedName_mainPage}
                  // setSeedModalVisible={setSeedModalVisible}
              />
          </ImageBackground>
      </SafeAreaView>
    </>
  )
}
export default Main
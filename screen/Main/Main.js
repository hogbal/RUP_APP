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
import { createGETObject } from '../API/Network'

export const storage = new MMKV()

function Main(props){
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  
  const jsonUser = storage.getString('user')
  const [userObject, setUser] = useState(JSON.parse(jsonUser))

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
    createGETObject('home/main',userObject.uid)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      let arr = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
      if(data.flowerEnds.length>0){
        for(let i=0;i<(data.flowerEnds).length;i++ ){
          if(data.flowerEnds[i].flower==='flowerA')
            arr[i]=0
          else if(data.flowerEnds[i].flower==='flowerB')
            arr[i]=1
          else if(data.flowerEnds[i].flower==='flowerC')
            arr[i]=2
          else if(data.flowerEnds[i].flower==='flowerD')
            arr[i]=3
          else if(data.flowerEnds[i].flower==='flowerE')
            arr[i]=4
          else if(data.flowerEnds[i].flower==='flowerF')
            arr[i]=5
          else if(data.flowerEnds[i].flower==='flowerG')
            arr[i]=6
          else if(data.flowerEnds[i].flower==='flowerH')
            arr[i]=7
          else if(data.flowerEnds[i].flower==='flowerI')
            arr[i]=8
          else if(data.flowerEnds[i].flower==='flowerJ')
            arr[i]=9
        }
      }
      if(data.flowerNow.length==1) {
        if(data.flowerNow[0].flower==='flowerA')
          data.flowerNow[0].flower=0
        else if(data.flowerNow[0].flower==='flowerB')
          data.flowerNow[0].flower=1
        else if(data.flowerNow[0].flower==='flowerC')
          data.flowerNow[0].flower=2
        else if(data.flowerNow[0].flower==='flowerD')
          data.flowerNow[0].flower=3
        else if(data.flowerNow[0].flower==='flowerE')
          data.flowerNow[0].flower=4
        else if(data.flowerNow[0].flower==='flowerF')
          data.flowerNow[0].flower=5
        else if(data.flowerNow[0].flower==='flowerG')
          data.flowerNow[0].flower=6
        else if(data.flowerNow[0].flower==='flowerH')
          data.flowerNow[0].flower=7
        else if(data.flowerNow[0].flower==='flowerI')
          data.flowerNow[0].flower=8
        else if(data.flowerNow[0].flower==='flowerJ')
          data.flowerNow[0].flower=9
      }
      const user = {
        uid:data.uid,
        userName: data.nickname,
        email: data.email,
        password: data.password,
        profileImgPath:data.profileImgPath,
        point:data.point,
        countRecycle:data.countRecycle,
        calendarDate:data.calendarDate,
        flowerRecord:data.flowerRecord,
        birth:data.birth,
        sex:data.sex,
        univ:data.college,
        major:data.major,
        flowerNow:data.flowerNow, 
        flowerUri:{
          "0" : arr[0],
          "1" : arr[1],
          "2" : arr[2],
          "3" : arr[3],
          "4" : arr[4],
          "5" : arr[5],
          "6" : arr[6],
          "7" : arr[7],
          "8" : arr[8],
          "9" : arr[9],
        }      
      }
      setUser(user)
      storage.set('user', JSON.stringify(user))
    })
    .catch(error=>console.log('ERROR',error))
  }, [isFocused])

  useEffect(()=>{
    console.log("Main Loading")
    setPoint(userObject.point)
    setRecycle(userObject.countRecycle)

    if((userObject.flowerNow).length !== 0) {
      setNowSeedName((userObject.flowerNow).length===0?'':userObject.flowerNow[0].flowerNickname)
      setFlowerDate(flower_day(userObject))
      FlowerGIF(userObject)
    }

    if(userObject.calendarDate.length !== 0) {
      setCalendarDate(userObject.calendarDate)
      let data = []

      for(let date of calendarDate){
        data.push((date.date))
      }
      setPropcalendarDate(data)
    }

    if((userObject.flowerNow).length===0){
      setSeedModalVisible(true)
    }
    else {
      if(userObject.flowerNow[0].flowerPoint >= 30) {
        setfinishSeedVisible(true)
      }
    }
  }, [userObject])

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
              />
              <CalendarModal
                calendarModalVisible={calendarModalVisible}
                setCalendarModalVisible={setCalendarModalVisible}
                calendarDate = {propcalendarDate}
              />
              <SeedModal
                  seedModalVisible={seedModalVisible}
                  setSeedModalVisible={setSeedModalVisible}
                  userObject={userObject}
              />
              <Seedfinish
                  finishSeedVisible={finishSeedVisible}
                  setfinishSeedVisible={setfinishSeedVisible}
                  userObject={userObject}
              />
          </ImageBackground>
      </SafeAreaView>
    </>
  )
}
export default Main
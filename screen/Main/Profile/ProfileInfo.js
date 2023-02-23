import React ,{useEffect, useState}from 'react'
import {
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import SearchUniversity from '../../LoadingLoginSignup/SearchUniversity';
import SearchMajor from '../../LoadingLoginSignup/SearchMajor'
import KakaoSDK from '@actbase/react-kakaosdk'
import axios from 'axios';
import styles from './style.js'

export const storage = new MMKV()
const ProfileInfo=(props)=>{
    const {profilemajor, profileuniversity} = props;

    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const toast = useToast();
    const jsonUser = storage.getString('user')
    const userObject = jsonUser == undefined ? {} :JSON.parse(jsonUser)
    const [name,setName] = useState(userObject.userName)
    const [email,setEmail] = useState(userObject.email)
    const [univ,setUniv] = useState(userObject.univ)
    const [major,setMajor]= useState(userObject.major)
    const [pw,setPw]= useState(userObject.password)
    const [birth,setBirth]= useState(userObject.birth)
    const [sex,setSex] = useState(userObject.sex)
    const [universityModal, setUniversityModal] = useState(false);
    const [majorModal, setMajorModal] = useState(false);
    const [placeHolderName,setPlaceHolderName] = useState(userObject.userName)
    const [placeHolderEmail,setPlaceHolderEmail] = useState(userObject.email)
    const [placeHolderPhoneNumber,setPlaceHolderPhoneNumber] = useState(userObject.phoneNumber)
    const [placeHolderPw,setPlaceHolderPw]= useState(userObject.pw)

    useEffect(()=>{
        if(profilemajor!=""){
            setMajor(profilemajor)
        }
        if(profileuniversity!=""){
            setUniv(profileuniversity)
        }
    },[profilemajor,profileuniversity])

    const editProfile=()=>{
        if(userObject.userName!==name){
            nickToServer()
        }else{
            edit()
        }
    }
    const nickToServer=()=>{
        fetch('http://13.124.80.15/user/nickname-check',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
            nickname:name
            })
        })
        .then(res=>{return res.json()})
        .then(data=>{
            if(data.success===true){
                console.log('good')
                return edit()
            }else{
                return showToast('이미 존재하는 닉네임 입니다.')
            }
        })
        .catch(error=>console.log('ERROR'))
    }
    const edit=()=>{
        fetch('http://13.124.80.15/user/update-user-info',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                uid: userObject.uid,
                email: email,
                password: pw,
                nickname: name,
                sex: userObject.sex,
                birth: userObject.birth,
                college: univ,
                major: major,
            })
        })
        .then(res=>{return res.json()})
        .then(data=>{
            userObject.userName = name
            userObject.email = email
            userObject.password = pw
            storage.set('user', JSON.stringify(userObject))
            setPlaceHolderName(name)
            setPlaceHolderEmail(email)
            showToast('수정 완료!')
        })
        .catch(error=>console.log('ERROR'))
    }
    
    const showToast = (message) => {
        toast.show(message,{  //https://github.com/arnnis/react-native-toast-notifications
            type:'custom',
            duration:1000,
            animationType:'zoom-in',
        })
      }
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.profileText}>이름</Text>
            <View style={styles.middle}>
                <TextInput 
                    placeholder={placeHolderName}
                    style={styles.sectionStyle}
                    onChangeText={name => setName(name)}
                    defaultValue={placeHolderName}/>
            </View>
            <Text style={styles.profileText}>이메일</Text>
            <View style={styles.middle}>
                <TextInput 
                    placeholder={placeHolderEmail}
                    style={styles.sectionStyle}
                    onChangeText={email => setEmail(email)}
                    defaultValue={placeHolderEmail}/>
            </View>
            <Text style={styles.profileText}>학교</Text>
            <View style={styles.middle}>
                <TouchableOpacity
                    style={[styles.sectionStyle,{justifyContent:'center'}]}    
                    onPress={()=>{
                        navigation.navigate("SearchUniversity",{page:'ProfileInfo'})
                       
                    }
                }
                >
                    <Text>{univ}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.profileText}>학과</Text>
            <View style={styles.middle}>
                <TouchableOpacity
                    style={[styles.sectionStyle,{justifyContent:'center'}]}    
                    onPress={()=>{
                        navigation.navigate("SearchMajor",{page:'ProfileInfo'})
                    }
                }
                >
                    <Text>{major}</Text>
                </TouchableOpacity>
            </View>
            {userObject.sex===null && 
                <>
                    <Text style={styles.profileText}>성별</Text>
                    <View style={styles.middle}>
                        <TextInput
                            style={styles.sectionStyle}
                            placeholder='수정'
                        />
                    </View>
                </>}
            {userObject.sex!==null && 
                <>
                    <Text style={styles.profileText}>성별</Text>
                    <View style={styles.middle}>
                        <View style={[styles.sectionStyle,{justifyContent:'center'}]}>
                            <Text>{userObject.sex==='M'?'남':'여'}</Text>
                        </View>
                    </View>
                </>}
            {userObject.birth===null && 
                <>
                    <Text style={styles.profileText}>생일</Text>
                    <View style={styles.middle}>
                        <TextInput
                            style={styles.sectionStyle}
                            placeholder='수정'
                        />
                    </View>
                </>}
            {userObject.sex!==null && 
                <>
                    <Text style={styles.profileText}>생일</Text>
                    <View style={styles.middle}>
                        <View style={[styles.sectionStyle,{justifyContent:'center'}]}>
                            <Text>{userObject.birth}</Text>
                        </View>
                    </View>
                </>}
            <View style={{marginTop:'4%'}}/>
            <View style={styles.middle}>
                <View>
                    <TouchableOpacity 
                        onPress={()=>{editProfile()}}
                        style={styles.signUp}
                    >
                        <Text style={styles.editProfileButton}>수정</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                        onPress={async()=>{
                            //await KakaoSDK.unlink()
                            console.log(storage)

                            storage.clearAll()
                            console.log(storage)
                            //await KakaoSDK.logout()
                            navigation.reset({routes:[{name:'Login'}]})
                        }}
                        style={styles.secretSignUp}>
                        <Text style={styles.do_login_text}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.secretSignUp}>
                        <Text style={styles.do_login_text}>의견 남기기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <SearchUniversity
                universityModal={universityModal}
                setUniversityModal={setUniversityModal}
                setUserUniversity={setUniv}
            />
            <SearchMajor
                majorModal={majorModal}
                setMajorModal={setMajorModal}
                setUserMajor={setMajor}
            /> */}
        </ScrollView>
    )
}
export default ProfileInfo

//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
import React, { useState,useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
    Image,
    TouchableOpacity,
    TextInput,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    SafeAreaView
} from 'react-native';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import KakaoSDK from '@actbase/react-kakaosdk'
import { useToast } from "react-native-toast-notifications";
import {validateNickName,validateEmail,validatePw, validateBirth} from '../../../validate.js'
import { MMKV } from 'react-native-mmkv'
import { RadioButton } from 'react-native-paper';
import axios from 'axios'
//import SearchUniversity from '../SearchUniversity.js';
//import SearchMajor from '../SearchMajor.js'
import uuid from 'react-native-uuid';
import styles from './style'

export const storage = new MMKV()

const BottomSheet_login = (props) => {
    const isFocused = useIsFocused();
    
    const { modalVisible, setModalVisible,major,university,setMajor,setUniversity} = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY_login = useRef(new Animated.Value(screenHeight)).current;
    const [loginSelectedTab, setLoginSelectedTab] = useState(true);
    const [SignUpSelectedTab, setSignUpSelectedTab] = useState(false);
    const [nameDoubleCheck,setNameDoubleCheck]=useState('ruprupruprupruprupruprurprup')
    const navigation = useNavigation()
    const [userName,setUserName]=useState("")
    const [nameCheck,setNameCheck]=useState(false)
    const [userEmail,setUserEmail]=useState('')
    const [userPw,setUserPw]=useState('')
    const [userPwAgain,setUserPwAgain]=useState('')
    const [userUniversity,setUserUniversity]=useState('학교검색')
    const [userMajor,setUserMajor]=useState('학과검색')
    const [userSex,setUserSex]=useState(null)
    const [userBirth,setUserBirth]=useState(null)
    const [universityModal, setUniversityModal] = useState(false);
    const [majorModal, setMajorModal] = useState(false);
    const [openToastMessage,setOpenToastMessage]=useState(0)
    const [uid,setUid]=useState(null)
    const toast = useToast();
    const redStar = require('../../../imageResource/jobDaHan/redStar.png')
    const [check,setcheck] = useState(0)
    const nickNameRef = useRef()
    const emailRef = useRef()
    const pwRef = useRef()
    const pwAgainRef = useRef()
    const birthRef = useRef()

    const signInWithKakao=async()=>{
        await KakaoSDK.init("6d2aa639e8ea6e75a8dd34f45ad60cf0")
        try{
            await KakaoSDK.login()
            const profile = await KakaoSDK.getProfile()
            postKakaoLogin(profile)
        }catch(err){
            if(err.message==='user cancelled.')
                console.log('toast message 카카오 로그인 취소하셨습니다')
            console.log(err.message)
        }
      }

    const loginSignUpSelectedTab = () => {    
        switch(selectedTab){
            case 'Login':
                return <Login />
            case 'SignUp':
                return <SignUp />
        }
    }

    const Login=()=>{
        const [email,setEmail]=useState('')
        const [pw,setPw]=useState('')
        return(       //Login 아이콘 클릭시 띄울 화면
            <>  
                <View>
                    <TextInput
                        placeholder='이메일'
                        placeholderTextColor="#dddddd"
                        style={styles.sectionStyle3}
                        onChangeText={email => setEmail(email)}
                    />
                    <TextInput
                        placeholder='비밀번호'
                        placeholderTextColor="#dddddd"
                        style={styles.sectionStyle3}
                        onChangeText={pw => setPw(pw)}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        onPress={()=> postLogin(email.trim(),pw,null,false)} //navigation.reset({routes:[{name:'Main'}]})
                        style={styles.signUp}
                    >
                        <Text style={styles.signUpText}>로그인</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{margin:'5%'}}/> */}
                <View>
                    <TouchableOpacity onPress={signInWithKakao} style={styles.kakaoLogin}>
                        <View style={styles.twentyPercent}>
                            <Image style={styles.kakaoSymbolImage} source={require('../../../imageResource/jobDaHan/kakao_login_symbol.png')}/>
                        </View>
                        <View style={styles.kakaoLoginTextView}>
                            <Text style={styles.kakaoLoginText}>카카오 로그인</Text>
                        </View>
                        <View style={styles.twentyPercent}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    onPress={()=>
                    {
                        setModalVisible(false),
                        navigation.navigate('FindPassword')
                    }}>
                    <Text style={styles.passwordPage}>비밀번호를 잊으셨나요?</Text>
                </TouchableOpacity>
            </>
        )
    }
    const SignUp=()=>{
        const [name,setName] = useState(userName)
        const [email,setEmail] = useState(userEmail)
        const [pw,setPw] = useState(userPw)
        const [pwAgain,setPwAgain] = useState(userPwAgain)
        const [sex,setSex]=useState(userSex)
        const [birth,setBirth]=useState(userBirth)
        return(    //SignUp 아이콘 클릭시 띄울 화면
            <>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flexDirection:'row'}}>
                        <Image      
                            style={styles.redStar} 
                            source={redStar}/>
                        <TextInput
                            placeholder='닉네임(2~16자)'
                            placeholderTextColor="#dddddd"
                            style={styles.sectionStyle2}
                            onChangeText={name => setName(name)}
                            defaultValue={userName}
                            />
                        <TouchableOpacity 
                            onPress={()=>{
                                userDefaultValue(name,email,pw,pwAgain,sex,birth)
                                validation_nickName(name)
                                setcheck(1)
                                console.log(check)
                            }}
                            style={styles.nickNameCheck}
                        >
                            <Text style={{fontSize:12,color:'white'}}>중복 확인</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image      
                            style={styles.redStar} 
                            source={redStar}/>
                        <TextInput
                            placeholder='이메일'
                            placeholderTextColor="#dddddd"
                            style={styles.sectionStyle}
                            onChangeText={email => setEmail(email)}
                            defaultValue={email}
                            keyboardType={'email-address'}
                            />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image      
                            style={styles.redStar} 
                            source={redStar}/>
                        <TextInput
                            placeholder='비밀번호(4자 이상)'
                            placeholderTextColor="#dddddd"
                            style={styles.sectionStyle}
                            onChangeText={pw => setPw(pw)}
                            defaultValue={pw}
                            secureTextEntry={true}
                            />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image      
                            style={styles.redStar} 
                            source={redStar}/>
                        <TextInput
                            placeholder='비밀번호 재입력'
                            placeholderTextColor="#dddddd"
                            style={styles.sectionStyle}
                            onChangeText={pwAgain => setPwAgain(pwAgain)}
                            defaultValue={pwAgain}
                            secureTextEntry={true}
                            />
                    </View>
                    <View style={styles.rowDirection}>
                        <View style={{flexDirection:'row'}}>  
                            <TouchableOpacity                                                  
                                style={[styles.sectionStyle,{flexDirection:'row',alignItems:'center'}]}
                                onPress={()=>{
                                    userDefaultValue(name,email,pw,pwAgain,sex,birth)
                                    navigation.navigate("SearchUniversity",{page:'BottomSheet_login'})
                                    setModalVisible(false)
                                }}
                            >
                                <Image style={styles.imageStyle} source={require('../../../imageResource/jobDaHan/search.png')}/>
                                <Text >{university=="" ? userUniversity:university}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity 
                                style={[styles.sectionStyle,{flexDirection:'row',alignItems:'center'}]}
                                onPress={()=>{
                                    userDefaultValue(name,email,pw,pwAgain,sex,birth)
                                    navigation.navigate("SearchMajor",{page:'BottomSheet_login'})
                                    setModalVisible(false)
                                }}
                            >
                                <Image style={styles.imageStyle} source={require('../../../imageResource/jobDaHan/triangle.png')}/>
                                <Text >{major==""? userMajor:major}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.sectionStyle3}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text>성별</Text>
                            <View style={styles.sex}/>
                            <Text>남</Text>
                            <RadioButton.Android
                                value='M'
                                status={ sex === 'M' ? 'checked' : 'unchecked' }
                                color="rgb(176,204,163)"
                                onPress={() => setSex('M')}
                            />
                            <></>
                            <Text>여</Text>
                            <RadioButton.Android
                                value='W'
                                status={ sex === 'W' ? 'checked' : 'unchecked' }
                                color="rgb(176,204,163)"
                                onPress={() => setSex('W')}
                            />
                        </View>
                    </View>
                    <TextInput
                        placeholder='생년월일(ex.19950101)'
                        placeholderTextColor="#dddddd"
                        style={styles.sectionStyle3}
                        onChangeText={birth => {
                            if(birth.length===8){setBirth(birth)}
                        }}
                        defaultValue={birth}
                        keyboardType={'number-pad'}
                        />
                </ScrollView>
                <TouchableOpacity
                    onPress={()=>signUp(name,email,pw,pwAgain,sex,birth)}
                    style={styles.signUp}
                >
                    <Text style={styles.signUpText}>가입하기</Text>
                </TouchableOpacity>
            </>
        )
    }

    const signUp=(name,email,pw,pwAgain,sex,birth)=>{
        if(check==1){
            userDefaultValue(name,email,pw,pwAgain,sex,birth)
            setOpenToastMessage(openToastMessage+1)
        }
        else{
            return showToast("닉네임 중복검사를 해주세요")
        }
        
    }
    const userDefaultValue=(name,email,pw,pwAgain,sex,birth)=>{
        setUserName(name)
        setUserEmail(email)
        setUserPw(pw)
        setUserPwAgain(pwAgain)
        setUserSex(sex)
        setUserBirth(birth)
    }
    useEffect(() => {
        if(openToastMessage!==0){
            isName()
        }
    }, [openToastMessage]);
    useEffect(()=>{
        if(uid!==null){
            console.log(uid)
            postSignUp()
        }
    },[uid])
   
    const validation_nickName=(name)=>{                    //닉네임 유효성 검사
        if(validateNickName(name)){
            return nickToServer(name)
        }
        else{
            return showToast("닉네임은 2~16자 입니다.")
        }
    }
    const nickToServer=(name)=>{
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
                showToast('중복 확인 완료')
                setUserName(name)
                setNameCheck(true)
                setNameDoubleCheck(name)
            }else{
                showToast('이미 존재하는 닉네임 입니다.')
            }
        })
        .catch(error=>console.log('ERROR'))
    }
    const isName=()=>{
        if(nameCheck===false){
            return showToast('닉네임 중복확인을 해주세요')
        }
        if(userName!==nameDoubleCheck){
            return showToast('닉네임 중복확인을 다시 해주세요')
        }
        return validation_email()
    }
    const validation_email=()=>{                       //이메일 유효성 검사
        if(validateEmail(userEmail)){
            return validation_pw()
        }
        else{
            return showToast("이메일 형식이 맞지 않습니다.")
        }
    }
    const validation_pw=()=>{                           //비밀번호 유효성 검사
        if(validatePw(userPw)){
            return matchPwAndPw2()
        }
        else{
            return showToast("비밀번호는 4자 이상 입니다.")
        }
    }
    const matchPwAndPw2=()=>{                           //비밀번호, 비밀번호 재입력 같은지 검사
        if(userPw===userPwAgain){
           return validation_university()
        }
        else{
            return showToast("비밀번호 불일치")
        }
    }
    const validation_university=()=>{                           //비밀번호 유효성 검사
        if(userUniversity!=='학교찾기'){
            return validation_birthday()
        }
        else{
            return showToast("학교를 선택해주세요!")
        }
    }
    const validation_birthday=()=>{
        if(validateBirth(userBirth)){
            return validation_major()
        }
        else{
            return showToast("생일엔 숫자만 입력해 주세요.")
        }
    }
    const validation_major=()=>{                           //비밀번호 유효성 검사
        if(userMajor!=='학과'){
            return setUid(uuid.v4())
        }
        else{
            return showToast("학과를 선택해주세요!")
        }
    }
    const showToast=(message)=>{                        //토스트 메세지
        toast.show(message,{
            type:'custom',
            duration:1500,
            animationType:'zoom-in',
            placement:'top',
        })
    }
    const postSignUp=()=>{
        fetch('http://13.124.80.15/user/add-new-user',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                uid:uid, // 필수
                email:userEmail, // 필수
                password:userPw,
                nickname: userName,// 필수
                sex : userSex,
                birth: userBirth,
                college: university,
                major:major
                
            })
        })
        .then(res=>{return res.json()})
        .then(data=>{
            console.log(data)
            if(data.success===true){
                showToast('회원가입 완료!')
                setLoginSelectedTab(true)
                userDefaultValue('','','','',null,null)
                setUniversity("")
                setMajor("")
                console.log('good')
            }else{
                showToast('회원가입 안됨')
            }
        })
        .catch(error=>console.log('ERROR'))
    }
    const postLogin=(email,pw)=>{                                   /////이메일 로그인
        // fetch('http://13.124.80.15/user/login',{
        //     method:'POST',
        //     headers:{'Content-Type':'application/json'},
        //     body:JSON.stringify({
        //         email: email,
        //         password: pw
        //     })
        // })
        // .then(res=>{return res.json()})
        // .then(data=>{
        //     if(data!=='-1'){
        //         console.log(data)
        //         getMainData(data)                              /////로그인 성공, MainData 가져오기
        //     }else{
        //         showToast('이메일 또는 비밀번호가 틀렸습니다.')
        //     }
        // })
        // .catch(error=>console.log('ERROR'))

        axios.post('http://13.124.80.15/user/login', {
            email: email,
            password: pw
          })
          .then(function (response) {
            if(response.data.uid!=='-1'){
                setModalVisible(false)
                getMainData(response.data.uid)
            }else{
                showToast('이메일 또는 비밀번호가 틀렸습니다.')
            }
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    
    const postKakaoLogin=(profile)=>{                                  ///////카카오 로그인
        //console.log(profile)
        
        fetch('http://13.124.80.15/user/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                uid:profile.id
            })
        })
        .then(res=>{return res.json()})
        .then(data=>{
            console.log(data)
            if(data.uid!=='-1'){                                /////로그인 성공, MainData 가져오기
                getMainData(profile.id)
            }else{
                setModalVisible(false)
                navigation.navigate('KakaoSignUp',profile)
            }
        })
        .catch(error=>console.log('ERROR'))

    }

    const getMainData=(uid)=>{
        // fetch(`http://13.124.80.15/home/main?uid=${uid}`)
        // .then(res=>{return res.json()})
        // .then(data=>{
        //     console.log(data)
        //     setModalVisible(false)
        //     navigation.reset({routes:[{name:'Main',data}]})
        // })
        // .catch(error=>console.log('ERROR'))

        axios.get('http://13.124.80.15/home/main', {
            params: {
              uid: uid
            }
          })
          .then(function (response) {
            let arr = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
            if((response.data.flowerRecord).length>1){
                for(let i=0;i<(response.data.flowerRecord).length-1;i++ ){
                    if(response.data.flowerRecord[i].flower==='flowerA')
                        arr[i]=0
                    else if(response.data.flowerRecord[i].flower==='flowerB')
                        arr[i]=1
                    else if(response.data.flowerRecord[i].flower==='flowerC')
                        arr[i]=2
                    else if(response.data.flowerRecord[i].flower==='flowerD')
                        arr[i]=3
                    else if(response.data.flowerRecord[i].flower==='flowerE')
                        arr[i]=4
                    else if(response.data.flowerRecord[i].flower==='flowerF')
                        arr[i]=5
                    else if(response.data.flowerRecord[i].flower==='flowerG')
                        arr[i]=6
                    else if(response.data.flowerRecord[i].flower==='flowerH')
                        arr[i]=7
                    else if(response.data.flowerRecord[i].flower==='flowerI')
                        arr[i]=8
                    else if(response.data.flowerRecord[i].flower==='flowerJ')
                        arr[i]=9
                }
            }
            const user = {
                uid:response.data.uid,
                userName: response.data.nickname,
                email: response.data.email,
                password: response.data.password,
                profileImgPath:response.data.profileImgPath,
                point:29,
                countRecycle:29,
                calendarDate:response.data.calendarDate,
                flowerRecord:response.data.flowerRecord,
                birth:response.data.birth,
                sex:response.data.sex,
                univ:response.data.college,
                major:response.data.major,
                nowFlowerSeed:response.data.nowFlowerSeed, 
                nowFlowerName:'',
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
            storage.set('user', JSON.stringify(user))
            navigation.reset({routes:[{name:'Main'}]})
          })
          .catch(function (error) {
            console.log(error);
            console.log('fail')
          });
    }

    const translateY_login = panY_login.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet_login = Animated.timing(panY_login, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet_login = Animated.timing(panY_login, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });
    
    const panResponders_login = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY_login.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 0.3) {
                closeModal();
            }
            else {
                resetBottomSheet_login.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(props.modalVisible) {
            resetBottomSheet_login.start();
        }
    }, [props.modalVisible]);

    const closeModal = () => {
        setLoginSelectedTab(true)
        closeBottomSheet_login.start(()=>{
            setModalVisible(false);
        })
    }
    const userUniversityModalOpen=(name,email,pw,pwAgain,sex,birth)=>{
        userDefaultValue(name,email,pw,pwAgain,sex,birth)
        setUniversityModal(true);
    }
    const userMajorModalOpen=(name,email,pw,pwAgain,sex,birth)=>{
        userDefaultValue(name,email,pw,pwAgain,sex,birth)
        setMajorModal(true);
    }
    return (
        <>
            <Modal
                visible={modalVisible}
                animationType={"fade"}
                transparent
                statusBarTranslucent
                onRequestClose={()=>closeModal()}
            >
                <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={-70}
                >
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback
                            onPress={closeModal}
                        >
                            <View style={styles.background}/>
                        </TouchableWithoutFeedback>
                        <Animated.View
                            style={[{...styles.bottomSheetContainer, transform: [{ translateY: translateY_login }]}]}
                            {...panResponders_login.panHandlers}
                        >
                            <View style={{padding:3}}/>
                            <Image style={{width:100,height:3.5,borderRadius:50}} source={require('../../../imageResource/jobDaHan/modalBar.png')}/>
                            <View style={styles.iconDirection}>
                                <View style={{flex:1}}/>
                                <TouchableOpacity
                                    onPress={()=>{setSignUpSelectedTab(false),setLoginSelectedTab(true)}}
                                    style={styles.iconLocation}>
                                    <Image source={require('../../../imageResource/icon/ic_login.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>{setLoginSelectedTab(false),setSignUpSelectedTab(true)}}
                                    style={styles.iconLocation}>
                                    <Image source={require('../../../imageResource/icon/ic_join.png')}/>
                                </TouchableOpacity>
                                <View style={{flex:1}}/>
                            </View>
                            {loginSelectedTab && <Login/>}
                            {SignUpSelectedTab && <SignUp/>}
                        </Animated.View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </>
    )
}

export default BottomSheet_login;
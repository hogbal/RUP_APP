import React ,{useEffect,useState,useRef}from 'react'
import {View, Image, StyleSheet,TouchableOpacity,Text,TextInput,Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import {validateEmail} from '../../../validate.js'
import { RadioButton } from 'react-native-paper';
import { MMKV } from 'react-native-mmkv'
import axios from 'axios'
import SearchUniversity from '../SearchUniversity.js';
import SearchMajor from '../SearchMajor.js'
import styles from './style.js';

export const storage = new MMKV()


function KakaoSignUp(props){
    const navigation = useNavigation()
    const nickNameRef = useRef(null)
    const emailRef = useRef(null)
    const k_sex = props.route.params.kakao_account.gender_needs_agreement
    const k_birthday = props.route.params.kakao_account.birthday_needs_agreement
    const k_email = props.route.params.kakao_account.email_needs_agreement
    const [sex, setSex] = useState(props.route.params.kakao_account.gender_needs_agreement?null:(props.route.params.kakao_account.gender==='MALE'?'M':'W'));
    const [birth,setBirth]=useState(props.route.params.kakao_account.birthday_needs_agreement?null:props.route.params.kakao_account.birthday)
    const [nickName,setNickName]=useState(props.route.params.properties.nickname)
    const [email,setEmail]=useState(props.route.params.kakao_account.email_needs_agreement?null:props.route.params.kakao_account.email)
    const [nickCheck,setNickCheck]=useState(false)
    const [univ,setUniv]=useState('학교찾기')
    const [major,setMajor]=useState('학과')
    const [universityModal, setUniversityModal] = useState(false);
    const [majorModal, setMajorModal] = useState(false);
    const toast = useToast();
    const redStar = require('../../../imageResource/jobDaHan/redStar.png')

    const showToast=(message)=>{                        //토스트 메세지
        toast.show(message,{
            type:'custom',
            duration:1500,
            animationType:'zoom-in',
            placement:'bottom',
            style:{
                marginBottom:'30%'
            }
        })
    }
    
    useEffect(()=>{
        nickNameRef.current?.focus()
    },[])
    ////////////////////////////////////////// 이메일 입력 완료 시 학교,학과 모달 자동 띄우기 //////////////////

    const nickToServer=()=>{
        fetch('http://13.124.80.15/user/nickname-check',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              nickname:nickName
            })
        })
        .then(res=>{return res.json()})
        .then(data=>{
            console.log(data)
            if(data.success===true){
                showToast('중복 확인 완료')
                setNickCheck(true)
            }else{
                showToast('이미 존재하는 닉네임 입니다.')
            }
        })
        .catch(error=>console.log('ERROR'))
    }
    const postSignUp=()=>{
        fetch('http://13.124.80.15/user/add-new-user',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                uid:props.route.params.id, // 필수
                email:email, // 필수
                nickname: nickName,// 필수
                sex : sex,
                birth: '1997-01-11',
                college: univ,
                major:major
            })
        })
        .then(res=>{return res.json()})
        .then(data=>{
            console.log(data)
            if(data.success===true){
                showToast('회원가입 완료!')
                getMainData(props.route.params.id)
            }else{
                showToast('회원가입 안됨')
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
            const user = {
                uid:response.data.uid,
                userName: response.data.nickname,
                email: response.data.email,
                password: response.data.password,
                profileImage:'https://image.fnnews.com/resource/media/image/2022/07/16/202207160834208420_l.jpg',
                point:0,
                countRecycle:0,
                calendarDate:response.data.calendarDate,
                flowerRecord:response.data.flowerRecord,
                birth:response.data.birth,
                sex:response.data.sex,
                univ:response.data.college,
                major:response.data.major
            }      
            storage.set('user', JSON.stringify(user))
            navigation.reset({routes:[{name:'Main'}]})
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    const isNickCheck=()=>{
        if(nickCheck===true)
            return emailCheck()
        else
            return showToast('닉네임 중복 확인 해주세요')
    }
    const emailCheck=()=>{
        if(validateEmail(email))
            return univCheck()
        else{
            console.log(email)
            return showToast('이메일 오류')    
        }
    }
    const univCheck=()=>{
        if(univ!=='학교찾기')
            return majorCheck()
        else
            return showToast('학교 선택 해주세요')
    }
    const majorCheck=()=>{
        if(major!=='학과')
            return postSignUp()
        else
            return showToast('학과 선택 해주세요')
    }
    
    ////////////////////////////////////////// 이메일 입력 완료 시 학교,학과 모달 자동 띄우기 //////////////////
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={()=>navigation.goBack()}
                style={{marginTop:30,marginLeft:30}}                
            >
                <Image source={require('../../../imageResource/icon/ic_arrow_left.png')}/>
            </TouchableOpacity>
            <View style={{flex:1,alignItems:'center',marginTop:'30%'}}>
                <Text style={styles.passwordText}>회원 가입</Text>
                <View style={{flexDirection:'row'}}>
                    <Image
                        style={styles.redStar} 
                        source={redStar}/>
                    <TextInput
                        placeholder='닉네임(2~16자)'
                        style={styles.sectionStyle2}
                        defaultValue={props.route.params.properties.nickname}
                        ref={nickNameRef}
                        onChangeText={(name)=>setNickName(name)}
                        />
                    <TouchableOpacity 
                        style={styles.nickNameCheck}
                        onPress={()=>nickToServer()}
                    >
                        <Text style={{fontSize:12,color:'white'}}>중복 확인</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image
                            style={styles.redStar} 
                            source={redStar}/>
                    <TextInput 
                        placeholder='이메일을 입력해 주세요.'
                        style={styles.sectionStyle}
                        defaultValue={k_email?null:props.route.params.kakao_account.email}
                        onChangeText={email=>setEmail(email)}
                        ref={emailRef}
                    />
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image
                        style={styles.redStar} 
                        source={redStar}/>
                    <TouchableOpacity
                        style={[styles.sectionStyle,{justifyContent:'center'}]}
                        onPress={()=>setUniversityModal(true)}    
                    >
                        <Text>{univ}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image
                        style={styles.redStar} 
                        source={redStar}/>
                    <TouchableOpacity
                        style={[styles.sectionStyle,{justifyContent:'center'}]}    
                        onPress={()=>setMajorModal(true)}
                    >
                        <Text>{major}</Text>
                    </TouchableOpacity>
                </View>
                {k_sex===true&&
                <View style={styles.sectionStyle3}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>성별</Text>
                        <View style={styles.sex}/>
                        <Text>남</Text>
                        <RadioButton
                            value='M'
                            status={ sex === 'M' ? 'checked' : 'unchecked' }
                            onPress={() => setSex('M')}
                        />
                        <Text>여</Text>
                        <RadioButton
                            value='W'
                            status={ sex === 'W' ? 'checked' : 'unchecked' }
                            onPress={() => setSex('W')}
                        />
                    </View>
                </View>}
                {k_birthday===true&&
                <View style={styles.sectionStyle}>
                    <View style={{flexDirection:'row'}}>
                        <Text>생년월일</Text>
                        <Text>생년월일</Text>
                    </View>
                </View>}
                <TouchableOpacity 
                    onPress={()=>{
                        //setFindPw('비밀번호 찾기 버튼 클릭')
                        isNickCheck()
                    }}
                    style={styles.signUp}>
                    <Text style={styles.signUpText}>시작하기</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <Image
                        style={{width:5,height:5}} 
                        source={redStar}/>
                    <Text style={{color:'red'}}>(필수)</Text>
                </View>
            </View>
            <SearchUniversity
                universityModal={universityModal}
                setUniversityModal={setUniversityModal}
                setUserUniversity={setUniv}
            />
            <SearchMajor
                majorModal={majorModal}
                setMajorModal={setMajorModal}
                setUserMajor={setMajor}
            />
        </View>
    )
}

export default KakaoSignUp

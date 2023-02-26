import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {validateEmail} from '../../../validate.js';
import Clipboard from '@react-native-clipboard/clipboard';
import styles from './style.js';

function FindId(props) {
  const navigation = useNavigation();
  const emailRef = useRef(null);
  const [email, setEmail] = useState(null);
  const [findPw, setFindPw] = useState('');
  const [univ, setUniv] = useState('학교찾기');
  const [major, setMajor] = useState('학과');
  const [universityModal, setUniversityModal] = useState(false);
  const [majorModal, setMajorModal] = useState(false);
  const [tempRandom, setTempRandom] = useState('');
  const toast = useToast();
  const isFocused = useIsFocused();

  const findPwTab = () => {
    if (findPw === '아이디 찾기 버튼 클릭') {
      return <FindPw />;
    }
  };
  useEffect(() => {
    if (props.route.params != undefined) {
      if (props.route.params.univ != undefined) {
        setUniv(props.route.params.univ);
      }
      if (props.route.params.major != undefined) {
        setMajor(props.route.params.major);
      }
    }
  }, [isFocused]);

  const FindPw = () => (
    <>
      <Text style={styles.secretText}>
        임시 비밀번호를 클립보드에 복사하였습니다!
      </Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.secretSignUp}>
        <Text style={styles.do_login_text}>로그인 하기</Text>
      </TouchableOpacity>
    </>
  );
  const showToast = message => {
    //토스트 메세지
    toast.show(message, {
      type: 'custom',
      duration: 1500,
      animationType: 'zoom-in',
      placement: 'bottom',
      style: {
        marginBottom: '30%',
      },
    });
  };
  const getUserUid = () => {
    fetch('http://13.124.80.15/user/find-pw-before-email', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email.trim(),
        college: univ,
        major: major,
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.uid === '-1') {
          showToast('존재하지 않는 회원정보입니다.');
        } else {
          const randomNum = (
            Math.floor(Math.random() * (999999 - 100000)) + 100000
          ).toString(); // 100000 ~ 999999
          postTempPw(data.uid, randomNum);
        }
      })
      .catch(error => console.log('ERROR'));
  };
  const postTempPw = (uid, tempPw) => {
    fetch('http://13.124.80.15/user/find-pw-after-email', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        uid: uid,
        tempPw: tempPw,
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.success === true) {
          Clipboard.setString(tempPw);
          setFindPw('아이디 찾기 버튼 클릭');
        } else {
          showToast('네트워크 오류');
        }
      })
      .catch(error => console.log('ERROR'));
  };
  useEffect(() => {
    emailRef.current?.focus();
  }, []);
  ////////////////////////////////////////// 이메일 입력 완료 시 학교,학과 모달 자동 띄우기 //////////////////
  useEffect(() => {
    if (major === '학과' && univ !== '학교찾기') {
      setMajorModal(true);
    }
  }, [univ]);
  // useEffect(()=>{},[isFocused])

  emailOnSubmitEditing = () => {
    if (validateEmail(email)) return modalOpen();
    else showToast('닉네임 오류');
  };

  modalOpen = () => {
    if (univ === '학교찾기') return setUniversityModal(true);
    if (major === '학과') return setMajorModal(true);
    return getUserUid();
  };
  ////////////////////////////////////////// 이메일 입력 완료 시 학교,학과 모달 자동 띄우기 //////////////////
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{marginTop: 30, marginLeft: 30}}>
        <Image
          source={require('../../../imageResource/icon/ic_arrow_left.png')}
        />
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center', marginTop: '30%'}}>
        <Text style={styles.passwordText}>아이디 찾기</Text>
        <TextInput
          placeholder="닉네임을 입력해 주세요."
          style={styles.sectionStyle}
          onChangeText={email => setEmail(email)}
          ref={emailRef}
          onSubmitEditing={() => emailOnSubmitEditing()}
        />
        <TouchableOpacity
          style={[styles.sectionStyle, {justifyContent: 'center'}]}
          onPress={() =>
            navigation.navigate('SearchUniversity', {page: 'FindId'})
          }>
          <Text>{univ}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionStyle, {justifyContent: 'center'}]}
          onPress={() => navigation.navigate('SearchMajor', {page: 'FindId'})}>
          <Text>{major}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            //setFindPw('비밀번호 찾기 버튼 클릭')
            emailOnSubmitEditing();
          }}
          style={styles.signUp}>
          <Text style={styles.signUpText}>아이디 찾기</Text>
        </TouchableOpacity>
        {findPwTab()}
      </View>
    </SafeAreaView>
  );
}

export default FindId;

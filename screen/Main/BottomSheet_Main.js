import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
    TouchableOpacity,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { MMKV } from 'react-native-mmkv'
import styles from './style'
import { useIsFocused } from '@react-navigation/native';
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

const BottomSheet_Main = (props) => {
    
    const jsonUser = storage.getString('user')
    const userObject = JSON.parse(jsonUser)
    const isFocused = useIsFocused();
    const [check,setCheck]=useState(0)
  
    const { modalVisible, setModalVisible, setPoint, setRecycle } = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(props.modalVisible) {
            resetBottomSheet.start();
        }
    }, [props.modalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(()=>{
            setModalVisible(false);
        })
    }
    const selectSeed=()=>{
        console.log('hi')
    }
    useEffect(()=>{                 //////비밀번호를 잊으셨나요 페이지 들어갔다 나와도 로그인모달 올라오게 하는 함수
        if(modalVisible===true){
            console.log('열')
        }
        else{
            console.log(userObject.uid)
            if(check===0){
                setCheck(check+1)
                return
            }else{
                setTimeout(()=>{
                    axios.get('http://13.124.80.15/home/main', {
                        params: {
                            uid: userObject.uid
                        }
                    })
                    .then(function (response) {
                        userObject.point = response.data.point
                        userObject.countRecycle = response.data.countRecycle
                        storage.set('user', JSON.stringify(userObject))
                        setPoint(response.data.point)
                        setRecycle(response.data.countRecycle)
                    })
                    .catch(function (error) {
                        console.log(error);
                        console.log('fail')
                    });      
                },1000)   
            }
        }
    },[modalVisible])
    // axios.get('http://152.67.193.99//home/main', {
    //                     params: {
    //                         uid: userObject.uid
    //                     }
    //                 })
    //                 .then(function (response) {
    //                     const user = {
    //                         uid:response.data.uid,
    //                         userName: response.data.nickname,
    //                         email: response.data.email,
    //                         password: response.data.password,
    //                         profileImage:'https://image.fnnews.com/resource/media/image/2022/07/16/202207160834208420_l.jpg',
    //                         point:0,
    //                         countRecycle:0,
    //                         calendarDate:response.data.calendarDate,
    //                         flowerRecord:response.data.flowerRecord,
    //                         birth:response.data.birth,
    //                         sex:response.data.sex,
    //                         univ:response.data.college,
    //                         major:response.data.major
    //                     }      
    //                     storage.set('user', JSON.stringify(user))
    //                     setPoint(response.data.point)
    //                 })       
    return (
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent
            statusBarTranslucent
            onRequestClose={()=>closeModal()}
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={styles.background}/>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{...styles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
                    {...panResponders.panHandlers}
                >
                    <View style={styles.modalTopLineContainer}>
                        <View style={styles.modalTopLine}>

                        </View>
                    </View>
                    <View style={{height:'15%'}}/>
                    <View style={styles.QrCodeContainer}>
                        <QRCode
                            value={userObject.uid}
                            // style={{height:'40%',width:'40%'}}
                            size={140}
                        />
                    </View>
                    <View style={{height:'40%',width:'100%',alignItems:'center'}}>
                        <View style={{marginTop:'15%'}}>
                            <Text style={styles.QrCodeScanText}>QR코드를 스캔하시면 포인트가 적립됩니다.</Text>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}


export default BottomSheet_Main;
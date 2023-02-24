import React ,{useEffect}from 'react'
import {View, Image, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'
import styles from './style.js';

import { flowerName } from '../../Main/flower'
import { createPOSTObject, createGETObject } from '../../API/Network'

export const storage = new MMKV()
function Loading(){
    const navigation = useNavigation()
    
    useEffect(()=>{
        if(storage.getString('user')===undefined){
            setTimeout(()=>{navigation.reset({routes:[{name:'Login'}]})}, 1500);
        }
        else{
            const jsonUser = storage.getString('user')
            const userObject = JSON.parse(jsonUser)

            createGETObject('home/main',userObject.uid)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                let arr = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                if(data.flowerEnds.length>0){
                    for(let i=0;i<(data.flowerEnds).length;i++ ){
                        arr[i] = flowerName[data.flowerEnds[i].flower]
                    }
                }
                if(data.flowerNow.length==1) {
                    data.flowerNow[0].flower = flowerName[data.flowerNow[0].flower]
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
                storage.set('user', JSON.stringify(user))
                navigation.reset({routes:[{name:'Main'}]})
            })
            .catch(error=>console.log('ERROR',error))
        }
    },[])

    return(
        <View style={styles.container}>
            <Image source={require('../../../imageResource/logo/logo_main.png')}/>
        </View>
    )
}

export default Loading
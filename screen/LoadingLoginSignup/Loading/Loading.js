import React ,{useEffect}from 'react'
import {View, Image, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'
import axios from 'axios';
import styles from './style.js';

export const storage = new MMKV()
function Loading(){
    const navigation = useNavigation()
    
    useEffect(()=>{
        if(storage.getString('user')===undefined){
            setTimeout(()=>{navigation.reset({routes:[{name:'Login'}]})}, 1500);
        }
        else{
            const jsonUser = storage.getString('user') // { 'userName': '박재연', 'point': 0 }
            const userObject = JSON.parse(jsonUser)
            axios.get('http://13.124.80.15/home/main', {
                params: {
                uid: userObject.uid
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
                    point:response.data.point,
                    countRecycle:response.data.countRecycle,
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
                setTimeout(()=>{navigation.reset({routes:[{name:'Main'}]})}, 1500);
            })
            .catch(function (error) {
                console.log(error);
                console.log('fail')
            });
        }
    },[])

    return(
        <View style={styles.container}>
            <Image source={require('../../../imageResource/logo/logo_main.png')}/>
        </View>
    )
}

export default Loading
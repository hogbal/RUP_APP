import React,{useEffect,useState}  from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Pressable,
    Modal,
    Button
} from 'react-native'
import axios from 'axios'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
function Test(){
    const ff=()=>{
        const frm = new FormData()
        frm.append('profilePhoto',
        {
            uri:"file:///data/user/0/com.joljakprojecttest/cache/rn_image_picker_lib_temp_dc6ea8e5-a58e-4e03-bb17-37669641f448.jpg",
        })
        let userInfo = {
            uid: "2f3293a2-b0ba-4d35-b2a5-4241241901c5",
            email: "pthdud@naver.com",
            password: "11112",
            nickname: "fefwef",
            sex: "W",
            birth: "1999-04-05",
            college: "가톨릭관동대학교",
            major: "3D제품디자인과",
        }
        frm.append('userInfo',JSON.stringify(userInfo))
        axios.post('http://13.124.80.15/user/update-user-info',{
            headers: { "Content-Type": 'multipart/form-data'},
            data:frm
            })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })

        // axios.post('http://13.124.80.15/user/update-user-info', frm,{
        //     headers: { "Content-Type": 'multipart/form-data'}
        //     })
        // .then((response) => {
        //     console.log(response.data)
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
    }
    
    return(
        <SafeAreaView>
            <Button title='dd' onPress={()=>ff()} />
            <Image 
                source={{uri:"file:///data/user/0/com.joljakprojecttest/cache/rn_image_picker_lib_temp_dc6ea8e5-a58e-4e03-bb17-37669641f448.jpg"}}
                style={{width:400,height:400}}
            />
        </SafeAreaView>
    )
}

export default Test

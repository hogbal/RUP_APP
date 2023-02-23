import React ,{useEffect, useState}from 'react'
import {
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView
} from 'react-native'
import { useNavigation,useIsFocused } from '@react-navigation/native';
import ProfileImage from './ProfileImage.js'
import ProfileInfo from './ProfileInfo.js';
import styles from './style.js';
import { storage } from '../Main.js';

function Profile({route}){
    const isFocused=useIsFocused()
    const navigation = useNavigation()
    const [major, setMajor] = useState("")
    const [university, setUniversity] = useState("")

    useEffect(()=>{ 
        if(route.params!=undefined){
            if(route.params.univ!=undefined)
                setUniversity(route.params.univ)
            if(route.params.major!=undefined)
                setMajor(route.params.major)
        }},[isFocused])
    return(
        
        <SafeAreaView style={[styles.container]}>
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={-100}
            >
                <View style={{justifyContent:'flex-end'}}>
                    <TouchableOpacity 
                        onPress={()=>navigation.goBack()}
                        style={{marginTop:30,marginLeft:30,width:40}}                
                    >
                        <Image source={require('../../../imageResource/icon/ic_arrow_left.png')}/>
                    </TouchableOpacity>
                    <View style={styles.horizonalLine}/>
                    <ProfileImage/>
                    <View style={{marginTop:'7%'}}/>
                    <ProfileInfo
                        profilemajor={major}
                        profileuniversity={university}

                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Profile
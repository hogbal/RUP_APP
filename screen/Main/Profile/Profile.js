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

function Profile({route}){
    const isFocused=useIsFocused()
    const navigation = useNavigation()

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
                    <ProfileInfo />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Profile
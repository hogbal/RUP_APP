import React, { useEffect, useRef,useState } from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity
} from 'react-native';
import styles from './style'
import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV()

const InputSeedNameModal=(props)=>{
    const { inputNameModalVisible, setInputNameModalVisible, setSeedName_mainPage} = props;
    const [seedName,setSeedName]=useState('')
    const jsonUser = storage.getString('user') 
    const userObject = JSON.parse(jsonUser)

    const closeModal=()=>{
        if(seedName!=='')
        {
            userObject.nowFlowerName=seedName
            storage.set('user',JSON.stringify(userObject))
            setSeedName_mainPage(seedName)
            setInputNameModalVisible(false)
        }
        else
        {
            console.log('toast message 이름을 입력해주세요!')
        }
    }
    return(
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={inputNameModalVisible}
            >    
                <View style={styles.centeredView}>
                    <View style={[styles.modalView]}>
                        <View style={styles.flexThree}>
                            <Text style={{color:'#000000'}}>씨앗의 이름을 지어주세요!</Text>
                        </View>
                        <View style={[styles.flexSeven,{justifyContent:'center',alignItems:'center'}]}>
                            <TextInput
                                placeholder="이름"
                                style={{fontSize:30}}
                                onChangeText={seedName=>setSeedName(seedName)}
                            />
                            <View style={{backgroundColor:'red'}}/>
                        </View>
                        <View style={styles.flexThree}>
                            <TouchableOpacity
                                onPress={()=>closeModal()}
                                style={styles.selectSeedButton}>
                                <Text style={styles.selectSeedText}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
export default InputSeedNameModal
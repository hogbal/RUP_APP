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

import { createPOSTObject, createGETObject } from '../API/Network'

const InputSeedNameModal=(props)=>{
    const { inputNameModalVisible, setInputNameModalVisible, selectSeed} = props;
    const [seedName,setSeedName]=useState('')
    const [userObject, setUser] = useState({})

    useEffect(() => {
        getUser()
    },[])

    const getUser = async () => {
        try {
          const user = await JSON.parse(storage.getString('user'))
          if(user !== null) {
            setUser(user)
            return user
          }
        }
        catch (e) {
          console.error(e)
        }
      }

    const closeModal=()=>{
        if(seedName!=='')
        {
            let data = {
                uid:userObject.uid,
                flower:selectSeed,
                flowerNickname:seedName
            }
          
            createPOSTObject('flower/add-new-flower', data)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log("Flower Add Success", data)
                setInputNameModalVisible(false)
            })
            .catch(error=>console.log('ERROR'))
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
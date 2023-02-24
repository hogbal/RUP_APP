import React, { useEffect, useRef,useState } from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
    Image,
    TouchableOpacity
} from 'react-native';
import ChooseSeed from './ChooseSeed';
import InputSeedNameModal from './InputSeedNameModal'
import styles from './style'
import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV()

const SeedModal=(props)=>{
    const { seedModalVisible, setSeedModalVisible, userObject } = props;
    const [seedColor,setSeedColor]=useState('')
    const [inputNameModalVisible,setInputNameModalVisible]=useState(false)
    const [selectSeed, setSelectSeed] = useState('')

    closeModal=()=>{
        setSeedModalVisible(false)
    }
    const isChoosenSeed=()=>{
        if(seedColor===''){
            console.log('toast message 씨앗을 선택하지 않았습니다!')
        }
        else{
            switch(seedColor){
                case 'Pink':
                    setSelectSeed('flowerA')
                    break
                case 'Brown':
                    setSelectSeed('flowerB')
                    break
                case 'Lavender':
                    setSelectSeed('flowerC')
                    break;
                case 'Green':
                    setSelectSeed('flowerD')
                    break
                case 'Purple':
                    setSelectSeed('flowerE')
                    break
                case 'Yellow':
                //   userObject.nowFlowerSeed = (Math.floor(Math.random()*5)+5)
                    setSelectSeed('flowerF')
                    break
            }
            setInputNameModalVisible(true)
            setSeedModalVisible(false)
        }
    }
    return(
        <>
            <Modal
                animationType="none"
                transparent={true}
                visible={seedModalVisible}
                onRequestClose={() => {
                    setSeedModalVisible(false);
                }}
            >    
                <View style={styles.centeredView}>
                    <View style={[styles.modalView]}>
                        <View style={styles.flexThree}>
                            <Text style={{color:'#000000'}}>씨앗을 선택하세요</Text>
                        </View>
                        <View style={styles.flexSeven}>
                            <ChooseSeed
                                seedColor={seedColor}
                                setSeedColor={setSeedColor}
                            />
                        </View>
                        <View style={styles.flexThree}>
                            <TouchableOpacity
                                onPress={isChoosenSeed}  
                                style={styles.selectSeedButton}>
                                <Text style={styles.selectSeedText}>씨앗 선택하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <InputSeedNameModal
                inputNameModalVisible={inputNameModalVisible}
                setInputNameModalVisible={setInputNameModalVisible}
                selectSeed={selectSeed}
                userObject={userObject}
            />
        </>
    )
}
export default SeedModal
import React,{useEffect,useState} from 'react'
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Image,
} from 'react-native';
import styles from './style'
import flower from './flower'
import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV()

import { createPOSTObject, createGETObject } from '../API/Network'

const SeedFinish = (props) => {
    const { finishSeedVisible, setfinishSeedVisible, userObject } = props;
    const [ seedName, setSeedName ] = useState('')
    const [ seedUri, setSeedUri ] = useState('')

    useEffect(()=>{
        if(userObject.flowerNow.length !== 0) {
            setSeedName(userObject.flowerNow[0].flowerNickname)
            setSeedUri(flower[userObject.flowerNow[0].flower].upng)
        }
    },[userObject])

    const gotoMoon = () => {
        let data = {
            uid:userObject.uid
        }

        createPOSTObject('flower/mv-flower', data)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log("Flower Add Success", data)
                setfinishSeedVisible(false)
            })
            .catch(error=>console.log('ERROR'))
    }

    const closeModal = () => {
        setfinishSeedVisible(false)
    }

return (
    <>
        <Modal
            animationType="none"
            transparent={true}
            visible={finishSeedVisible}
            onRequestClose={() => {
                setfinishSeedVisible(false);
            }}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                    <View style={styles.flexThree}>
                        <Text style={{ color: '#000000' }}>축하합니다! {seedName}이가 모두 자랐어요</Text>
                        <Text style={{ color: '#000000' }}>나만의 정원으로 옮겨보세요</Text>
                    </View>
                    <View style={{ marginLeft: '20%' }}>
                        <Image style={{ width: 170, height: 250 }} source={seedUri}/>
                    </View>
                    <View style={styles.flexThree}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={gotoMoon}
                                style={styles.selectSeedButton}>
                                <Text style={styles.selectSeedText}>옮기기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={closeModal}
                                style={styles.selectSeedButton}>
                                <Text style={styles.selectSeedText}>다음에</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    </>
)
}
export default SeedFinish
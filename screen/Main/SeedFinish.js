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
    const { finishSeedVisible, setfinishSeedVisible } = props;

    const [userObject, setUser] = useState({})
    
    useEffect(() => {
        getUser()
        console.log(userObject)
    },[])

    const getUser = async () => {
        try {
          const user = await JSON.parse(storage.getString('user'))
          if(user !== null) {
            console.log(user)
            setUser(user)
            return user
          }
        }
        catch (e) {
          console.error(e)
        }
    }

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

    // const caching = ()=>{
    // setJsonUser(storage.getString('user'))
    // setUserObject(JSON.parse(jsonUser))
    // }

    // useEffect(() => {caching()}, [isFocused]);

    // const gotoMoon = () => {
    //     for(key in userObject.flowerUri){
    //        if(userObject.flowerUri[key]==-1){
    //             userObject.flowerUri[key]=userObject.nowFlowerSeed
    //             storage.set('user',JSON.stringify(userObject))
    //             break;
    //        }
    //     }
    //     setSeedModalVisible(true)
    //     setfinishSeed(false)
    // }
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
                        {/* <Text style={{ color: '#000000' }}>축하합니다! {userObject.flowerNow[0].flowerNickname}이가 모두 자랐어요</Text> */}
                        <Text style={{ color: '#000000' }}>축하합니다! test이가 모두 자랐어요</Text>
                        <Text style={{ color: '#000000' }}>나만의 정원으로 옮겨보세요</Text>
                    </View>
                    <View style={{ marginLeft: '20%' }}>
                        {/* <Image style={{ width: 170, height: 250 }} source={flower[userObject.flowerNow[0].flower].upng}/> */}
                        <Image style={{ width: 170, height: 250 }} source={flower[0].upng}/>
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
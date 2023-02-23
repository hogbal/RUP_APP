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
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV()

const SeedFinish = (props) => {
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const { finishSeed, seedName, setfinishSeed, setSeedModalVisible} = props;

    const [jsonUser,setJsonUser] = useState(storage.getString('user'))
    const [userObject,setUserObject] = useState(JSON.parse(jsonUser))
    
    const caching = ()=>{
    setJsonUser(storage.getString('user'))
    setUserObject(JSON.parse(jsonUser))
    }

    useEffect(() => {caching()}, [isFocused]);

    const closeModal = () => {
        setfinishSeed(false)
    }
    const gotoMoon = () => {
        for(key in userObject.flowerUri){
           if(userObject.flowerUri[key]==-1){
                userObject.flowerUri[key]=userObject.nowFlowerSeed
                userObject.nowFlowerSeed=10
                storage.set('user',JSON.stringify(userObject))
                break;
           }
        }
        setSeedModalVisible(true)
        setfinishSeed(false)
    }
return (
    <>
        <Modal
            animationType="none"
            transparent={true}
            visible={finishSeed}
            onRequestClose={() => {
                setfinishSeed(false);
            }}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                    <View style={styles.flexThree}>
                        <Text style={{ color: '#000000' }}>축하합니다! {seedName}이가 모두 자랐어요</Text>
                        <Text style={{ color: '#000000' }}>나만의 정원으로 옮겨보세요</Text>
                    </View>
                    <View style={{ marginLeft: '20%' }}>
                        <Image style={{ width: 170, height: 250 }} source={userObject.nowFlowerSeed != 10 ? flower[userObject.nowFlowerSeed].upng : {uri:''}}/>
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
                                style={styles.selectSeedButtonNext}>
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
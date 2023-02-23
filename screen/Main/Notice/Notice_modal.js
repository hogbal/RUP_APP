import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
    Image
} from 'react-native';
import styles from './style'

const Notice_modal=(props)=>{
    const { noticemodalVisible, setnoticeModalVisible,text} = props;
    return(
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={noticemodalVisible}
                onRequestClose={() => {
                setnoticeModalVisible(false);
                }}
            >     
                <Pressable 
                style={styles.centeredView}
                onPress={()=>setnoticeModalVisible(false)}
                >

                    <View style={styles.modalView}>
                        <Pressable
                            style={{alignSelf: 'flex-end'}}
                            onPress={() => setnoticeModalVisible(false)}
                        >
                            <Image 
                                style={styles.exitlogo}
                                source={require('../../../imageResource/icon/ic_close.png')}
                            />
                        </Pressable>
                        <View style={styles.noticeText}>
                        <Text style={{textAlign:"center"}}>
                           {text}
                        </Text>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}
export default Notice_modal
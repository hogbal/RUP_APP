import React,{useState} from 'react'
import {
    View,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView
} from 'react-native'
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'
import BottomSheet_InFullBloom from './BottomSheet_InFullBloom';
import styles from './style';
import { flower } from '../flower'

export const storage = new MMKV()
function InFullBloom(props){
    const jsonUser = storage.getString('user')
    const userObject = JSON.parse(jsonUser)
    console.log(userObject)
    const navigation = useNavigation()
    const [modalVisible,setModalVisible]=useState(false)
    
    return(
        <SafeAreaView style={{flex:1, backgroundColor:"rgb(253,246,234)"}}>
            <ImageBackground style={{
                    flex: 1
                }}
                source={require('../../../imageResource/background/bg_06.png')}>
                <View>
                    <View style={{flexDirection:'row',height:'15%'}}>
                        <View style={{width:'62%',justifyContent:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity 
                                    onPress={()=>navigation.navigate('Profile')}
                                    style={styles.profileImageContainer}>
                                    <Image 
                                        source={userObject.profileImgPath===''?require('../../../imageResource/icon/ic_profile.png'):{uri:userObject.profileImgPath}}
                                        style={styles.profileImage}/>
                                </TouchableOpacity>
                                <View style={{justifyContent:'center',marginLeft:'5%'}}>
                                    <Text style={styles.name}>{userObject.userName}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width:'38%',flexDirection:'row'}}>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <Image style ={{width:30,height:30}} source={require('../../../imageResource/icon/ic_recycle_0.png')}/>
                                <Text style={styles.name}>{userObject.countRecycle}</Text>
                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column',marginRight:'20%'}}>
                                <Image style ={{width:30,height:30,}} source={require('../../../imageResource/icon/ic_point.png')}/>
                                <Text style={styles.name}>{userObject.point}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height:'70%'}}>
                        <View style={{height:'34%',}}/>
                        
                        <View style={{height:'10%',flexDirection:"row",}}>
                            <Image style={{width:80,height:110,marginLeft:50,}} source={userObject.flowerUri[0]!=-1 ? flower[userObject.flowerUri[0]].upng :{uri: undefined}}/>
                            <Image style={{width:80,height:110,marginLeft:30,}} source={userObject.flowerUri[1]!=-1 ? flower[userObject.flowerUri[1]].upng :{uri: undefined}}/>
                            <Image style={{width:80,height:110,marginLeft:30,}} source={userObject.flowerUri[2]!=-1 ? flower[userObject.flowerUri[2]].upng :{uri: undefined}}/>
                        </View>
                        <View style={{height:'10%', flexDirection:"row",marginTop:-2}}>
                            <Image style={{width:80,height:110,marginLeft:23}} source={userObject.flowerUri[3]!=-1 ? flower[userObject.flowerUri[3]].upng :{uri:undefined}}/>
                            <Image style={{width:80,height:110,marginLeft:10}} source={userObject.flowerUri[4]!=-1 ? flower[userObject.flowerUri[4]].upng :{uri:undefined}}/>
                            <Image style={{width:80,height:110,marginLeft:10}} source={userObject.flowerUri[5]!=-1 ? flower[userObject.flowerUri[5]].upng :{uri:undefined}}/>
                            <Image style={{width:80,height:110,marginLeft:10}} source={userObject.flowerUri[6]!=-1 ? flower[userObject.flowerUri[6]].upng :{uri:undefined}}/> 
                        </View>
                        <View style={{height:'10%', flexDirection:"row",}}>
                            <Image style={{width:80,height:110,marginLeft:50,}} source={userObject.flowerUri[7]!=-1 ? flower[userObject.flowerUri[7]].upng :{uri:undefined}}/>
                            <Image style={{width:80,height:110,marginLeft:30,}} source={userObject.flowerUri[8]!=-1 ? flower[userObject.flowerUri[8]].upng :{uri:undefined}}/>
                            <Image style={{width:80,height:110,marginLeft:30,}} source={userObject.flowerUri[9]!=-1 ? flower[userObject.flowerUri[9]].upng :{uri:undefined}}/> 
                        </View>
                    </View>

                    <View style={{height:'15%',justifyContent:'center',alignItems:'center'}}>
                        <View style={{height:'10%',}}/>
                        <TouchableOpacity onPress={()=>setModalVisible(true)}>
                            <Image style={{width:70,height:70}} source={require('../../../imageResource/icon/qrcode.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <BottomSheet_InFullBloom
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </ImageBackground>
        </SafeAreaView>
    )
}
export default InFullBloom


//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기
//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기
//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기
//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기

//style변경//style변경//style변경//style변경//style변경//style변경//style변경//style변경//style변경//style변경

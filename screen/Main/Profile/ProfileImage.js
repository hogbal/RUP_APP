import React,{useState} from 'react'
import {
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    Image,
    View,
    KeyboardAvoidingView,
    Modal,
    TouchableWithoutFeedback,
    PermissionsAndroid,
    Permission,
    Platform
} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'
import styles from './style'

export const storage = new MMKV()
const ProfileImage=()=>{
    const navigation = useNavigation()
    const jsonUser = storage.getString('user')
    const userObject = jsonUser == undefined ? {} :JSON.parse(jsonUser)
    const [ modalVisible, setModalVisible ] = useState(false);
    const [profileImage, setProfileImage] = useState(userObject.profileImgPath===''?require('../../../imageResource/icon/ic_profile.png'):userObject.profileImgPath);
    const androidGalleryImagePick= async ()=>{
        setModalVisible(false)
        const result = await launchImageLibrary();
            if (result.didCancel){
            return null;
            } 
            const localUri = result.assets[0].uri;
            const uriPath = localUri.split("//").pop();
            setProfileImage("file://"+uriPath)

            userObject.profileImgPath="file://"+uriPath
            storage.set('user', JSON.stringify(userObject))
    }
    const androidPhotoImagePick= async ()=>{
            setModalVisible(false)
            const result = await launchCamera({
                mediaType : 'photo',
                cameraType : 'back',
            });
            if (result.didCancel){
                return null;
            }
            const localUri = result.assets[0].uri;
            const uriPath = localUri.split("//").pop();
            setProfileImage("file://"+uriPath)
            
            userObject.profileImgPath="file://"+uriPath
            storage.set('user', JSON.stringify(userObject))
            console.log('d ',userObject.profileImgPath)
            console.log(uriPath)
        
    }

    const platFormGalleryImage=()=>{
        return Platform.OS==='android' ?  <AndroidGallery />:<IosGallery />
    }
    const platFormCameraImage=()=>{
        return Platform.OS==='android' ?  <AndroidCamera />:<IosCamera />
    }
    const AndroidGallery=()=>(
        <Image 
            source={require('../../../imageResource/jobDaHan/android_gallery.png')}
            style={{width:40,height:40}}
        />
    )
    const IosGallery=()=>(
        <Image 
            source={require('../../../imageResource/jobDaHan/ios_gallery.png')}
            style={{width:40,height:40}}
        />
    )
    const AndroidCamera=()=>(
        <Image 
            source={require('../../../imageResource/jobDaHan/android_camera.png')}
            style={{width:40,height:40}}
        />
    )
    const IosCamera=()=>(
        <Image 
            source={require('../../../imageResource/jobDaHan/ios_camera.png')}
            style={{width:40,height:40}}
        />
    )
  
    return(
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={()=>setModalVisible(false)}
            >
                <Pressable  
                style={styles.centeredView}
                onPress={()=>setModalVisible(false)}>
            
                    <View style={styles.modalView}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                            <TouchableOpacity onPress={()=>androidGalleryImagePick()}>
                                {platFormGalleryImage()}
                                <Text>gallery</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                            <TouchableOpacity onPress={()=>androidPhotoImagePick()}>
                                {platFormCameraImage()}
                                <Text>camera</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
            <View style={{alignItems:'center',marginTop:'9%'}}>
                <View>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate('ProfileImageFullSize')}
                        style={styles.profileImageContainer}>
                        <Image 
                            source={profileImage===require('../../../imageResource/icon/ic_profile.png')?profileImage:{uri:profileImage}}
                            style={styles.profileImage}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{setModalVisible(true)}}>
                    <Text style={styles.profilePictureText}>프로필사진 변경</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ProfileImage
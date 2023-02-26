import React from 'react';
import {View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV();

const ProfileImageFullSize = () => {
  const jsonUser = storage.getString('user'); // { 'username': 'Marc', 'age': 21 }
  const userObject = jsonUser == undefined ? {} : JSON.parse(jsonUser);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, backgroundColor: 'black'}} />
      <View style={{flex: 4}}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={
            userObject.profileImgPath === undefined
              ? require('../../../imageResource/icon/ic_profile.png')
              : {uri: userObject.profileImgPath}
          }
        />
      </View>
      <View style={{flex: 1, backgroundColor: 'black'}} />
    </View>
  );
};

export default ProfileImageFullSize;

//'https://t1.daumcdn.net/cfile/tistory/9945F5465EEB029114'

import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import {flower} from './flower';
import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV();

import {createPOSTObject} from '../API/Network';

const SeedFinish = props => {
  const navigation = useNavigation();
  const {
    finishSeedVisible,
    setfinishSeedVisible,
    userObject,
    setUser,
    setfinishNext,
    setSeedModalVisible,
  } = props;
  const [seedName, setSeedName] = useState('');
  const [seedUri, setSeedUri] = useState('');

  useEffect(() => {
    if (userObject.flowerNow.length !== 0) {
      setSeedName(userObject.flowerNow[0].flowerNickname);
      setSeedUri(flower[userObject.flowerNow[0].flower].upng);
    }
  }, [userObject]);

  const gotoMoon = () => {
    let data = {
      uid: userObject.uid,
    };
    createPOSTObject('flower/mv-flower', data)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.success === true) {
          let user = userObject;
          let addFlower = userObject.flowerNow[0];

          user.flowerNow = [];
          for (let value in userObject.flowerUri) {
            if (userObject.flowerUri[value] == -1) {
              userObject.flowerUri[value] = addFlower.flower;
            }
            break;
          }
          setfinishSeedVisible(false);
          setUser(user);
          storage.set('user', JSON.stringify(user));
          setSeedModalVisible(true);
        }
      })
      .catch(error => console.log('ERROR', error));
  };

  const closeModal = () => {
    setfinishNext(true);
    setfinishSeedVisible(false);
  };

  return (
    <>
      <Modal
        animationType="none"
        transparent={true}
        visible={finishSeedVisible}
        onRequestClose={() => {
          setfinishSeedVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView]}>
            <View style={styles.flexThree}>
              <Text style={{color: '#000000'}}>
                ???????????????! {seedName}?????? ?????? ????????????
              </Text>
              <Text style={{color: '#000000'}}>????????? ???????????? ???????????????</Text>
            </View>
            <View style={{marginLeft: '20%'}}>
              <Image style={{width: 170, height: 250}} source={seedUri} />
            </View>
            <View style={styles.flexThree}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={gotoMoon}
                  style={styles.selectSeedButton}>
                  <Text style={styles.selectSeedText}>?????????</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.selectSeedButton}>
                  <Text style={styles.selectSeedText}>?????????</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default SeedFinish;

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {MMKV} from 'react-native-mmkv';
import styles from './style';

export const storage = new MMKV();

const BottomSheet_Main = props => {
  const {modalVisible, setModalVisible, userObject} = props;
  const screenHeight = Dimensions.get('screen').height;

  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };
  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent
      onRequestClose={() => closeModal()}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <View style={styles.modalTopLineContainer}>
            <View style={styles.modalTopLine}></View>
          </View>
          <View style={{height: '15%'}} />
          <View style={styles.QrCodeContainer}>
            <QRCode
              value={userObject.uid}
              // style={{height:'40%',width:'40%'}}
              size={140}
            />
          </View>
          <View style={{height: '40%', width: '100%', alignItems: 'center'}}>
            <View style={{marginTop: '15%'}}>
              <Text style={styles.QrCodeScanText}>
                QR코드를 스캔하시면 포인트가 적립됩니다.
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomSheet_Main;

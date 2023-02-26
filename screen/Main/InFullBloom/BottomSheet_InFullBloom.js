import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {MMKV} from 'react-native-mmkv';
import {useNavigation} from '@react-navigation/native';
import styles from './style';

export const storage = new MMKV();

const BottomSheet_InFullBloom = props => {
  const {modalVisible, setModalVisible} = props;
  const jsonUser = storage.getString('user');
  const userObject = JSON.parse(jsonUser);
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const navigation = useNavigation();

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
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };
  const selectSeed = () => {
    console.log('hi');
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
            <View style={{marginTop: '5%'}}>
              <Text style={styles.QrCodeScanText}>
                QR코드를 스캔하시면 포인트가 적립됩니다.
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  closeModal(), navigation.goBack();
                }}
                style={styles.selectSeedButton}>
                <Text style={styles.selectSeedText}>메인으로 돌아가기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomSheet_InFullBloom;

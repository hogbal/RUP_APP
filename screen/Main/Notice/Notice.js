import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import BigList from 'react-native-big-list';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import styles from './style';
import Notice_modal from './Notice_modal';
import {MMKV} from 'react-native-mmkv';
import {createPOSTObject, createGETObject} from '../../API/Network';

export const storage = new MMKV();

function Notice() {
  const [notice, setNotice] = useState();
  const [NoticeTitle, setNoticeTitle] = useState();
  const [pointRecord, setPointRecord] = useState([]);
  const [userObject, setUser] = useState({});

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getUser = async () => {
    try {
      const user = await JSON.parse(storage.getString('user'));
      if (user !== null) {
        setUser(user);
        return user;
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUser().then(user => {
      getNotice(user.uid);
    });
  }, [isFocused]);

  const getNotice = uid => {
    createGETObject('home/notice-and-point-record', uid)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setNoticeTitle(data.title);
        setNotice(data.notice);
        setPointRecord(data.pointRecord);
      })
      .catch(error => console.log('ERROR'));
  };

  const renderItem = ({item}) => <Item date={item.date} point={item.point} />;

  const Item = ({date, point}) => (
    <View>
      <View style={styles.horizonalLine} />
      <View
        style={{
          marginTop: '3.5%',
          marginLeft: 30,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 20, height: 20}}
          source={require('../../../imageResource/icon/ic_point_notice.png')}
        />
        <Text style={{marginLeft: '5%', fontWeight: 'bold', fontSize: 15}}>
          {date} {point}point 적립되었습니다.
        </Text>
      </View>
    </View>
  );

  const [noticemodalVisible, setnoticeModalVisible] = useState(false);

  return (
    <>
      <Notice_modal
        noticemodalVisible={noticemodalVisible}
        setnoticeModalVisible={setnoticeModalVisible}
        text={notice}
      />

      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginTop: '7%', marginLeft: 30, width: 40}}>
          <Image
            source={require('../../../imageResource/icon/ic_arrow_left.png')}
          />
        </TouchableOpacity>

        <View style={styles.horizonalLine} />
        <TouchableOpacity
          style={{
            marginTop: '5%',
            marginLeft: 30,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => setnoticeModalVisible(true)}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../imageResource/icon/ic_notice_02.png')}
          />
          <Text style={{marginLeft: '5%', fontWeight: 'bold'}}>
            [공지사항] {NoticeTitle}{' '}
          </Text>
        </TouchableOpacity>

        <SafeAreaView style={{height: '80%'}}>
          <BigList
            data={pointRecord}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </SafeAreaView>
    </>
  );
}

export default Notice;

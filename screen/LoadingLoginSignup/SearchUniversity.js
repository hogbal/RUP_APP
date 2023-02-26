import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import BigList from 'react-native-big-list';
import univ from './Login/Univ.js';
import styles from './Login/style';
import {useNavigation} from '@react-navigation/native';

const SearchUniversity = props => {
  const navigation = useNavigation();
  const masterData = univ;
  const [filterData, setFilterData] = useState(univ);

  const renderItem = ({item}) => <Item univ={item.univ} />;
  const Item = ({univ}) => (
    <>
      <TouchableOpacity
        onPress={() => {
          selectUniversity(univ);
        }}>
        <View style={{marginTop: '6%'}}>
          <Text style={styles.major}>{univ}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.item} />
    </>
  );
  const selectUniversity = univ => {
    if (props.route.params.page === 'BottomSheet_login') {
      return navigation.navigate('Login', {univ: univ});
    }
    if (props.route.params.page === 'FindPassword') {
      return navigation.navigate('FindPassword', {univ: univ});
    }
    if (props.route.params.page === 'FindId') {
      return navigation.navigate('FindId', {univ: univ});
    }
    if (props.route.params.page === 'ProfileInfo') {
      return navigation.navigate('Profile', {univ: univ});
    }
  };
  const searchUniversity = text => {
    if (text) {
      const searchData = masterData.filter(item => {
        return item.univ.includes(text);
      });
      setFilterData(searchData);
    } else {
      setFilterData(masterData);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.universityModalView}>
        <View style={{alignItems: 'center'}}>
          <TextInput
            placeholder="대학(교) 검색"
            style={styles.sectionStyle}
            onChangeText={text => searchUniversity(text)}
          />
        </View>
        <BigList data={filterData} renderItem={renderItem} />
      </SafeAreaView>
    </>
  );
};
export default SearchUniversity;

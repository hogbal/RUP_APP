import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TextInput
} from 'react-native';
import BigList from "react-native-big-list";
import { SafeAreaView } from 'react-native-safe-area-context';
import major from './Login/Major.js'
import styles from './Login/style'
import {useNavigation} from '@react-navigation/native';


const SearchUniversity=(props)=>{
    const navigation = useNavigation()
    const masterData = major
    const [filterData,setFilterData] = useState(major)
    const renderItem = ({item}) => (
        <Item major={item.major}/>
      );
    const Item = ({ major }) => (
        <>
            <TouchableOpacity onPress={()=>{selectMajor(major)}}>
                <View style={{marginTop:'6%'}}>
                    <Text style={styles.major}>{major}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.item}/>
        </>
    );
    const selectMajor=(major)=>{
        if(props.route.params.page==='BottomSheet_login'){
            return navigation.navigate("Login",{major:major})
        }
        if(props.route.params.page==='FindPassword'){
            return navigation.navigate('FindPassword',{major:major})
        }
        if(props.route.params.page==='FindId'){
            return navigation.navigate('FindId',{major:major})
        }
        if(props.route.params.page==='ProfileInfo'){
            return navigation.navigate('Profile',{major:major})
        }
    }
    const searchUniversity=(text)=>{
        if(text){
            const searchData = masterData.filter((item)=>{
                return item.major.includes(text)
            })
            setFilterData(searchData)
        }
        else{
            setFilterData(masterData)
        }
    }
    return(
        <>  
                <SafeAreaView style={styles.universityModalView}>
                    <View style={{alignItems:'center'}}>
                        <TextInput
                            placeholder='학과 검색'
                            style={styles.sectionStyle}
                            onChangeText={text => searchUniversity(text)}
                        />
                    </View>
                    <BigList
                        data={filterData}
                        renderItem={renderItem}
                    />
                </SafeAreaView>
            
        </>
    )
}
export default SearchUniversity
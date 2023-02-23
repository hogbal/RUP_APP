import React ,{useState,useRef, useEffect}from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    FlatList,
    SafeAreaView
} from 'react-native'
// import { MMKV } from 'react-native-mmkv'
import { useIsFocused, useNavigation } from '@react-navigation/native';
// import { useToast } from "react-native-toast-notifications";
// import KakaoSDK from '@actbase/react-kakaosdk'
import ReactNativeAnimatedSearchbox from 'react-native-animated-searchbox';
import styles from './style.js'
import {screenHeight,screenWidth} from '../../Main/fullScreenValue'

const PersonalRanking=(props)=>{
    const isfocus = useIsFocused()
    const univ = props.route.params.univ
    const refSearchBox=useRef()
    const [searchUnivText,setSearchUnivText] = useState(true)
    const [searchUnivBox,setSearchUnivBox] = useState(false)
    const navigation = useNavigation()
    const [eachRank,setEachRank] = useState([])
    const [filterData,setFilterData] = useState([])


    useEffect(()=>{
        getRanking()    
      },[isfocus])
    
      const getRanking=()=>{
        fetch('http://13.124.80.15/rank/college-each-rank', { 
        method:'POST',
        headers:{'Content-Type':'application/json'},     
        body:JSON.stringify({
            college: univ
        })
      })
      .then(res=>{return res.json()})
      .then(data=>{console.log(data),setEachRank(data),setFilterData(data)})
      .catch(function (error) {
        console.log(error);
        console.log('fail')
      });
    }

    const renderItem=({item})=>{
        return (<Item item={item} backgroundColor={'#a8ce9e'} />)      
    }

    const Item=({item})=>{
        return(
            <View style={dystyle().rank}>
                <View style={styles.univLogoContainer}>
                </View>
                <View style={styles.itemRank}>
                    <Text style={styles.itemFont}>{item.rank}등</Text>
                </View>
                <View style={styles.itemUniv}>
                    <Text style={styles.itemFont}>{item.nickname}</Text>
                </View>
                <View style={styles.itemPoint}>
                    <Text style={styles.itemFont}>{item.totalPoint} p</Text>
                </View>
            </View>
        )
    }
    const searchUniversity=(text)=>{
        if(text){
            const searchData = eachRank.filter((item)=>{
                return item.nickname.includes(text)
            })
            setFilterData(searchData)
        }
        else{
            setFilterData(eachRank)
        }
    }

    //Call for the open  
    openSearchBox = () => refSearchBox.current.open();  
    //Call for the close  
    closeSearchBox = () => refSearchBox.current.close();

    useEffect(()=>{
        console.log('hi')
    },[refSearchBox.current]) 

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.topLine}>
                <TouchableOpacity 
                    onPress={()=>navigation.goBack()}
                >
                    <Image 
                        source={require('../../../imageResource/jobDaHan/arrow_left.png')}
                        style={styles.backButton}
                    />
                </TouchableOpacity>
                <Text style={styles.font}>{univ} 랭킹페이지</Text>
            </View>
            {searchUnivText && 
            <TouchableOpacity
                onPress={()=>{setSearchUnivText(false),setSearchUnivBox(true)}}  
                style={styles.searchUnivTextContainer}  
            >
                <Text style={styles.searchUnivText}>나의 순위 찾기</Text>
                <Image 
                    source={require('../../../imageResource/jobDaHan/search_univ.png')}
                    style={styles.searchUnivImage}
                />
            </TouchableOpacity>}
            {searchUnivBox && <ReactNativeAnimatedSearchbox 
                ref={refSearchBox} 
                placeholder={"닉네임"}
                searchUniversity={searchUniversity}
                searchUnivBox={searchUnivBox}
                focusAfterOpened={true} 
            />}
            <View style={{marginBottom:screenHeight*0.0177725}}/>
            <Text style={{marginLeft:screenWidth*0.0538461,fontSize:24,marginBottom:screenHeight*0.023696682,color:'black',fontWeight:'600'}}>{univ} 순위</Text>
            <View>
                <FlatList
                    data={filterData}
                    renderItem={renderItem}    
                    keyExtractor={(item)=>item.uid}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}

export default PersonalRanking

const dystyle=()=>StyleSheet.create({
    rank:{
        marginLeft:5,
        marginRight:5,
        height:screenHeight*0.096113744,
        marginBottom:20,
        borderRadius:10,
        flexDirection:'row',
        backgroundColor:'white',
        alignItems:'center',
    },
})

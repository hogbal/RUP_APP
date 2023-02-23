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

import { useNavigation, useIsFocused } from '@react-navigation/native';
import ReactNativeAnimatedSearchbox from 'react-native-animated-searchbox';
import styles from './style.js'
import {screenHeight,screenWidth} from '../../Main/fullScreenValue'
import { createPOSTObject, createGETObject } from '../../API/Network'

const UnivRanking=()=>{
    const isfocus = useIsFocused()
    const refSearchBox=useRef()
    const [searchUnivText,setSearchUnivText] = useState(true)
    const [searchUnivBox,setSearchUnivBox] = useState(false)
    const [filterData,setFilterData] = useState([])
    const [rank, setRank]= useState([])
    const navigation = useNavigation()

    useEffect(()=>{
        getRanking()    
      },[isfocus])
    
      const getRanking=()=>{

        createGETObject('rank/college-rank')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setRank(data),setFilterData(data)
        }) 
        .catch(error=>console.log('ERROR'))
    }

    const renderItem=({item})=>{
            return (<Item item={item} backgroundColor={'#a8ce9e'} />)
        }        

    const Item=({item})=>{
        return(
            <TouchableOpacity 
                style={dystyle().rank}
                onPress={()=>navigation.navigate('PersonalRanking',{univ : item.college})}>
                <View style={styles.univLogoContainer}>
                </View>
                <View style={styles.itemRank}>
                    <Text style={styles.itemFont}>{item.rank}등</Text>
                </View>
                <View style={styles.itemUniv}>
                    <Text style={styles.itemFont}>{item.college}</Text>
                </View>
                <View style={styles.itemPoint}>
                    <Text style={styles.itemFont}>{item.totalPoint} p</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const searchUniversity=(text)=>{
        if(text){
            const searchData = rank.filter((item)=>{
                return item.college.includes(text)
            })
            setFilterData(searchData)
        }
        else{
            setFilterData(rank)
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
                <Text style={styles.font}>랭킹 페이지</Text>
            </View>
            {searchUnivText && 
            <TouchableOpacity
                onPress={()=>{setSearchUnivText(false),setSearchUnivBox(true)}}  
                style={styles.searchUnivTextContainer}  
            >
                <Text style={styles.searchUnivText}>우리학교 찾기</Text>
                <Image 
                    source={require('../../../imageResource/jobDaHan/search_univ.png')}
                    style={styles.searchUnivImage}
            />
            </TouchableOpacity>}
            {searchUnivBox && <ReactNativeAnimatedSearchbox 
                ref={refSearchBox} 
                placeholder={"학교"}
                searchUniversity={searchUniversity}
                searchUnivBox={searchUnivBox}
                focusAfterOpened={true} 
            />}
            <View style={{marginBottom:screenHeight*0.0177725}}/>
            <Text style={{marginLeft:screenWidth*0.0538461,fontSize:24,marginBottom:screenHeight*0.023696682,color:'black',fontWeight:'600'}}>학교순위</Text>
            <View>
                <FlatList
                    data={filterData}
                    renderItem={renderItem}    
                    keyExtractor={(item)=>item.college}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}

export default UnivRanking

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


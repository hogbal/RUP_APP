import {StyleSheet} from 'react-native'
import {screenHeight,screenWidth} from '../../Main/fullScreenValue'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor:'#f9f8e8',
    },
    
    ////////////////BottomSheet_login style//////////////////////////////
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        height:screenHeight*0.55,       //높이 퍼센트로 지정시 keyboardAvoidngView적용안됨
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    iconDirection:{
        flexDirection:'row',
        marginTop:20,
        marginBottom:15
    },
    iconLocation:{
        flex:1,
        alignItems:'center'
    },
    idPage:{
        fontWeight:'bold',
        marginTop:20,
    },
    passwordPage:{
        fontWeight:'bold',
        marginTop:10,
        marginBottom:20,
    },
    sectionStyle: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 12,
        marginTop: 7,
        marginRight:7,
        width:screenWidth*0.81,
        marginBottom:4,
        paddingLeft:15,
    },
    sectionStyle2: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 12,
        marginTop: 7,
        //marginLeft:7,
        marginBottom:4,
        marginRight:7,
        width:screenWidth*0.6,
        marginBottom:4,
        paddingLeft:15,
    },
    sectionStyle3: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 12,
        marginTop: 7,
        marginRight:7,
        marginLeft:7,
        width:screenWidth*0.81,
        marginBottom:4,
        paddingLeft:15,
    },
    nickNameCheck: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 12,
        marginTop: 7,
        width:screenWidth*0.19,
        marginBottom:4,
        paddingLeft:15,
        justifyContent:'center',
        backgroundColor:'#a8cd98',
    },
    sectionStyleBlank: {
        borderWidth: 0.5,
        borderColor: 'red',
        height: 40,
        borderRadius: 20,
        margin: 7,
        width:300,
        marginBottom:4,
        paddingLeft:15,
    },
    imageStyle: {
        //padding: 10,
        //margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center',
      },
    signUp: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 12,
        margin: 7,
        alignItems:'center',
        justifyContent:'center',
        width:screenWidth*0.81,
        marginTop:15,
        backgroundColor:'#a8cd98',
    },
    signUpText: {
        color:'white',
        fontWeight:'bold',
    },
    imageStyle: {
        //padding: 10,
        marginRight: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    searchUniversity: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 12,
        marginTop: 7,
        marginBottom: 7,
        width:screenWidth*0.81,
        marginBottom:4,
        backgroundColor:'white',
        paddingLeft:15,
        justifyContent:'center',
    },
    searchMajor: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 12,
        marginTop: 7,
        marginBottom: 7,
        width:screenWidth*0.81,
        marginBottom:4,
        backgroundColor:'white',
        paddingLeft:15,
        justifyContent:'center'
    },
    rowDirection:{
        //flexDirection:'row',
        alignItems:'center',
        //marginLeft:'2.5%'
    },
    kakaoLogin:{
        borderWidth: 0.5,
        borderColor: '#FEE500',
        height: 40,
        borderRadius: 12,
        margin: 10,
        alignItems:'center',
        justifyContent:'center',
        width:screenWidth*0.81,
        marginTop:10,
        backgroundColor:'#FEE500',
        flexDirection:'row'
    },
    kakaoLoginTextView:{
        width:'60%',
        alignItems:'center'
    },
    kakaoLoginText:{
        color:'#000000',
        fontWeight:'bold'
    },
    twentyPercent:{
        width:'20%',
        alignItems:'center'
    },
    kakaoSymbolImage:{
        resizeMode:'contain',
        width:'40%',
        height:'40%'
    },
    sex:{
        marginRight:screenWidth*0.2
    },
    ////////////////BottomSheet_login style//////////////////////////////
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    universityModalView: {
        height:screenHeight, 
        width: screenWidth,
        backgroundColor: "white",
    },
    item: {
        marginTop:'4%',
        marginLeft:'5%',
        marginRight:'5%',
        borderBottomColor: '#e9e9e8',
        borderBottomWidth: 0.8,
    },
    major:{
        fontWeight:'bold',
        fontsize:12,
        marginLeft:'7%'
    },
    redStar:{
        //marginLeft:5,
        width:5,
        height:5
    }
})
export default styles
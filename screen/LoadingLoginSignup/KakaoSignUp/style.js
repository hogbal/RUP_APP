import {StyleSheet} from 'react-native'
import {screenHeight,screenWidth} from '../../Main/fullScreenValue'

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f9f8e8',
        flex:1
    },
    passwordText:{
        fontWeight:'bold',
        fontSize:24,
        color:'black',
        marginBottom:20
    },
    sectionStyle: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 20,
        marginRight: 7,
        marginTop:7,
        width:screenWidth*0.81,
        marginBottom:4,
        backgroundColor:'white',
        paddingLeft:15
    },
    sectionStyle2: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 20,
        marginTop: 7,
        //marginLeft:7,
        marginBottom:4,
        width:screenWidth*0.62,
        backgroundColor:'white',
        paddingLeft:15,
    },
    sectionStyle3: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 20,
        marginRight: 7,
        marginTop:7,
        marginLeft:7,
        width:screenWidth*0.81,
        marginBottom:4,
        backgroundColor:'white',
        paddingLeft:15
    },
    nickNameCheck: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 20,
        marginTop: 7,
        marginRight:7,
        width:screenWidth*0.19,
        marginBottom:4,
        //paddingLeft:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#a8cd98',
    },
    sex:{
        marginRight:screenWidth*0.2
    },
    signUp: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 20,
        margin: 7,
        alignItems:'center',
        justifyContent:'center',
        width:screenWidth*0.81,
        marginTop:10,
        backgroundColor:'#a8cd98',
    },
    secretSignUp: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 20,
        margin: 10,
        alignItems:'center',
        justifyContent:'center',
        width:300,
        marginTop:10,
        borderColor:'#a8cd98',
        borderWidth:1,
    },
    signUpText: {
        color:'white',
        fontWeight:'bold',
    },
    secretText:{
        marginTop:20,
        color:'black',
        fontWeight:'bold'
    },
    do_login_text:{
        color:'#a8cd98',
        fontSize:15,
        fontWeight:'bold'
    },
    redStar:{
        marginLeft:5,
        width:5,
        height:5
    }
})
export default styles
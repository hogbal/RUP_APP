import {StyleSheet} from 'react-native'
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
        margin: 7,
        width:300,
        marginBottom:4,
        backgroundColor:'white',
        paddingLeft:15
    },
    signUp: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 20,
        margin: 10,
        alignItems:'center',
        justifyContent:'center',
        width:300,
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
    }
})
export default styles
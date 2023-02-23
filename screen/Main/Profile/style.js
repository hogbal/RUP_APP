import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f9f8e8',
        flex:1
    },
    middle:{
        alignItems:'center'
    },
    profileText:{
        marginLeft:'15%',
        color:'black',
        marginTop:5,
    },
    horizonalLine:{
        marginTop:'5%',
        marginLeft:'5%',
        marginRight:'5%',
        borderBottomColor: '#E9E9E8',
        borderBottomWidth: 0.8,
    },
    profileImageContainer:{
        borderRadius:50,
        height:70,
        width:70,
        backgroundColor:'gray',
        overflow:'hidden',
    },
    profileImage:{
        height:70,
        width:70,
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
        marginTop:3,
        borderColor:'#a8cd98',
        borderWidth:1,
    },
    profilePictureText: {
        marginTop:'3%',
        color:'black',
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
    editProfileButton:{
        color:'white',
        fontWeight:'bold'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'rgba(0,0,0,0.2)'
      },
      modalView: {
        width:'80%',
        height:'15%',
        backgroundColor: "white",
        borderRadius: 40,
        alignItems: "center",
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 7,
        flexDirection:'row'
      },
})
export default styles
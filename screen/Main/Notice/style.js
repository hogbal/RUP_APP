import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f9f8e8',
    },
    horizonalLine:{
        marginTop:'5%',
        marginLeft:'5%',
        marginRight:'5%',
        borderBottomColor: '#e9e9e8',
        borderBottomWidth: 0.8,
    },
    noticeText:{
        alignContent:'center',
        width:300,
        height:400,
        borderColor:'#eee',
        borderBottomWidth:1,
        borderTopWidth:1,
        marginTop:10,
        padding:5
      },
      Notice:{
        marginTop:10,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor:'#eee',
        borderBottomWidth:1,
        marginLeft:15,
        padding:5
    
      },

      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        height:500, 
        width: 370,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      exitlogo: {
        width: 25,
        height: 25,
      },
      facelogo: {
        width: 35,
        height: 35,
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
})
export default styles
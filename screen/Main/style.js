import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const styles = StyleSheet.create({
  ///////////////////Main style//////////////////////////////
  topLineContainer: {
    flexDirection: 'row',
    height: '15%',
  },
  topLineLeft: {
    width: '62%',
    justifyContent: 'center',
  },
  nameAndPointBox: {
    flexDirection: 'column',
    marginLeft: '3%',
    marginTop: '1%',
    marginRight: '40%',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  calenderAndNoticeBoxContainer: {
    width: '38%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  calenderAndNoticeBox: {
    flexDirection: 'row',
  },
  tulipText: {
    fontSize: 20,
  },
  QrText: {
    fontSize: 20,
    color: 'white',
  },
  profileImageContainer: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: 'gray',
    overflow: 'hidden',
    marginLeft: '10%',
  },
  profileImage: {
    height: 50,
    width: 50,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  ///////////////////Main style//////////////////////////////

  ////////////////BottomSheet_Main style//////////////////////////////
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: '40%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 100,
  },
  modalTopLineContainer: {
    height: '5%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTopLine: {
    height: '20%',
    width: '60%',
    backgroundColor: 'grey',
    borderRadius: 50,
  },
  QrCodeContainer: {
    height: '40%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  QrCode: {
    height: '20%',
    width: '20%',
  },
  QrCodeScanText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  selectSeedButton: {
    borderWidth: 0.5,
    borderColor: '#777777',
    height: 40,
    borderRadius: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    marginTop: 10,
    backgroundColor: '#a8cd98',
    marginTop: '7%',
  },
  selectSeedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  ////////////////BottomSheet_Main style//////////////////////////////
  ////////////////Calender Modal style///////////////////////////////

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 500,
    width: 370,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    //alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exitlogo: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
  },
  facelogo: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  calendar: {
    width: 350,
    height: 350,
    marginTop: 50,
  },
  ////////////////Calender Modal style//////////////////////////////
  noticeText: {
    alignContent: 'center',
    width: 300,
    height: 400,
    borderColor: '#eee',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: 10,
    padding: 5,
  },
  flexThree: {
    flex: 3,
    //backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexSeven: {
    flex: 7,
    //backgroundColor:'blue'
  },
  flexOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

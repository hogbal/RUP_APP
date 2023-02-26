import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../Main/fullScreenValue';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f8e8',
  },
  topLine: {
    marginTop: 26,
    marginLeft: 14,
    flexDirection: 'row',
  },
  backButton: {
    width: 30,
    height: 30,
    marginBottom: 13,
  },
  font: {
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
  searchUnivTextContainer: {
    flexDirection: 'row',
    marginLeft: screenWidth * 0.451282051,
  },
  searchUnivText: {
    color: '#AA9585',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 9,
  },
  searchUnivImage: {
    width: screenWidth * 0.128,
    height: screenWidth * 0.128,
  },
  univSearch: {
    borderColor: '#a8ce9e',
    borderWidth: 3,
    marginTop: 13,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    paddingLeft: screenWidth * 0.05,
    backgroundColor: 'red',
  },
  rank: {
    marginLeft: 10,
    marginRight: 10,
    height: screenHeight * 0.065,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'gray',
    //alignItems:'center',
  },
  univLogoContainer: {
    marginLeft: screenWidth * 0.0410256,
  },
  univLogo: {
    width: screenWidth * 0.1692307,
    height: screenWidth * 0.1692307,
    marginRight: screenWidth * 0.0384615,
  },
  itemRank: {
    marginRight: screenWidth * 0.0435897,
  },
  itemUniv: {
    width: screenWidth * 0.410256,
  },
  itemPoint: {
    width: screenWidth * 0.2,
    alignItems: 'flex-end',
    paddingRight: screenWidth * 0.05,
  },
  itemFont: {
    fontSize: screenHeight * 0.022,
    color: 'black',
  },
});
export default styles;

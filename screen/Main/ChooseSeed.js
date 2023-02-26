import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import styles from './style';
const ChooseSeed = props => {
  const {seedColor, setSeedColor} = props;
  const brownSeedOff = require('../../imageResource/icon/ic_seed_brown_off.png');
  const brownSeedOn = require('../../imageResource/icon/ic_seed_brown_on.png');
  const greenSeedOff = require('../../imageResource/icon/ic_seed_green_off.png');
  const greenSeedOn = require('../../imageResource/icon/ic_seed_green_on.png');
  const lavenderSeedOff = require('../../imageResource/icon/ic_seed_lavender_off.png');
  const lavenderSeedOn = require('../../imageResource/icon/ic_seed_lavender_on.png');
  const pinkSeedOff = require('../../imageResource/icon/ic_seed_pink_off.png');
  const pinkSeedOn = require('../../imageResource/icon/ic_seed_pink_on.png');
  const purpleSeedOff = require('../../imageResource/icon/ic_seed_purple_off.png');
  const purpleSeedOn = require('../../imageResource/icon/ic_seed_purple_on.png');
  const yellowSeedOff = require('../../imageResource/icon/ic_seed_yellow_off.png');
  const yellowSeedOn = require('../../imageResource/icon/ic_seed_yellow_on.png');
  const [selectedTab, setSelectedTab] = useState('Nothing');

  const chooseSeedTab = () => {
    switch (selectedTab) {
      case 'Nothing':
        return <Nothing />;
      case 'Pink':
        return <Pink />;
      case 'Brown':
        return <Brown />;
      case 'Lavender':
        return <Lavender />;
      case 'Green':
        return <Green />;
      case 'Purple':
        return <Purple />;
      case 'Yellow':
        return <Yellow />;
    }
  };
  const Nothing = () => (
    <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Pink'), setSeedColor('Pink');
            }}>
            <Image source={pinkSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Brown'), setSeedColor('Brown');
            }}>
            <Image source={brownSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Lavender'), setSeedColor('Lavender');
            }}>
            <Image source={lavenderSeedOff} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.flexOne, {flexDirection: 'row'}]}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Green'), setSeedColor('Green');
            }}>
            <Image source={greenSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Purple'), setSeedColor('Purple');
            }}>
            <Image source={purpleSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Yellow'), setSeedColor('Yellow');
            }}>
            <Image source={yellowSeedOff} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  const Brown = () => (
    <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Pink'), setSeedColor('Pink');
            }}>
            <Image source={pinkSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Brown'), setSeedColor('Brown');
            }}>
            <Image source={brownSeedOn} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Lavender'), setSeedColor('Lavender');
            }}>
            <Image source={lavenderSeedOff} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.flexOne, {flexDirection: 'row'}]}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Green'), setSeedColor('Green');
            }}>
            <Image source={greenSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Purple'), setSeedColor('Purple');
            }}>
            <Image source={purpleSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Yellow'), setSeedColor('Yellow');
            }}>
            <Image source={yellowSeedOff} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  const Pink = () => (
    <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Pink'), setSeedColor('Pink');
            }}>
            <Image source={pinkSeedOn} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Brown'), setSeedColor('Brown');
            }}>
            <Image source={brownSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Lavender'), setSeedColor('Lavender');
            }}>
            <Image source={lavenderSeedOff} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.flexOne, {flexDirection: 'row'}]}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Green'), setSeedColor('Green');
            }}>
            <Image source={greenSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Purple'), setSeedColor('Purple');
            }}>
            <Image source={purpleSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Yellow'), setSeedColor('Yellow');
            }}>
            <Image source={yellowSeedOff} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  const Lavender = () => (
    <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Pink'), setSeedColor('Pink');
            }}>
            <Image source={pinkSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Brown'), setSeedColor('Brown');
            }}>
            <Image source={brownSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Lavender'), setSeedColor('Lavender');
            }}>
            <Image source={lavenderSeedOn} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.flexOne, {flexDirection: 'row'}]}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Green'), setSeedColor('Green');
            }}>
            <Image source={greenSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Purple'), setSeedColor('Purple');
            }}>
            <Image source={purpleSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Yellow'), setSeedColor('Yellow');
            }}>
            <Image source={yellowSeedOff} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  const Green = () => (
    <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Pink'), setSeedColor('Pink');
            }}>
            <Image source={pinkSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Brown'), setSeedColor('Brown');
            }}>
            <Image source={brownSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Lavender'), setSeedColor('Lavender');
            }}>
            <Image source={lavenderSeedOff} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.flexOne, {flexDirection: 'row'}]}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Green'), setSeedColor('Green');
            }}>
            <Image source={greenSeedOn} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Purple'), setSeedColor('Purple');
            }}>
            <Image source={purpleSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Yellow'), setSeedColor('Yellow');
            }}>
            <Image source={yellowSeedOff} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  const Purple = () => (
    <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Pink'), setSeedColor('Pink');
            }}>
            <Image source={pinkSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Brown'), setSeedColor('Brown');
            }}>
            <Image source={brownSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Lavender'), setSeedColor('Lavender');
            }}>
            <Image source={lavenderSeedOff} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.flexOne, {flexDirection: 'row'}]}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Green'), setSeedColor('Green');
            }}>
            <Image source={greenSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Purple'), setSeedColor('Purple');
            }}>
            <Image source={purpleSeedOn} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Yellow'), setSeedColor('Yellow');
            }}>
            <Image source={yellowSeedOff} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  const Yellow = () => (
    <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Pink'), setSeedColor('Pink');
            }}>
            <Image source={pinkSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Brown'), setSeedColor('Brown');
            }}>
            <Image source={brownSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Lavender'), setSeedColor('Lavender');
            }}>
            <Image source={lavenderSeedOff} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.flexOne, {flexDirection: 'row'}]}>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Green'), setSeedColor('Green');
            }}>
            <Image source={greenSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Purple'), setSeedColor('Purple');
            }}>
            <Image source={purpleSeedOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('Yellow'), setSeedColor('Yellow');
            }}>
            <Image source={yellowSeedOn} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  return <>{chooseSeedTab()}</>;
};
export default ChooseSeed;

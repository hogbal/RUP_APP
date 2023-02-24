import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
    Image
} from 'react-native';
import { Calendar } from "react-native-calendars";
import styles from './style'

const CalendarModal=(props)=>{

    const { calendarModalVisible, setCalendarModalVisible, calendarDate} = props;

    return(
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={calendarModalVisible}
                onRequestClose={() => {
                    setCalendarModalVisible(false);
                }}
            > 
                <Pressable style={styles.centeredView}
                    onPress={() => setCalendarModalVisible(false)}
                >
                    <View style={[styles.modalView,{alignItems:'center'}]}>           
                        <Image 
                            style={styles.exitlogo}
                            source={require('../../imageResource/icon/ic_close.png')}
                        />
                        <Calendar
                            style={styles.calendar}
                            theme={{
                                monthTextColor: 'black',
                                arrowColor: '#d1e5cd',
                                textDayFontSize: 16,
                                textMonthFontSize: 30,
                                textDayHeaderFontSize: 0
                            }}

                            dayComponent={({date, state}) => {
                                
                                if (calendarDate.includes(date.dateString)){
                                var dateimg = date.dateString.replace(/\-/g,"")
                                if((dateimg*1)%2==0){
                                    return(
                                        <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Image
                                            style={styles.facelogo}
                                            source={require('../../imageResource/icon/ic_face_01.png')}
                                        />
                                        </View>
                                    )
                                }
                                else{
                                    return(
                                        <Image 
                                            style={styles.facelogo}
                                            source={require('../../imageResource/icon/ic_face_02.png')}
                                        />
                                    )
                                }
                                }
                                else{
                                    return(
                                        <View>
                                            <Text style={{textAlign: 'center', color: state === 'disabled' ? 'white' : 'black'}}>
                                                {date.day}
                                            </Text>
                                        </View>
                                    )
                                }
                            }}
                        /> 
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}
export default CalendarModal
 import React, {useState} from 'react';
 import {StyleSheet, View, Image} from "react-native";



export default function CreateGroupScreen() {

    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = async()=>{}
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>

            </View>
        </View>

    )


}

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#ecfafa',
         padding: 12,
     },
     headerContainer: {
         height: 60,
         backgroundColor: '#c9ecf5',
         elevation:10,
     }
 });
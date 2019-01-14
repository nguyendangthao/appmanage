import React from 'react';
import { Button, Text, View, Picker, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Expo, { SQLite } from 'expo';
const db = SQLite.openDatabase('db.db');
import { geta } from '../../data'
class SearchHome extends React.Component {
    a() {
        db.transaction(
            tx => {
                tx.executeSql('insert into Category (Name,Description,IsDelete,DateCreat,DateUpdate) values (?,?,?,?,?)', [1, 1, 1, 1, 1]);
                // tx.executeSql('select * from Category', [], function (tx, res) {
                //     var a = geta(1).Id;
                //     console.log("ssss" + ;
                // });
            },
        )
        debugger
        geta(1).then(res => {
            console.log('2222', res);
        });
        console.log('1111', geta(1));
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>SearchHome!</Text>
                <Button
                    title="Go to Settings"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
                <Button
                    title="Go to Details"
                    onPress={() => this.a()}
                />
            </View>
        );
    }
}

export default SearchHome


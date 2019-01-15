import React from 'react';
import { Button, Text, View, Picker, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Expo, { SQLite, apisAreAvailable } from 'expo';
const db = SQLite.openDatabase('db.db');
import api, { geta, } from '../../data';
class SearchHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
    }
    a() {
        db.transaction(
            tx => {
                tx.executeSql('insert into Category (Name,Description,IsDelete,DateCreat,DateUpdate) values (?,?,?,?,?)', [1, 1, 1, 1, 1]);
            },
        )

    }
    b() {
        api.thisFunction().then(res => {
            this.setState({ data: res.rows._array });
            console.log('4', this.state.data);
        });
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ScrollView>
                    <Text style={{ color: 'red' }}>SearchHome!</Text>
                    <Button
                        title="Go to Settings"
                        onPress={() => this.b()}
                    />
                    <Button
                        title="Go to Details"
                        onPress={() => this.a()}
                    />
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => <Text>{item.Id}</Text>}
                    />
                </ScrollView>
            </View >
        );
    }
}

export default SearchHome


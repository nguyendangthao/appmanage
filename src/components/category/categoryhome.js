import React from 'react';
import { Text, View, Picker, TouchableOpacity, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard }
    from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import api from '../../data';
import Const from '../../const';

class CategoryHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            name: '',
            description: '',
            dateCreat: Const.formatDate(new Date()),
            dateUpdate: ''
        }
    }
    static navigationOptions = ({ navigation }) => {

        return {
            title: 'Loại Hàng',
            headerStyle: {
                color: 'tomato',
            },
            headerRight: (
                <Text style={{ color: '#00a4db',paddingRight:5 }}
                    onPress={() => {
                        navigation.navigate('categoryList');
                    }}
                >Danh Sách</Text>
            ),
        }

    };
    addNew() {
        api.addCategory(this.state).then(res => {
            this.setState({
                id: res[0].id,
                name: res[0].name,
                description: res[0].description,
                dateCreat: res[0].dateCreat,
                dateUpdate: res[0].dateUpdate,
            });
            Alert.alert('Thêm mới thành công!');
        })

    }
    reset() {
        this.setState({
            id: 0,
            name: '',
            description: '',
            dateCreat: Const.formatDate(new Date()),
            dateUpdate: '',
        });
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.contanir}>
                    <View>
                        <FormLabel labelStyle={styles.labelStyle}>Tên Hàng</FormLabel>
                        <FormInput onChangeText={(name) => this.setState({ name })} inputStyle={styles.inputStyle}
                            multiline={true} value={this.state.name} />
                        <FormValidationMessage>Tên Hàng phải nhập.</FormValidationMessage>
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <FormLabel labelStyle={styles.labelStyle}>Ghi Chú</FormLabel>
                        <FormInput onChangeText={(description) => this.setState({ description })} inputStyle={styles.inputStyle}
                            multiline={true} value={this.state.description} />
                    </View>
                    <Button
                        large
                        icon={{ name: 'envira', type: 'font-awesome' }}
                        title='Thêm Mới'
                        onPress={() => { this.addNew() }}
                        style={{ paddingTop: 40, }}
                        disabled={this.state.name === ''}
                        buttonStyle={{ backgroundColor: 'green' }}
                    />
                    <Button
                        large
                        icon={{ name: 'refresh', type: 'font-awesome' }}
                        title='Làm Mới'
                        onPress={() => { this.reset() }}
                        style={{ paddingTop: 40 }}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
export default CategoryHome

const styles = StyleSheet.create({
    contanir: {
        flex: 1,
        fontSize: 25,
    },
    labelStyle: {
        color: 'green',
        fontSize: 27
    },
    inputStyle: {
        color: '#24292e',
        fontSize: 25
    }
});


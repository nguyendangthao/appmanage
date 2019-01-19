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
            Id: 0,
            Name: '',
            Description: '',
            DateCreat: Const.formatDate(new Date()),
            DateUpdate: ''
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Loại Hàng',
            headerStyle: {
                color: 'tomato',
            },
            headerRight: (
                <Text style={{ color: '#00a4db', paddingRight: 5 }}
                    onPress={() => {
                        navigation.navigate('categoryList');
                    }}
                >Danh Sách</Text>
            ),
        }
    }
    componentWillReceiveProps(nextProps) {
        var item = nextProps.navigation.getParam('item');
        if (item) {
            this.setState({
                Id: item.Id,
                Name: item.Name,
                Description: item.Description,
                DateCreat: item.DateCreat,
                DateUpdate: Const.formatDate(new Date()),
            })
        }
    }
    addNewUpdate() {
        if (!this.state.Id) {
            api.addCategory(this.state).then(res => {
                this.setState({
                    Id: res[0].Id,
                    Name: res[0].Name,
                    Description: res[0].Description,
                    DateCreat: res[0].DateCreat,
                    DateUpdate: res[0].DateUpdate,
                });
                Alert.alert('Thêm mới thành công!');
            })
            return;
        }
        this.setState({
            DateUpdate: Const.formatDate(new Date()),
        });
        api.UpdateCategory(this.state).then(res => {
            if (res) Alert.alert('Sửa lại thành công!');
            else Alert.alert('Sửa lại không thành công!');
        })


    }
    reset() {
        this.setState({
            Id: 0,
            Name: '',
            Description: '',
            DateCreat: Const.formatDate(new Date()),
            DateUpdate: '',
        });
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.contanir}>
                    <View>
                        <FormLabel labelStyle={styles.labelStyle}>Tên Hàng</FormLabel>
                        <FormInput onChangeText={(Name) => this.setState({ Name })} inputStyle={styles.inputStyle}
                            multiline={true} value={this.state.Name} />
                        <FormValidationMessage>Tên Hàng phải nhập.</FormValidationMessage>
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <FormLabel labelStyle={styles.labelStyle}>Ghi Chú</FormLabel>
                        <FormInput onChangeText={(Description) => this.setState({ Description })} inputStyle={styles.inputStyle}
                            multiline={true} value={this.state.Description} />
                    </View>
                    <Button
                        large
                        icon={{ name: 'envira', type: 'font-awesome' }}
                        title={!this.state.Id === true ? 'Thêm Mới' : 'Sửa Lại'}
                        onPress={() => { this.addNewUpdate() }}
                        style={{ paddingTop: 40, }}
                        disabled={this.state.Name === ''}
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


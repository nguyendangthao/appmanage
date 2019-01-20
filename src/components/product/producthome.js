import React from 'react';
import {
    Text, View, Picker, TouchableOpacity, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard,
    ScrollView
}
    from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import api from '../../data';
import Const from '../../const';
import { Dropdown } from 'react-native-material-dropdown';
class ProductHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Id: 0,
            CategoryId: 0,
            Name: '',
            Description: '',
            Quantity: '',
            Price: '',
            DateCreat: Const.formatDate(new Date()),
            DateUpdate: '',
            dataCategory: [],
            CategoryName: ''
        }
        this.getAllCategory = this.getAllCategory.bind(this);
    }
    static navigationOptions = ({ navigation }) => {
        Keyboard.dismiss;
        return {
            title: 'Sản Phẩm',
            headerStyle: {
                color: 'tomato',
            },
            headerRight: (
                <Text style={{ color: '#00a4db', paddingRight: 5 }}
                    onPress={() => {
                        navigation.navigate('productList');
                    }}
                >Danh Sách</Text>
            ),
        }
    }

    componentWillMount() {
        this.getAllCategory();
    }
    componentWillUpdate() {
        this.getAllCategory();
    }
    getAllCategory() {
        api.getAllCategory().then(res => {
            res.map((item) => {
                item['value'] = item.Name;
            })
            this.setState({
                dataCategory: res,
                CategoryId: res.length > 0 ? res[0].Id : 0,
                CategoryName: res.length > 0 ? res[0].Name : 0,
            });
        });
    }
    componentWillReceiveProps(nextProps) {
        var item = nextProps.navigation.getParam('item');
        if (item) {
            this.setState({
                Id: item.Id,
                CategoryId: item.CategoryId,
                Name: item.Name,
                Quantity: item.Quantity,
                Price: item.Price,
                Description: item.Description,
                DateCreat: item.DateCreat,
                DateUpdate: Const.formatDate(new Date()),
            })
        }
    }

    confirmAddNew() {
        Alert.alert(
            'Thông Báo',
            'Xác nhận thêm mới',
            [
                { text: 'Đồng Ý', onPress: this.addNew.bind(this) },
                { text: 'Bỏ', style: 'cancel' },
            ],
            { cancelable: false },
        )
    }
    addNew() {
        if (!!this.state.Id) {
            this.setState({
                Id: 0,
                DateCreat: Const.formatDate(new Date()),
                DateUpdate: '',
            });
        }
        api.addProduct(this.state).then(res => {
            this.setState({
                Id: res[0].Id,
                CategoryId: res[0].CategoryId,
                Name: res[0].Name,
                Quantity: res[0].Quantity,
                Price: res[0].Price,
                Description: res[0].Description,
                DateCreat: res[0].DateCreat,
                DateUpdate: res[0].DateUpdate,
            });
            Alert.alert('Thêm mới thành công');
        })

    }

    confirmUpdate() {
        Alert.alert(
            'Thông Báo',
            'Xác nhận sửa lại',
            [
                { text: 'Đồng Ý', onPress: this.update.bind(this) },
                { text: 'Bỏ', style: 'cancel' },
            ],
            { cancelable: false },
        )
    }
    update() {
        this.setState({
            DateUpdate: Const.formatDate(new Date()),
        });
        api.updateproduct(this.state).then(res => {
            if (res) Alert.alert('Sửa lại thành công');
            else Alert.alert('Sửa lại không thành công');
        })
    }
    confirmReset() {
        Alert.alert(
            'Thông Báo',
            'Xác nhận làm mới',
            [
                { text: 'Đồng Ý', onPress: this.reset.bind(this) },
                { text: 'Bỏ', style: 'cancel' },
            ],
            { cancelable: false },
        )
    }
    reset() {
        this.setState({
            Id: 0,
            CategoryId: this.state.dataCategory[0].Id,
            Name: '',
            Quantity: '',
            Price: '',
            Description: '',
            DateCreat: Const.formatDate(new Date()),
            DateUpdate: '',
            CategoryName: this.state.dataCategory[0].Name
        });

    }
    selectedItem = (value, index, data) => {
        let id = data[index].Id;
        this.setState({ CategoryId: id, CategoryName: value });
    }
    changePrice(Price) {
        this.setState({ Price: Price });
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <ScrollView>
                    <View style={styles.contanir} onPress={Keyboard.dismiss}>
                        <FormLabel labelStyle={styles.labelStyle}>Loại Hàng</FormLabel>
                        <Dropdown
                            data={this.state.dataCategory}
                            onChangeText={this.selectedItem}
                            value={this.state.CategoryName}
                            selectedItemColor='tomato'
                            containerStyle={{ marginLeft: '5%', marginRight: '5%' }}
                        />
                        <View style={{ paddingTop: 10 }}>
                            <FormLabel labelStyle={styles.labelStyle}>Tên Sản Phẩm</FormLabel>
                            <FormInput onChangeText={(Name) => this.setState({ Name })} inputStyle={styles.inputStyle}
                                multiline={true} value={this.state.Name} />
                            <FormValidationMessage>Tên sản phẩm phải nhập</FormValidationMessage>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <FormLabel labelStyle={styles.labelStyle}>Số Lượng</FormLabel>
                            <FormInput onChangeText={(Quantity) => this.setState({ Quantity })} inputStyle={styles.inputStyle}
                                multiline={true} value={this.state.Quantity} keyboardType='numeric' />
                            <FormValidationMessage>Số lượng phải nhâp</FormValidationMessage>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <FormLabel labelStyle={styles.labelStyle}>Giá</FormLabel>
                            <FormInput onChangeText={(Price) => this.changePrice(Price)} inputStyle={styles.inputStyle}
                                multiline={true} value={this.state.Price} keyboardType='numeric' />
                            <FormValidationMessage>Giá phải nhập</FormValidationMessage>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <FormLabel labelStyle={styles.labelStyle}>Ghi Chú</FormLabel>
                            <FormInput onChangeText={(Description) => this.setState({ Description })} inputStyle={styles.inputStyle}
                                multiline={true} value={this.state.Description} />
                        </View>
                        <Button
                            large
                            icon={{ name: 'envira', type: 'font-awesome' }}
                            title='Thêm Mới'
                            onPress={this.confirmAddNew.bind(this)}
                            style={{ paddingTop: 40, }}
                            disabled={!this.state.Name || !this.state.Quantity || !this.state.Price}
                            buttonStyle={{ backgroundColor: 'green' }}
                        />
                        {this.state.Id !== 0 &&
                            <Button
                                large
                                icon={{ name: 'envira', type: 'font-awesome' }}
                                title='Sửa Lại'
                                onPress={this.confirmUpdate.bind(this)}
                                style={{ paddingTop: 40, }}
                                disabled={!this.state.Name || !this.state.Quantity || !this.state.Price}
                                buttonStyle={{ backgroundColor: '#90c7e7' }}
                            />
                        }
                        <Button
                            large
                            icon={{ name: 'refresh', type: 'font-awesome' }}
                            title='Làm Mới'
                            onPress={this.confirmReset.bind(this)}
                            style={{ paddingTop: 40, paddingBottom: 40 }}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}
export default ProductHome

const styles = StyleSheet.create({
    contanir: {
        flex: 1,
        fontSize: 25,
    },
    labelStyle: {
        color: 'green',
        fontSize: 27,
    },
    inputStyle: {
        color: '#24292e',
        fontSize: 25
    }
});




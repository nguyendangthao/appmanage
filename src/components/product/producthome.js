import React from 'react';
import {
    Text, View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard,
    ScrollView, KeyboardAvoidingView, Platform
}
    from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import api from '../../data';
import Const from '../../const';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
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
            DateCreat: Const.formatDate('save'),
            DateUpdate: '',
            dataCategory: [],
            CategoryName: '',
        }
        this.getAllCategory = this.getAllCategory.bind(this);
    }
    static navigationOptions = ({ navigation }) => {
        Keyboard.dismiss;
        return {
            title: 'Sản Phẩm',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1
            },
            headerRight: (
                <Text style={{ color: '#00a4db', paddingRight: 5 }}
                    onPress={() => {
                        navigation.navigate('productList');
                    }}
                >Danh Sách</Text>
            )
        }

    };

    componentWillMount() {
        this.getAllCategory();
    }
    async  getAllCategory() {
        await api.getAllCategory().then(res => {
            res.map((item) => {
                item['value'] = item.Name;
            })
            this.setState({
                dataCategory: res,
            });
            var item = this.props.navigation.getParam('item');
            if (!item) {
                this.setState({
                    CategoryId: res.length > 0 ? res[0].Id : 0,
                    CategoryName: res.length > 0 ? res[0].Name : '',
                });
            }
        });
    }
    async componentWillReceiveProps(nextProps) {
        if (this.props.reloadCategory !== nextProps.reloadCategory)
            await this.getAllCategory();
        var item = nextProps.navigation.getParam('item');
        if (item) {
            var categoryName = this.state.dataCategory.filter((o) => { return o.Id === item.CategoryId })[0].Name || '';
            this.setState({
                Id: item.Id,
                CategoryId: item.CategoryId,
                Name: item.Name,
                Quantity: item.Quantity,
                Price: item.Price,
                Description: item.Description,
                DateCreat: item.DateCreat,
                DateUpdate: Const.formatDate('save'),
                CategoryName: categoryName
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
                DateCreat: Const.formatDate('save'),
                DateUpdate: '',
            });
        }
        api.addProduct(this.state).then(res => {
            this.setState({
                Id: res
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
            DateUpdate: Const.formatDate('save'),
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
            DateCreat: Const.formatDate('save'),
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
                    <KeyboardAvoidingView  behavior="padding" enabled={Platform.OS === 'ios' ? false : true}
                        style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View style={styles.contanir} onPress={Keyboard.dismiss}>
                            <FormLabel labelStyle={styles.labelStyle}>Loại Hàng</FormLabel>
                            <Dropdown
                                data={this.state.dataCategory}
                                onChangeText={this.selectedItem}
                                value={this.state.CategoryName}
                                selectedItemColor='tomato'
                                containerStyle={{ marginLeft: '5%', marginRight: '5%' }}
                            />
                            {
                                this.state.dataCategory.length == 0 &&
                                <FormValidationMessage>Phải nhập loại hàng trước</FormValidationMessage>
                            }

                            <View style={{ paddingTop: 10 }}>
                                <FormLabel labelStyle={styles.labelStyle}>Tên Sản Phẩm</FormLabel>
                                <FormInput onChangeText={(Name) => this.setState({ Name })} inputStyle={styles.inputStyle}
                                    multiline={true} value={this.state.Name} placeholder=' tên...'/>
                                <FormValidationMessage>Tên sản phẩm phải nhập</FormValidationMessage>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <FormLabel labelStyle={styles.labelStyle}>Số Lượng</FormLabel>
                                <FormInput onChangeText={(Quantity) => this.setState({ Quantity })} inputStyle={styles.inputStyle}
                                    multiline={true} value={this.state.Quantity} keyboardType='numeric'  placeholder=' số lượng...'/>
                                <FormValidationMessage>Số lượng phải nhâp</FormValidationMessage>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <FormLabel labelStyle={styles.labelStyle}>Giá</FormLabel>
                                <FormInput onChangeText={(Price) => this.changePrice(Price)} inputStyle={styles.inputStyle}
                                    multiline={true} value={this.state.Price} keyboardType='numeric' placeholder=' giá...'/>
                                <FormValidationMessage>Giá phải nhập</FormValidationMessage>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <FormLabel labelStyle={styles.labelStyle}>Ghi Chú</FormLabel>
                                <FormInput onChangeText={(Description) => this.setState({ Description })} inputStyle={styles.inputStyle}
                                    multiline={true} value={this.state.Description}  placeholder=' ghi chú...'/>
                            </View>
                            <Button
                                large
                                icon={{ name: 'envira', type: 'font-awesome' }}
                                title='Thêm Mới'
                                onPress={this.confirmAddNew.bind(this)}
                                disabled={!this.state.Name || !this.state.Quantity || !this.state.Price}
                                buttonStyle={{ backgroundColor: 'green' }}
                                containerViewStyle={{ paddingTop: 40 }}
                            />
                            {this.state.Id !== 0 &&
                                <Button
                                    large
                                    icon={{ name: 'envira', type: 'font-awesome' }}
                                    title='Sửa Lại'
                                    onPress={this.confirmUpdate.bind(this)}
                                    disabled={!this.state.Name || !this.state.Quantity || !this.state.Price}
                                    buttonStyle={{ backgroundColor: '#90c7e7' }}
                                    containerViewStyle={{ paddingTop: 40 }}
                                />
                            }
                            <Button
                                large
                                icon={{ name: 'refresh', type: 'font-awesome' }}
                                title='Làm Mới'
                                onPress={this.confirmReset.bind(this)}
                                containerViewStyle={{ paddingTop: 40, paddingBottom: 40 }}
                            />

                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>

            </TouchableWithoutFeedback >
        );
    }
}
function mapStateToProps(state) {
    return {
        reloadCategory: state.categoryReducer.reloadCategory,
    };
}

export default connect(mapStateToProps, null)(ProductHome);
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




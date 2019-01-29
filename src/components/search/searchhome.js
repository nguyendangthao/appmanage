import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView, Platform }
    from 'react-native';
import DatePicker from 'react-native-datepicker'
import api from '../../data';
import { FormLabel, FormInput, Button, CheckBox, FormValidationMessage } from 'react-native-elements';
import Const from '../../const';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
class SearchHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'product',
            CategoryId: 0,
            Name: '',
            Description: '',
            DateFrom: '',
            DateTo: '',
            CategoryName: ' ',
        }
        this.getAllCategory = this.getAllCategory.bind(this);
    }
    static navigationOptions = ({ navigation }) => {
        Keyboard.dismiss;
        return {
            title: 'Tìm Kiếm',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1
            },

        }
    }
    componentWillMount() {
        this.getAllCategory();
    }
    componentWillReceiveProps(nextProps) {
        this.getAllCategory();
    }
    getAllCategory() {
        api.getAllCategory().then(res => {
            res = [...res, { Id: 0, Name: ' ' }];
            res.map((item) => {
                item['value'] = item.Name;
            })
            if (!!this.state.CategoryId) {
                var categoryName = res.filter((o) => { return o.Id === this.state.CategoryId })[0].Name || '';
                this.setState({
                    dataCategory: res,
                    CategoryName: categoryName,
                });
            }
            else {
                this.setState({
                    dataCategory: res,
                    CategoryId: 0,
                    CategoryName: ' ',
                });
            }

        })
    }
    changeCheckBox(type) {
        this.setState({ type });
    }
    selectedItem = (value, index, data) => {
        let id = data[index].Id;
        this.setState({ CategoryId: id, CategoryName: data[index].value });
    }
    search() {
        this.props.navigation.navigate('searchList', { searchObj: this.state });
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
            CategoryId: 0,
            Name: '',
            Description: '',
            DateFrom: '',
            DateTo: '',
            CategoryName: ' '
        });

    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView  >
                    <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios' ? false : true}
                        style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View style={styles.contanir} onPress={Keyboard.dismiss}>
                            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20 }}>
                                <CheckBox
                                    center
                                    title='Sản Phẩm'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={this.state.type === 'product'}
                                    style={{ flex: 0.5 }}
                                    onPress={() => this.changeCheckBox('product')}
                                />
                                <CheckBox
                                    center
                                    title='Loại hàng'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={this.state.type === 'category'}
                                    style={{ flex: 0.5 }}
                                    onPress={() => this.changeCheckBox('category')}
                                />
                            </View>
                            {
                                this.state.type === 'product' &&
                                <View>
                                    <FormLabel labelStyle={styles.labelStyle}>Loại Hàng</FormLabel>
                                    <Dropdown
                                        data={this.state.dataCategory}
                                        onChangeText={this.selectedItem}
                                        selectedItemColor='tomato'
                                        containerStyle={{ marginLeft: '5%', marginRight: '5%' }}
                                        value={this.state.CategoryName}
                                    />
                                </View>
                            }

                            <View>
                                <FormLabel labelStyle={styles.labelStyle}>Tên</FormLabel>
                                <FormInput onChangeText={(Name) => this.setState({ Name })} inputStyle={styles.inputStyle}
                                    multiline={true} value={this.state.Name} placeholder=' tên...' />
                            </View>
                            <View style={{ paddingTop: 20 }}>
                                <FormLabel labelStyle={styles.labelStyle}>Ghi Chú</FormLabel>
                                <FormInput onChangeText={(Description) => this.setState({ Description })} inputStyle={styles.inputStyle}
                                    multiline={true} value={this.state.Description} placeholder=' ghi chú...'/>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                                <Text style={[styles.labelStyle, { flex: 0.4, fontWeight: 'bold' }]} >Từ Ngày</Text>
                                <DatePicker
                                    style={{ flex: 0.6 }}
                                    date={this.state.DateFrom}
                                    mode="date"
                                    format="DD-MM-YYYY"
                                    minDate="01-01-2000"
                                    maxDate="01-01-2100"
                                    confirmBtnText="Đồng ý"
                                    cancelBtnText="Bỏ chọn"
                                    placeholder=' '
                                    customStyles={{
                                        dateIcon: {
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 36
                                        },
                                        btnTextCancel: {
                                            color: 'red'
                                        }
                                    }}
                                    onDateChange={(DateFrom) => this.setState({ DateFrom })}
                                    locale={'vie'}
                                />
                            </View>
                            {
                                !!this.state.DateFrom &&
                                <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <Text style={[styles.labelStyle, { flex: 0.4, fontWeight: 'bold' }]} >Đến Ngày</Text>
                                        <DatePicker
                                            style={{ flex: 0.6 }}
                                            date={this.state.DateTo}
                                            mode="date"
                                            format="DD-MM-YYYY"
                                            minDate="01-01-2000"
                                            maxDate="01-01-2100"
                                            confirmBtnText="Đồng ý"
                                            cancelBtnText="Bỏ chọn"
                                            placeholder=' '
                                            customStyles={{
                                                dateIcon: {
                                                    left: 0,
                                                    top: 4,
                                                    marginLeft: 0
                                                },
                                                dateInput: {
                                                    marginLeft: 36
                                                },
                                                btnTextCancel: {
                                                    color: 'red'
                                                }
                                            }}
                                            onDateChange={(DateTo) => this.setState({ DateTo })}
                                            locale={'vie'}
                                        />
                                    </View>
                                    <FormValidationMessage containerStyle={{ paddingLeft: 40 }}>Ngày đến phải lớn hơn ngày đi</FormValidationMessage>
                                </View>
                            }
                            <Button
                                large
                                icon={{ name: 'envira', type: 'font-awesome' }}
                                title={'Tìm Kiếm'}
                                onPress={() => this.search()}
                                buttonStyle={{ backgroundColor: 'green' }}
                                containerViewStyle={{ paddingBottom: 40, paddingTop: 40 }}
                            />
                            <Button
                                large
                                icon={{ name: 'refresh', type: 'font-awesome' }}
                                title='Làm Mới'
                                onPress={this.confirmReset.bind(this)}
                                containerViewStyle={{ paddingBottom: 40 }}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

function mapStateToProps(state) {
    return {
        reloadCategory: state.categoryReducer.reloadCategory,
    };
}
export default connect(mapStateToProps, null)(SearchHome);
// const mapPropsToDispatch = dispatch => ({
//     CategoryDispatch: (action, bol) => {
//         return dispatch({
//             type: action,
//             reloadCategory: bol
//         });
//     },
// });

// export default connect(mapStateToProps, mapPropsToDispatch)(SearchHome);


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



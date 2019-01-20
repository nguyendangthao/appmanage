import React from 'react';
import { Text, View, Picker, TouchableOpacity, FlatList, ScrollView, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DatePicker from 'react-native-datepicker'
import api, { geta, } from '../../data';
import { FormLabel, FormInput, Button, SearchBar, CheckBox } from 'react-native-elements';
import Const from '../../const';
import { Dropdown } from 'react-native-material-dropdown';
class SearchHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'product',
            CategoryId: 0,
            Name: '',
            Description: '',
            DateFrom: '',
            DateTo: ''
        }
        this.getAllCategory = this.getAllCategory.bind(this);
    }
    static navigationOptions = ({ navigation }) => {
        Keyboard.dismiss;
        return {
            title: 'Tìm Kiếm',
            headerStyle: {
                color: 'tomato',
            },

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
            });
        })
    }
    changeCheckBox(type) {
        this.setState({ type });
    }
    selectedItem = (value, index, data) => {
        let id = data[index].Id;
        this.setState({ CategoryId: id });
    }
    search() {
        var a = this.state;
        this.props.navigation.navigate('searchList', { searchObj: this.state });
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView  >
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
                                />
                            </View>
                        }

                        <View>
                            <FormLabel labelStyle={styles.labelStyle}>Tên</FormLabel>
                            <FormInput onChangeText={(Name) => this.setState({ Name })} inputStyle={styles.inputStyle}
                                multiline={true} value={this.state.Name} />
                        </View>
                        <View style={{ paddingTop: 20 }}>
                            <FormLabel labelStyle={styles.labelStyle}>Ghi Chú</FormLabel>
                            <FormInput onChangeText={(Description) => this.setState({ Description })} inputStyle={styles.inputStyle}
                                multiline={true} value={this.state.Description} />
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
                        <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
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
                        <Button
                            large
                            icon={{ name: 'envira', type: 'font-awesome' }}
                            title={'Tìm Kiếm'}
                            onPress={() => this.search()}
                            style={{ paddingTop: 40, paddingBottom: 40 }}
                            buttonStyle={{ backgroundColor: 'green' }}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

export default SearchHome



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



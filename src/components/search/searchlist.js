import React from 'react';
import {
    View, Picker, TouchableOpacity, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard,
    ScrollView, RefreshControl, FlatList
} from 'react-native';
import { List, ListItem, Button, Text } from 'react-native-elements';
import api from '../../data';
import Const from '../../const';
import Swipeout from 'react-native-swipeout';

class SearchList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            type: ''
        }
    }
    static navigationOptions = ({ navigation }) => {
        var searchObj = navigation.getParam('searchObj');
        return {
            title: 'Chi Tiết Tìm Kiếm',
            headerLeft: (<Text style={{ color: '#00a4db', paddingLeft: 5 }}
                onPress={() => {
                    navigation.navigate('searchHome');
                }}
            >Tìm Kiếm</Text>),
            headerRight: (<Text style={{ color: '#00a4db', paddingLeft: 5 }}
                onPress={() => {
                    if (searchObj.type === 'product')
                        navigation.navigate('productList');
                    else
                        navigation.navigate('categoryList');

                }}
            >Danh Sách</Text>),

        }

    };

    componentWillMount() {
        var item = this.props.navigation.getParam('searchObj');
        if (item) {
            this.setState({
                type: item.type,
            })
            if (item.type === 'product') {

            }
            else {

            }

        }
    }

    render() {
        return (
            <ScrollView style={styles.contanir}  >
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Text h3 style={{ color: 'green', textAlign: 'center', paddingTop: 20 }}>
                        {this.state.type === 'product' ? 'Sản Phẩm' : 'Loại Hàng'}</Text>
                    <Text style={[styles.labelStyle, { paddingTop: 20 }]}>Nội Dung:</Text>
                    <Text style={styles.labelStyle}>Tổng Số Tìm Được:</Text>
                    {
                        this.state.type === 'product' &&
                        <View>
                            <Text style={styles.labelStyle}>Số Lượng:</Text>
                            <Text style={styles.labelStyle}>Thành Tiền:</Text>
                        </View>
                    }

                </View>
            </ScrollView >
        );
    }
}
export default SearchList

const styles = StyleSheet.create({
    contanir: {
        flex: 1,
    },
    labelStyle: {
        color: 'green',
        fontSize: 22
    },
});



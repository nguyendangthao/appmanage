import React from 'react';
import {
    Text, View, Picker, TouchableOpacity, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard,
    ScrollView, RefreshControl, FlatList
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import api from '../../data';
import Const from '../../const';
import Swipeout from 'react-native-swipeout';

class ProductList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            refreshing: false,// hiểu kiểu như cái loading trên web,vào k load get data thì true là đang load,get xong là false
            page: 1,
            pageSize: 20,
        }
    }
    static navigationOptions = ({ navigation }) => {

        return {
            title: 'Danh Sách Sản Phẩm',
            headerLeft: (<Text style={{ color: '#00a4db', paddingLeft: 5 }}
                onPress={() => {
                    navigation.navigate('productHome');
                }}
            >Sản Phẩm</Text>),

        }

    };
    componentWillMount() {
        api.getAllProduct(this.state.page, this.state.pageSize).then(res => {
            let newPage = this.state.page + 1;
            this.setState({ data: res, page: newPage });
        })
    }
    _onRefresh = () => {
        this.setState({ refreshing: true });
        api.getAllProduct(this.state.page, this.state.pageSize).then(res => {
            if (res.length === 0) {
                this.setState({ page: 1, pageSize: this.state.pageSize * 2 });
                api.getAllProduct(this.state.page, this.state.pageSize).then(res => {
                    this.setState({ data: res, refreshing: false, page: this.state.page + 1 });
                })
                return;
            }
            let newPage = this.state.page + 1;
            this.setState({
                data: res,
                refreshing: false,
                page: newPage,
            });

        })
    }
    comfirmDelete(id) {
        api.deleteProduct(id).then(res => {
            if (res.length == 0) {
                this.setState({ page: this.state.page - 1 });
                api.getAllProduct(this.state.page, this.state.pageSize).then(res => {
                    let newPage = this.state.page + 1;
                    this.setState({
                        data: res, page: newPage,
                    });
                })
            }
        })
    }
    delete(id) {
        Alert.alert(
            'Thông Báo',
            'Xác nhận xóa',
            [
                { text: 'Đồng Ý', onPress: this.comfirmDelete.bind(this, id) },
                { text: 'Bỏ', style: 'cancel' },
            ],
            { cancelable: false },
        )
    }
    render() {
        return (
            <ScrollView style={styles.contanir}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind()}
                    />
                }
            >
                <List >
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item) => item.Id.toString()}
                        renderItem={
                            ({ item, index }) =>
                                <Swipeout
                                    right={[
                                        {
                                            text: 'Xóa',
                                            backgroundColor: 'red',
                                            onPress: () => { this.delete(item.Id) }
                                        },
                                    ]}
                                    left={[
                                        {
                                            text: 'Chi Tiết',
                                            backgroundColor: 'green',
                                            onPress: () => { this.props.navigation.navigate('productHome', { item: item }); }
                                        }
                                    ]}
                                    autoClose={true}
                                    style={[styles.swipeout, index == this.state.data.length - 1 && { marginBottom: 20 }]}
                                >
                                    <View style={{ height: 100 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', }}>
                                            <Text style={{ flex: 0.6, fontSize: 20, color: 'green', paddingLeft: 5, }}>{item.Name}</Text>
                                            <Text style={{ flex: 0.4, fontSize: 20, position: 'absolute', right: 0, }}>
                                                {!item.DateUpdate === false ? item.DateUpdate + '-S' : item.DateCreat + '-M'}
                                            </Text>
                                        </View>
                                        <Text style={{ flex: 1, paddingLeft: 5 }}>Số Lượng: {item.Quantity}. --- Giá: {item.Price}.</Text>

                                    </View>
                                </Swipeout>
                        }
                    />

                </List>
            </ScrollView>
        );
    }
}
export default ProductList

const styles = StyleSheet.create({
    contanir: {
        flex: 1,
    },
    swipeout: {
        borderRadius: 10,
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: 10,
    },

});




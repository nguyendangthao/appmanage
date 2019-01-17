import React from 'react';
import {
    Text, View, Picker, TouchableOpacity, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard,
    ScrollView, RefreshControl, FlatList
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import api from '../../data';
import Const from '../../const';
import Swipeout from 'react-native-swipeout';

class CategoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            refreshing: false,// hiểu kiểu như cái loading trên web,vào k load get data thì true là đang load,get xong là false
            page: 1,
            pageSize: 20,
            dataTemp: []
        }
    }
    static navigationOptions = ({ navigation }) => {

        return {
            title: 'Danh Sach Loại Hàng',
            headerLeft: (<Text style={{ color: '#00a4db', paddingLeft: 5 }}
                onPress={() => {
                    navigation.navigate('categoryHome');
                }}
            >Trở Về</Text>),

        }

    };
    componentWillMount() {
        api.getAllCategory(this.state.page, this.state.pageSize).then(res => {
            let newPage = this.state.page + 1;

            this.setState({ data: res, page: newPage, dataTemp: res });
        })
    }
    _onRefresh = () => {
        this.setState({ refreshing: true });
        api.getAllCategory(this.state.page, this.state.pageSize).then(res => {
            if (res.length === 0) {
                this.setState({ data: this.state.dataTemp, refreshing: false });
                return;
            }
            let newPage = this.state.page + 1;
            this.setState({
                data: res,
                refreshing: false,
                page: newPage,
                dataTemp: [...this.state.dataTemp, ...res]
            });

        })
    }
    comfirmDelete(id) {
        api.deleteCategory(id).then(res => {
            if (res.length == 0) {
                api.getAllCategory(this.state.page - 1, this.state.pageSize).then(res => {
                    let newPage = this.state.page + 1;
                    this.setState({ data: res, page: newPage, dataTemp: res });
                })
            }
        })
    }
    delete(id) {
        Alert.alert(
            'Thông Báo',
            'Xác nhận xóa',
            [
                { text: 'OK', onPress: this.comfirmDelete.bind(this, id) },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: false },
        )
    }

    render() {
        const swipeoutBtnRight = [
            {
                text: 'Xóa',
                backgroundColor: 'red',
                onPress: (item) => { this.delete(item) }
            }
        ];
        const swipeoutBtnLeft = [
            {
                text: 'Chi Tiết',
                backgroundColor: 'green',
                onPress: () => { this.delete(item) }
            }
        ];
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
                                <Swipeout right={[
                                    {
                                        text: 'Xóa',
                                        backgroundColor: 'red',
                                        onPress: () => { this.delete(item.Id) }
                                    }
                                ]} autoClose={true}
                                    left={swipeoutBtnLeft}
                                    style={[styles.swipeout, index == this.state.data.length - 1 && { marginBottom: 20 }]}
                                >
                                    <ListItem
                                        title={item.Name}
                                        subtitle={item.Id}
                                    />
                                </Swipeout>
                        }
                    />

                </List>
            </ScrollView>
        );
    }
}
export default CategoryList

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


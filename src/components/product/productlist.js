import React from 'react';
import {
    Text, View, StyleSheet, Alert,
    ScrollView, RefreshControl, FlatList, ActivityIndicator
} from 'react-native';
import { List } from 'react-native-elements';
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
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1
            },
            headerLeft: (<Text style={{ color: '#00a4db', paddingLeft: 5 }}
                onPress={() => {
                    navigation.navigate('productHome');
                }}
            >Sản Phẩm</Text>),
        }
    };
    componentWillMount() {
        var pageFrom = this.props.navigation.getParam('pageFrom');
        var dataSearch = this.props.navigation.getParam('dataSearch');
        this.setState({ isloading: true });
        if (pageFrom === 'search') {
            this.setState({ data: dataSearch, isloading: false });
        }
        else {
            api.getAllProduct(this.state.page, this.state.pageSize).then(res => {
                let newPage = this.state.page + 1;
                this.setState({ data: res, page: newPage, isloading: false });
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        var pageFrom = nextProps.navigation.getParam('pageFrom');
        var dataSearch = nextProps.navigation.getParam('dataSearch');
        this.setState({ isloading: true });
        if (pageFrom === 'search') {
            this.setState({ data: dataSearch, isloading: false });
        }
    }
    _onRefresh = () => {
        var pageFrom = this.props.navigation.getParam('pageFrom');
        if (pageFrom !== 'search') {
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
    }
    comfirmDelete(id, index) {
        var pageFrom = this.props.navigation.getParam('pageFrom');
        this.setState({ isloading: true });
        api.deleteProduct(id).then(res => {
            if (res.length == 0) {
                if (pageFrom === 'search') {
                    let array = [...this.state.data];
                    array.splice(index, 1);
                    this.setState({ data: array, isloading: false });
                    Alert.alert('Xóa thành công');
                }
                else {
                    this.setState({ page: this.state.page - 1 });
                    api.getAllProduct(this.state.page, this.state.pageSize).then(res => {
                        let newPage = this.state.page + 1;
                        this.setState({
                            data: res, page: newPage,
                            isloading: false
                        });
                        Alert.alert('Xóa thành công');
                    })
                }
            }
        })
    }
    delete(id, index) {
        Alert.alert(
            'Thông Báo',
            'Xác nhận xóa',
            [
                { text: 'Đồng Ý', onPress: this.comfirmDelete.bind(this, id, index) },
                { text: 'Bỏ', style: 'cancel' },
            ],
            { cancelable: false },
        )
    }
    renderPrice(item) {
        return parseInt(item).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
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
                {
                    this.state.isloading === false &&
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
                                                onPress: () => { this.delete(item.Id, index) }
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
                                                <Text style={{ flex: 0.4, fontSize: 18, position: 'absolute', right: 0, }}>
                                                    {!item.DateUpdate === false ? Const.formatDate('read', item.DateUpdate) + '-S' : Const.formatDate('read', item.DateCreat) + '-M'}
                                                </Text>
                                            </View>
                                            <Text style={{ flex: 1, paddingLeft: 5 }}>Số Lượng: {item.Quantity}. --- Giá: {this.renderPrice(item.Price)}.</Text>

                                        </View>
                                    </Swipeout>
                            }
                        />

                    </List>
                }
                {
                    this.state.isloading &&
                    <View style={[styles.containerLoading, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
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
    containerLoading: {
        justifyContent: 'center',
    },
    horizontal: {
        marginTop: '45%'
    }

});




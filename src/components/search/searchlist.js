import React from 'react';
import {
    View, StyleSheet,
    ScrollView, ActivityIndicator, FlatList
} from 'react-native';
import { Text, List } from 'react-native-elements';
import api from '../../data';
import Const from '../../const';
import Swipeout from 'react-native-swipeout';

class SearchList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            type: '',
            page: 1,
            pageSize: 20,
            isloading: false,
            searchObj: {}

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
                    if (searchObj.type === 'product') {
                        api.searchProdcut(searchObj).then(res => {
                            navigation.navigate('productList', { pageFrom: 'search', dataSearch: res });
                        });
                    }
                    else {
                        api.searchCategory(searchObj).then(res => {
                            navigation.navigate('categoryList', { pageFrom: 'search', dataSearch: res });
                        });

                    }


                }}
            >Danh Sách</Text>),

        }

    };
    componentWillMount() {
        this.setState({ isloading: true });
        var item = this.props.navigation.getParam('searchObj');
        this.setState({ searchObj: item });
        if (item) {
            this.setState({
                type: item.type,
            })
            if (item.type === 'product') {
                api.searchProdcut(item).then(res => {
                    this.setState({
                        data: res,
                        isloading: false
                    })
                });
            }
            else {
                api.searchCategory(item).then(res => {
                    this.setState({
                        data: res,
                        isloading: false
                    })
                });
            }

        }
    }

    renderContent() {
        var content = 'Tìm kiếm';
        if (this.state.type === 'product')
            content = content + ' sản phẩm ';
        else
            content = content + ' loại hàng ';
        if (this.state.type === 'product' && this.state.searchObj.CategoryName !== ' ')
            content = content + ' với tên loại hàng ' + this.state.searchObj.CategoryName;
        if (!!this.state.searchObj.Name)
            content = content + ' và với chứa tên ' + this.state.searchObj.Name;
        if (!!this.state.searchObj.Description)
            content = content + ' và với ghi chú ' + this.state.searchObj.Description;
        if (!!this.state.searchObj.DateFrom && !this.state.searchObj.DateTo)
            content = content + ' và với từ ngày ' + this.state.searchObj.DateFrom + ' đến nay';
        if (!!this.state.searchObj.DateFrom && !!this.state.searchObj.DateTo)
            content = content + ' và với từ ngày ' + this.state.searchObj.DateFrom + ' đến ngày ' + this.state.searchObj.DateTo;
        return content;
    }
    renderTotalMoney() {
        var resuft = this.state.data.reduce((total, item, index, arr) => {
            return total += (parseInt(item.Price) * parseInt(item.Quantity));
        }, 0);
        return resuft.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }
    renderPrice(item) {
        return parseInt(item).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }
    render() {
        let content = `Tìm kiếm`;
        return (
            <ScrollView style={styles.contanir}  >
                {
                    this.state.isloading === false &&
                    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <Text h3 style={{ color: 'green', textAlign: 'center', paddingTop: 20 }}>
                            {this.state.type === 'product' ? 'Sản Phẩm' : 'Loại Hàng'}</Text>
                        <Text style={[styles.labelStyle, { paddingTop: 20 }]}>Nội Dung:</Text>
                        <Text>{this.renderContent()}</Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={[styles.labelStyle, { flex: 0.6 }]}>Tổng Số Tìm Được: </Text>
                            <Text style={{ flex: 0.4, fontSize: 20 }}>{this.state.data.length}</Text>
                        </View>

                        {
                            this.state.type === 'product' &&
                            <View>
                                <List >
                                    <FlatList
                                        data={this.state.data}
                                        keyExtractor={(item) => item.Id.toString()}
                                        renderItem={
                                            ({ item, index }) =>
                                                <View>
                                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                                        <View style={{ flex: 0.5 }}>
                                                            <Text style={{ color: 'green' }}>Số Lượng</Text>
                                                            <Text >{item.Quantity}</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5 }}>
                                                            <Text style={{ color: 'green' }}>Giá</Text>
                                                            <Text >{this.renderPrice(item.Price)}</Text>
                                                        </View>
                                                    </View>

                                                </View>
                                        }
                                    />

                                </List>

                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={[styles.labelStyle, { flex: 0.6 }]}>Thành Tiền: </Text>
                                    <Text style={{ flex: 0.4, fontSize: 20, color: 'red' }}>{this.renderTotalMoney()}</Text>
                                </View>
                            </View>
                        }

                    </View>
                }
                {
                    this.state.isloading &&
                    <View style={[styles.containerLoading, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
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

    containerLoading: {
        justifyContent: 'center',
    },
    horizontal: {
        marginTop: '45%'
    }
});



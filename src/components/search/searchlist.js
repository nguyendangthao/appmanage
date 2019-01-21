import React from 'react';
import {
    View, StyleSheet,
    ScrollView, ActivityIndicator
} from 'react-native';
import { Text } from 'react-native-elements';
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
            isloading: false
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
        this.setState({ isloading: true });
        var item = this.props.navigation.getParam('searchObj');
        if (item) {
            this.setState({
                type: item.type,
            })
            if (item.type === 'product') {

            }
            else {
                api.searchCategory(this.state.page, this.state.pageSize, item).then(res => {
                    this.setState({
                        data: res,
                        isloading: false
                    })
                });
            }

        }
    }
    // componentWillReceiveProps(nextProps) {
    //     var item = nextProps.navigation.getParam('searchObj');
    //     if (item) {
    //         this.setState({
    //             type: item.type,
    //         })
    //         if (item.type === 'product') {

    //         }
    //         else {
    //             api.searchCategory(this.state.page, this.state.pageSize, item).then(res => {
    //                 this.setState({
    //                     data: res,
    //                 })
    //             });
    //         }

    //     }
    // }

    render() {
        return (
            <ScrollView style={styles.contanir}  >
                {
                    this.state.isloading === false &&
                    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <Text h3 style={{ color: 'green', textAlign: 'center', paddingTop: 20 }}>
                            {this.state.type === 'product' ? 'Sản Phẩm' : 'Loại Hàng'}</Text>
                        <Text style={[styles.labelStyle, { paddingTop: 20 }]}>Nội Dung:</Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={[styles.labelStyle, { flex: 0.6 }]}>Tổng Số Tìm Được: </Text>
                            <Text style={{ flex: 0.4, fontSize: 20 }}>{this.state.data.length}</Text>
                        </View>

                        {
                            this.state.type === 'product' &&
                            <View>
                                <Text style={styles.labelStyle}>Số Lượng:</Text>
                                <Text style={styles.labelStyle}>Thành Tiền:</Text>
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



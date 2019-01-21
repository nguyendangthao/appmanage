import React from 'react';
import {
    Text, View, StyleSheet, Alert, ActivityIndicator,
    ScrollView, RefreshControl, FlatList
} from 'react-native';
import { List } from 'react-native-elements';
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
            isloading: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Danh Sách Loại Hàng',
            headerLeft: (<Text style={{ color: '#00a4db', paddingLeft: 5 }}
                onPress={() => {
                    navigation.navigate('categoryHome');
                }}
            >Loại Hàng</Text>),
        }

    };

    componentWillMount() {
        this.setState({ isloading: true });
        api.getAllCategory(this.state.page, this.state.pageSize).then(res => {
            let newPage = this.state.page + 1;
            this.setState({ data: res, page: newPage, isloading: false });
        })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        api.getAllCategory(this.state.page, this.state.pageSize).then(res => {
            if (res.length === 0) {
                this.setState({ page: 1, pageSize: this.state.pageSize * 2 });
                api.getAllCategory(this.state.page, this.state.pageSize).then(res => {
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
        api.deleteCategory(id).then(res => {
            if (res.length == 0) {
                this.setState({ page: this.state.page - 1 });
                api.getAllCategory(this.state.page, this.state.pageSize).then(res => {
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
                                                onPress: () => { this.delete(item.Id) }
                                            },
                                        ]}
                                        left={[
                                            {
                                                text: 'Chi Tiết',
                                                backgroundColor: 'green',
                                                onPress: () => { this.props.navigation.navigate('categoryHome', { item: item }); }
                                            }
                                        ]}
                                        autoClose={true}
                                        style={[styles.swipeout, index == this.state.data.length - 1 && { marginBottom: 20 }]}
                                    >
                                        <View style={{ height: 100 }}>
                                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                                <Text style={{ flex: 0.6, fontSize: 20, color: 'green', paddingLeft: 5, }}>{item.Name}</Text>
                                                <Text style={{ flex: 0.4, fontSize: 20, position: 'absolute', right: 0, }}>
                                                    {!item.DateUpdate === false ? Const.formatDate('read', item.DateUpdate) + '-S' : Const.formatDate('read', item.DateCreat) + '-M'}
                                                </Text>
                                            </View>
                                            <Text style={{ flex: 1, paddingLeft: 5 }}>{item.Description}</Text>

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
    containerLoading: {
        justifyContent: 'center',
    },
    horizontal: {
        marginTop: '45%'
    }
});

{/* <ListItem
title={item.Name}
 subtitle={item.Description}
 containerStyle={{ height: 100 }}
component={() => {
    return (
        <View style={{ height: 100 }}>
            <View>
                <Text>{item.Name}</Text>
                <Text>{item.DateCreat}</Text>
            </View>
            <View>
                <Text>{item.Description}</Text>
            </View>

        </View>
    );
}
}
/> */}


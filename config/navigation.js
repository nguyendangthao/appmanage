import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CategoryHome from '../src/components/category/categoryhome';
import ProductHome from '../src/components/product/producthome';
import SearchHome from '../src/components/search/searchhome';
import CategoryList from '../src/components/category/categorylist';
import ProductList from '../src/components/product/productlist';
import SearchList from '../src/components/search/searchlist';

export const SearchStack = createStackNavigator({
    searchHome: { screen: SearchHome },
    searchList: { screen: SearchList },
});

export const CategoryStack = createStackNavigator({
    categoryHome: { screen: CategoryHome },
    categoryList: { screen: CategoryList }
});

export const ProductStack = createStackNavigator({
    productHome: { screen: ProductHome },
    productList: { screen: ProductList }
});





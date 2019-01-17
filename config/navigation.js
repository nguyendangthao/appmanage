import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CategoryHome from '../src/components/category/categoryhome';
import ProductHome from '../src/components/product/producthome';
import SearchHome from '../src/components/search/searchhome';
import CategoryList from '../src/components/category/categorylist';

export const SearchStack = createStackNavigator({
    searchHome: { screen: SearchHome },
});

export const CategoryStack = createStackNavigator({
    categoryHome: { screen: CategoryHome },
    categoryList: { screen: CategoryList }
});

export const ProductStack = createStackNavigator({
    productHome: { screen: ProductHome },
});





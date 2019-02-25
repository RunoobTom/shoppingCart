import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './page/home/shoppingCart';
import Address from './page/address/Address'
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import GoodsList from './page/goodsList/goodsList'
import Detail from './page/detail/detail'

ReactDOM.render(
    <HashRouter>
        <div className = 'container'>
            <Route path = '/home' component = {App}/>
            <Route path = '/address' component = {Address}/>
            <Route path = '/goodsList' component = {GoodsList}/>
            <Route path = '/detail' component = {Detail}/>
        </div>
    </HashRouter>,
    document.getElementById('root')
)

sessionStorage.setItem('checked', JSON.stringify([0]));
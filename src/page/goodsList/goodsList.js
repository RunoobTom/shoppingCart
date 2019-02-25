import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './goodsList.css';
import { goods } from '../../database';

class GoodsList extends Component {
    constructor (props) {
        sessionStorage.setItem('goods', JSON.stringify(goods));
        super(props);
        const list = JSON.parse(sessionStorage.getItem('goods'));
        this.state = {
            totalList: list,
            checkedList: [],
        }
    }

    render() {

        return(
            <div className='goodsList'>
                <ul className='topUl'>
                    <li className='topList'>名称</li>
                    <li className='topList'>价格</li>
                    <li className='topList'>赠品</li>
                    <li className='topList'>编辑</li>
                </ul>
                <ul className='contentUl'>
                    {this.state.totalList.map((value, index)=> {
                        return (
                            <li className='contentLi' key={index}>
                                <div className='float'>{value.name}</div>
                                <div className='float'>{value.price}</div>
                                <div className='float'>{value.gift}</div>
                                <div className='float'>
                                    <a onClick={() => this.handleClick(index)}>添加到购物车</a>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <Link
                    to='/home'
                    replace
                    onClick={this.pushSession}
                    className='goodsListLink'
                >
                    进入购物车
                </Link>
            </div>
        )
    }

    handleClick = (index) => {
        const {checkedList} = this.state;
        if (checkedList.indexOf(index) === -1) {
            checkedList.push(index);
            alert('添加成功');
        } else {
            alert('该商品已经被添加');
        }
    };

    pushSession = () => {
        sessionStorage.setItem('checked',JSON.stringify(this.state.checkedList));
    };



}
export default GoodsList;
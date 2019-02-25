import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css'

class Detail extends Component {
    constructor (props) {
        super(props);
        const picture = require('../../goods-2.jpg');
        const index = sessionStorage.getItem('chosen');
        const arr = JSON.parse(sessionStorage.getItem('checked'));
        const list = JSON.parse(sessionStorage.getItem('goods'));
        this.state = {
            arr,
            index,
            list,
            picture
        };
    }

    render() {
        const {index,arr,list} = this.state;
        const a=1;
        console.log(a);

        return(
            <div className='detail'>
                <div className='detailContent'>
                    <h3>商品信息详情</h3>
                    <div className='detailContentLeft'>
                        <img src={this.state.picture} width='300px' height='300px' alt='商品图片'/>
                    </div>
                    <div className='detailContentRight'>
                        <ul>
                            <li>名称:{list[arr[index]].name}</li>
                            <li>价格:{list[arr[index]].price}元</li>
                            <li>赠品:{list[arr[index]].gift}</li>
                        </ul>
                    </div>
                </div>
                <Link to='/home' className='detailLink'>返回购物车</Link>
            </div>
        )
    }
}

export default Detail;
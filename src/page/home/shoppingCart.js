import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoodPart from '../../component/good/index';
import './shoppingCart.css';

class App extends Component {
    constructor (props) {
        super(props);
        const checkedList = JSON.parse(sessionStorage.getItem('checked'));
        const array = JSON.parse(sessionStorage.getItem('goods'));
        const newArray = checkedList.map((value) => ({
            ...array[value],
            checked: false,
            num: 1
        }));
        this.state = {
            array: newArray,
            all: false
        };
    };

    render() {
        const {array} = this.state;

        return (
            <div className='App'>
                <div className='top'>
                    <p>购物车</p>
                </div>
                <div>
                    <Link to='/goodsList'>商品列表</Link>
                </div>
                <div className='topLi'>
                    <ul>
                        <li>商品信息</li>
                        <li>商品金额</li>
                        <li>商品数量</li>
                        <li>总金额</li>
                        <li>编辑</li>
                    </ul>
                </div>

                <div className='goodsInfo'>
                    {array.map((value, index) => (
                        <GoodPart
                            name={value.name}
                            key={index}
                            price={value.price}
                            index={index + 1}
                            checked={value.checked}
                            handleChange={this.handleChange}
                        />
                    ))}
                </div>
                <div className='allChosen'>
                    <button onClick={this.handleChooseAll}>全选</button>
                </div>
                <div className='confirm'>
                    <Link to={'./address'} className = 'shoppingCartLink'>结账</Link>
                    <span className='totalPrice'>总价：¥
                        {array.reduce((previous, current)=> {
                            const total = current.checked ? current.price * current.num : 0;
                            return previous + total
                        }, 0)}
                    </span>
                </div>
            </div>
        );
    };

    handleChange = (type, value, index) => {
        const {array} = this.state;
        switch (type) {
            case 'delete':
                array.splice(index - 1, 1);
                this.setState({array: array});
                break;
            case 'checked':
                array[index - 1].checked = value;
                this.setState({array: array});
                break;
            case 'add':
                array[index - 1].num = value;
                this.setState({array: array});
                break;
            case 'decrease':
                array[index - 1].num = value;
                this.setState({array: array});
                break;
            default:
                break;
        }
    };

    handleChooseAll = () => {
        const {array} = this.state;
        array.forEach((item) => {
            item.checked = ! this.state.all;
        });
        this.setState({
            array,
            all: ! this.state.all
        });

    };
}

export default App;

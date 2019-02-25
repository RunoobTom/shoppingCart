import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom'
import './index.css';

class GoodPart extends Component {
    constructor (props) {
        super(props);
        this.state = {
            num: 1,
            visible: false,
            backgroundColor: 'white'
        };
    }

    render() {

        return (
            <div className='goodLi'>
                <div className='goodPart'>
                    <div className='goodPart-first'>
                        <div className='cart-item-check'>
                            <a onClick={this.handleChecked}
                               style={{backgroundColor: this.props.checked ? 'red' : 'white'}}>
                            </a>{this.props.name}
                        </div>
                    </div>
                    <div className='goodPart-second'>
                        <Link to='/detail' onClick={this.handleDetail}>详情</Link>
                    </div>
                </div>
                <div className='goodPart'>¥{this.props.price}</div>
                <div className='goodPart'>
                    <button onClick={this.handleDecrease}> - </button>
                    {this.state.num}
                    <button onClick={this.handleAdd}> + </button>
                </div>
                <div className='goodPart'>¥{this.props.price * this.state.num}
                </div>
                <div className='goodPart'>
                    <Button onClick={this.showModal}>delete</Button>
                    <Modal visible={this.state.visible} onCancel={this.onCancel} onOk={this.handleDelete}>
                        <p>确认要删除该商品吗</p>
                    </Modal>
                </div>
            </div>
        );
    }

    handleChecked = () => {
        if (this.props.checked === false) {
            this.setState({ backgroundColor: 'red'});
            this.props.handleChange('checked', true, this.props.index);
        } else if (this.props.checked === true) {
            this.setState({ backgroundColor: 'white'});
            this.props.handleChange('checked', false, this.props.index);
        }
    };

    handleDelete = () => {
        this.props.handleChange('delete', this.props.price, this.props.index);
        this.setState({visible: false});
    };

    showModal = () => {
        this.setState({visible: true});
    };

    onCancel = () => {
        this.setState({visible: false});
    };

    handleDecrease = () => {
        if (this.state.num>1) {
            this.setState({num: this.state.num - 1}, () => {
                this.props.handleChange('decrease', this.state.num, this.props.index);
            });
        }
    };

    handleAdd = () => {
        this.setState({num: this.state.num + 1}, () => {
            this.props.handleChange('add', this.state.num, this.props.index);
        });
    };

    handleDetail = () => {
        sessionStorage.setItem('chosen', this.props.index-1);
    };
}

export default GoodPart;
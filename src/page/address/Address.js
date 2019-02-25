import React,{ Component} from 'react';
import './address.css'
import Li from '../../component/li/index'
import { Modal } from 'antd';
import { addressArray } from '../../database';

class Address extends Component {
    constructor (props) {
        super(props);
        this.state = {
            array: addressArray,
            checked: 0,
            chosen: 0,
            modalVisible: false,
            showAll: true,
            name: '',
            address: '',
            number: '',
            nameFormat: '',
            addressFormat: '',
            phoneNumFormat: '',
        }
    }

    render() {
        //判断是否hide，来判断渲染方框个数是3个还是全部
        let {array} = this.state;
        let jsx = [];
        if (array.length > 0) {
            if (this.state.showAll) {
                jsx = array.map((value, index) => {
                    return(
                        <Li
                            name = {value.name}
                            address = {value.address}
                            phoneNum = {value.phoneNum}
                            index = {index + 1}
                            handleChange = {this.handleChange}
                            checked = {this.state.checked}
                            chosen = {this.state.chosen}
                            key = {index}
                        />
                    );
                })
            }
            else {
                const arrayDelete = array.slice(0, 3);
                jsx = arrayDelete.map((value, index) => {
                    return(
                        <Li
                            name = {value.name}
                            address = {value.address}
                            phoneNum = {value.phoneNum}
                            index = {index + 1}
                            handleChange = {this.handleChange}
                            checked = {this.state.checked}
                            chosen = {this.state.chosen}
                        />
                    );
                })
            }
        }

        return(
            <div className='address'>
                <div className='top'>
                    <span className='top-span'>地址确认</span>
                    <span className='top-span'>查看订单</span>
                    <span className='top-span'>支付</span>
                    <span className='top-span'>订单确认</span>
                </div>
                <div className='deliver'>
                    <span>配送地址</span>
                </div>
                <div className='middle'>
                    <div className='middle-list'>
                        <ul id='middleList'>
                            {jsx.map((value)=>{return value})}
                        </ul>
                        <div className='add'>
                            <a onClick={this.showModal}>增加地址</a>
                            <Modal visible = {this.state.modalVisible} onOk={this.addAddress} onCancel={this.onCancel}>
                                <p>
                                    姓名<input type='text' name='name' onChange={this.handleOnChangeName}/>
                                    <span>{this.state.nameFormat}</span>
                                </p>
                                <p>
                                    地址<input type='text' name='address' onChange={this.handleOnChangeAddress}/>
                                    <span>{this.state.addressFormat}</span>
                                </p>
                                <p>
                                    号码<input type='text' name='phone' onChange={this.handleOnChangeNum}/>
                                    <span>{this.state.phoneNumFormat}</span>
                                </p>
                            </Modal>
                        </div>
                    </div>
                    <div className='showAll'><a onClick={this.showAll} id='showAll'>{this.state.showAll?'收起':'展开'}</a> </div>
                </div>
                <div className='deliver2'>
                    <span>配送方式</span>
                </div>
                <div className='bottom'>
                    <div className='deliveryWay'>
                        <p>标准配送</p>
                    </div>
                    <div className='deliveryWay'>
                        <p>高级配送</p>
                    </div>
                    <div className='confirmDelivery'>
                        <button>下一步</button>
                    </div>
                </div>
            </div>
        )
    }

    //把几种改变state的情况都写进函数
    handleChange = (type, value) => {
        const {array} = this.state;
        switch (type) {
            case 'add':
                this.setState({array: value});
                break;
            case 'decrement':
                array.splice(value - 1, 1);
                this.setState({array, chosen: 0});
                if (value === this.state.checked) {
                    this.setState({checked: 0})
                } else if (value === 0) {

                } else if (value > this.state.checked) {

                } else {
                    this.setState({checked: this.state.checked - 1});
                }
                break;
            case 'alter':
                const index = value.index;
                const object = {
                    name: value.name,
                    address: value.address,
                    phoneNum: value.phoneNum
                };
                array.splice(index-1, 1, object);
                this.setState({array});
                break;
            case 'check':
                this.setState({checked: value});
                break;
            case 'chosen':
                this.setState({chosen: value});
                break;
            default:break;
        }
    };

    showModal = () => {
        this.setState({modalVisible: true});
    };

    onCancel = () => {
        this.setState({modalVisible: false});
    };

    addAddress = () => {
        const newObject = {
            name: this.state.name,
            address: this.state.address,
            phoneNum: this.state.number
        };
        let array = this.state.array;
        array.push(newObject);
        if (this.state.name === '' || this.state.address === '') {
            alert('格式错误');
        } else {
            this.setState({modalVisible: false, array});
        }

    };

    showAll = () => {
        this.setState({showAll: !this.state.showAll})
    };

    handleOnChangeName = (e) => {
        if (e.target.value === '') {
            this.setState({nameFormat: '姓名不能为空'});
        } else {
            this.setState({name: e.target.value, nameFormat: ''});
        }
    };

    handleOnChangeAddress = (e) => {
        if (e.target.value === '') {
            this.setState({addressFormat: '地址不能为空'});
        } else {
            this.setState({address: e.target.value, addressFormat: ''});
        }
    };

    handleOnChangeNum = (e) => {
        const number = Number(e.target.value);
        if (typeof(number) === 'number' && !isNaN(number)) {
            if (e.target.value.length === 11) {
                this.setState({number: e.target.value, phoneNumFormat: ''});
            } else {
                this.setState({phoneNumFormat: '请输入11位手机号'});
            }
        } else {
            this.setState({phoneNumFormat: '请输入正确格式的手机号码'});
        }
    };

}

export default Address;
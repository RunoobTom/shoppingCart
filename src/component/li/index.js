import React, { Component } from 'react';
import { Modal } from 'antd';

class Li extends Component {
    constructor (props) {
        super(props);
        this.state = {
            visible: false,
            buttonVisibility: 'hidden',
            defaultVisibility: 'hidden',
            checked: this.props.checked,
            chosen: this.props.chosen,
            index: this.props.index,
            border: '2px #e9e9e9 solid',
            name: this.props.name,
            address: this.props.address,
            phoneNum: this.props.phoneNum,
            alertNumber: '',
            alertName: '',
            alertAddress: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.index === nextProps.chosen) {
            this.setState({ buttonVisibility: 'visible', border: '2px solid #EE7A23' });
        } else {
            this.setState({ buttonVisibility: 'hidden', border: '2px solid #e9e9e9' });
        }
        if (this.props.index === nextProps.checked) {
            this.setState({ defaultVisibility: 'visible' });
        } else {
            this.setState({ defaultVisibility: 'hidden' });
        }
    }

    render() {

        return (
            <li className='middle-list-li' onClick={this.onClick} style={{border: this.state.border}}>
                <p>{this.props.name}</p>
                <p>{this.props.address}</p>
                <p>{this.props.phoneNum}</p>
                <a onClick={this.showModal} style={{visibility: this.state.buttonVisibility}}>修改</a>
                <Modal visible={this.state.visible} onOk={this.alter} onCancel={this.cancel} align={{name: 'modal'}}>
                    <p>
                        姓名<input onChange={this.handleChangeName} defaultValue={this.state.name}/>
                        <span>{this.state.alertName}</span>
                    </p>
                    <p>
                        地址<input onChange={this.handleChangeAddress} defaultValue={this.state.address}/>
                        <span>{this.state.alertAddress}</span>
                    </p>
                    <p>
                        号码
                        <input onChange={this.handleChangeNum} defaultValue={this.state.phoneNum}/>
                        <span className='alertSpan' style={{color: 'red', paddingLeft:'10px'}}>
                            {this.state.alertNumber}
                        </span>
                    </p>
                </Modal>
                <a onClick={this.delete} style={{visibility: this.state.buttonVisibility}}>删除</a>
                <a onClick={this.setIndex} style={{visibility: this.state.buttonVisibility}}>设为默认地址</a>
                <button className='defaultAddress' style={{visibility:this.state.defaultVisibility}}>默认地址</button>
            </li>
        )
    }

    //点击方块事件
    onClick = () => {
        this.props.handleChange('chosen', this.props.index);
    };

    alter = () => {
        const object = {
            name: this.state.name,
            address: this.state.address,
            phoneNum: this.state.phoneNum,
            index: this.props.index
        };
        this.props.handleChange('alter', object);
        this.setState({visible: false});
    };

    delete = () => {
        this.props.handleChange('decrement', this.props.index);
    };

    showModal = () => {
        this.setState({visible: true});
    };

    setIndex = () => {
        this.props.handleChange('check', this.props.index);
    };

    cancel = () => {
        this.setState({visible: false})
    };

    handleChangeName = (e) => {
        if (e.target.value === '') {
            this.setState({alertName: '姓名不可以为空'});
        } else {
            this.setState({name: e.target.value, alertName: ''});
        }
    };

    handleChangeAddress = (e) => {
        if (e.target.value === '') {
            this.setState({alertAddress: '地址不可以为空'});
        } else {
            this.setState({name: e.target.value, alertAddress: ''});
        }
    };

    handleChangeNum = (e) => {
        const number = Number(e.target.value);
        if (typeof(number) === 'number' && !isNaN(number)) {
            if (e.target.value.length === 11) {
                this.setState({phoneNum: e.target.value, alertNumber: ''});
            } else {
                this.setState({alertNumber: '请输入11位手机号'});
            }
        } else {
            this.setState({alertNumber: '请输入正确格式的手机号码'});
        }
    };
}
export default Li;
import React from 'react';
import { Row, Col } from 'antd';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal
} from 'antd';
import { Router, Route, Link, browserHistory } from 'react-router'
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
        };
    };

    componentWillMount() {
        //组件加载之前，如果已经登陆了（localStorage里面的userid不为空）
        if (localStorage.userid != '') {
            this.setState({
                hasLogined: true,
                userNickName: localStorage.userNickName,
                userid: localStorage.userid
            });
        }
    };

    setModalVisible(value) {
        this.setState({ modalVisible: value });
    };
    handleClick(e) {//点击菜单切换
        if (e.key == "register") {
            this.setState({ current: 'register' });
            this.setModalVisible(true);
        } else {
            {
                this.setState({ current: e.key });
            }
        }
    };
    handleSubmit(e) {
        //页面开始向 API 进行提交数据
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?" +
            "action=" + this.state.action +
            "&username=" + formData.userName +
            "&password=" + formData.password +
            "&r_userName=" + formData.r_userName +
            "&r_password=" + formData.r_password +
            "&r_confirmPassword=" + formData.r_confirmPassword,
            myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({ userNickName: json.NickUserName, userid: json.UserId });
                localStorage.userid = json.UserId;
                localStorage.userNickName = json.NickUserName;
            });
        if (this.state.action == 'login') {
            //已经登陆成功了。就把state里面的hasLogined设为true
            this.setState({ hasLogined: true });
        }
        message.success("请求成功！");
        this.setModalVisible(false);
    };

    login() {
        this.setModalVisible(true);
    };
    logout() {
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({ hasLogined: false });
    };
    render() {
        let { getFieldDecorator } = this.props.form;
        const userShow = this.state.hasLogined
            ?
            <Link to={`/usercenter`}>
                <Icon type="user" />
            </Link>
            :
            <Icon type="bars" onClick={this.login.bind(this)} />

        return (
            <div id="mobileheader">
                <header>
                    <img src="./src/images/logo.png" alt="logo" />
                    <span>React News</span>
                    {userShow}
                </header>

                <Modal title="用户中心" wrapClassName="vertical-center-modal"
                    visible={this.state.modalVisible}
                    onCancel={() => this.setModalVisible(false)}
                    onOk={() => this.setModalVisible(false)}
                    okText="关闭"
                >
                    <Tabs type="card">
                        {/* 登陆tabPane */}
                        <TabPane tab="登录" key="1">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    {getFieldDecorator('userName')
                                        (
                                        <Input placeholder="请输入您的账号" />
                                        )
                                    }

                                </FormItem>
                                <FormItem label="密码">
                                    {getFieldDecorator('password')
                                        (
                                        <Input type="password" placeholder="请输入您的密码" />
                                        )
                                    }

                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>

                        {/* 注册tabPane */}
                        <TabPane tab="注册" key="2">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    {getFieldDecorator('r_userName')
                                        (
                                        <Input placeholder="请输入您的账号" />
                                        )
                                    }
                                </FormItem>
                                <FormItem label="密码">
                                    {getFieldDecorator('r_password')
                                        (
                                        <Input type="password" placeholder="请输入您的密码" />
                                        )
                                    }
                                </FormItem>
                                <FormItem label="确认密码">
                                    {getFieldDecorator('r_confirmPassword')
                                        (
                                        <Input type="password" placeholder="请再次输入您的密码" />
                                        )
                                    }
                                </FormItem>
                                <Button type="primary" htmlType="submit" >注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    };
}

export default MobileHeader = Form.create({})(MobileHeader);
import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Modal } from 'antd';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {
    Tabs,
    message,
    Form,
    Input,
    Button,
    Checkbox,
    Card,
    notification,
    Upload
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import { Router, Route, Link, browserHistory } from 'react-router'
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
export default class MobileUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            // 用户收藏的json
            usercollection: '',
            //用户评论的json
            usercomments: '',
            previewImage: '',
            previewVisible: false
        };
    };
    handleCancel() {
        this.setState({ previewVisible: false })
    }
    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc" +
            "&userid=" + localStorage.userid,
            myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({ usercollection: json });
            });
        //评论的获取
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments" +
            "&userid=" + localStorage.userid,
            myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({ usercomments: json });
            });
    };
    render() {

        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            listType: 'picture-card',
            defaultFileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    state: 'done',
                    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504862553&di=0f918781186b53a186f1f8c5bf95176c&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.qq1234.org%2Fuploads%2Fallimg%2F150520%2F8_150520090626_9.jpg',
                    thumbUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504862553&di=0f918781186b53a186f1f8c5bf95176c&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.qq1234.org%2Fuploads%2Fallimg%2F150520%2F8_150520090626_9.jpg'
                }
            ],
            onPreview: (file) => {
                this.setState({ previewImage: file.url, previewVisible: true });
            }
        };

        const { usercollection } = this.state;
        const usercollectionList = usercollection.length ?
            usercollection.map((uc, index) => (
                <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            :
            '您还没有收藏任何的新闻，快去收藏一些新闻吧。';

        //用户评论的转换
        const { usercomments } = this.state;
        const usercommentsList = usercomments.length ?
            usercomments.map((comment, index) => (
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                    extra={
                        <a target="_blank" href={`/#/details/${comment.uniquekey}`}>
                            查看
                        </a>}
                >
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '您还没有发表过任何评论。';
        return (
            <div>
                <MobileHeader />
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <Row>
                                    <Col span={24}>
                                        {usercollectionList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <Row>
                                    <Col span={24}>
                                        {usercommentsList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div class="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus" />
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                        <img alt="预览" src={this.state.previewImage} />
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MobileFooter />
            </div>
        );
    };
}
import React from 'react';
import { Row, Col } from 'antd';
import { Tabs, Carousel } from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_product';
export default class PCNewsContainer extends React.Component {
    render() {

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        };

        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class="container">
                        <div class="leftContainer">
                            <div class="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg" /></div>
                                    <div><img src="./src/images/carousel_2.jpg" /></div>
                                    <div><img src="./src/images/carousel_3.jpg" /></div>
                                    <div><img src="./src/images/carousel_4.jpg" /></div>
                                </Carousel>
                            </div>

                            <PCNewsImageBlock
                                count={9}
                                type="guoji"
                                width="400px"
                                cartTitle="国际头条"
                                imageWidth="112px"
                            />



                        </div>
                        <Tabs class="tabs_news">
                            <TabPane tab="头条新闻" key="1">
                                <PCNewsBlock count={20} type="top" width="100%" bordered="false" />
                            </TabPane>
                            <TabPane tab="国际" key="2">
                                <PCNewsBlock count={20} type="guoji" width="100%" bordered="false" />
                            </TabPane>
                        </Tabs>

                        <Tabs class="tabs_product">
                            <TabPane tab="ReactNews 产品" key="1">
                                <PCProduct />
                            </TabPane>
                        </Tabs>
                        <PCNewsImageBlock
                            count={8}
                            type="yule"
                            width="100%"
                            cartTitle="娱乐"
                            imageWidth="125px"
                        />

                        <PCNewsImageBlock
                            count={16}
                            type="guonei"
                            width="100%"
                            cartTitle="国内"
                            imageWidth="125px"
                        />
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    };
}
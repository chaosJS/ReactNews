webpack-dev-server --contentbase src --inline --hot

###react的响应式布局组件###

    1. 安装：npm install react-responsive@1.2.1 --save
    2. 引入包：import MediaQuery from 'react-responsive';
    3. 使用：      
                <MediaQuery query='(min-device-width:1224px)'> //最小设备宽为1224px，则显示PCIndex组件
                    <PCIndex />
                </MediaQuery>

注意表单组件getFieldDecorator的使用：
{getFieldDecorator('r_confirmPassword')
    (
    <Input type="password" placeholder="请再次输入您的密码" />
    )
}

### HTML to jsx###
    主要把直接拷贝过来的html转成可以用的jsx

###网站性能优化###
著名的雅虎军规
yslow

###react 的其他一些较好用的组件###
react-touch-loader 刷新加载更多
npm install react-pull-to-refresh@1.0.6 --save 上拉刷新加载更多
功能在移动端国内新闻

还有一个redux的小示例：redux-demo

import React, { Component, Fragment, useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    Row, Col,
    Button,
    CardHeader,
    CardBody,
    Progress,
    TabContent,
    TabPane,
    Card,
    CardTitle
} from 'reactstrap';
import { Table } from 'react-bootstrap';

import {
    AreaChart, Area, Line,
    ResponsiveContainer,
    Bar,
    BarChart,
    ComposedChart,
    CartesianGrid,
    Tooltip,
    LineChart,
    XAxis,
    YAxis
} from 'recharts';

import {
    faAngleUp,
    faArrowRight,
    faArrowUp,
    faArrowLeft,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {getIncome, getNumOfUser, getNumOfProduct, getNumOfBlog, getNumOfOrder} from '../../../../redux/actions/reportAction';
import { connect } from "react-redux";
import Paypal from '../../../../pages/Paypal'

const BasicDashboard = ({getIncome, getNumOfUser, income, numOfUser, getNumOfProduct, numOfProduct, getNumOfBlog, numOfBlog, getNumOfOrder, numOfOrder}) => {

    useEffect(() => {
        getIncome();
        getNumOfUser();
        getNumOfProduct();
        getNumOfBlog();
        getNumOfOrder();
      }, []);

    const [data, setData] = useState([]);
    const [name, setName] = useState('');

    const handleIncomeClick = (e) =>{
        e.preventDefault();
        setName("Doanh Thu");
        setData( [
            { name: 'Tháng 1', uv: income.Thang1 },
            { name: 'Tháng 2', uv: income.Thang2},
            { name: 'Tháng 3', uv: income.Thang3},
            { name: 'Tháng 4', uv: income.Thang4},
            { name: 'Tháng 5', uv: income.Thang5},
            { name: 'Tháng 6', uv: income.Thang6},
            { name: 'Tháng 7', uv: income.Thang7},
            { name: 'Tháng 8', uv: income.Thang8},
            { name: 'Tháng 9', uv: income.Thang9},
            { name: 'Tháng 10', uv: income.Thang10},
            { name: 'Tháng 11', uv: income.Thang11},
            { name: 'Tháng 12', uv: income.Thang12},
        ])
    }

    const handleNumOfOrderClick = (e) =>{
        e.preventDefault();
        setName("Đơn Hàng");
        setData( [
            { name: 'Tháng 1', uv: numOfOrder.Thang1},
            { name: 'Tháng 2', uv: numOfOrder.Thang2},
            { name: 'Tháng 3', uv: numOfOrder.Thang3},
            { name: 'Tháng 4', uv: numOfOrder.Thang4},
            { name: 'Tháng 5', uv: numOfOrder.Thang5},
            { name: 'Tháng 6', uv: numOfOrder.Thang6},
            { name: 'Tháng 7', uv: numOfOrder.Thang7},
            { name: 'Tháng 8', uv: numOfOrder.Thang8},
            { name: 'Tháng 9', uv: numOfOrder.Thang9},
            { name: 'Tháng 10', uv: numOfOrder.Thang10},
            { name: 'Tháng 11', uv: numOfOrder.Thang11},
            { name: 'Tháng 12', uv: numOfOrder.Thang12}
        ])
    }

    const activeTab1 = "11";
    return (
        <Fragment>
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <div>
                    <Row>
                        <Col md="12" lg="6">
                            <Card className="mb-3">
                                <CardHeader className="card-header-tab">
                                    <div className="card-header-title">
                                        <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </i>
                                            Báo Cáo Thống Kê
                                        </div>
                                </CardHeader>
                                <TabContent activeTab={activeTab1}>
                                    <TabPane tabId="11">
                                        <CardBody className="pt-2">
                                            <Row className="mt-3">
                                                <Col md="6">
                                                    <div className="widget-content">
                                                        <div className="widget-content-outer">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <div className="widget-numbers fsize-3 text-muted">
                                                                        {numOfUser ? numOfUser.Tong:0}
                                                                        </div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="text-muted opacity-6">
                                                                        Users
                                                                        </div>
                                                                </div>
                                                            </div>
                                                            <div className="widget-progress-wrapper mt-1">
                                                                <Progress
                                                                    className="progress-bar-sm progress-bar-animated-alt"
                                                                    color="danger"
                                                                    value="100" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="widget-content">
                                                        <div className="widget-content-outer">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <div className="widget-numbers fsize-3 text-muted">
                                                                        {numOfProduct}
                                                                        </div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="text-muted opacity-6">
                                                                        Products
                                                                        </div>
                                                                </div>
                                                            </div>
                                                            <div className="widget-progress-wrapper mt-1">
                                                                <Progress
                                                                    className="progress-bar-sm progress-bar-animated-alt"
                                                                    color="success"
                                                                    value="100" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="divider mt-4" />
                                            <Row>
                                                <Col md="6">
                                                    <div className="widget-content">
                                                        <div className="widget-content-outer">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <div className="widget-numbers fsize-3 text-muted">
                                                                        {numOfBlog}
                                                                        </div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="text-muted opacity-6">
                                                                        Blogs
                                                                        </div>
                                                                </div>
                                                            </div>
                                                            <div className="widget-progress-wrapper mt-1">
                                                                <Progress
                                                                    className="progress-bar-sm progress-bar-animated-alt"
                                                                    color="primary"
                                                                    value="100" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="widget-content">
                                                        <div className="widget-content-outer">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <div className="widget-numbers fsize-3 text-muted">
                                                                        {numOfOrder.Tong}
                                                                        </div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="text-muted opacity-6">
                                                                        Orders
                                                                        </div>
                                                                </div>
                                                            </div>
                                                            <div className="widget-progress-wrapper mt-1">
                                                                <Progress
                                                                    className="progress-bar-sm progress-bar-animated-alt"
                                                                    color="warning"
                                                                    value="100" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>

                                    </TabPane>

                                </TabContent>
                            </Card>

                        </Col>
                        <Col md="12" lg="6">
                            <Row>

                                <Col md="6">
                                    <div className="card mb-3 bg-midnight-bloom widget-chart text-white card-border">
                                        <div className="icon-wrapper rounded">
                                            <div className="icon-wrapper-bg bg-white opacity-10" />
                                            <i className="lnr-screen icon-gradient bg-warm-flame" />
                                        </div>
                                        <div className="widget-numbers">
                                        {numOfUser ? numOfUser.Tong:0}
                                            </div>
                                        <div className="widget-subheading">
                                            Số lượng Khoản Tạo
                                            </div>
                                        <div className="widget-description text-white">
                                            <FontAwesomeIcon className="text-white opacity-5" icon={faAngleUp} />
                                            <span className="pr-1"></span>

                                        </div>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="card mb-3 bg-love-kiss widget-chart card-border">
                                        <div className="widget-chart-content text-white">
                                            <div className="icon-wrapper rounded-circle">
                                                <div className="icon-wrapper-bg bg-white opacity-4" />
                                                <i className="lnr-cog" />
                                            </div>
                                            <div className="widget-numbers">
                                                5
                                                </div>
                                            <div className="widget-subheading">
                                                Tổng Views
                                                </div>
                                            <div className="widget-description">
                                                <FontAwesomeIcon className="text-white opacity-5" icon={faAngleUp} />
                                                <span className="text-white"></span>
                                            </div>
                                        </div>

                                    </div>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card className="mb-3">
         
                        <CardTitle>Doanh Thu</CardTitle>
                        {/* {loading?<Loader/>:( */}
                        <Table striped bordered hover responsive className='table-sm mb-0' bordered>
                            <thead>
                                <tr align="center">
                                    <th>#</th>
                                    <th>Tháng 1</th>
                                    <th>Tháng 2</th>
                                    <th>Tháng 3</th>
                                    <th>Tháng 4</th>
                                    <th>Tháng 5</th>
                                    <th>Tháng 6</th>
                                    <th>Tháng 7</th>
                                    <th>Tháng 8</th>
                                    <th>Tháng 9</th>
                                    <th>Tháng 10</th>
                                    <th>Tháng 11</th>
                                    <th>Tháng 12</th>
                                    <th>Tổng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr align="center" >
                                    <th scope="row"><button type="submit" onClick={handleIncomeClick}>Doanh Thu</button></th>
                                    <td>{(income.Thang1*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{(income.Thang2*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{(income.Thang3*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{(income.Thang4*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{(income.Thang5*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{(income.Thang6*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{(income.Thang7*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{(income.Thang8*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{(income.Thang9*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{(income.Thang10*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{(income.Thang11*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{(income.Thang12*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{(income.Tong*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                </tr>
                                <tr align="center" >
                                    <th scope="row"><button type="submit" onClick={handleNumOfOrderClick}>Số Lượng Đơn Hàng</button></th>
                                    <td>{numOfOrder ? numOfOrder.Thang1:0}</td>
                                    <td>{numOfOrder ? numOfOrder.Thang2:0}</td>
                                    <td>{numOfOrder ? numOfOrder.Thang3:0}</td>
                                    <td>{numOfOrder ? numOfOrder.Thang4:0}</td>
                                    <td>{numOfOrder ? numOfOrder.Thang5:0}</td>
                                    <td>{numOfOrder ? numOfOrder.Thang6:0}</td>
                                    <td>{numOfOrder ? numOfOrder.Thang7:0}</td>
                                    <td>{numOfOrder ? numOfOrder.Thang8:0}</td>
                                    <td>{numOfOrder ? numOfOrder.Thang9:0}</td>
                                    <td>{numOfOrder ? numOfOrder.Thang10:0}</td>
                                    <td>{numOfOrder ? numOfOrder.Thang11:0}</td>
                                    <td>{numOfOrder ? numOfOrder.Thang12:0}</td>
                                    <td>{numOfOrder ? numOfOrder.Tong:0}</td>
                                </tr>
                            </tbody>
                        </Table>
                        {/* )} */}
                    </Card>
                    </Col>
                    </Row>
                    <Row>
                    <Col md="12">
                            <Card className="mb-3">
                        <div className="widget-chart p-0">
                            <div className="widget-chart-content">
                                <div className="widget-description mt-0 text-warning">
                                    <span >Biểu Đồ {name}</span>
                                </div>
                            </div>
                            <ResponsiveContainer height={500} width={1000} >
                                <AreaChart data={data} margin={{ top: 50, right: 50, left: 50, bottom: 50 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <defs>
                                        <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="10%" stopColor="var(--warning)" stopOpacity={0.7} />
                                            <stop offset="90%" stopColor="var(--warning)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip />
                                    <Area type='monotoneX' dataKey='uv' stroke='var(--warning)' strokeWidth={2} fillOpacity={1}
                                        fill="url(#colorPv2)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        </Card>
                        </Col>
                    </Row>

                </div>
            </ReactCSSTransitionGroup>
        </Fragment>
    )

}
const mapStateToProps = state => {
    return {
      income: state.incomeData.money,
      numOfUser: state.numOfUserData.number,
      numOfProduct: state.numOfProductData.sum,
      numOfBlog: state.numOfBlogData.sum,
      numOfOrder: state.numOfOrderData.number
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      getIncome: () => {
        dispatch(getIncome());
      },
      getNumOfUser: () => {
        dispatch(getNumOfUser());
      },
      getNumOfProduct: () => {
        dispatch(getNumOfProduct());
      },
      getNumOfBlog: () => {
        dispatch(getNumOfBlog());
      },
      getNumOfOrder: () => {
        dispatch(getNumOfOrder());
      }
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(BasicDashboard);

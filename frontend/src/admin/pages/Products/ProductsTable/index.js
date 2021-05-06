import React, {Fragment, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import PropTypes from "prop-types";
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { Button, Table } from 'react-bootstrap';
import { connect, useDispatch , useSelector} from "react-redux";
import {AiFillCheckCircle,AiOutlineCloseCircle,AiFillEdit,AiOutlineDelete, AiFillPlusSquare} from 'react-icons/ai'
import {LinkContainer} from 'react-router-bootstrap'
import {deleteProduct, listProducts} from '../../../../redux/actions/productActions'
import {PRODUCT_DELETE_RESET} from '../../../../redux/constants/productConstants'
import Loader from '../../Components/Loader';

const ProductsTable = ({ listProductsInfo, successDelete, deleteProduct, loading, userLogin, history, listProducts }) => {
  const dispatch=useDispatch();
  const handleDelete=async(id)=>{
    deleteProduct(id);
  }
  useEffect(()=>{
    if(successDelete) {
      dispatch({type:PRODUCT_DELETE_RESET})
    }
    if(!userLogin){
      // window.location.href('/')
      history.push('/');
    }
    listProducts();
  
  },[dispatch, successDelete])
    return (
        <Fragment>
            {/* <PageTitle
                heading="Regular Tables"
                subheading="Tables are the backbone of almost all web applications."
                icon="pe-7s-drawer icon-gradient bg-happy-itmeo"
            /> */}
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Row>
                    <Col lg="12">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>Danh Sách Sản Phẩm</CardTitle>
                                <LinkContainer to={`product/create`}>
                                <Button variant='success' className='pull-right' >
                                              <AiFillPlusSquare/>
                                          </Button>
                                          </LinkContainer>
                                          <br></br><br></br><br></br>
                                {loading?<Loader/>:(
                                <Table striped bordered hover responsive className='table-sm mb-0' bordered>
                                <thead>
                                  <tr align="center">
                                    <th>#</th>
                                    <th>Tên</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th>isNew</th>
                                    <th>Giảm giá (%)</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {listProductsInfo && listProductsInfo.map((product, key) => {

                                    return(
                                    <tr align="center" >
                                      <th scope="row">{key}</th>
                                      <td >{product.name}</td>
                                      <td>{product.quantity}</td>
                                      <td>{(product.price*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                      <td>{product.isNew?<AiFillCheckCircle/>:<AiOutlineCloseCircle/>}</td>
                                      <td>{product.discount}</td>
                                      <td>{product.category}</td>
                                      <td><img src={product.image} width="100" height="50" /></td>
                                      
                                      <td>
                                      <LinkContainer to={`/product/edit/${product.id}`}>
                                          <Button variant='light' className='btn-sm'>
                                              <AiFillEdit/>
                                          </Button>
                                          </LinkContainer>
                                        &nbsp;&nbsp;&nbsp;
                                        <Button variant='danger' className='btn-sm' onClick={()=>handleDelete(product.id)}>
                                              <AiOutlineDelete/>
                                          </Button>
                                      </td>
                                    </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
};

const mapStateToProps = state => {
  return {
    successDelete: state.productDeleteData.success,
    loading: state.productData.loading,
    userLogin: state.loginData.userInfo,
    listProductsInfo: state.productData.products
  };
};
ProductsTable.propTypes = {
  listProducts: PropTypes.object,
};
const mapDispatchToProps = dispatch => {
  
  return {
    deleteProduct: (id) => {
      dispatch(deleteProduct(id));
    },
    listProducts: () => {
      dispatch(listProducts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);

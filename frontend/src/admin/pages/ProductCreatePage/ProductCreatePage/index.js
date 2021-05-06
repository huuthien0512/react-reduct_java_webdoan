import React, { Fragment, useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { connect, useDispatch, useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap'
import { detailProduct, updateProduct, createProduct } from '../../../../redux/actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../../../redux/constants/productConstants'
import Loader from '../../Components/Loader';
import {
  Button, Form,
  FormGroup, Label,
  Input, FormText,
  Row, Col,
  Card, CardBody,
  CardTitle, CustomInput
} from 'reactstrap';
import Message from '../../../../components/Message';

const ProductCreatePage = ({ match, userLogin, history, productInfo, detailProduct, updateProduct, successUpdate, loading, createProduct, successCreate, error}) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [isNew, setIsNew] = useState('');
  const [rating, setRating] = useState('');
  const [saleCount, setSaleCount] = useState('');
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState([]);

  const handleCreate = async () => {

    const newProductInfo = {
      name: name,
      quantity: quantity,
      price: price,
      discount: discount,
      isNew: isNew,
      saleCount: 0,
      category: [category],
      image: [image],
      description: description,
    }
    createProduct(newProductInfo);
    console.log(successUpdate);
  }

  useEffect(() => {
    successCreate = false
    error = ""
  }, [])

  useEffect(() => {
    if (successCreate) {
      alert("Tạo sản phẩm thành công")
      history.push('/products');
    }

  }, [successCreate])

  useEffect(() => {
    if (!userLogin) {
      history.push('/');
    }
    if (productInfo) {
      setName(productInfo.name);
      setPrice(productInfo.price);
      setQuantity(productInfo.quantity);
      setDiscount(productInfo.discount);
      setIsNew(productInfo.isNew);
      setSaleCount(productInfo.saleCount);
      setCategory(productInfo.category);
      setImage(productInfo.image);
      setDescription(productInfo.description)
    }
  }, [productInfo])
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
            <Col md="6">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Thông Tin Sản Phẩm</CardTitle>
                  {error && error? <Message variant="danger">{error}</Message> : ""}
                  {loading ? <Loader /> : (
                    <Form>
                      <FormGroup>
                        <Label for="name">Tên</Label>
                        <Input type="text"
                          name="name"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="quantity">Số lượng</Label>
                        <Input type="text"
                          name="quantity"
                          id="quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder="" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="price">Giá</Label>
                        <Input type="text"
                          name="price"
                          id="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="price">Giảm giá</Label>
                        <Input type="text"
                          name="discount"
                          id="discount"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                          placeholder="" />
                      </FormGroup>
                      <FormGroup>
                        <Label>Mới</Label>
                        <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="saleCount">Số lượng đã bán</Label>
                        <Input type="text"
                          name="saleCount"
                          id="saleCount"
                          value={saleCount}
                          onChange={(e) => setSaleCount(e.target.value)}
                          placeholder=""
                          readOnly
                         />
                      </FormGroup>
                      <FormGroup>
                        <Label for="category">Category</Label>
                        <Input type="text"
                          name="category"
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          placeholder="" />
                      </FormGroup>

                      <FormGroup>
                        <Label for="description">Mô tả</Label>
                        <Input type="textarea"
                          name="description"
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="" />
                      </FormGroup>
                      <Button type="button" onClick={handleCreate} color="primary" className="mt-1">Tạo</Button>
                    </Form>
                  )}
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="main-card mb-3">
                <CardBody>
                {loading ? <Loader /> : (
                  <>
                  <img src={image} width="500" height="250" />
                  <br></br><br></br><br></br>
                  <FormGroup>
                    <Label for="image">Hình ảnh</Label>
                    <Input type="text"
                      name="image"
                      id="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder=""
                      readOnly />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input type="file" name="file" id="exampleFile" onChange={(e) => setImage('/assets/img/foods/' + e.target.files[0].name)}/>
                  </FormGroup>
                  </>
                )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    productInfo: state.productDetailData.product,
    loading: state.productCreateData.loading,
    userLogin: state.loginData.userInfo,
    listUsersInfo: state.listUsersData.users,
    successCreate: state.productCreateData.success,
    error: state.productCreateData.error 
  };
};
ProductCreatePage.propTypes = {
  listUsers: PropTypes.object,
};
const mapDispatchToProps = dispatch => {

  return {
    createProduct: (newProductInfo) => {
      dispatch(createProduct(newProductInfo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreatePage);

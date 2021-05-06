import React, { Fragment, useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { connect, useDispatch, useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap'
import { detailProduct, updateProduct } from '../../../../redux/actions/productActions'
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

const ProductEditPage = ({ match, userLogin, history, productInfo, detailProduct, updateProduct, successUpdate, loading }) => {
  const productId = match.params.id;
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

  const onFileChange = e => {
    
    // Update the state
    this.setState({ selectedFile: e.target.files[0] });
  
  };
  
  // On file upload (click the upload button)
  const onFileUpload = () => {
  
    // Create an object of formData
    const formData = new FormData();
  
    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
  
    // Details of the uploaded file
    console.log(this.state.selectedFile);
  
    // Request made to the backend api
    // Send formData object
  //  axios.post("api/uploadfile", formData);
  };


  const handleEdit = async () => {
    const newInfo = {
      name: name,
      quantity: quantity,
      price: price,
      discount: discount,
      isNew: isNew,
      saleCount: saleCount,
      category: category,
      image: image,
      description: description,
      idCurrent: userLogin.id
    }
    updateProduct(newInfo, productId);
    console.log(successUpdate);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    detailProduct(productId);
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      alert("Thay đổi thông tin thành công")
      history.push('/products');
    }

  }, [successUpdate])

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
                          readOnly />
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
                      <Button type="button" onClick={handleEdit} color="primary" className="mt-1">Cập Nhật</Button>
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
    loading: state.productUpdateData.loading,
    userLogin: state.loginData.userInfo,
    listUsersInfo: state.listUsersData.users,
    successUpdate: state.productUpdateData.success
  };
};
ProductEditPage.propTypes = {
  listUsers: PropTypes.object,
};
const mapDispatchToProps = dispatch => {

  return {
    detailProduct: (id) => {
      dispatch(detailProduct(id));
    },
    updateProduct: (newInfo, productId) => {
      dispatch(updateProduct(newInfo, productId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditPage);

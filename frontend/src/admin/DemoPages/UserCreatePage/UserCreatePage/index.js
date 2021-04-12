import React, {Fragment,useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { connect, useDispatch , useSelector} from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'
import {getInfo, register} from '../../../../redux/actions/userActions'
import {USER_DELETE_RESET} from '../../../../redux/constants/userConstants'
import Loader from '../../Components/Loader';
import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle,CustomInput
} from 'reactstrap';
import Message from '../../../../components/Message';

const UserCreatePage = ({match, userLogin, history, userInfo, getInfo, register, successRegister, loading, error, message}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [telephone, setTelephone] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  
  const handleCreate=(e)=>{
    if (username != "" && password != "" && email!= ""){
      e.preventDefault();
      const newUserInfo={
        username:username,
        firstname:firstname,
        lastname:lastname,
        email:email,
        telephone:telephone,
        isAdmin: isAdmin,
      }
      register(newUserInfo);
      
      
    }
    
  }
  useEffect(() => {
    successRegister = false
    error = ""
  }, [])
  useEffect(() => {
    if (successRegister){
      alert("Tạo tài khoản thành công")
      history.push('/users');
    
    }
  }, [successRegister])
  
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
                          <CardTitle>Tạo User</CardTitle>
                          {error && error? <Message variant="danger">{error}</Message> : ""}
                          {loading?<Loader/>:(
                          <form>
                          <FormGroup>
                                  <Label for="username">Username</Label>
                                  <Input type="text"
                                  name="username"
                                  id="username"
                                  value={username}
                                  onChange={(e)=>setUsername(e.target.value)}
                                  placeholder=""
                                  required/>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="username">Password</Label>
                                  <Input type="password"
                                  name="password"
                                  id="password"
                                  value={password}
                                  onChange={(e)=>setPassword(e.target.value)}
                                  placeholder=""
                                  required/>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="email">Email</Label>
                                  <Input type="email"
                                  name="email"
                                  id="email"
                                  value={email}
                                  onChange={(e)=>setEmail(e.target.value)}
                                  placeholder=""
                                  required/>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="firstname">Họ và tên đệm</Label>
                                  <Input type="text"
                                  name="firstname"
                                  id="firstname"
                                  value={firstname}
                                  onChange={(e)=>setFirstname(e.target.value)}
                                  placeholder=""/>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="lastname">Tên</Label>
                                  <Input type="text"
                                  name="lastname"
                                  id="lastname"
                                  value={lastname}
                                  onChange={(e)=>setLastname(e.target.value)}
                                  placeholder=""/>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="telephone">Điện thoại</Label>
                                  <Input type="text"
                                  name="telephone"
                                  id="telephone"
                                  value={telephone}
                                  onChange={(e)=>setTelephone(e.target.value)}
                                  placeholder=""/>
                              </FormGroup>
                                    
                                    <FormGroup>
                                    <CardTitle>Admin</CardTitle>
                                      <input type="checkbox" checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}/>
                                    </FormGroup>
                              <Button type="button" onClick={handleCreate} color="primary" className="mt-1">Tạo</Button>
                          </form>
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
    userInfo: state.userData.userInfo,
    loading: state.registerData.loading,
    userLogin: state.loginData.userInfo,
    listUsersInfo: state.listUsersData.users,
    successRegister: state.registerData.success,
    error: state.registerData.error,
    message: state.registerData.message
  };
};
UserCreatePage.propTypes = {
  listUsers: PropTypes.object,
};
const mapDispatchToProps = dispatch => {
  
  return {
    getInfo: (id) => {
      dispatch(getInfo(id));
    },
    register: (newUserInfo) => {
      dispatch(register(newUserInfo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreatePage);

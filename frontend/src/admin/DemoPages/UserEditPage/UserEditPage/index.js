import React, {Fragment,useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { connect, useDispatch , useSelector} from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'
import {getInfo, updateProfileByAdmin} from '../../../../redux/actions/userActions'
import {USER_UPDATE_RESET} from '../../../../redux/constants/userConstants'
import Loader from '../../Components/Loader';
import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle,CustomInput
} from 'reactstrap';

const UserEditPage = ({match, userLogin, history, userInfo, getInfo, updateProfileByAdmin, successUpdate, loading}) => {
  const userId = match.params.id;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [telephone, setTelephone] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  
  const handleEdit=(e)=>{
    e.preventDefault();
    const newInfo={
      username:username,
      firstname:firstname,
      lastname:lastname,
      email:email,
      telephone:telephone,
      isAdmin: isAdmin,
      idCurrent: userLogin.id
    }
    updateProfileByAdmin(newInfo, userId);
  }
  const dispatch=useDispatch();

  useEffect(()=>{
    getInfo(userId);
    if (successUpdate){
      dispatch({type:USER_UPDATE_RESET})
      alert("Thay đổi thông tin thành công")
      history.push('/users');
   }
  },[successUpdate])

  useEffect(()=>{
    if(!userLogin){
      history.push('/');
    }
    if(userInfo){
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      setFirstname(userInfo.firstname);
      setLastname(userInfo.lastname);
      setTelephone(userInfo.telephone);
      setIsAdmin(userInfo.isAdmin);
    }
  },[userInfo])

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
                          <CardTitle>Thông Tin User</CardTitle>
                          {loading?<Loader/>:(
                          <Form>
                          <FormGroup>
                                  <Label for="username">Username</Label>
                                  <Input type="text"
                                  name="username"
                                  id="username"
                                  value={username}
                                  onChange={(e)=>setUsername(e.target.value)}
                                  placeholder=""/>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="email">Email</Label>
                                  <Input type="email"
                                  name="email"
                                  id="email"
                                  value={email}
                                  onChange={(e)=>setEmail(e.target.value)}
                                  placeholder=""/>
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
                              <Button type="button" onClick={handleEdit} color="primary" className="mt-1">Cập Nhật</Button>
                          </Form>
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
    loading: state.userAdminUpdateData.loading,
    userLogin: state.loginData.userInfo,
    listUsersInfo: state.listUsersData.users,
    successUpdate: state.userAdminUpdateData.success
  };
};
UserEditPage.propTypes = {
  listUsers: PropTypes.object,
};
const mapDispatchToProps = dispatch => {
  
  return {
    getInfo: (id) => {
      dispatch(getInfo(id));
    },
    updateProfileByAdmin: (newInfo, userId) => {
      dispatch(updateProfileByAdmin(newInfo, userId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPage);

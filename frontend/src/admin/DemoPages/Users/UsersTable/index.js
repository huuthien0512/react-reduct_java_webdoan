import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import PropTypes from "prop-types";
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { Button, Table } from 'react-bootstrap';
import { connect } from "react-redux";
import {AiFillCheckCircle,AiOutlineCloseCircle,AiFillEdit,AiOutlineDelete} from 'react-icons/ai'
import {LinkContainer} from 'react-router-bootstrap'

const UsersTable = ({listUsers}) => {
  const handleDelete=async(id)=>{
    //deleteUser(id);
  }
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
                                <CardTitle>Danh Sách Tài Khoản</CardTitle>
                                <Table striped bordered hover responsive className='table-sm mb-0' bordered>
                                <thead>
                                  <tr align="center">
                                    <th>#</th>
                                    <th>Họ và tên đệm</th>
                                    <th>Tên</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Điện Thoại</th>
                                    <th>isAdmin</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {listUsers.map(user => {
                                    return(
                                    <tr align="center">
                                      <th scope="row">1</th>
                                      <td>{user.firstname}</td>
                                      <td>{user.lastname}</td>
                                      <td>{user.username}</td>
                                      <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                      <td>{user.telephone}</td>
                                      <td>{user.isAdmin?<AiFillCheckCircle/>:<AiOutlineCloseCircle/>}</td>
                                      <td>
                                        <LinkContainer to={`/user/${user._id}/edit`}>
                                          <Button variant='light' className='btn-sm'>
                                              <AiFillEdit/>
                                          </Button>
                                        </LinkContainer>
                                        &nbsp;&nbsp;&nbsp;
                                        <Button variant='danger' className='btn-sm' onClick={()=>handleDelete(user._id)}>
                                              <AiOutlineDelete/>
                                          </Button>
                                      </td>
                                    </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
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
    listUsers: state.listUsersData.users
  };
};
UsersTable.propTypes = {
  listUsers: PropTypes.object
};


export default connect(mapStateToProps)(UsersTable);

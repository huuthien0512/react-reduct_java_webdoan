import React, { Fragment } from "react";
import ReactDOM from "react-dom"
import { connect } from "react-redux";
import { useHistory } from 'react-router';

import {
  Row, Col,
  CardHeader,
  Card
} from 'reactstrap';
import { updateStatus } from "../redux/actions/orderActions";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function Paypal({ updateStatus }) {
  const history = useHistory();
  const totalPrice = localStorage.getItem('totalPrice');
  const orderId = localStorage.getItem('orderId');
  console.log(orderId)
  if (!totalPrice) {
    history.push('/');
  }
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: localStorage.getItem('totalPrice'),
          },
        },
      ],
    })
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function () {
      alert('Thanh toán thành công !');
      localStorage.removeItem('totalPrice');
      //localStorage.removeItem('orderId');
      updateStatus(orderId);
      history.push('/');
    });
  };

  return (

    <Fragment>

      <br></br>
      <Row>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Col md="12" lg="6">
          <Card className="mb-3">
            <br></br>
            <CardHeader className="card-header-tab">
              <div className="card-header-title">
                <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </i>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        Chọn Phương Thức Paypal
                                        </div>
            </CardHeader>
            <PayPalButton
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    updateStatus: (id) => {
      dispatch(updateStatus(id));
    }
  };
};
export default connect(null, mapDispatchToProps)(Paypal);
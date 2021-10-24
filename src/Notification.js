import { Toast, ToastContainer } from "react-bootstrap";
import React from "react";
class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ToastContainer position={"top-end"} className="p-3">
        <Toast
          show={this.props.openNotification}
          onClose={this.props.closeNotification}
          style={{ float: "right", backgroundColor: "#0d6efd" }}
        >
          <Toast.Header>
            <img
              src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
              className="rounded-circle me-2"
              width="40px"
              alt=""
            />
            <strong className="me-auto">Notification</strong>
            <small>1 sec ago</small>
          </Toast.Header>
          <Toast.Body>{this.props.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    );
  }
}

export default Notification;

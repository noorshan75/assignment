import { Modal, Button, Form } from "react-bootstrap";
import React from "react";
class AddUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      url: "",
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true})
    const data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email
    };
    const url = `https://reqres.in/api/users`;
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    //calling add user endpoint
    fetch(url, requestOption)
      .then((res) => res.json())
      .then((result) =>
        setTimeout(() => {
          this.props.addModals({
            data: result,
            response: "added",
            message: "New user has been added successfully"
          });
        }, 2000)
      );
  }
  render() {
    return (
      <Modal
        show={this.props.addModal}
        onHide={() => this.props.addModals({ response: "closed" })}
      >
        <Modal.Header
          closeButton={() => this.props.addModals({ response: "closed" })}
        >
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please fill all the following fields
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="Enter first name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Enter last name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginLeft:'40%'}}>
              Submit
            </Button>
            <Form.Group className="text-center">
            {this.state.loading &&
              <div class="spinner-border m-5" role="status">
              <span class="sr-only"></span>
            </div>}
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
export default AddUserModal;

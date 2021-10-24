import { Modal, Button, Form } from "react-bootstrap";
import React from "react";
class EditUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.editUser.id,
      firstName: this.props.editUser.first_name,
      lastName: this.props.editUser.last_name,
      email: this.props.editUser.email,
      index: this.props.index,
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({loading:true})
    const data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email
    };
    const { id } = this.state;
    const url = `https://reqres.in/api/users/${id}`;
    const requestOption = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    //calling update endpoint
    fetch(url, requestOption)
      .then((res) => res.json())
      .then((result) =>
        setTimeout(() => {
          this.props.editModals(
            {
              data: result,
              response: "updated",
              message: "User has been updated successfully"
            },
            this.state.index
          );
        }, 2000)
      ).catch(error=>{
        setTimeout(() => {
        this.props.editModals(
            {
              response: "notupdated",
              message: "Error occured while updating user"
            },
            this.state.index
          );
        }, 2000)
      });
  }
  render() {
    return (
      <Modal
        show={this.props.editModal}
        onHide={() => this.props.editModals({ response: "closed" })}
      >
        <Modal.Header
          closeButton={() => this.props.editModals({ response: "closed" })}
        >
          <Modal.Title>Update User</Modal.Title>
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
              <div className="spinner-border m-5" role="status">
              <span className="sr-only"></span>
            </div>}
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
export default EditUserModal;

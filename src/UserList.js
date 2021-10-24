import React from "react";
import "./styles.css";
import { Edit, Delete, User } from "react-feather";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import Notification from "./Notification";
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataList: [],
      addModal: false,
      editmodal: false,
      notification: false,
      message: "",
      editUser: null
    };
    this.fetchUserList = this.fetchUserList.bind(this);
    this.renderUserList = this.renderUserList.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  fetchUserList() {
    const url = `https://reqres.in/api/users?page=1`;
    const requestOptions = {
      method: "GET"
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => this.setState({ userDataList: result.data }));
  }
  componentDidMount() {
    this.fetchUserList();
  }
  openAddModal(item) {
    const { userDataList } = this.state;
    if (item.response === "added") {
      this.setState({
        notification: true,
        message: item.message
      });
      userDataList.push(item.data);
      this.setState({ userDataList: userDataList });
      setTimeout(() => {
        this.setState({ notification: false });
      }, 2000);
    }
    this.setState({ addModal: !this.state.addModal });
  }
  openEditModal(item, index) {
    const { userDataList } = this.state;
    //update
    if (item.response === "updated") {
      this.setState({
        notification: true,
        message: item.message
      });
      //replacing old details to new details
      userDataList[index] = item.data;
      this.setState({ userDataList: userDataList });
      setTimeout(() => {
        this.setState({ notification: false });
      }, 2000);
    }
    //not updated
    if(item.response === "notupdated"){
      this.setState({
        notification: true,
        message: item.message
      });
       setTimeout(() => {
        this.setState({ notification: false });
      }, 2000);
    }
    this.setState({
      editmodal: !this.state.editmodal,
      editUser: item,
      index: index
    });
  }
  deleteUser(id, index) {
    const { userDataList } = this.state;
    const url = `https://reqres.in/api/users/${id}`;
    const requestOptions = {
      method: "DELETE"
    };
    //calling delete endpoint
    fetch(url, requestOptions).then((res) => {
      if (res.status === 204) {
        //removing element from array
        userDataList.splice(index, 1);
        this.setState({
          userDataList: userDataList,
          notification: true,
          message: "User has been deleted successfully"
        });
        setTimeout(() => {
          this.setState({ notification: false });
        }, 2000);
      }
    }).catch(error=>{
      this.setState({
          notification: true,
          message: "Error occured while deleting user."
        });
      setTimeout(() => {
          this.setState({ notification: false });
        }, 2000);
    });
  }
  renderUserList(item, index) {
    return (
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>{item.first_name}</td>
        <td>{item.last_name}</td>
        <td>{item.email}</td>
        <td>
          <img
            src={"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
            className="rounded-circle"
            alt="Error"
            width="40px"
          />
        </td>
        <td>
          <a href="#" onClick={() => this.openEditModal(item, index)}>
            <Edit />
          </a>
          <a href="#" onClick={() => this.deleteUser(item.id, index)}>
            <Delete color="red" />
          </a>
        </td>
      </tr>
    );
  }
  render() {
    const { userDataList, editUser, editmodal, addModal } = this.state;
    return (
      <div className="container">
        <nav class="navbar navbar-light bg-success bg-gradient mt-2">
          <span class="navbar-brand mb-0 h1">
            <User /> BOTBABA TEAM
          </span>
          <button className="mb-3 btn btn-success" onClick={this.openAddModal}>
            Add User
          </button>
        </nav>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First_Name</th>
              <th scope="col">Last_Name</th>
              <th scope="col">Email</th>
              <th scope="col">Picture</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{userDataList && userDataList.map(this.renderUserList)}</tbody>
        </table>
        <AddUserModal
          addModal={addModal}
          addModals={(item) => this.openAddModal(item)}
        />
        {console.log(editUser)}
        {editUser && editmodal && (
          <EditUserModal
            editModal={this.state.editmodal}
            editModals={(item, index) => this.openEditModal(item, index)}
            editUser={this.state.editUser}
            index={this.state.index}
          />
        )}
        <Notification
          openNotification={this.state.notification}
          closeNotification={() => this.setState({ notification: false })}
          message={this.state.message}
        />
      </div>
    );
  }
}
export default UserList;

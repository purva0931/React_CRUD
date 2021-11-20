import React, { useEffect, useState } from "react";
// import axios from "axios";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddEditUser from "./AddEditUser";
import Swal from "sweetalert2";
import API from "../../api/API";
// import "./UserList.css";

const useStyles = makeStyles((theme) => ({
  editIcon: {
    color: theme.palette.primary.main,
    marginRight: 10,
    cursor: "pointer",
  },
  deleteIcon: {
    color: theme.palette.secondary.main,
    cursor: "pointer",
  },
}));

const UserList = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [operation, setOperation] = useState("add");
  const [initialUser, setInitialUser] = useState({});

  const loadUsers = () => {
    API.get("/users")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addHandler = () => {
    setOpenDialog(true);
    setOperation("add");
    setInitialUser({ name: "", age: 0, city: "" });
  };

  const editHandler = (index) => {
    const user = users[index];
    setInitialUser(user);
    setOpenDialog(true);
    setOperation("edit");
  };

  const closeHandler = (e) => {
    setOpenDialog(false);
  };

  const deleteHandler = (index) => {
    const user = users[index];
    Swal.fire({
      title: "Are you sure want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        API.delete(`/users/${user.id}`)
          .then((response) => {
            console.log(response);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            loadUsers();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const columns = [
    {
      label: "ID",
      name: "id",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "Name",
      name: "name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "City",
      name: "city",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Age",
      name: "age",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "Action",
      name: "action",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => (
          <>
            <span
              className={classes.editIcon}
              onClick={() => {
                editHandler(dataIndex);
              }}
            >
              <EditIcon />
            </span>
            <span
              className={classes.deleteIcon}
              onClick={() => deleteHandler(dataIndex)}
            >
              <DeleteIcon />
            </span>
          </>
        ),
      },
    },
  ];
  return (
    <>
      <h2>User List</h2>
      <AddEditUser
        open={openDialog}
        handleClose={closeHandler}
        operation={operation}
        initialUser={initialUser}
        loadUsers={loadUsers}
      />
      <Button variant="contained" color="primary" onClick={addHandler}>
        Add +
      </Button>
      <MUIDataTable columns={columns} data={users} />
      {/* <table>
        <tr>
          <th>Sr. No.</th>
          <th>ID</th>
          <th>Name</th>
          <th>City</th>
          <th>Age</th>
        </tr>

        {Array.isArray(users) &&
          users.map((user, i) => (
            <tr key={user.id}>
              <td>{i + 1}</td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.city}</td>
              <td>{user.age}</td>
            </tr>
          ))}
      </table> */}
    </>
  );
};

export default UserList;

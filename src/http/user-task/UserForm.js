import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Container, Grid } from "@material-ui/core";
// import axios from "axios";
import API from "../../api/API";

const UserForm = ({ operation, initialUser, handleClose, loadUsers }) => {
  const [user, setUser] = useState({ name: "", age: 0, city: "" });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const clickHandler = (e) => {
    e.preventDefault();

    if (operation == "edit") {
      API.put(`/users/${user.id}`, user)
        .then((response) => {
          alert("User Updated");
          loadUsers();
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          alert("Couldn't Update");
        });
    } else {
      API.post(`/users`, user)
        .then((response) => {
          alert("User Created");
          loadUsers();
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          alert("user not created");
        });
    }
  };

  useEffect(() => {
    if (initialUser) setUser(initialUser);
  }, [initialUser]);
  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              name="name"
              label="Name"
              value={user.name}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              name="age"
              label="Age"
              value={user.age}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              name="city"
              label="City"
              value={user.city}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={clickHandler} variant="contained" color="primary">
              {operation == "edit" ? "Update" : "Create"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserForm;

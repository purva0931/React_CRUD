import React from "react";
import { DialogTitle, DialogContent, Dialog } from "@material-ui/core";
import UserForm from "./UserForm";
const AddEditUser = ({ open, handleClose, operation, ...props }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {operation == "edit" ? "Edit" : "Create"} User
        </DialogTitle>
        <DialogContent>
          <UserForm
            operation={operation}
            handleClose={handleClose}
            {...props}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditUser;

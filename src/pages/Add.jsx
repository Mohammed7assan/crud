import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const intialvalue = {
  Category: "",
  subCategory: "",
  priority: "",
  Agent: "",
  Requester: "",
  SRNumber: "",
};
const Add = () => {
  const navigate = useNavigate();
  const [err, setError] = useState("");

  const [user, setUser] = useState(intialvalue);
  const { Category, subCategory, priority, Agent, Requester, SRNumber } = user;
  const onvalueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const adduserFun = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:5000/user`, user).then((data) => {
      console.log(data);
      toast.success("تم الأضافة بنجاح");
    });
    setUser(intialvalue);
      setError("");
    //navigate("/");
  };
  const schema = Yup.object({
    Category: Yup.string().required("Category is required"),
    subCategory: Yup.string().required("subCategory is required"),
    priority: Yup.string().required("priority is required"),
    Agent: Yup.string().required("Agent is required"),
    Requester: Yup.string().required("Requester is required"),
    SRNumber: Yup.string().required("SRNumber is required"),
  });
  const formik = useFormik({
    initialValues: intialvalue,
    validationSchema: schema,
    onSubmit: adduserFun,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <FormLabel>Add</FormLabel>
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextField
              label="Category"
              id="Category"
              name="Category"
              value={Category}
              onChange={(e) => {
                onvalueChange(e);
              }}
        onBlur={formik.handleBlur}
            />
              {formik.errors.Category ? (
        <p className="alert alert-danger">{formik.errors.Category}</p>
      ) : (
        ""
      )}
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="subCategory">SubCategory</InputLabel>
              <Select
                labelId="subCategory"
                id="subCategory"
                name="subCategory"
                value={subCategory}
                label="subCategory"
                onChange={(e) => {
                  onvalueChange(e);
                }}
              >
                <MenuItem value="Web">Web</MenuItem>
                <MenuItem value="Mobile">Mobile</MenuItem>
                <MenuItem value="DeskTop">DeskTop</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="priority">priority</InputLabel>
              <Select
                labelId="priority"
                id="priority"
                name="priority"
                value={priority}
                label="priority"
                onChange={(e) => {
                  onvalueChange(e);
                }}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="low">low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div className="col-md-6">
            <TextField
              fullWidth
              value={Agent}
              id="Agent"
              name="Agent"
              label="Agent"
              variant="outlined"
              onChange={(e) => {
                onvalueChange(e);
              }}
            />

            <br />
            <br />

            <TextField
              fullWidth
              id="Requester"
              name="Requester"
              label="Requester"
              variant="outlined"
              value={Requester}
              onChange={(e) => {
                onvalueChange(e);
              }}
            />
            <br />
            <br />
            <TextField
              fullWidth
              id="SRNumber"
              label="SRNumber"
              value={SRNumber}
              name="SRNumber"
              variant="outlined"
              onChange={(e) => {
                onvalueChange(e);
              }}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <Stack direction="row" spacing={2}>
            <Button onClick={adduserFun} variant="contained" type="submit" >
              SUBMIT
            </Button>

            <Button variant="contained" color="error">
              Reset
            </Button>
            <Link className="nav-link" to="/">
              <Button variant="contained" color="error">
                Back
              </Button>
            </Link>
          </Stack>
        </div>
      </form>
      <br />
    </>
  );
};

export default Add;

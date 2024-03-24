import React, { useEffect, useState } from "react";
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

let intialvalue = {
  Category: "",
  subCategory: "",
  priority: "",
  Agent: "",
  Requester: "",
  SRNumber: "",
};

const Add = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});


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
    //navigate("/");
  };
  async function formRegister(values) {
    console.log(values);

    return axios.post("http://localhost:5000/user", values).then((data) => {
      console.log(data);
      toast.success("تم الأضافة بنجاح");
        console.log(intialvalue);
        setUser(intialvalue);
        navigate('/');
      }).catch((err) => {
        console.log(err);
        setErrors(err.response.data.message)
      })

  }

  const schema = Yup.object({
    Category: Yup.string().required("يرجى إدخال التصنيف"),
     subCategory: Yup.string().required(" يرجى إدخال التصنيف الفرعى"),
     Agent: Yup.string().required("يرجى إدخال العميل "),
     SRNumber: Yup.string().required("يرجى ادخال رقم الطلب "),
  });
  const formik = useFormik({
    initialValues: intialvalue,
    validationSchema: schema,
    onSubmit: (values) => {
      formRegister(values)
    }

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
              value={formik.values.Category}
              onChange={formik.handleChange}
        onBlur={formik.handleBlur}
            />
             {formik.touched.Category&&formik.errors.Category ? <div className="alert alert-danger">{formik.errors.Category}</div> : ""}
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="subCategory">SubCategory</InputLabel>
              <Select
                labelId="subCategory"
                id="subCategory"
                name="subCategory"
                label="subCategory"
                value={formik.values.subCategory}
              onChange={formik.handleChange}
        onBlur={formik.handleBlur}
              >
                <MenuItem value="Web">Web</MenuItem>
                <MenuItem value="Mobile">Mobile</MenuItem>
                <MenuItem value="DeskTop">DeskTop</MenuItem>
              </Select>
            </FormControl>
            {formik.touched.subCategory&&formik.errors.subCategory ? <div className="alert alert-danger">{formik.errors.subCategory}</div> : ""}

            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="priority">priority</InputLabel>
              <Select
                labelId="priority"
                id="priority"
                name="priority"
              
                label="priority"
                value={formik.values.priority}
              onChange={formik.handleChange}
        onBlur={formik.handleBlur}
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
              id="Agent"
              name="Agent"
              label="Agent"
              variant="outlined"
              value={formik.values.Agent}
              onChange={formik.handleChange}
        onBlur={formik.handleBlur}
            />
             {formik.touched.Agent&&formik.errors.Agent ? <div className="alert alert-danger">{formik.errors.Agent}</div> : ""}

            <br />
            <br />

            <TextField
              fullWidth
              id="Requester"
              name="Requester"
              label="Requester"
              variant="outlined"
              value={formik.values.Requester}
              onChange={formik.handleChange}
        onBlur={formik.handleBlur}
            />
                         {formik.touched.Requester&&formik.errors.Requester? <div className="alert alert-danger">{formik.errors.Requester}</div> : ""}

            <br />
            <br />
            <TextField
              fullWidth
              id="SRNumber"
              label="SRNumber"
              name="SRNumber"
              variant="outlined"
              value={formik.values.SRNumber}
              onChange={formik.handleChange}
        onBlur={formik.handleBlur}
            />
        {formik.touched.SRNumber&&formik.errors.SRNumber? <div className="alert alert-danger">{formik.errors.SRNumber}</div> : ""}
          </div>
        </div>

        <br />
        <div className="row">
          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit" >
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

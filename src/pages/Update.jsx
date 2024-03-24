import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";

import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
const intialvalue = {
 avatar: "",
Category: "",
SRNumber: "",
Requester: "",
Status: "",
  
 };
function Update() {
  const [data, setData] = useState(intialvalue);
  const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value,
        });
      };
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    loadUserdetails();
  }, [id]);
  const loadUserdetails = () => {
    axios
      .get(`http://localhost:5000/user/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const editUseDetails = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/user/${id}`, data).then((res) => {
      console.log(res);
      navigate("/");
      toast.success("تم التعديل بنجاح");
    });
  };
  return (
    <>
      <div>
        <br></br>
        <form>
          <div className="row">
            <FormControl>

              <Typography>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 2, width: "100ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Edit
                  </FormLabel>
                  <div className="row">
                    <div className="col-md-6 text-align-center">
                    <TextField
                        fullWidth
                        label="avatar"
                        id="avatar"
                        name="avatar"
                        variant="outlined"
                        value={data.avatar}
                        onChange={handleInputChange}

                      />
                      <br />
                      <br />
                      <TextField
                        fullWidth
                        label="Category"
                        id="Category"
                        name="Category"
                        variant="outlined"
                        value={data.Category}
                        onChange={handleInputChange}

                      />
                      <br />

                      <br />
                    </div>
                    <div className="col-md-6">
                      <TextField
                        fullWidth
                        label="SRNumber"
                        id="SRNumber"
                        name="SRNumber"
                        variant="outlined"
                        value={data.SRNumber}
                        onChange={handleInputChange}

                      />
                      <br />
                      <br />
                      <TextField
                        fullWidth
                        label="Requester"
                        id="Requester"
                        name="Requester"
                        variant="outlined"
                        value={data.Requester}
                        onChange={handleInputChange}

                      />
                    </div>
                  </div>
                  <br />
                  <div className="div">
                    <FormControl fullWidth>
                      <InputLabel id="Status">Status</InputLabel>
                      <Select
                        labelId="Status"
                        id="Status"
                        name="Status"
                        value={data.Status}
                        label="Status"
                        onChange={handleInputChange}

                      >
                        <MenuItem value="Assigned">Assigned</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Closed">Closed</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <br />
                  <div className="row">
                    <Stack direction="row" spacing={2}>
                      <Button onClick={editUseDetails} variant="contained">
                        SUBMIT
                      </Button>

                      <Link className="nav-link" to="/">
                        <Button variant="contained" color="error">
                          Back
                        </Button>
                      </Link>
                    </Stack>
                  </div>
                </Box>
              </Typography>
            </FormControl>
          </div>
        </form>
        <br />
      </div>
    </>
  );
}

export default Update;
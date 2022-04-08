
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Control from "../controls/Control";
import * as Yup from "yup";
import { Grid, Box } from "@mui/material";
import NotesService from "../../service/NotesService";

export default function NotesForm({ notesCode, loading, setLoading,setFormSubmitted, setPopupClose,setCode }) {


  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const [formValues, setFormValues] = useState(initialValues);
  

  const handelSubmit = async (values) => {
    if(validationSchema){
      if(notesCode){
        await NotesService.update(notesCode, values).then((response) => {
                console.log("update");
                setPopupClose(false);
                setCode();
                console.log(setCode());
              });
      }else{
        await NotesService.create(values).then((response) => {
          console.log("crete");
          setPopupClose(false);
          setCode();
  });
      }

    }

      setFormSubmitted((prev) => prev + 1);
  };

  useEffect(() => {
    if (notesCode != null) {
      getDataByCode(notesCode);
    } else {
      setLoading(true);
    }
  }, [notesCode]);
  

  const getDataByCode = async (notesCode) => {
    await NotesService.getByCode(notesCode)
      .then((response) => {
        setFormValues(response.note);
        setLoading(true);
        console.log("from data", response.note);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>

      {loading ? (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, onSubmitProps) => {
            await handelSubmit(values);
            onSubmitProps.resetForm();
          }}
        >
          {() => (
            <Form>
              <Box sx={{ flexGrow: 1 }} spacing={2}>
                <Grid container spacing={2} alignItems="center" justify="center">
                  <Grid item xs={12}>
                    <Control.Input name="title" label="Title" />
                  </Grid>
                  <Grid item xs={12}>
                    <Control.Input name="description" multiline rows={4} label="Description" />
                  </Grid>

                  <Grid item xs={12}>
                  
                    <Control.Button type="submit" text="Submit" color="success"  spacing={2}/>
                    
                   <Control.Button type="reset" text="Reset" spacing={2} />
                  
                    
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
       ) : (
        "Loading"
      )} 
    
    </>
  )
}

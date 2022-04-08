
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Control from "../controls/Control";
import * as Yup from "yup";
import { Grid, Box } from "@mui/material";
import NotesService from "../../service/NotesService";

export default function NotesForm({ electedNoteCode, loading, setLoading,setFormSubmitted }) {


  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const [notesValues, setNotesValues] = useState(initialValues);
  const today = new Date().toISOString().split("T")[0];

  const handelSubmit = async (values) => {
    if(validationSchema){
      if(electedNoteCode){
        await NotesService.update(electedNoteCode, values).then((response) => {
                console.log("update");
              });
      }else{
        await NotesService.create(values).then((response) => {
          console.log("crete");
  });
      }

    }

      setFormSubmitted((prev) => prev + 1);
  };

  useEffect(() => {
    if (electedNoteCode != null) {
      getNoteByCode(electedNoteCode);
    } else {
      setLoading(true);
    }
  }, [electedNoteCode]);
  

  const getNoteByCode = async (code) => {
    await NotesService.getByCode(code)
      .then((response) => {
        setForm(response.note);
        setLoading(true);
        console.log("from data", response.note);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>

      {/* {loading ? ( */}
        <Formik
          initialValues={notesValues}
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
      {/* ) : (
        "Loading"
      )} */}
    
    </>
  )
}

import React, {useState, useEffect} from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  Container,
} from '@material-ui/core';
import NewsPost from './NewsPost';


function App() {

  /*constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        entries: []
    }
  }*/

  const onSubmit = values => {
    console.log(JSON.stringify(values));
    createEntry(values);
  };

  const validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Required';
    }
    if (!values.text) {
      errors.text = 'Required';
    }
    return errors;
  };

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEntry();
  }, []);

  function getEntry() {
    fetch(`${process.env.REACT_APP_ENTRIES_API}`)
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log('Got data '+ data);
        data = JSON.parse(data);
        //console.log('parsed data' + JSON.stringify(data));
        setEntries(data);
      });
  }

  

  function createEntry(values) {
    let author = values.author;
    let text = values.text;
    let title = values.title;
    let imageURL = values.imageURL;

    console.log("testing image url");
    console.log(JSON.stringify({author, text, title, imageURL}));
    
    fetch(`${process.env.REACT_APP_ENTRIES_API}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({author, text, title, imageURL}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getEntry();
      });
  }
  function deleteEntry() {
    let id = prompt('Enter entry id');
    fetch(`${process.env.REACT_APP_ENTRIES_API}/entries/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getEntry();
      });
  }
  return (
    <div>
      {entries ? entries.length : 'There is no entry data available'}
      <br />
      <button onClick={createEntry}>Add entry</button>
      <br />
      <button onClick={deleteEntry}>Delete entry</button>
      <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
        <CssBaseline />
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          SOLSTICE News Page
        </Typography>

        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={4}>
                    <Field
                      fullWidth
                      name="author"
                      component={TextField}
                      type="text"
                      label="Enter Author Name"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      fullWidth
                      required
                      name="title"
                      component={TextField}
                      type="text"
                      label="Enter Post Title"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="text"
                      component={TextField}
                      required
                      multiline
                      rows={18}
                      label="Enter Post Text"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="imageURL"
                      type="text"
                      component={TextField}
                      label="URL for Image"
                    />
                  </Grid>

                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Submit
                  </Button>
                  </Grid>
                </Grid>
              </Paper>
              <pre>{JSON.stringify(values)}</pre>
            </form>
          )}
        />
      </div>
      <Container maxWidth="md" >
        <div>
          {
            entries.map((postdata) => {
              return(
              <NewsPost key={postdata.postid}
                title={postdata.title}
                date={postdata.date_created}
                author={postdata.author}
                text={postdata.text}
                imageURL={postdata.image_url}
             >
              </NewsPost>)
            })
          }
        </div>
        <Button
          variant="contained"
          color="secondary"
          align="right"
          style={{align: "right", margin: "20px"}}
        >
          Delete Entry
        </Button>
      </Container>

    </div>
  );
}

export default App;

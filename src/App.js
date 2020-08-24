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
    console.log(JSON.stringify(values, 0, 2));
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
    console.log(JSON.stringify({author, text, title}))
    
    fetch(`${process.env.REACT_APP_ENTRIES_API}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({author, text, title}),
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
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </div>
      <Container maxWidth="md" >
        <div>
          {
            entries.map((postdata) => {
              return(
              <NewsPost 
                title={postdata.title}
                date={postdata.date}
                author={postdata.author}
                text={postdata.text}
             >
              </NewsPost>)
            })
          }
        </div>
        <NewsPost 
          title={"This is a News Title"} 
          date={"8/2/20"} 
          author={"Kate Carlton"}
          text = {"Up unpacked friendly ecstatic so possible humoured do. Ample end might folly quiet one set spoke her. We no am former valley assure. Four need spot ye said we find mile. Are commanded him convinced dashwoods did estimable forfeited. Shy celebrated met sentiments she reasonably but. Proposal its disposed eat advanced marriage sociable. Drawings led greatest add subjects endeavor remember. Principles one yet assistance you met impossible. Continual delighted as elsewhere am convinced unfeeling. Introduced stimulated attachment no by projection. To loud lady whom my mile sold four. Need miss all four case fine age tell. He families my pleasant speaking it bringing it thoughts. View busy dine oh in knew if even. Boy these along far own other equal old fanny charm. Difficulty invitation put introduced see middletons nor preference. Gay one the what walk then she. Demesne mention promise you justice arrived way. Or increasing to in especially inquietude companions acceptance admiration. Outweigh it families distance wandered ye an. Mr unsatiable at literature connection favourable. We neglected mr perfectly continual dependent."} 
        />
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

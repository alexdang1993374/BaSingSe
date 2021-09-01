import React, { useState, useEffect } from "react";
import InputField from "./components/InputField";
import Logins from "./components/Logins";
import seed from "./Seeder";
import { generator } from "./passwordGenerator/passwordGenerator";
import { useStyles } from "./Style";
import { Button, Grid } from "@material-ui/core";
import axios from "axios";

function App() {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [logins, setLogins] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/login")
      .then((res) => {
        setLogins(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // setLogins(seed());
  }, []);

  const generate = () => {
    setPassword(generator());
    console.log(logins);
  };

  const createPassword = () => {
    axios
      .post("http://localhost:5000/login", {
        website: website,
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid>
      <Button
        className={classes.generator}
        variant="contained"
        color="primary"
        onClick={generate}
      >
        generate password
      </Button>
      <InputField
        password={password}
        usename={username}
        website={website}
        setPassword={setPassword}
        setUsername={setUsername}
        setWebsite={setWebsite}
      />
      <Button
        className={classes.generator}
        variant="contained"
        color="secondary"
        onClick={createPassword}
      >
        submit
      </Button>
      <Logins logins={logins} />
    </Grid>
  );
}

export default App;

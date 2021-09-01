import React, { useState } from "react";
import InputField from "./components/InputField";
import { generator } from "./passwordGenerator/passwordGenerator";
import { useStyles } from "./Style";
import { Button } from "@material-ui/core";
import axios from "axios";

function App() {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");

  const generate = () => {
    setPassword(generator());
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
    <div>
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
      ></InputField>
      <Button
        className={classes.generator}
        variant="contained"
        color="secondary"
        onClick={createPassword}
      >
        submit
      </Button>
    </div>
  );
}

export default App;

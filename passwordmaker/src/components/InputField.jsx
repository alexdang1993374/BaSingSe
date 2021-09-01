import { TextField } from "@material-ui/core";
import { useStyles } from "../Style";

export default function InputField({
  password,
  username,
  website,
  setPassword,
  setUsername,
  setWebsite,
}) {
  const classes = useStyles();

  return (
    <div className={classes.word}>
      <TextField
        onChange={(event) => {
          setWebsite(event.target.value);
        }}
        id="standard-basic"
        label="Website"
        value={website}
      />
      <br></br>
      <TextField
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        id="standard-basic"
        label="Username"
        value={username}
      />
      <br></br>
      <TextField
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        id="standard-basic"
        label="Password"
        value={password}
      />
    </div>
  );
}

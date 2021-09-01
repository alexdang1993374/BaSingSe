import { useStyles } from "../Style";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@material-ui/core";

const Logins = ({ logins }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Website</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Password</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logins.map((login) => (
            <TableRow>
              <TableCell component="th" scope="row">
                <Button variant="outlined" color="secondary">
                  fuck
                </Button>
                {"    "}
                {login.website ? login.website : "none"}
              </TableCell>
              <TableCell align="right">
                {login.username ? login.username : "none"}
              </TableCell>
              <TableCell align="right">
                {login.password ? (
                  <div>
                    <CopyToClipboard text={login.password}>
                      <Button variant="outlined">Copy to Clipboard</Button>
                    </CopyToClipboard>
                    {"    "}
                    {login.password}
                  </div>
                ) : (
                  "none"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Logins;

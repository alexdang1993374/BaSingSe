import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { string } from "yargs";
import { LoginData } from "../App";

import clipboardIcon from "../clipboard.svg";
import trash from "../trash.svg";

import "./Table.css";

interface Props {
  logins: LoginData[];
  onClick: (website: string) => void;
}

const Table: React.FC<Props> = ({ logins, onClick }) => (
  <table>
    <thead>
      <tr>
        <th>Website</th>
        <th>Username</th>
        <th className="password-column">Password</th>
      </tr>
    </thead>
    <tbody>
      {logins.map((login) => (
        <tr>
          <td>
            {/* <a href="#" role="button" className="icon-button" onClick={() => onClick(login.id)}>
              <img src={trash} alt="trash" />
            </a>{" "} */}
            {login?.website || "none"}
          </td>
          <td>{login?.username || "none"}</td>
          <td className="password-column">
            {" "}
            {login.password ? (
              <div>
                {login.password}
                <CopyToClipboard text={login.password}>
                  <a href="#" role="button" className="icon-button">
                    <img src={clipboardIcon} alt="clipboardIcon" />
                  </a>
                </CopyToClipboard>
              </div>
            ) : (
              "none"
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;

import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Table from './components/Table'
import { generator } from "./utils/PasswordGenerator"
import TextInput from './components/TextInput';
import axios from 'axios';

export interface LoginData {
  id: string;
  website: string;
  username: string;
  password: string;
} 

function App() {
  const [password, setPassword] = useState('')
  const [website, setWebsite] = useState('')
  const [username, setUsername] = useState('')
  const [logins, setLogins] = useState<LoginData[]>([
    {id: '123', website:'poop', username: 'scoop', password: 'a3Z$OVd%#eK6*3]w28MNbw10{?U0p$rI'},
    {id: '133', website:'poop', username: 'scoop', password: 'bananarama'},
    {id: '153', website:'poop', username: 'scoop', password: 'bananarama'},
  ])
  // const [reset, setReset] = useState(false);

  useEffect(() => {
   getLogins()
  }, []);

  const createPassword =  async () => {
    await axios
      .post("http://localhost:5000/login", {
        website,
        username,
        password,
      })
      .then((res) => {
        console.log("created login")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLogins = async () => {
      await axios
       .get("http://localhost:5000/login")
       .then((res) => {
         console.log('got logins')
         setLogins(res.data.data);
       })
       .catch((error) => {
         console.log(error);
       });
  }

  const createAndUpdateLogins = async () => {
    await createPassword()

    await getLogins()
  }

  const deleteLogin = (path: string) => {
    axios
      .delete("http://localhost:5000/login/" + path)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        const index = logins.findIndex(({id}) => id === path);
        const updatedLogins = [...logins.slice(0, index), ...logins.slice(index + 1)];

        setLogins(updatedLogins)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const onWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => setWebsite(event?.target.value)
  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event?.target.value)
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event?.target.value)

  return (
    <div className="app">
      <TextInput onChange={onWebsiteChange} value={website} label="Website" id="website" placeholder="google.com" />
      <TextInput onChange={onUsernameChange} value={username}  label="Username" id="username" placeholder="alexdang"/>
      <TextInput onChange={onPasswordChange} value={password} label="Password" id="password" placeholder="123456789"/>
      <section className="button-group" >
        <Button onClick={() => setPassword(generator())} text="Generate Password"/>
        <Button isSecondary={true} onClick={createAndUpdateLogins} text="Create Login"/>
      </section>

      <Table logins={logins} onClick={deleteLogin} />
    </div>
  );
}

export default App;

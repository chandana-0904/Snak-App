//Login-Form for theuser to acces the Chat rooms and chats
import { useState } from 'react';
import axios from 'axios';
//ProjectId in ChatEngine.io
const projectID = '166ab109-acd2-49e3-aead-888039d9fc04';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
//Handling the submitted Username and Password in LoginForm by user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      //axios call to get data through the provided projectId, username and password from API of ChatEngine.io
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });
      //mapping username and password provided by user in LoginForm
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('Oops, incorrect credentials.');
    }
  };
//LoginForm with input fields to enter username, pasaword and submit button
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Snak App</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span> 'Snak' In</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default LoginForm;

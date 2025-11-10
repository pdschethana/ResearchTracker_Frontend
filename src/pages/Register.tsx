/*import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../services/auth.service';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signup({ username, password, role });
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f3f4f6' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: 360 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 16 }}>Register</h2>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 12 }} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 12 }} required />
        <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 12 }}>
          <option value="MEMBER">Member</option>
          <option value="PI">PI</option>
          <option value="ADMIN">Admin</option>
        </select>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        {message && <div style={{ color: 'green', marginBottom: 8 }}>{message}</div>}
        <button type="submit" style={{ width: '100%', padding: 10, background: '#16a34a', color: '#fff', border: 'none', borderRadius: 4 }}>Register</button>
        <p style={{ textAlign: 'center', marginTop: 12, fontSize: 14 }}>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;*/   

/*import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../services/auth.service';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const msg = await signup({ username, password, role });
      setMessage(msg || 'Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f3f4f6' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: 360 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 16 }}>Register</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        >
          <option value="MEMBER">Member</option>
          <option value="PI">PI</option>
          <option value="ADMIN">Admin</option>
        </select>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        {message && <div style={{ color: 'green', marginBottom: 8 }}>{message}</div>}
        <button type="submit" style={{ width: '100%', padding: 10, background: '#16a34a', color: '#fff', border: 'none', borderRadius: 4 }}>
          Register
        </button>
        <p style={{ textAlign: 'center', marginTop: 12, fontSize: 14 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;*/  
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/auth.service";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await signup({ username, password, role });

      // ✅ Safely handle both plain strings and objects
      const msg =
        typeof res === "string"
          ? res
          : res?.message || "Registration successful! Redirecting to login...";

      setMessage(msg);

      // Redirect after short delay
      setTimeout(() => navigate("/login"), 1200);
    } catch (err: any) {
      console.error(err);
      // ✅ handle object or string errors properly
      const errMsg =
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message || "Registration failed";
      setError(errMsg);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: 360,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 16 }}>Register</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        >
          <option value="MEMBER">Member</option>
          <option value="PI">PI</option>
          
          <option value="ADMIN">Admin</option>
        </select>

        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        {message && (
          <div style={{ color: "green", marginBottom: 8 }}>{message}</div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: 12, fontSize: 14 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;



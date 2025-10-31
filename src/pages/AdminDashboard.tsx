/*import React from "react";
import { useAuth } from "../context/AuthContext";

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1>Admin Dashboard</h1>
        <div>
          <span style={{ marginRight: 12 }}>{user?.username} ({user?.role})</span>
          <button onClick={logout} style={{ padding: "6px 10px" }}>Logout</button>
        </div>
      </header>
      <div>
        <p>Welcome, admin! Here you can manage the system.</p>
        {/* Add admin-specific UI here *//*}
      </div>
    </div>
  );
};

export default AdminDashboard;*/  

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Table, Button, Navbar, Nav, Container, Spinner, Card } from "react-bootstrap";

// Interfaces
interface User {
  id: string;
  username: string;
  role: string;
  fullName?: string;
}

interface Project {
  id: string;
  title: string;
  summary: string;
  status: string;
  pi?: User;
  tags?: string;
  startDate?: string;
  endDate?: string;
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

  // Fetch all projects
  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await axiosInstance.get<Project[]>("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await axiosInstance.get<User[]>("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    // Only allow ADMIN
    if (user?.role !== "ADMIN") {
      navigate("/login");
    }
    fetchProjects();
    fetchUsers();
  }, [user]);

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Research Tracker - Admin</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Item>
              <span style={{ color: "#fff", marginRight: 16 }}>
                {user?.username} ({user?.role})
              </span>
            </Nav.Item>
            <Button variant="outline-light" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container style={{ marginTop: 24 }}>
        {/* Projects Section */}
        <h2>Projects</h2>
        {loadingProjects ? (
          <Spinner animation="border" />
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>PI</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.status}</td>
                  <td>{project.pi?.username || "N/A"}</td>
                  <td>{project.tags}</td>
                  <td>
                    <Button size="sm" variant="primary" className="me-2">
                      Edit
                    </Button>
                    <Button size="sm" variant="danger">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Users Section */}
        <h2 className="mt-5">Users</h2>
        {loadingUsers ? (
          <Spinner animation="border" />
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.fullName || "N/A"}</td>
                  <td>{u.role}</td>
                  <td>
                    <Button size="sm" variant="primary" className="me-2">
                      Edit
                    </Button>
                    <Button size="sm" variant="danger">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Quick Add Project Card */}
        <Card className="mt-5">
          <Card.Body>
            <Card.Title>Add New Project</Card.Title>
            <Button variant="success">Add Project</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminDashboard;


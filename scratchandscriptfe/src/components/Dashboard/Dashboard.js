import React, { useEffect, useState } from "react";
import axios from "axios";
import {useKeycloak} from "@react-keycloak/web";
import Loading from "../Loading";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
      if (keycloak.token) {
          const token = keycloak.token
          const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
          };
        const fetchDashboardData = async () => {
          try {
            const response = await axios.get("http://localhost:8000/api/dashboard", config);
            setStats(response.data.stats);
            setLogs(response.data.logs);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching dashboard data", error);
            setLoading(false);
          }
        };

        fetchDashboardData();
      }
  }, [initialized]);


  if (loading || !stats) {
   return <Loading message="Fetching data..." />;
  }

  return (
      <div className="d-flex flex-column min-vh-100 min-vh-100">
        <Header/>
        <div className="container my-5 flex-grow-1">
            <div className="row mb-4">
                <h4>App Statistics</h4>
                <div className="col-md-6">
                    <div className="card bg-primary text-white">
                        <div className="card-body">
                            <h5 className="card-title">Total Users</h5>
                            <p className="card-text fs-4">{stats.total_users}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card bg-success text-white">
                        <div className="card-body">
                            <h5 className="card-title">Active Sessions</h5>
                            <p className="card-text fs-4">{stats.active_sessions}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive">
          <h4>User Activity logs</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        <Footer/>
    </div>
  );
};

export default Dashboard;
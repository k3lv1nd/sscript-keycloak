db = db.getSiblingDB("dashboard_db");
db.createUser({
  user: "script",
  pwd: "sscript2025!",
  roles: [{ role: "readWrite", db: "dashboard_db" }],
});

db.user_activity_logs.insertMany([
  {
    user: "John Doe",
    action: "Logged In",
    timestamp: new Date("2025-01-23T09:30:00Z"),
  },
  {
    user: "Jane Smith",
    action: "Viewed Dashboard",
    timestamp: new Date("2025-01-23T10:00:00Z"),
  },
  {
    user: "Alice Wonder",
    action: "Logged Out",
    timestamp: new Date("2025-01-23T11:15:00Z"),
  },
  {
    user: "Bob",
    action: "Updated Profile",
    timestamp: new Date("2025-01-23T12:45:00Z"),
  },
    {
    user: "Alice Wonder",
    action: "Logged Out",
    timestamp: new Date("2025-01-23T11:15:00Z"),
  },
    {
    user: "Alice Wonder",
    action: "Logged Out",
    timestamp: new Date("2025-01-23T11:15:00Z"),
  },
    {
    user: "Alice Wonder",
    action: "Logged Out",
    timestamp: new Date("2025-01-23T11:15:00Z"),
  },
    {
    user: "Alice Wonder",
    action: "Logged Out",
    timestamp: new Date("2025-01-23T11:15:00Z"),
  },
]);

db.dashboard_stats.insertOne({
  total_users: 100,
  active_sessions: 20,
  last_updated: new Date(),
});
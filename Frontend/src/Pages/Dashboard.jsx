import { useUser } from "../Hooks/useUser";

function Dashboard() {
  const {user} = useUser();


  return (
    <div class = "flex items-center justify-center">
    <div class= "w-full max-w-lg bg-gradient-to-r from-blue-200 to-cyan-200 p-20 rounded-lg shadow-lg">
      <h2>Dashboard</h2>
      <p>Welcome, {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
    </div>
  );
}

export default Dashboard;
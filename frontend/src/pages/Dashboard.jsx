import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get('/sessions');
        setSessions(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch sessions");
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Published Wellness Sessions</h2>

      {sessions.length === 0 ? (
        <p className="text-center text-gray-600">No sessions found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{session.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Tags:</span> {session.tags.join(', ')}
              </p>
              <a
                href={session.json_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View JSON File
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

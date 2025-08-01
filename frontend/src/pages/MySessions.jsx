import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const MySessions = () => {
  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMySessions = async () => {
      try {
        const res = await axios.get('/my-sessions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const allSessions = res.data;
        setDrafts(allSessions.filter(s => s.status === 'draft'));
        setPublished(allSessions.filter(s => s.status === 'published'));
      } catch (err) {
        alert("You must be logged in to view this page.");
        navigate('/login');
      }
    };

    fetchMySessions();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Sessions</h2>
        <button
          onClick={() => navigate('/edit/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Session
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Drafts</h3>
        {drafts.length === 0 ? (
          <p className="text-gray-600">No drafts</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {drafts.map(session => (
              <div
                key={session._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold text-gray-800">{session.title}</h4>
                <p className="text-sm text-gray-600 mb-2">Tags: {session.tags.join(', ')}</p>
                <button
                  onClick={() => navigate(`/edit/${session._id}`)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  ✏️ Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Published</h3>
        {published.length === 0 ? (
          <p className="text-gray-600">No published sessions</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {published.map(session => (
              <div
                key={session._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold text-gray-800">{session.title}</h4>
                <p className="text-sm text-gray-600 mb-2">Tags: {session.tags.join(', ')}</p>
                <a
                  href={session.json_file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  🔗 View JSON
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySessions;
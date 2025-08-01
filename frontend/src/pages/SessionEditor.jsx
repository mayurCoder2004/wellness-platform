import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

const SessionEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', tags: '', json_file_url: '' });
  const [autoSaved, setAutoSaved] = useState(false);
  const [sessionId, setSessionId] = useState(id !== 'new' ? id : null);

  useEffect(() => {
    if (!id || id === 'new') return;

    const fetchSession = async () => {
      try {
        const res = await axios.get(`/my-sessions/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setForm({
          title: res.data.title || '',
          tags: res.data.tags?.join(', ') || '',
          json_file_url: res.data.json_file_url || '',
        });

        setSessionId(res.data._id);
      } catch (err) {
        alert("Failed to load session");
        navigate('/my-sessions');
      }
    };

    fetchSession();
  }, [id, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.title.trim()) {
        handleSaveDraft(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setAutoSaved(false);
  };

  const handleSaveDraft = async (isAuto = false) => {
    try {
      const res = await axios.post(
        '/my-sessions/save-draft',
        { ...form, sessionId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!sessionId) {
        setSessionId(res.data._id);
        window.history.replaceState(null, '', `/edit/${res.data._id}`);
      }

      isAuto ? setAutoSaved(true) : alert("Draft saved!");
    } catch (err) {
      alert("Failed to save draft");
    }
  };

  const handlePublish = async () => {
    if (!sessionId) return alert("Please save as draft before publishing");

    try {
      await axios.post(
        '/my-sessions/publish',
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Session published!");
      navigate('/my-sessions');
    } catch (err) {
      alert("Failed to publish");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {sessionId ? "Edit Session" : "New Session"}
        </h2>

        {autoSaved && (
          <p className="text-green-600 text-sm mb-4">Auto-saved ✔️</p>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter session title"
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Comma-separated tags"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              JSON File URL
            </label>
            <input
              name="json_file_url"
              value={form.json_file_url}
              onChange={handleChange}
              placeholder="Link to JSON file"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex space-x-4 pt-2">
            <button
              type="button"
              onClick={() => handleSaveDraft(false)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              💾 Save Draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              🚀 Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionEditor;

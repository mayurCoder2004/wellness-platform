import { useEffect, useState } from 'react';
import { Edit3, Save, Rocket, Tag, FileText, ExternalLink, Activity, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../utils/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

const SessionEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', tags: '', json_file_url: '' });
  const [autoSaved, setAutoSaved] = useState(false);
  const [sessionId, setSessionId] = useState(id !== 'new' ? id : null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (!id || id === 'new') return;

    const fetchSession = async () => {
      setIsLoading(true);
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
        toast.error('Failed to load session', {
          style: {
            background: '#fee2e2',
            color: '#dc2626',
            border: '1px solid #fecaca',
          },
        });
        navigate('/my-sessions');
      } finally {
        setIsLoading(false);
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
    setSaveStatus('');
  };

  const handleSaveDraft = async (isAuto = false) => {
    setIsLoading(true);
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

      if (isAuto) {
        setAutoSaved(true);
        setSaveStatus('auto-saved');
        toast.success('Draft auto-saved', {
          style: {
            background: '#dcfce7',
            color: '#16a34a',
            border: '1px solid #bbf7d0',
          },
          duration: 2000,
        });
      } else {
        setSaveStatus('saved');
        toast.success('Draft saved successfully!', {
          style: {
            background: '#dbeafe',
            color: '#2563eb',
            border: '1px solid #bfdbfe',
          },
        });
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (err) {
      toast.error('Failed to save draft', {
        style: {
          background: '#fee2e2',
          color: '#dc2626',
          border: '1px solid #fecaca',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!sessionId) {
      toast.error('Please save as draft before publishing', {
        style: {
          background: '#fef3c7',
          color: '#d97706',
          border: '1px solid #fed7aa',
        },
      });
      return;
    }

    setIsLoading(true);
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

      toast.success('Session published successfully!', {
        style: {
          background: '#d1fae5',
          color: '#065f46',
          border: '1px solid #a7f3d0',
        },
      });
      
      // Navigate after a short delay to let the toast be seen
      setTimeout(() => {
        navigate('/my-sessions');
      }, 1500);
    } catch (err) {
      toast.error('Failed to publish session', {
        style: {
          background: '#fee2e2',
          color: '#dc2626',
          border: '1px solid #fecaca',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        }}
      />
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400 rounded-full opacity-10 animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 px-6 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center mb-6 lg:mb-0">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                <Edit3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {sessionId ? "Edit Session" : "New Session"}
                </h2>
                <p className="text-xl text-blue-100 mt-2">
                  Create and manage your wellness session content
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/my-sessions')}
              className="inline-flex items-center px-6 py-4 bg-white bg-opacity-20 backdrop-blur-sm text-white font-medium rounded-2xl hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border border-white border-opacity-20"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Sessions
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Status Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              {autoSaved && (
                <div className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Auto-saved
                </div>
              )}
              {saveStatus === 'saved' && (
                <div className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Draft saved successfully
                </div>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              {sessionId ? `Session ID: ${sessionId.slice(-8)}` : 'Unsaved draft'}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                {/* Title Field */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FileText className="w-4 h-4 mr-2 text-blue-500" />
                    Session Title
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter a compelling title for your wellness session"
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg placeholder-gray-400 hover:border-gray-300"
                  />
                </div>

                {/* Tags Field */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Tag className="w-4 h-4 mr-2 text-purple-500" />
                    Tags
                  </label>
                  <input
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="wellness, meditation, mindfulness, stress-relief (comma separated)"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-lg placeholder-gray-400 hover:border-gray-300"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Add relevant tags to help users discover your session
                  </p>
                </div>

                {/* JSON URL Field */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <ExternalLink className="w-4 h-4 mr-2 text-indigo-500" />
                    JSON File URL
                  </label>
                  <input
                    name="json_file_url"
                    value={form.json_file_url}
                    onChange={handleChange}
                    placeholder="https://example.com/session-data.json"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-lg placeholder-gray-400 hover:border-gray-300"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Link to your session's JSON configuration file
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => handleSaveDraft(false)}
                    disabled={isLoading}
                    className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {isLoading ? 'Saving...' : 'Save Draft'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isLoading || !sessionId}
                    className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    {isLoading ? 'Publishing...' : 'Publish Session'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Tips for Creating Great Sessions
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use descriptive titles that clearly indicate the session's purpose</li>
                  <li>• Add relevant tags to improve discoverability</li>
                  <li>• Ensure your JSON file is properly formatted and accessible</li>
                  <li>• Save drafts frequently - auto-save works every 5 seconds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SessionEditor;
import { useEffect, useState } from 'react';
import { FileText, Tag, ExternalLink, Activity, Sparkles, Plus, Edit3, Eye } from 'lucide-react';
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

  const EmptyState = ({ type }) => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <FileText className="w-10 h-10 text-blue-500" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-yellow-500" />
        </div>
      </div>
      <h4 className="text-lg font-semibold text-gray-700 mb-2">
        No {type} sessions yet
      </h4>
      <p className="text-gray-500 text-center text-sm">
        {type === 'draft' 
          ? 'Create your first session to get started with your wellness journey.' 
          : 'Publish your draft sessions to share them with others.'}
      </p>
    </div>
  );

  const SessionCard = ({ session, isDraft, index }) => (
    <div
      className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${isDraft ? 'bg-gradient-to-br from-orange-400 to-red-500' : 'bg-gradient-to-br from-green-500 to-blue-600'} rounded-xl flex items-center justify-center flex-shrink-0`}>
          {isDraft ? <Edit3 className="w-6 h-6 text-white" /> : <Eye className="w-6 h-6 text-white" />}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${isDraft ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
            {isDraft ? 'Draft' : 'Published'}
          </div>
        </div>
      </div>

      {/* Session Title */}
      <h4 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
        {session.title}
      </h4>

      {/* Tags Section */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Tag className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-600">Tags</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {session.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-gray-100">
        {isDraft ? (
          <button
            onClick={() => navigate(`/edit/${session._id}`)}
            className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Session
          </button>
        ) : (
          <a
            href={session.json_file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <FileText className="w-4 h-4 mr-2" />
            View JSON File
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  My Sessions
                </h2>
                <p className="text-xl text-blue-100 mt-2">
                  Manage your wellness sessions and track your progress
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/edit/new')}
              className="inline-flex items-center px-6 py-4 bg-white bg-opacity-20 backdrop-blur-sm text-white font-medium rounded-2xl hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border border-white border-opacity-20"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Session
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Drafts Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Draft Sessions ({drafts.length})
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>

          {drafts.length === 0 ? (
            <EmptyState type="draft" />
          ) : (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {drafts.map((session, index) => (
                <SessionCard
                  key={session._id}
                  session={session}
                  isDraft={true}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* Published Section */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Published Sessions ({published.length})
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {published.length === 0 ? (
            <EmptyState type="published" />
          ) : (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {published.map((session, index) => (
                <SessionCard
                  key={session._id}
                  session={session}
                  isDraft={false}
                  index={index}
                />
              ))}
            </div>
          )}
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

export default MySessions;
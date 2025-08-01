import { useEffect, useState } from 'react';
import { FileText, Tag, ExternalLink, Activity, Sparkles } from 'lucide-react';
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

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <Activity className="w-12 h-12 text-blue-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No sessions found</h3>
      <p className="text-gray-500 text-center max-w-md">
        Start your wellness journey by creating your first session. Check back soon for new content!
      </p>
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
        
        <div className="relative z-10 px-6 py-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Published Wellness Sessions
            </h2>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover and explore published wellness sessions designed to enhance your mental and physical well-being
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {sessions.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Available Sessions ({sessions.length})
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {sessions.map((session, index) => (
                <div
                  key={session._id}
                  className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Session Title */}
                  <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {session.title}
                  </h3>

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
                    <a
                      href={session.json_file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View JSON File
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
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

export default Dashboard;
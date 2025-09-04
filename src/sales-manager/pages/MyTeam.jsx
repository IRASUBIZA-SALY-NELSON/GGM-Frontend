import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Plus, Filter, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyTeam = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // YTD Revenue by Sales Assistant data
  const revenueData = [
    { name: 'Liam Carter', percentage: 25, color: 'bg-purple-600' },
    { name: 'Sophia Newman', percentage: 45, color: 'bg-purple-600' },
    { name: 'Ethan Blake', percentage: 60, color: 'bg-purple-600' },
    { name: 'Amara Johnson', percentage: 75, color: 'bg-purple-600' },
    { name: 'Noah Morgan', percentage: 100, color: 'bg-purple-600' }
  ];

  // Individual Performance data
  const performanceData = [
    {
      id: 1,
      name: 'Louise Watson',
      avatar: '/distributor.png',
      revenue: '1,000,000 rwf',
      quota: '50%',
      trend: 'up',
      trendValue: '18%',
      status: 'active'
    },
    {
      id: 2,
      name: 'Louise Watson',
      avatar: '/distributor.png',
      revenue: '1,000,000 rwf',
      quota: '50%',
      trend: 'up',
      trendValue: '18%',
      status: 'active'
    },
    {
      id: 3,
      name: 'Darlene Robertson',
      avatar: '/distributor.png',
      revenue: '500,000 rwf',
      quota: '70%',
      trend: 'down',
      trendValue: '2%',
      status: 'active'
    },
    {
      id: 4,
      name: 'Darlene Robertson',
      avatar: '/distributor.png',
      revenue: '500,000 rwf',
      quota: '70%',
      trend: 'down',
      trendValue: '2%',
      status: 'active'
    },
    {
      id: 5,
      name: 'Louise Watson',
      avatar: '/distributor.png',
      revenue: '1,000,000 rwf',
      quota: '50%',
      trend: 'up',
      trendValue: '18%',
      status: 'active'
    },
    {
      id: 6,
      name: 'Darlene Robertson',
      avatar: '/distributor.png',
      revenue: '500,000 rwf',
      quota: '70%',
      trend: 'down',
      trendValue: '2%',
      status: 'active'
    }
  ];

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    // Handle delete logic here
    setShowDeleteModal(false);
    setSelectedMember(null);
  };

  const handleViewProfile = (memberId) => {
    navigate(`/sales-manager/my-team/profile/${memberId}`);
  };

  const handleAddNewAssistant = () => {
    navigate('/sales-manager/my-team/add-new');
  };

  return (
    <div className="flex-1 p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <img src="/distributor.png" alt="Profile" className="w-8 h-8 rounded-full" />
            <span className="text-sm font-medium text-gray-700">Robert Allen</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Sales Assistants */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <div className="w-5 h-5 bg-purple-600 rounded"></div>
              </div>
              <span className="text-sm text-gray-600">Total Sales Assistants</span>
              <button className="text-gray-400 hover:text-gray-600">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-gray-500">April</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">560</div>
          <div className="flex items-center text-sm">
            <span className="text-green-600 font-medium">↗ 8.5%</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Update Jun 15, 2025</div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <div className="w-5 h-5 bg-purple-600 rounded"></div>
              </div>
              <span className="text-sm text-gray-600">Total Revenue</span>
              <button className="text-gray-400 hover:text-gray-600">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-gray-500">April</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">1,050,000 rwf</div>
          <div className="flex items-center text-sm">
            <span className="text-green-600 font-medium">↗ 4.3%</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Update Jun 15, 2025</div>
        </div>

        {/* % of Team Quota Achieved */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <div className="w-5 h-5 bg-purple-600 rounded"></div>
              </div>
              <span className="text-sm text-gray-600">% of Team Quota Achieved</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">86%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '86%' }}></div>
          </div>
          <div className="text-xs text-gray-500">Update Jun 15, 2025</div>
        </div>
      </div>

      {/* YTD Revenue by Sales Assistant Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">YTD Revenue by Sales Assistant</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">This Week</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        
        <div className="space-y-4">
          {revenueData.map((data, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-20 text-sm text-gray-600 text-right">{data.name}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div
                  className={`${data.color} h-6 rounded-full transition-all duration-300`}
                  style={{ width: `${data.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-gray-400 mt-4">
          <span>0</span>
          <span>20%</span>
          <span>40%</span>
          <span>60%</span>
          <span>80%</span>
          <span>100%</span>
        </div>
        <div className="text-center mt-2">
          <span className="text-sm text-gray-600">Percentage of Quota</span>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          <div>% of Quota</div>
          <div>Amount of remaining to reach target</div>
        </div>
      </div>

      {/* Individual Performance Leaderboard */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Individual Performance Leaderboard</h3>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleAddNewAssistant}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Sales Assistant</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">Sales Assistant</th>
                <th className="pb-3 font-medium">Revenue (YTD)</th>
                <th className="pb-3 font-medium">% of Quota</th>
                <th className="pb-3 font-medium">Trend</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {performanceData.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-900">{member.revenue}</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-900">{member.quota}</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-1">
                      <span className={`text-sm font-medium ${
                        member.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {member.trend === 'up' ? '↗' : '↘'} {member.trendValue}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewProfile(member.id)}
                        className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(member)}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>Showing</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>Showing 1 to 10 out of 50 records</span>
          </div>
          <div className="flex items-center space-x-1">
            <button className="px-2 py-1 text-gray-400 hover:text-gray-600">&lt;</button>
            <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 text-gray-600 hover:text-gray-900">2</button>
            <button className="px-3 py-1 text-gray-600 hover:text-gray-900">3</button>
            <button className="px-3 py-1 text-gray-600 hover:text-gray-900">4</button>
            <button className="px-2 py-1 text-gray-400 hover:text-gray-600">&gt;</button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <div className="text-red-600 text-2xl">⚠</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Are you sure you want to delete {selectedMember?.name} From Sales Assistant Team?
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTeam;

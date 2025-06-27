import React from 'react';
import { Search, Plus, Download, Upload, Settings, Bell } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onNewItem: () => void;
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  onNewItem,
  activeSection
}) => {
  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      'org-list': '组织列表管理',
      'org-hierarchy': '组织架构图',
      'org-settings': '组织设置',
      'personnel-list': '人员列表管理',
      'personnel-import': '人员批量导入',
      'personnel-export': '人员数据导出',
      'operation-stats': '操作统计分析',
      'personnel-stats': '人员统计分析',
      'org-stats': '组织统计分析',
      'user-management': '用户管理',
      'role-management': '角色管理',
      'operation-logs': '操作日志'
    };
    return titles[section] || '企业组织管理';
  };

  const getActionButtons = (section: string) => {
    if (section.includes('list')) {
      return (
        <>
          <button
            onClick={onNewItem}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>新增</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>导入</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出</span>
          </button>
        </>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-gray-900">{getSectionTitle(activeSection)}</h2>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索组织或人员..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          {getActionButtons(activeSection)}
          
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
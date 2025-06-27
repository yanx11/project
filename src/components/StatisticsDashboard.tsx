import React from 'react';
import { Statistics, OperationLog } from '../types';
import { BarChart3, Users, Building2, Activity, TrendingUp, Clock } from 'lucide-react';

interface StatisticsDashboardProps {
  statistics: Statistics;
  operationLogs: OperationLog[];
}

const StatisticsDashboard: React.FC<StatisticsDashboardProps> = ({
  statistics,
  operationLogs
}) => {
  const recentLogs = operationLogs.slice(0, 10);

  const getOperationTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      create: '创建',
      update: '更新',
      delete: '删除'
    };
    return labels[type] || type;
  };

  const getEntityTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      organization: '组织',
      personnel: '人员'
    };
    return labels[type] || type;
  };

  const getOperationTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      create: 'bg-green-100 text-green-800',
      update: 'bg-blue-100 text-blue-800',
      delete: 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">总组织数</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.totalOrganizations}</p>
              <p className="text-xs text-green-600 mt-1">活跃: {statistics.activeOrganizations}</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">总人员数</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.totalPersonnel}</p>
              <p className="text-xs text-green-600 mt-1">在职: {statistics.activePersonnel}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">近期操作</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.recentOperations}</p>
              <p className="text-xs text-blue-600 mt-1">24小时内</p>
            </div>
            <Activity className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">增长趋势</p>
              <p className="text-2xl font-bold text-gray-900">+12%</p>
              <p className="text-xs text-green-600 mt-1">本月较上月</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 组织类型分布 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">组织类型分布</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(statistics.organizationsByType).map(([type, count]) => {
              const percentage = (count / statistics.totalOrganizations) * 100;
              const typeLabels: Record<string, string> = {
                company: '公司',
                department: '部门',
                team: '团队',
                branch: '分支机构'
              };
              
              return (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{typeLabels[type] || type}</span>
                    <span className="font-medium">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 操作日志 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">最近操作记录</h3>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getOperationTypeColor(log.type)}`}>
                      {getOperationTypeLabel(log.type)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {getEntityTypeLabel(log.entityType)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">{log.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">操作人: {log.operatorName}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(log.timestamp).toLocaleString('zh-CN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
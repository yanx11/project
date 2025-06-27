import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OrganizationList from './components/OrganizationList';
import PersonnelList from './components/PersonnelList';
import StatisticsDashboard from './components/StatisticsDashboard';
import { Organization, Personnel, Statistics } from './types';
import { mockOrganizations, mockPersonnel, mockOperationLogs } from './data/mockData';

function App() {
  const [activeSection, setActiveSection] = useState('org-list');
  const [expandedItems, setExpandedItems] = useState(new Set(['organizations']));
  const [searchTerm, setSearchTerm] = useState('');
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);
  const [personnel, setPersonnel] = useState<Personnel[]>(mockPersonnel);

  const statistics: Statistics = {
    totalOrganizations: organizations.length,
    totalPersonnel: personnel.length,
    activeOrganizations: organizations.filter(org => org.status === 'active').length,
    activePersonnel: personnel.filter(person => person.status === 'active').length,
    recentOperations: mockOperationLogs.length,
    organizationsByType: organizations.reduce((acc, org) => {
      acc[org.type] = (acc[org.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  const handleToggleExpand = (item: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(item)) {
      newExpanded.delete(item);
    } else {
      newExpanded.add(item);
    }
    setExpandedItems(newExpanded);
  };

  const handleNewItem = () => {
    console.log('New item for section:', activeSection);
  };

  const handleEditOrganization = (org: Organization) => {
    setOrganizations(organizations.map(o => o.id === org.id ? org : o));
  };

  const handleDeleteOrganization = (id: string) => {
    if (window.confirm('确定要删除此组织吗？')) {
      setOrganizations(organizations.filter(org => org.id !== id));
    }
  };

  const handleAddOrganization = (orgData: Omit<Organization, 'id'>) => {
    const newOrg: Organization = {
      ...orgData,
      id: Date.now().toString()
    };
    setOrganizations([...organizations, newOrg]);
  };

  const handleEditPersonnel = (person: Personnel) => {
    setPersonnel(personnel.map(p => p.id === person.id ? person : p));
  };

  const handleDeletePersonnel = (id: string) => {
    if (window.confirm('确定要删除此人员吗？')) {
      setPersonnel(personnel.filter(person => person.id !== id));
    }
  };

  const handleAddPersonnel = (personData: Omit<Personnel, 'id'>) => {
    const newPerson: Personnel = {
      ...personData,
      id: Date.now().toString()
    };
    setPersonnel([...personnel, newPerson]);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'org-list':
        return (
          <OrganizationList
            organizations={organizations}
            onEdit={handleEditOrganization}
            onDelete={handleDeleteOrganization}
            onAdd={handleAddOrganization}
            searchTerm={searchTerm}
          />
        );
      case 'personnel-list':
        return (
          <PersonnelList
            personnel={personnel}
            organizations={organizations}
            onEdit={handleEditPersonnel}
            onDelete={handleDeletePersonnel}
            onAdd={handleAddPersonnel}
            searchTerm={searchTerm}
          />
        );
      case 'operation-stats':
      case 'personnel-stats':
      case 'org-stats':
        return (
          <StatisticsDashboard
            statistics={statistics}
            operationLogs={mockOperationLogs}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">功能开发中</h3>
              <p className="text-gray-600">该功能正在开发中，敬请期待...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        expandedItems={expandedItems}
        onToggleExpand={handleToggleExpand}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewItem={handleNewItem}
          activeSection={activeSection}
        />
        
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
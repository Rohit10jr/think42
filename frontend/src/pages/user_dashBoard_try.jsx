import { useState } from 'react';
import Dashboard from '../components/example/dashboard';
import Profile from '../components/example/profile';
import Resume from '../components/example/resume';
import Applied from '../components/example/applied';
import Alerts from '../components/example/alert';

function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Profile':
        return <Profile />;
      case 'Resume':
        return <Resume />;
      case 'Applied':
        return <Applied />;
      case 'Alerts':
        return <Alerts />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '20%', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <h3>SIDEBAR</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {['Dashboard', 'Profile', 'Resume', 'Applied', 'Alerts'].map((page) => (
            <li
              key={page}
              style={{
                padding: '10px 0',
                cursor: 'pointer',
                color: activePage === page ? 'blue' : 'black',
              }}
              onClick={() => setActivePage(page)}
            >
              {page}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px' }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;

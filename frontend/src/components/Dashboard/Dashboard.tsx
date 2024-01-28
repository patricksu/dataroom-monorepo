import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useDataRoomService } from '../../services/DataRoomService';
import { useStateContext } from '../../context/StateContext';
import { DataRoom } from '../DataRoom/DataRoom';
import DataRoomList from '../DataRoom/DataRoomList';
import CreateDataRoomModal from '../DataRoom/CreateDataRoomModal';
import DataRoomPage from '../DataRoom/DataRoomPage';

const Dashboard: React.FC = () => {
  const { accessToken, logout } = useAuthContext();
  const { dataRooms, getUserDataRooms } = useDataRoomService();
  const { selectedDataRoom, setSelectedDataRoom } = useStateContext();
  const [showCreateDataRoomModal, setShowCreateDataRoomModal] = useState(false);

  useEffect(() => {
    getUserDataRooms();
  }, [dataRooms, getUserDataRooms, selectedDataRoom, showCreateDataRoomModal, accessToken]);

  // Click handlers
  const handleNewDataRoomClick = () => {
    setShowCreateDataRoomModal(true);
  };

  const handleDataRoomListItemClick = (dataRoom: DataRoom) => {
    // Set the selected data room when a data room is clicked
    setSelectedDataRoom(dataRoom);
  };

  const handleLogout = () => {
    // Perform logout logic
    logout();
  };


  return (
<div style={{
  marginLeft: "8px",
  fontFamily: 'Arial, sans-serif'
}}>
  {/* Logout button at top right */}
  <button
    style={{
      position: 'absolute',
      top: '16px',
      right: '16px',
      padding: '8px 16px',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    }}
    onClick={handleLogout}
  >
    Logout
  </button>

  {/* When a data room is selected */}
  {selectedDataRoom ? (
    <DataRoomPage dataRoom={selectedDataRoom} />
  ) : (
    <div>
      {/* When no data room is selected */}
      <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>Dashboard</h2>
      <button
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}
        onClick={handleNewDataRoomClick}
      >
        New Data Room
      </button>
      {showCreateDataRoomModal && (
        <CreateDataRoomModal
          onClose={() => setShowCreateDataRoomModal(false)} 
        />
      )}
      <DataRoomList dataRooms={dataRooms} onDataRoomClick={handleDataRoomListItemClick} />
    </div>
  )}
</div>

  );
};

export default React.memo(Dashboard);

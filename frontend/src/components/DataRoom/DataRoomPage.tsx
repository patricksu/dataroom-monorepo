import React from 'react';
import { useStateContext } from '../../context/StateContext';
import { useFolderService } from '../../services/FolderService';
import { DataRoom } from '../DataRoom/DataRoom';
import { DataRoomActionButtons } from '../DataRoom/DataRoomActionButtons';
import { Folder } from '../Folder/Folder';
import FolderPage from '../Folder/FolderPage';
import DisplayList from '../DisplayList/DisplayList'; // Import the DisplayList component

interface DataRoomPageProps {
  dataRoom: DataRoom;
}

const DataRoomPage: React.FC<DataRoomPageProps> = (props) => {
  const { selectedFolder, setSelectedFolder } = useStateContext();
  const { getFolder } = useFolderService();

  const handleFolderListItemClick = async (folder: Folder) => {
    const fetchedFolder = await getFolder(folder.id);
    if (fetchedFolder) {
      setSelectedFolder(fetchedFolder);
    }
  };

  return (
<div style={{
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  backgroundColor: '#f7f7f7',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
}}>
  <div style={{
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #e1e1e1',
    paddingBottom: '10px'
  }}>
    <h3 style={{
      flexGrow: 1,
      margin: 0,
      fontSize: '1.5rem',
      color: '#333'
    }}>
      Data Room: {props.dataRoom.name}
    </h3>
    <DataRoomActionButtons />
  </div>
  {selectedFolder ? (
    <FolderPage folder={selectedFolder} />
  ) : (
    <DisplayList 
      displayFiles={props.dataRoom.files} 
      displayFolders={props.dataRoom.folders} 
      onFolderClick={handleFolderListItemClick} 
    />
  )}
</div>

    );
  };

export default React.memo(DataRoomPage);

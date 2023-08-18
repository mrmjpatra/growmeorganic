import { useNavigate } from 'react-router-dom';
import DisplayPostComp from './DisplayPostComp';
import { useEffect } from 'react';
import DepartmentComp from './DepartmentComp';
import { IconButton } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const details = localStorage.getItem("details")
    if (details === null) {
      navigate('/register');
      alert('You must enter the details first');
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.clear();
    navigate('/register');
  }
  return (
    <div>
      <IconButton className='logout' color='warning' onClick={handleLogout}>
        <PowerSettingsNewIcon />
      </IconButton>
      <DisplayPostComp />
      <DepartmentComp />
    </div>
  )
}

export default Dashboard
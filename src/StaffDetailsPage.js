import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './StaffDetailsPage.css'; // External CSS for styling
import axios from 'axios';

const StaffDetailsPage = () => {
      const frontEndURL = 'https://medianet-staff-frontend.onrender.com';
// const frontEndURL = 'http://localhost:3000';
  const location = useLocation();
  const [staffData, setStaffData] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const staffDataEncoded = queryParams.get("data");
    if (staffDataEncoded) {
      // Directly use atob() to decode Base64 data
      const decodedData = atob(staffDataEncoded);
      const parsedData = JSON.parse(decodedData);
      fetchStaffDetails(parsedData.staffid)
      console.log(parsedData,'parsed datas')
    }
  }, [location]);

  const fetchStaffDetails = async (staffId) => {
    console.log(staffId,'staffId');
    
    try {
      const response = await axios.get(`${frontEndURL}/api/staffRoutes/staff/${staffId}`);
      setStaffData(response.data);
    } catch (error) {
      console.error('Error fetching staff details:', error);
    }
  };

  const getImageSrc = (imageData) => {
    if (imageData && imageData.type === 'Buffer') {
      const base64Image = btoa(
        String.fromCharCode(...new Uint8Array(imageData.data))
      );
      return `data:image/jpeg;base64,${base64Image}`; // Assuming the image is JPEG
    }
    return null;
  };

  return staffData ? (
    <div className="staff-details-container">
      <h1>Staff Details</h1>
      <div className="staff-info">
      {getImageSrc(staffData.staffimage) ? (
  <img src={getImageSrc(staffData.staffimage)} alt="Staff" className="staff-image" draggable="false"/>
) : (
  <div className="staff-image-placeholder"></div>
)}
        <div className="staff-info-text">
          <p><strong>First Name:</strong> {staffData.firstname}</p>
          <p><strong>Last Name:</strong> {staffData.lastname}</p>
          <p><strong>Employee ID:</strong> {staffData.employeeid}</p>
          <p><strong>Nationality:</strong> {staffData.nationality}</p>
          <p><strong>Contact Numbers:</strong> {staffData.contactnumber1}, {staffData.contactnumber2}</p>
          <p><strong>Designation:</strong> {staffData.designation}</p>
          <p><strong>Superior:</strong> {staffData.superior}</p>
          <p><strong>Department:</strong> {staffData.department}</p>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading staff details...</p>
  );
};

export default StaffDetailsPage;

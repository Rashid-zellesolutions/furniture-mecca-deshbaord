import React from 'react';
import '../../../Pages/ECommerce/ECommerce.css';
// import '../../../Page.css';
import 'react-accessible-accordion/dist/fancy-example.css'; // Default styles
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import actionIcon from '../../../Assets/Images/ActionBtn 30 x 30.png'

const EditCategory = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

 

  useEffect(() => {
    // Set static data instead of fetching from API
    const staticData = [
      {
        id: 1,
        name: 'Leanne Graham',
        status: 'Published',
        image: '', // Example image URL
        address: { zipcode: '12345', city: 'Gwenborough', street: 'Kulas Light' },
        username: 'In-Stock',
        price: 100.00,
        email: 'user1@example.com',
      },
      {
        id: 2,
        name: 'Ervin Howell',
        status: 'Drafted',
        image: '',
        address: { zipcode: '12346', city: 'Romaguera', street: 'Victor Plains' },
        username: 'Out of Stock',
        price: 200.00,
        email: 'user2@example.com',
      },
      {
        id: 3,
        name: 'Clementine Bauch',
        status: 'Published',
        image: '',
        address: { zipcode: '12347', city: 'Lebsackbury', street: 'Douglas Extension' },
        username: 'In-Stock',
        price: 300.00,
        email: 'user3@example.com',
      },
      {
        id: 4,
        name: 'Patricia Lebsack',
        status: 'Drafted',
        image: '',
        address: { zipcode: '12348', city: 'South Elvis', street: 'Hoeger Mall' },
        username: 'Back Order',
        price: 400.00,
        email: 'user4@example.com',
      },
      {
        id: 5,
        name: 'Chelsey Dietrich',
        status: 'Published',
        image: '',
        address: { zipcode: '12349', city: 'Roscoeview', street: 'Skiles Walks' },
        username: 'In-Stock',
        price: 150.00,
        email: 'user5@example.com',
      },
      {
        id: 6,
        name: 'Mrs. Dennis Schulist',
        status: 'Drafted',
        image: '',
        address: { zipcode: '12350', city: 'Lehman', street: 'Norberto Crossing' },
        username: 'Back Order',
        price: 250.00,
        email: 'user6@example.com',
      },
      {
        id: 7,
        name: 'Kurtis Weissnat',
        status: 'Published',
        image: '',
        address: { zipcode: '12351', city: 'Howemouth', street: 'Rex Trail' },
        username: 'In-Stock',
        price: 350.00,
        email: 'user7@example.com',
      },
      {
        id: 8,
        name: 'Nicholas Runolfsdottir V',
        status: 'Drafted',
        image: '',
        address: { zipcode: '12352', city: 'Aliyaview', street: 'Ellsworth Summit' },
        username: 'Back Order',
        price: 450.00,
        email: 'user8@example.com',
      },
      {
        id: 9,
        name: 'Glenna Reichert',
        status: 'Published',
        image: '',
        address: { zipcode: '12353', city: 'Bartholomebury', street: 'Dayna Park' },
        username: 'In-Stock',
        price: 550.00,
        email: 'user9@example.com',
      },
      {
        id: 10,
        name: 'Clementina DuBuque',
        status: 'Drafted',
        image: '',
        address: { zipcode: '12354', city: 'Lebsackbury', street: 'Kovacek Fields' },
        username: 'Back Order',
        price: 650.00,
        email: 'user10@example.com',
      },
    ];

    setData(staticData); // Use static data directly
  }, []);

  const customStyles = {
    headCells: {
      style: {
        height: '52px',
        borderRadius: '5px 5px 0px 0px',
        background: '#FDFDFD',
        opacity: '1',
        textAlign: 'center',
        justifyContent: 'center',
        border: 'none',
        color: 'var(--text-color)',
        fontFamily: 'poppins',
        fontWeight: '500',
        fontSize: '14px',
        padding: '10px',
      },
    },
    cells: {
      style: {
        height: '66px',
        justifyContent: 'center',
        textAlign: 'center',
        background: '#FFFFFF',
        borderTop: '1px solid #F0F0F0',
        borderRight: 'none',
        color: '#858585',
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '12px',
      },
    },
  };

  const columns = [
    {
      name: (
        <input
          type="checkbox"
          style={{ margin: 0 }}
          onChange={(e) => console.log('All selected:', e.target.checked)}
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          style={{ margin: 0 }}
          onChange={(e) => console.log('Selected:', row, e.target.checked)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Image',
      selector: (row) => row.image,
    },
    {
      name: 'Image',
      selector: (row) => row.image,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Action',
      cell: (row) => (
        <img
          src={actionIcon}
          alt="Action Icon"
          width="30"
          height="30"
          style={{ cursor: 'pointer' }}
          onClick={() => console.log('Action clicked for:', row)}
        />
      ),
    },
  ];

  return (
    <div className="AllProductPage">

      

      <div className="sectionall_3">
        <DataTable columns={columns} data={data} progressPending={loading} customStyles={customStyles} />
      </div>
    </div>
  );
};

export default EditCategory;
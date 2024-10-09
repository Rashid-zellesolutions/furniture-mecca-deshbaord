import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './ECommerce.css';
import '../Page.css';
import CustomBtn from '../../Components/UI-Controls/Buttons/Btn';
import SearchBar from '../../Components/UI-Controls/SearchBar/Search';
import searchIcon from '../../Assets/Images/Search Bar 20 x 20.png';
import actionIcon from '../../Assets/Images/ActionBtn 30 x 30.png';
import DataTable from 'react-data-table-component';
import CustomPagination from '../../Components/UI-Controls/Pagination/Pagination';
import CustomDropdown from '../../Components/UI-Controls/Dropdown/dropdown';
import Dropdownresize from '../../Components/UI-Controls/Dropdown/dropdownattr';

const ProductsAttr = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [attrData, setAttrData] = useState({
    name: '',
    slug: '',
    storeOrder: '',
    enableArchive: false, // New field
  });
  const rowsPerPage = 4;

  // useEffect(() => {
  //   console.log('Fetching data...');
  //   fetchTableData();
  // }, []);

  useEffect(() => {
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

    setData(staticData);
  }, []);

  async function fetchTableData() {
    setLoading(true);
    const URL = 'https://jsonplaceholder.typicode.com/users';
    const response = await fetch(URL);
    const users = await response.json();
    setLoading(false);
  }

  const handleSearch = () => console.log('Search has been triggered');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setAttrData({ ...attrData, [name]: value });
  // };

  // const handleInputChange = (e) => {
  //   const { name, value, type, checked } = e.target;
    
  //   if (type === 'checkbox') {
  //     setAttrData({ ...attrData, [name]: checked });
  //   } else {
  //     setAttrData({ ...attrData, [name]: value });
  //   }
  // };
  
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
  
    // If it's a checkbox, we use the `checked` property, otherwise the `value` property
    setAttrData({ 
      ...attrData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };  

  const handleAddAttribute = async () => {
    const formData = new FormData();

    // Append form data
    formData.append('name', attrData.name);
    formData.append('slug', attrData.slug);
    formData.append('storeOrder', attrData.storeOrder);
    formData.append('enableArchive', attrData.enableArchive); // Add this field

    try {
      setLoading(true);
      console.log('Form submission started with data:', attrData);

      const response = await axios.post('https://yourapi.com/endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Form submission successful:', response.data);

      // Reset the form
      setAttrData({
        name: '',
        slug: '',
        storeOrder: '',
        enableArchive: false, // Reset checkbox
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
      console.log('Form submission ended.');
    }
  };


  const customStyles = {
    headCells: {
      style: {
        height: '52px',
        borderRadius: '5px 5px 5px 5px',
        background: '#FDFDFD',
        opacity: '1',
        textAlign: 'center',
        justifyContent: 'center',
        border: 'none',
        color: 'var(--text-color)',
        fontFamily: 'poppins',
        fontWeight: '500',
        fontSize: '14px',
        overflow: 'wrap', // Prevents content overflow in headers
        textOverflow: 'ellipsis',
        whiteSpace: 'normal', // Allows wrapping in header cells
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
        whiteSpace: 'normal', // Allows text to wrap in cells
        wordBreak: 'break-word', // Breaks long words if necessary
        overflow: 'wrap', // Prevents content overflow
        textOverflow: 'ellipsis', // Shows ellipsis for long content
      },
    },
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      width: '165px', // Assign custom width
    },
    {
      name: 'Slug',
      selector: (row) => row.name,
      width: '130px', // Assign custom width
    },
    {
      name: 'Type',
      selector: (row) => row.price, // Assuming you want the price
      width: '100px', // Assign custom width
    },
    {
      name: 'Order By',
      selector: (row) => row.price, // Assuming you want the price
      width: '100px', // Assign custom width
    },
    {
      name: 'Terms',
      selector: (row) => row.price, // Assuming you want the price
      width: '90px', // Assign custom width
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
      width: '100px', // Assign custom width for action column
    },
  ];

  // Options for the Store Order Dropdown
  const storeOrderOptions = [
    { value: 'Name', label: 'Name' },
    { value: 'Name (Numeric)', label: 'Name (Numeric)' },
    { value: 'Term ID', label: 'Term ID' },
  ];

  // Options for the Variable Swatches Type* Dropdown
  const variableTypeOptions = [
    { value: 'Label', label: 'Label' },
    { value: 'Color', label: 'Color' },
    { value: 'Image', label: 'Image' },
  ];

  // Options for the Variable Swatches Shape* Dropdown
  const variableShapeOptions = [
    { value: 'Circle', label: 'Circle' },
    { value: 'Square', label: 'Square' },
    { value: 'Rounded Corner', label: 'Rounded Corner' },
  ];

  // Handler for dropdown change
  const handlestoreOrder = (selectedValue) => {
    setAttrData((prevState) => ({
      ...prevState,
      storeOrder: selectedValue,  // Update the state with selected value
    }));
  };

  // Handler for dropdown change
  const handlevariableType = (selectedValue) => {
    setAttrData((prevState) => ({
      ...prevState,
      variableType: selectedValue,  // Update the state with selected value
    }));
  };

  // Handler for dropdown change
  const handlevariableShape = (selectedValue) => {
    setAttrData((prevState) => ({
      ...prevState,
      variableShape: selectedValue,  // Update the state with selected value
    }));
  };

  return (
    <div className="ProductAttrPage">
      <div className="AttrSection-01">
        <span className='Section1-Leftside'>
          Attributes
        </span>
        <div className='Section1-Rightside'>
          <SearchBar onSearch={handleSearch} icon={searchIcon} placeholder="Search attribute by name" />
        </div>
      </div>

      <div className="AttrSection-02">
        <div className='Section2-Leftside'>
          <div className='Header'>Add New Attributes</div>
          <div className="NewAttr-Add">
            <form onSubmit={(e) => { e.preventDefault(); handleAddAttribute(); }}>

              <div className="form-row">
                <label htmlFor="name">Attribute Name<span className='superscript'>*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Attribute Name..."
                  value={attrData.name}
                  onChange={handleInputChange}
                  required // Optional: Add if field is mandatory
                />
              </div>

              <div className="form-row">
                <label htmlFor="slug">Slug<span className='superscript'>*</span></label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  placeholder="Enter Slug..."
                  value={attrData.slug}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group" style={{fontSize: '12px', display: 'flex', alignItems: 'center',  marginTop: 10, marginBottom: 10}}>
                <input
                  type="checkbox"
                  name="enableArchive"
                  id="enableArchive"
                  checked={attrData.enableArchive}
                  // onChange={(e) => setAttrData({ ...attrData, enableArchive: e.target.checked })}
                  onChange={handleInputChange}
                />
                <label htmlFor="enableArchive" style={{fontSize: '12px', marginLeft: 10,}}>Enable archive</label>
              </div>

              <div className="form-row">
                <label htmlFor="storeOrder">Default Store Order<span className='superscript'>*</span></label>
                <div className="custom-dropdown-wrapper">
                  <CustomDropdown
                    options={storeOrderOptions}
                    selectedOption={attrData.storeOrder}
                    handleOptionChange={handlestoreOrder}
                  />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="variableSwatches">Variable Swatches<span className='superscript'>*</span></label>
                <div className="custom-dropdown-wrapper">
                  <label htmlFor="variableType">Type</label>
                  <Dropdownresize
                    options={variableTypeOptions}
                    selectedOption={attrData.variableType}
                    handleOptionChange={handlevariableType}
                  />
                </div>
                <div className="custom-dropdown-wrapper">
                  <label htmlFor="variableShape">Shape</label>
                  <Dropdownresize
                    options={variableShapeOptions}
                    selectedOption={attrData.variableShape}
                    handleOptionChange={handlevariableShape}
                  />
                </div>
              </div>

              <div className='SubmitBtn'>
                <CustomBtn
                  label="Add Attribute"
                  className="AddCatBtn"
                  onClick={handleAddAttribute}
                  type="button" // Ensure it's still a button to prevent default submission
                />
              </div>
            </form>
          </div>
        </div >
        <div className='Section2-Rightside'>
          <DataTable
            columns={columns}
            data={data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
            pagination
            paginationComponent={() => (
              <CustomPagination
                rowsPerPage={rowsPerPage}
                rowCount={data.length}
                currentPage={currentPage}
                onChangePage={handlePageChange}
              />
            )}
            customStyles={customStyles}
          />
        </div>
      </div >

    </div >
  );
};

export default ProductsAttr;
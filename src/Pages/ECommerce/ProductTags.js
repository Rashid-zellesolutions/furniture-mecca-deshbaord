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
import { SketchPicker } from 'react-color';

const ProductsTag = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tagData, setTagData] = useState({
    name: '',
    slug: '',
    description: '',
    tagType: '',
    additionalTextField: '',
    selectedOption: '', // For background color / text color / text dropdown
    backgroundColor: '#fff', // Default white
    textColor: '#000', // Default black
  });
  const rowsPerPage = 10;

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

  // async function fetchTableData() {
  //   setLoading(true);
  //   const URL = 'https://jsonplaceholder.typicode.com/users';
  //   const response = await fetch(URL);
  //   const users = await response.json();
  //   setLoading(false);
  // 988e8e 13.5 11.5
  // }

  const handleSearch = () => console.log('Search has been triggered');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTagData({ ...tagData, [name]: value });
  };

  const handleAddTag = async () => {
    // Create a FormData object
    const formData = new FormData();

    // Append form data
    formData.append('name', tagData.name);
    formData.append('slug', tagData.slug);
    formData.append('description', tagData.description);
    formData.append('tagType', tagData.tagType);

    try {
      setLoading(true); // Start loading state
      console.log('Form submission started with data:', tagData);

      const response = await axios.post('https://yourapi.com/endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle successful response
      console.log('Form submission successful:', response.data);

      // Optionally reset the form or update the UI here
      setTagData({
        name: '',
        slug: '',
        description: '',
        tagType: '',
      });

    } catch (error) {
      // Detailed error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error submitting form:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
        alert(`Error: ${error.response.data.message || 'An error occurred. Please try again.'}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Error: No response received:', error.request);
        alert('Error: No response from server. Please check your connection and try again.');
      } else {
        // Something else caused the error
        console.error('Error:', error.message);
        alert('Error: ' + error.message);
      }

      // Optionally reset the form state or handle the error state here
      // setTagData({...}); // Reset if necessary
    } finally {
      setLoading(false); // End loading state
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
      width: '90px', // Assign a width for this checkbox column
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      width: '185px', // Assign custom width
    },
    {
      name: 'Slug',
      selector: (row) => row.name,
      width: '140px', // Assign custom width
    },
    {
      name: 'Count',
      selector: (row) => row.price, // Assuming you want the price
      width: '115px', // Assign custom width
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
      width: '158px', // Assign custom width for action column
    },
  ];

  // Options for the Tag Type Dropdown
  const tagTypeOptions = [
    { value: 'Image', label: 'Image' },
    { value: 'Text', label: 'Text' },
  ];

  // Handler for dropdown change
  const handletagType = (selectedValue) => {
    setTagData((prevState) => ({
      ...prevState,
      tagType: selectedValue,  // Update the state with selected value
    }));
  };

  const handleAdditionalOptionChange = (selectedValue) => {
    setTagData({ ...tagData, selectedValue });
  };

  const handleColorChange = (color, field) => {
    setTagData({
      ...tagData,
      [field]: color.hex,
    });
  };

  const additionalOptions = [
    { value: 'backgroundColor', label: 'Background Color' },
    { value: 'textColor', label: 'Text Color' },
    { value: 'text', label: 'Text' },
  ];

  return (
    <div className="ProductTagPage">
      <div className="TagSection-01">
        <span className='Section1-Leftside'>
          Tags
        </span>
        <div className='Section1-Rightside'>
          <SearchBar onSearch={handleSearch} icon={searchIcon} placeholder="Search tag by name" />
        </div>
      </div>

      <div className="TagSection-02">
        <div className='Section2-Leftside'>
          <div className='Header'>Add New Tag</div>
          <div className="NewTag-Add">
            <form onSubmit={(e) => { e.preventDefault(); handleAddTag(); }}>
              <div className="form-row">
                <label htmlFor="name">Name<span className='superscript'>*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Category Name..."
                  value={tagData.name}
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
                  value={tagData.slug}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder='Enter Product Description here...'
                  value={tagData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <label htmlFor="tagType">Tag Type<span className='superscript'>*</span></label>
                <div className="custom-dropdown-wrapper">
                  <CustomDropdown
                    options={tagTypeOptions}
                    selectedOption={tagData.tagType}
                    handleOptionChange={handletagType}
                  />
                </div>
              </div>

              {/* Conditionally render additional fields if "Text" is selected */}
              {tagData.tagType === 'Text' && (
                <>
                  <div className="form-row">
                    <label htmlFor="additionalField">Select Field</label>
                    <CustomDropdown
                      options={additionalOptions}
                      selectedOption={tagData.selectedOption}
                      handleOptionChange={handleAdditionalOptionChange}
                    />
                  </div>
                </>
              )}

              <div className='SubmitBtn'>
                <CustomBtn
                  label="Add Tag"
                  className="AddCatBtn"
                  onClick={handleAddTag}
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

export default ProductsTag;
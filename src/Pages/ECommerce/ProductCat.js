import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './ECommerce.css';
import '../Page.css';
import CustomBtn from '../../Components/UI-Controls/Buttons/Btn';
import SearchBar from '../../Components/UI-Controls/SearchBar/Search';
import searchIcon from '../../Assets/Images/Search Bar 20 x 20.png';
import uploadIcon from '../../Assets/Images/UploadImg 24 x 24.png';
import DataTable from 'react-data-table-component';
import CustomPagination from '../../Components/UI-Controls/Pagination/Pagination';
import CustomDropdown from '../../Components/UI-Controls/Dropdown/dropdown';
import { AiOutlineEllipsis } from "react-icons/ai";
import { AiOutlineMore } from "react-icons/ai";
import defaultImage from "../../Assets/Images/defaultBannerImage 128 x 128.png";
import Loader from '../../Components/UI-Controls/Loader/Loader';
import TabBarView from '../../Components/UI-Controls/TabView/ProductCatTab'; // Import your TabBarView component

const ProductsCat = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [categoryData, setCategoryData] = useState({
  //   name: '',
  //   slug: '',
  //   parentCategory: '0',
  //   description: '',
  //   displayType: '',
  //   meun_order: '',
  //   permalink: '',
  // });
  const [categoryData, setCategoryData] = useState({
    name: '',
    slug: '',
    parentCategory: '',
    description: '',
    displayType: '',
    meun_order: '',
    permalink: '',
    meta: {
      // title: '',
      // description: '',
      // keywords: '',
      // canonical_url: '',
      // robots: '',
      // og_title: '',
      // og_description: '',
      og_image: '',
      // x_title: '',
      // x_description: '',
      x_image: '',
      // schemaMarkup: {}
    },
    bannerImage: null,
    thumbnailImage: null,
  });
  const [imagePreview, setImagePreview] = useState('');
  const [thumbnailimage, setThumbnailImage] = useState('');
  const [mobileimagePreview, setMobileImagePreview] = useState(null);
  const [mobilethumbnailimage, setMobileThumbnailImage] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [parentCatOpt, setParentCatOpt] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const rowsPerPage = 11;

  useEffect(() => {
    console.log('Fetching data...');
    fetchTableData();
  }, []);

  async function fetchTableData() {
    setLoading(true);
    const URL = 'https://fm.skyhub.pk/api/v1/productCategory/get';

    try {
      const response = await fetch(URL);
      const users = await response.json();
      console.log('The respective data is:', users);
      setLoading(false);

      // Reverse the categories and filter out categories with null or empty parent_name
      const reversedCategories = users.categories.reverse();
      const validParentCategories = reversedCategories
        .filter(cat => cat.name && cat.name.trim() !== '');

      // Map the filtered categories to an array of options
      const parentCatOptions = [
        { value: '', label: 'Select a parent category' }, // Empty option
        ...validParentCategories.map(cat => ({
          value: cat.uid,
          label: cat.name,
        })),
      ];

      // Set the options for the dropdown
      setParentCatOpt(parentCatOptions);
      setData(reversedCategories);  // In case you need the full dataset for other uses
      console.log(parentCatOptions);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  }

  const handleSearch = () => console.log('Search has been triggered');

  const handlePageChange = (page) => {
    console.log("Changing to page:", page);
    setCurrentPage(page);
  };

  console.log("Data Lenght:", data.length);

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      const allRowIds = data.map(row => row.uid);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows(prevSelected => {
      if (prevSelected.includes(rowId)) {
        return prevSelected.filter(id => id !== rowId);
      } else {
        return [...prevSelected, rowId];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'name') {
      // Handle slug and permalink generation from name
      const generatedSlug = value
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^a-z0-9\-]/g, ''); // Remove any non-alphanumeric characters except hyphens
  
      setCategoryData((prevState) => ({
        ...prevState,
        name: value,
        slug: generatedSlug,
        permalink: `/category/${generatedSlug}`,
      }));
    } else if (name === 'slug') {
      // Handle slug update manually
      const formattedSlug = value
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^a-z0-9\-]/g, ''); // Remove any non-alphanumeric characters except hyphens
  
      setCategoryData((prevState) => ({
        ...prevState,
        slug: formattedSlug,
        permalink: `/category/${formattedSlug}`,
      }));
    } else if (name === 'bannerImage' || name === 'thumbnailImage') {
      // Handle image upload for banner or thumbnail
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (name === 'bannerImage') {
            // Update the state for banner image preview and category data
            setImagePreview(reader.result);  // Update the image preview for banner
            setCategoryData((prevState) => ({
              ...prevState,
              bannerImage: file,  // Store the file itself for form submission
            }));
          } else if (name === 'thumbnailImage') {
            // Update the state for thumbnail image preview and category data
            setThumbnailImage(reader.result);  // Update the image preview for thumbnail
            setCategoryData((prevState) => ({
              ...prevState,
              thumbnailImage: file,  // Store the file itself for form submission
            }));
          }
        };
        reader.readAsDataURL(file);  // Read the file to generate a base64 string for preview
      }
    } else if (name in categoryData) {
      // Handle other fields directly in categoryData
      setCategoryData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name.startsWith('meta.')) {
      // Handle changes for the meta object
      const metaKey = name.split('.')[1]; // Extract the key from meta (e.g., 'title', 'description', etc.)
      setCategoryData((prevState) => ({
        ...prevState,
        meta: {
          ...prevState.meta,
          [metaKey]: value,
        },
      }));
    }
  };

  // Function to handle updating the category data
    const updateCategoryData = (newData) => {
        setCategoryData((prevState) => ({
            ...prevState,
            ...newData,
        }));
    };

  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;

  //   if (name === 'name') {
  //     // Handle slug and permalink generation from name
  //     const generatedSlug = value
  //       .toLowerCase()
  //       .replace(/\s+/g, '-') // Replace spaces with hyphens
  //       .replace(/[^a-z0-9\-]/g, ''); // Remove any non-alphanumeric characters except hyphens

  //     setCategoryData((prevState) => ({
  //       ...prevState,
  //       name: value,
  //       slug: generatedSlug,
  //       permalink: `/category/${generatedSlug}`,
  //     }));
  //   } else if (name === 'slug') {
  //     // Handle slug update manually
  //     const formattedSlug = value
  //       .toLowerCase()
  //       .replace(/\s+/g, '-') // Replace spaces with hyphens
  //       .replace(/[^a-z0-9\-]/g, ''); // Remove any non-alphanumeric characters except hyphens

  //     setCategoryData((prevState) => ({
  //       ...prevState,
  //       slug: formattedSlug,
  //       permalink: `/category/${formattedSlug}`,
  //     }));
  //   } else if (name === 'bannerImage' || name === 'thumbnailImage') {
  //     // Handle image upload for banner or thumbnail
  //     const file = files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         if (name === 'bannerImage') {
  //           // Update the state for banner image preview and category data
  //           setImagePreview(reader.result);  // Update the image preview for banner
  //           setCategoryData((prevState) => ({
  //             ...prevState,
  //             bannerImage: file,  // Store the file itself for form submission
  //           }));
  //         } else if (name === 'thumbnailImage') {
  //           // Update the state for thumbnail image preview and category data
  //           setThumbnailImage(reader.result);  // Update the image preview for thumbnail
  //           setCategoryData((prevState) => ({
  //             ...prevState,
  //             thumbnailImage: file,  // Store the file itself for form submission
  //           }));
  //         }
  //       };
  //       reader.readAsDataURL(file);  // Read the file to generate a base64 string for preview
  //     }
  //   } else {
  //     // Handle other fields as normal
  //     setCategoryData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   }
  // };

  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;
  
  //   if (name === 'name') {
  //     const generatedSlug = value
  //       .toLowerCase()
  //       .replace(/\s+/g, '-')
  //       .replace(/[^a-z0-9\-]/g, '');
  
  //     setCategoryData((prevState) => ({
  //       ...prevState,
  //       name: value,
  //       slug: generatedSlug,
  //       permalink: `/category/${generatedSlug}`,
  //     }));
  //   } else if (name === 'slug') {
  //     const formattedSlug = value
  //       .toLowerCase()
  //       .replace(/\s+/g, '-')
  //       .replace(/[^a-z0-9\-]/g, '');
  
  //     setCategoryData((prevState) => ({
  //       ...prevState,
  //       slug: formattedSlug,
  //       permalink: `/category/${formattedSlug}`,
  //     }));
  //   } else if (name === 'bannerImage' || name === 'thumbnailImage') {
  //     const file = files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         if (name === 'bannerImage') {
  //           setImagePreview(reader.result);
  //           setCategoryData((prevState) => ({
  //             ...prevState,
  //             bannerImage: file,
  //           }));
  //         } else if (name === 'thumbnailImage') {
  //           setThumbnailImage(reader.result);
  //           setCategoryData((prevState) => ({
  //             ...prevState,
  //             thumbnailImage: file,
  //           }));
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   } else if (name.startsWith('meta_')) {
  //     // Update the meta object specifically for meta fields
  //     setCategoryData((prevState) => ({
  //       ...prevState,
  //       meta: {
  //         ...prevState.meta,
  //         [name.replace('meta_', '')]: value, // Remove 'meta_' prefix before setting
  //       },
  //     }));
  //   } else {
  //     // Directly update other fields
  //     setCategoryData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   }
  // };
  
  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;

  //   if (name === 'name') {
  //     // Handle slug and permalink generation from name
  //     const generatedSlug = value
  //       .toLowerCase()
  //       .replace(/\s+/g, '-') // Replace spaces with hyphens
  //       .replace(/[^a-z0-9\-]/g, ''); // Remove any non-alphanumeric characters except hyphens

  //     setCategoryData((prevState) => ({
  //       ...prevState,
  //       name: value,
  //       slug: generatedSlug,
  //       permalink: `/category/${generatedSlug}`,
  //     }));
  //   } else if (name === 'slug') {
  //     // Handle slug update manually
  //     const formattedSlug = value
  //       .toLowerCase()
  //       .replace(/\s+/g, '-') // Replace spaces with hyphens
  //       .replace(/[^a-z0-9\-]/g, ''); // Remove any non-alphanumeric characters except hyphens

  //     setCategoryData((prevState) => ({
  //       ...prevState,
  //       slug: formattedSlug,
  //       permalink: `/category/${formattedSlug}`,
  //     }));
  //   } else if (name === 'bannerImage' || name === 'thumbnailImage') {
  //     // Handle image upload for banner or thumbnail
  //     const file = files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         if (name === 'bannerImage') {
  //           // Update the state for banner image preview and category data
  //           setImagePreview(reader.result);  // Update the image preview for banner
  //           setCategoryData((prevState) => ({
  //             ...prevState,
  //             bannerImage: file,  // Store the file itself for form submission
  //           }));
  //         } else if (name === 'thumbnailImage') {
  //           // Update the state for thumbnail image preview and category data
  //           setThumbnailImage(reader.result);  // Update the image preview for thumbnail
  //           setCategoryData((prevState) => ({
  //             ...prevState,
  //             thumbnailImage: file,  // Store the file itself for form submission
  //           }));
  //         }
  //       };
  //       reader.readAsDataURL(file);  // Read the file to generate a base64 string for preview
  //     }
  //   } else {
  //     // Handle other fields as normal
  //     setCategoryData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   }
  // };

  // Handle Mobile thumbnail and banner images function w.r.t States....

  const handlemobileImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setMobileImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlemobilethumbnailImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setMobileThumbnailImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle Category Add Form Submission and Update Methods by using Helper Function....

  const handleAddCate = async () => {
    try {
      setLoading(true); // Start loading state

      if (isEditing) {
        await handleUpdateCategory(editingCategoryId);  // Call helper function for update logic
      } else {
        const slugValue = generateSlug(categoryData.name, categoryData.slug);
        const permalinkValue = generatePermalink(slugValue);
        const formData = prepareFormData(categoryData, slugValue, permalinkValue); // Prepare form data

        console.log('Form submission started with data:', categoryData);

        await submitCategory(formData);  // Call helper function to submit the form

        resetForm();  // Reset the form after successful submission
      }
    } catch (error) {
      handleFormError(error);  // Call helper function to handle errors
    } finally {
      setLoading(false);  // End loading state
      console.log('Form submission ended.');
    }
  };

  const handleUpdateCategory = async (editingCategoryId) => {
    try {
      if (!editingCategoryId) {
        console.error('No valid editingCategoryId provided for update');
        alert('Cannot update the category: Missing category ID.');
        return;
      }

      const slugValue = generateSlug(categoryData.name, categoryData.slug);
      const permalinkValue = generatePermalink(slugValue);

      // Prepare the form data for the update
      const formData = prepareFormData(categoryData, slugValue, permalinkValue); // Use the same helper function

      // Debug: Log FormData content
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      // Debugging log
      console.log('Updating category with ID:', editingCategoryId);
      console.log('Updating category with data:', categoryData);

      // Make the API request to update the category
      const response = await axios.put(`https://fm.skyhub.pk/api/v1/productCategory/${editingCategoryId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Category updated successfully:', response.data);

      // Reset the form after a successful update
      resetForm();
      setIsEditing(false);  // Exit the editing mode

    } catch (error) {
      handleFormError(error);  // Use your existing error handling logic
    }
  };

  const generateSlug = (name, customSlug) => {
    return customSlug || name
      .toLowerCase()
      .replace(/\s+/g, '-')       // Replace spaces with hyphens
      .replace(/[^a-z0-9\-]/g, '');  // Remove invalid characters
  };

  const generatePermalink = (slugValue) => {
    return `/category/${slugValue}`;
  };

  // const prepareFormData = (data, slugValue, permalinkValue) => {
  //   const formData = new FormData();
  //   formData.append('name', data.name);
  //   formData.append('slug', slugValue);
  //   formData.append('parent', data.parentCategory || '0');
  //   formData.append('description', data.description);
  //   formData.append('display', data.displayType === "Show" ? "1" : "0");
  //   formData.append('meun_order', data.meun_order);
  //   formData.append('permalink', permalinkValue);

  //   // Append tabbarData fields
  //   for (const [key, value] of Object.entries(tabbarData)) {
  //     formData.append(key, value);
  // }

  //   const thumbnailImageInput = document.getElementById('thumbnailImage');
  //   if (thumbnailImageInput.files[0]) {
  //     formData.append('image', thumbnailImageInput.files[0]);
  //     console.log(thumbnailImageInput.files[0], "thi is")
  //   }

  //   const bannerImageInput = document.getElementById('bannerImage');
  //   if (bannerImageInput.files[0]) {
  //     formData.append('bannerImage', bannerImageInput.files[0]);
  //   }


  //   return formData;  // Return the prepared formData
  // };

  const prepareFormData = (data, slugValue, permalinkValue) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', slugValue);
    formData.append('parent', data.parentCategory || '0');
    formData.append('description', data.description);
    formData.append('display', data.displayType === "Show" ? "1" : "0");
    formData.append('meun_order', data.meun_order);
    formData.append('permalink', permalinkValue);

    // Append the meta object as JSON string
    formData.append('meta', JSON.stringify(data.meta));

    const thumbnailImageInput = document.getElementById('thumbnailImage');
    if (thumbnailImageInput.files[0]) {
      formData.append('image', thumbnailImageInput.files[0]);
    }

    const bannerImageInput = document.getElementById('bannerImage');
    if (bannerImageInput.files[0]) {
      formData.append('bannerImage', bannerImageInput.files[0]);
    }

    // Append the binary image data
    if (categoryData.meta.x_image) {
      formData.append('x_image', categoryData.meta.x_image); // Append the file object
  }

    return formData;  // Return the prepared formData
  };

  const submitCategory = async (formData) => {
    try {
      const response = await axios.post('https://fm.skyhub.pk/api/v1/productCategory/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Form submission successful:', response.data);
    } catch (error) {
      throw error;  // Rethrow the error to be handled by the main function
    }
  };

  const handleFormError = (error) => {
    if (error.response) {
      console.error('Error submitting form:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
      alert(`Error: ${error.response.data.message || 'An error occurred. Please try again.'}`);
    } else if (error.request) {
      console.error('Error: No response received:', error.request);
      alert('Error: No response from server. Please check your connection and try again.');
    } else {
      console.error('Error:', error.message);
      alert('Error: ' + error.message);
    }
  };

  const resetForm = () => {
    setCategoryData({
      name: '',
      slug: '',
      meun_order: '',
      parentCategory: '',
      description: '',
      displayType: '',
      thumbnailImage: '',
      bannerImage: '',
      permalink: '',
    });
    setIsEditing(false);
    setEditingCategoryId(null);
    setImagePreview(null); // Reset banner-image preview
    setThumbnailImage(null); // Reset thumbnail-image preview
    setMobileImagePreview(null);
    setMobileThumbnailImage(null);
    fetchTableData();
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
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={selectedRows.length === data.length && data.length > 0}
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          style={{ margin: 0 }}
          onChange={() => handleRowSelect(row.uid)}
          checked={selectedRows.includes(row.uid)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '50px',
    },
    {
      name: 'Image',
      cell: (row) => (
        <img
          src={row.image ? `http://fm.skyhub.pk${row.image}` : defaultImage}
          alt={row.name}
          width="auto"
          height="40px"
          style={{ objectFit: 'cover' }}
        />
      ),
      width: '100px',
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      width: '120px',
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      width: '150px',
    },
    {
      name: 'Slug',
      selector: (row) => row.slug,
      width: '100px',
    },
    {
      name: 'Count',
      selector: (row) => row.uid,
      width: '80px',
    },
    {
      name: 'Action',
      cell: (row) => {
        const isActive = activeRowId === row._id;

        return (
          <div style={{ position: 'relative' }}>
            <button
              style={{
                width: '30px',
                height: '30px',
                border: 'none',
                borderRadius: '5px',
                boxShadow: '0px 0px 8px 0px #0000001A',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
              }}
              onClick={() => {
                if (isActive) {
                  setActiveRowId(null);
                } else {
                  setActiveRowId(row._id);
                }
              }}
            >
              {isActive ? <AiOutlineMore /> : <AiOutlineEllipsis />} {/* Toggle icons */}
            </button>
            {isActive && (
              <div
                className="dropdown"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '30px',
                  transform: 'translateY(-5%)',
                  backgroundColor: 'white',
                  border: 'none',
                  zIndex: 1,
                  width: '184px',
                  height: '167px',
                  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                  gap: 10,
                  fontFamily: 'poppins',
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                <ul style={{ listStyleType: 'none', padding: '5px', margin: '10px' }}>
                  <li
                    style={{ padding: '5px', cursor: 'pointer' }}
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </li>

                  <li
                    style={{ padding: '5px', cursor: 'pointer' }}
                    onClick={() => {
                      console.log('Quick Edit clicked for:', row._id, 'Data:', row);
                    }}
                  >
                    Quick Edit
                  </li>
                  <li
                    style={{ padding: '5px', cursor: 'pointer' }}
                    onClick={() => confirmDelete(row._id)}
                  >
                    Delete
                  </li>
                  <li
                    style={{ padding: '5px', cursor: 'pointer' }}
                    onClick={() => {
                      console.log('View clicked for:', row._id, 'Data:', row);
                    }}
                  >
                    View
                  </li>
                  <li
                    style={{ padding: '5px', cursor: 'pointer' }}
                    onClick={() => {
                      console.log('Duplicate clicked for:', row._id, 'Data:', row);
                    }}
                  >
                    Duplicate
                  </li>
                </ul>
              </div>
            )}
          </div>
        );
      },
      width: '85px',
    }
  ];

  const handleEdit = (row) => {
    setIsEditing(true);
    setEditingCategoryId(row._id);

    // Find the parent category name by matching the parent uid with the dropdown options
    const parentCategoryOption = parentCatOpt.find(opt => opt.value === row.parent);

    // Populate the form with the data from the selected row
    setCategoryData({
      name: row.name || '',
      slug: row.slug || '',
      meun_order: row.meun_order || '',
      parentCategory: parentCategoryOption ? parentCategoryOption.label : 'Select a parent category',  // Set the parent name instead of uid
      description: row.description || '',
      displayType: row.display === 1 ? 'Show' : 'Hide',
      thumbnailImage: row.image ? `http://fm.skyhub.pk${row.image}` : '',
      bannerImage: row.bannerImage ? `http://fm.skyhub.pk${row.bannerImage}` : '',
      permalink: row.permalink || '',
    });

    // Set the preview images based on the data
    const thumbnailPreview = row.image ? `http://fm.skyhub.pk${row.image}` : '';
    const bannerPreview = row.bannerImage ? `http://fm.skyhub.pk${row.bannerImage}` : '';

    // Set the state for preview images
    setThumbnailImage(thumbnailPreview); // Update the thumbnail preview state
    setImagePreview(bannerPreview);      // Update the banner preview state

    // Debug logs for verification
    console.log('Thumbnail Image Preview:', thumbnailPreview);
    console.log('Banner Image Preview:', bannerPreview);
  };

  const displayTypeOptions = [
    { value: 'Show', label: 'Show' },
    { value: 'Hide', label: 'Hide' },
  ];

  const handleParentCat = (selectedValue) => {
    setCategoryData((prevState) => ({
      ...prevState,
      parentCategory: selectedValue,
    }));
  };

  const handleDisplayType = (selectedValue) => {
    setCategoryData((prevState) => ({
      ...prevState,
      displayType: selectedValue,
    }));
  };

  // Category Delete Functions...

  const confirmDelete = (id) => {
    setCurrentRowId(id); // Set the ID of the item to delete
    setShowConfirm(true); // Show confirmation dialog
  };

  const handleDelete = () => {
    console.log(`Deleting item with ID: ${currentRowId}`); // Log the ID before deletion
    if (currentRowId) {
      deleteItem(currentRowId);
      setShowConfirm(false); // Close the confirmation dialog
    }
  };

  const deleteItem = async (id) => {
    try {
      console.log(`Attempting to delete item with ID: ${id}`); // Log the ID
      const response = await fetch(`https://fm.skyhub.pk/api/v1/productCategory/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json(); // Check response data if needed
      console.log(`Delete response: `, responseData);

      console.log(`Item with ID ${id} deleted successfully.`);

      // Update local state to remove the deleted item
      setData((prevItems) => prevItems.filter(item => item._id !== id));

    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete the item. Please try again.');
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false); // Close the confirmation dialog
  };

  const cancelThumbnailImage = () => {
    setThumbnailImage(null);
  };

  const cancelBannerImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="ProductCatPage">
      <div className="CatSection-01">
        <span className='Section1-Leftside'>
          Categories
        </span>
        <div className='Section1-Rightside'>
          <SearchBar onSearch={handleSearch} icon={searchIcon} placeholder="Search category by name" />
        </div>
      </div>

      <div className="CatSection-02">
        <div className='Section2-Leftside'>
          <div className='Header'>{isEditing ? "Edit Category" : "Add New Category"}</div>
          <div className="NewCat-Add">
            {loading && (
              <div className="backdrop">
                <Loader />
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleAddCate(); }}>
              <div className="form-row">
                <label htmlFor="name">Name<span className='superscript'>*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Category Name..."
                  value={categoryData.name}
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
                  value={categoryData.slug}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="meun_order">Menu Order<span className='superscript'>*</span></label>
                <input
                  type="number" // Change to number for validation
                  id="meun_order"
                  name="meun_order"
                  placeholder='Enter Menu Order...'
                  value={categoryData.meun_order}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="parentCategory">
                  Parent Category<span className="superscript">*</span>
                </label>
                <div className="custom-dropdown-wrapper">
                  <CustomDropdown
                    options={parentCatOpt}  // Passing the filtered categories as options
                    selectedOption={categoryData.parentCategory || ''}  // Use '' as default for selected option
                    handleOptionChange={handleParentCat}
                  />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder='Enter Product Description here...'
                  value={categoryData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <label htmlFor="displayType">Display Type<span className='superscript'>*</span></label>
                <div className="custom-dropdown-wrapper">
                  <CustomDropdown
                    options={displayTypeOptions}
                    selectedOption={categoryData.displayType}
                    handleOptionChange={handleDisplayType}
                  />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="thumbnailImage">Thumbnail Image</label>
                <div className="banner-upload">
                  {thumbnailimage ? (
                    <div className="image-preview-wrapper">
                      <img src={thumbnailimage} alt="Thumbnail" className="image-preview" />
                      <button onClick={cancelThumbnailImage} className="cancel-button">X</button>
                    </div>
                  ) : (
                    <label htmlFor="thumbnailImage" className="upload-label">
                      <div className="Catupload-button">
                        <img src={uploadIcon} alt="" className="uploaded-image" id="uploaded-image-1" />
                      </div>
                      <span className="upload-text">Click to Upload Image</span>
                    </label>
                  )}
                  <input
                    type="file"
                    id="thumbnailImage"
                    name="thumbnailImage"
                    className="upload-input"
                    accept="image/*"
                    onChange={handleInputChange}
                    style={{ display: thumbnailimage ? 'none' : 'none' }} // Hide input when image is selected
                  />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="bannerImage">Banner Image</label>
                <div className="banner-upload">
                  {imagePreview ? (
                    <div className="image-preview-wrapper">
                      <img src={imagePreview} alt="Banner" className="image-preview" />
                      <button onClick={cancelBannerImage} className="cancel-button">X</button>
                    </div>
                  ) : (
                    <label htmlFor="bannerImage" className="upload-label">
                      <div className="Catupload-button">
                        <img src={uploadIcon} alt="" className="uploaded-image" id="uploaded-image" />
                      </div>
                      <span className="upload-text">Click to Upload Image</span>
                    </label>
                  )}
                  <input
                    type="file"
                    id="bannerImage"
                    name="bannerImage"
                    className="upload-input"
                    accept="image/*"
                    onChange={handleInputChange}
                    style={{ display: imagePreview ? 'none' : 'none' }} // Hide input when image is selected
                  />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="mobilethumbnailImage">Mobile Thumbnail Image</label>
                <div className="banner-upload">
                  <label htmlFor="mobilethumbnailImage" className="upload-label">
                    <div className="Catupload-button">
                      <img
                        src={uploadIcon}
                        alt=""
                        className="uploaded-image"
                        id="uploaded-image-2"
                      />
                    </div>
                    <span className="upload-text">Click to Upload Image</span>
                  </label>
                  <input
                    type="file"
                    id="mobilethumbnailImage"
                    name="mobilethumbnailImage"
                    className="upload-input"
                    accept="image/*"
                    onChange={handlemobilethumbnailImageUpload}
                  />
                </div>
                {/* Optional: Display thumbnail image */}
                {mobilethumbnailimage && <img src={mobilethumbnailimage} alt="Mobile Thumbnail Image" className="image-preview" />}
              </div>

              <div className="form-row">
                <label htmlFor="mobilebannerImage">Mobile Banner Image</label>
                <div className="banner-upload">
                  <label htmlFor="mobilebannerImage" className="upload-label">
                    <div className="Catupload-button">
                      <img
                        src={uploadIcon}
                        alt=""
                        className="uploaded-image"
                        id="uploaded-image-3"
                      />
                    </div>
                    <span className="upload-text">Click to Upload Image</span>
                  </label>
                  <input
                    type="file"
                    id="mobilebannerImage"
                    name="mobilebannerImage"
                    className="upload-input"
                    accept="image/*"
                    onChange={handlemobileImageUpload}
                  />
                </div>
                {/* Optional: Display banner image preview */}
                {mobileimagePreview && <img src={mobileimagePreview} alt="Mobile Image Preview" className="image-preview" />}
              </div>

              <div className="form-row">
                <label>Permalink</label>
                <div className='permaDisplay' title={`https://furnituremecca.zellesolutions.com${categoryData.permalink}`}>https://furnituremecca.zellesolutions.com{categoryData.permalink}</div>
              </div>

              {/* <div className="form-row">
                <TabBarView
                  handleInputChange={handleInputChange}
                  tabbarData={tabbarData}
                />
              </div> */}

              <div className="form-row">
                <TabBarView
                  handleInputChange={handleInputChange}
                  updateCategoryData={updateCategoryData} 
                  metaData={categoryData.meta}
                  categoryData={categoryData}
                />
              </div>

              <div className='SubmitBtn'>
                <CustomBtn
                  // label="Add Category"
                  label={isEditing ? "Update Category" : "Add Category"}
                  className="AddCatBtn"
                  onClick={handleAddCate}
                  type="button" // Ensure it's still a button to prevent default submission
                />
              </div>
            </form>
          </div>
        </div >
        <div className='Section2-Rightside'>
          <DataTable
            columns={columns}
            data={Array.isArray(data) ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) : []}
            pagination
            paginationComponent={() => (
              <CustomPagination
                rowsPerPage={rowsPerPage}
                rowCount={Array.isArray(data) ? data.length : 0}
                currentPage={currentPage}
                onChangePage={handlePageChange}
              />
            )}
            customStyles={customStyles}
          />
        </div>
      </div >

      {showConfirm && (
        <div style={styles.confirmationDialog}>
          <p>Are you sure you want to delete this item?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}


    </div >
  );
};

// Styles for the confirmation dialog
const styles = {
  confirmationDialog: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    borderRadius: '5px',
  },
};

export default ProductsCat;



{/* <div className="form-row">
                <label htmlFor="thumbnailImage">Thumbnail Image</label>
                <div className="banner-upload">
                  <label htmlFor="thumbnailImage" className="upload-label">
                    <div className="Catupload-button">
                      <img
                        src={uploadIcon}
                        alt=""
                        className="uploaded-image"
                        id="uploaded-image-1"
                      />
                    </div>
                    <span className="upload-text">Click to Upload Image</span>
                  </label>
                  <input
                    type="file"
                    id="thumbnailImage"
                    name="thumbnailImage"
                    className="upload-input"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </div>
                {thumbnailimage && <img src={thumbnailimage} alt="Thumbnail Image" className="image-preview" />}
              </div>

              <div className="form-row">
                <label htmlFor="bannerImage">Banner Image</label>
                <div className="banner-upload">
                  <label htmlFor="bannerImage" className="upload-label">
                    <div className="Catupload-button">
                      <img
                        src={uploadIcon}
                        alt=""
                        className="uploaded-image"
                        id="uploaded-image"
                      />
                    </div>
                    <span className="upload-text">Click to Upload Image</span>
                  </label>
                  <input
                    type="file"
                    id="bannerImage"
                    name="bannerImage"
                    className="upload-input"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </div>
                {imagePreview && <img src={imagePreview} alt="Banner Image" className="image-preview" />}
              </div> */}
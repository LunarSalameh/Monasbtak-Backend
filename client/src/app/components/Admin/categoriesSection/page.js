"use client";

import { RiDeleteBinLine } from "react-icons/ri";
import React, { useState, useEffect } from 'react';
import './page.css';

export default function CategoriesSection() {
    const [categories, setCategories] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [updatedCategoryName, setUpdatedCategoryName] = useState("");
    const [added, setAdded] = useState(false);

    const handleAddedCategoryClose = () => {
        setAdded(false);
    };

    const fetchCategories = () => {
        setLoading(true);
        fetch('http://localhost/Monasbtak-Backend/php/api/admin/categories/categories.php')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategories(data);
                } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
                    setCategories(data.data);
                } else {
                    console.error('Fetched data is not an array or does not contain categories:', data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleEdit = async (index) => {
        if (editIndex === index) {
            const categoryToUpdate = categories[index];
            try {
                const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/categories/updatecategory.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: categoryToUpdate.name, updatedName: updatedCategoryName }),
                });

                const result = await response.json();
                if (result.success) {
                    fetchCategories();
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Error updating category:', error);
                alert('Failed to update category. Please try again later.');
            }
            setEditIndex(null);
            setUpdatedCategoryName('');
        } else {
            setEditIndex(index);
            setUpdatedCategoryName(categories[index].name);
        }
    };

    const openModal = (index) => {
        setCategoryToDelete(index);
        setShowModal(true);
    };

    const handleDelete = async () => {
        const categoryToDeleteData = categories[categoryToDelete];
        try {
            const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/categories/deletecategory.php', {
                method: 'POST',
                body: JSON.stringify({ name: categoryToDeleteData.name }),  // Delete based on 'name'
                headers: { 'Content-Type': 'application/json' },
            });

            const result = await response.json();
            if (result.success) {
                fetchCategories();
                closeModal();
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category. Please try again later.');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setCategoryToDelete(null);
    };

    const handleCategoryNameChange = (e) => setNewCategoryName(e.target.value);

    const handleImageChange = (e) => setSelectedImageFile(e.target.files[0]);

    const handleAddCategory = async () => {
        if (!newCategoryName || !selectedImageFile) {
            alert('Please provide a category name and an image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', newCategoryName);
        formData.append('image', selectedImageFile);

        try {
            const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/categories/addcategory.php', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                fetchCategories();
                resetForm();
                setAdded(true); // Set added to true when category is successfully added
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error adding category:', error);
            alert('An error occurred while adding the category.');
        }
    };

    const resetForm = () => {
        setNewCategoryName('');
        setSelectedImageFile(null);
    };

    return (
        <div className="page-container">
    
            <div className="categories-container">
                <div className="header">
                    <span className="large-font-size bold-font">Categories Section</span>
                </div>
                <hr className="line" />
                <div className="grid grid-cols-3 max-md:grid-cols-2  max-sm:grid-cols-1 gap-5">
                    {loading ? ( 
                        <div className="loading-spinner">Loading...</div>
                    ) : categories === null || categories.length === 0 ? (
                        <div>No categories found</div>
                    ) : (
                        Array.isArray(categories) && categories.map((category, index) => (
                            <div
                                key={index}
                                className="flex flex-col flex-flex-wrap  gap-2 border-gray-200 border-2 rounded-xl p-2 hover:bg-gray-100 hover:shadow-lg hover:border-[#d9b34d]"
                            >
                                {/* Image */}
                                <figure className="relative">
                                    {/* Remove */}
                                    <div
                                        className="bg-[#5a5a5a8e] top-2 right-2 w-fit rounded-lg text-white p-2 absolute cursor-pointer"
                                        onClick={() => openModal(index)}
                                    >
                                        <RiDeleteBinLine />
                                    </div>
                                    <img src={`data:image/jpeg;base64,${category.image}`} className="rounded-lg h-40 w-72 object-cover" />
                                </figure>

                                {/* Title with Edit/Save Button */}
                                <div className="flex justify-between items-center gap-3">
                                    {/* Title */}
                                    <div>
                                        {editIndex === index ? (
                                            <input
                                                className="border-2 rounded-lg border-gray-400 px-2"
                                                placeholder="Category Name"
                                                value={updatedCategoryName}
                                                onChange={(e) => setUpdatedCategoryName(e.target.value)}
                                            />
                                        ) : (
                                            <p>{category.name}</p>
                                        )}
                                    </div>

                                    {/* Edit/Save Button */}
                                    <button
                                        className="bg-[#d9b34d] w-fit px-3 py-1 rounded-lg text-white"
                                        onClick={() => handleEdit(index)}
                                    >
                                        {editIndex === index ? "Save" : "Edit"}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
                        <div className="bg-white w-[30%] p-5 rounded-lg text-center">
                            <p className="text-xl">Are you sure you want to delete this category?</p>
                            <div className="flex justify-center gap-3 mt-4">
                                <button
                                    className="bg-[#d9b34d] hover:bg-[#d9b44dc1] w-fit px-3 py-1 rounded-lg text-white"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-[#d9b34d] hover:bg-[#d9b44dc1] w-fit px-3 py-1 rounded-lg text-white"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {added && (
                    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
                        <div className="bg-white w-[30%] p-5 rounded-lg text-center">
                            <span className='text-xl'>Category Created Successfully</span>
                            <div className="flex justify-center gap-3 mt-4">
                            <button className='bg-[#d9b34d] hover:bg-[#d9b44dc1] w-fit px-3 py-1 rounded-lg text-white'
                                     onClick={handleAddedCategoryClose}>
                                OK
                            </button>
                            </div>
                        </div>
                    </div>
                 )}
            </div>
                   {/* Add New Category Form */}
      <div className="categories-container">
        <div className="header">
                    <span className="large-font-size bold-font">Add New Category</span>
                </div>
            <hr className="line" />
            
        <form className="category-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategoryName}
            onChange={handleCategoryNameChange}
          />
          <input type="file" onChange={handleImageChange} />
          <button type="button" onClick={handleAddCategory}>
            Add Category
          </button>
        </form>
      </div>
        </div>
    );
}
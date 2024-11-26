"use client";

import { RiDeleteBinLine } from "react-icons/ri";
import React, { useState } from 'react';
import './page.css';

export default function CategoriesSection() {
    const [categories, setCategories] = useState([
        { name: "Wedding", image: '/wedding-category.jpg' },
        { name: "Graduation", image: '/grad-category.jpg' },
        { name: "Maternity", image: '/maternity.jpg' },
        { name: "Birthday", image: '/birthday.jpg' },
        { name: "Formal Event", image: '/formal.jpg' },
        { name: "Customized", image: '/customized.png' },
    ]);

    const [editIndex, setEditIndex] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const handleEdit = (index) => {
        if (editIndex === index) {
            const updatedCategories = [...categories];
            updatedCategories[index].name = newCategoryName;
            setCategories(updatedCategories);
            setEditIndex(null);
            setNewCategoryName("");
        } else {
            setEditIndex(index);
            setNewCategoryName(categories[index].name);
        }
    };

    const openModal = (index) => {
        setCategoryToDelete(index);
        setShowModal(true);
    };

    const handleDelete = () => {
        setCategories(categories.filter((_, index) => index !== categoryToDelete));
        setShowModal(false);
        setCategoryToDelete(null);
    };

    const closeModal = () => {
        setShowModal(false);
        setCategoryToDelete(null);
    };

    return (
        <div className="page-container">
            <div className="categories-container">
                <div className="header">
                    <span className="large-font-size bold-font">Categories Section</span>
                </div>
                <hr className="line" />

                <div className="grid grid-cols-3 max-md:grid-cols-2  max-sm:grid-cols-1 gap-5">
                    {categories.map((category, index) => (
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
                                <img src={category.image} className="rounded-lg h-40 w-72 object-cover" />
                            </figure>

                            {/* Title with Edit/Save Button */}
                            <div className="flex justify-between items-center gap-3">
                                {/* Title */}
                                <div>
                                    {editIndex === index ? (
                                        <input
                                            className="border-2 rounded-lg border-gray-400 px-2"
                                            placeholder="Category Name"
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
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
                    ))}
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
            </div>
        </div>
    );
}

'use client';
import {React,useState, useEffect} from 'react'
import './page.css'
import { IoIosSearch } from "react-icons/io";
import { Icon } from '@iconify/react';
import { useSearchParams } from 'next/navigation';
import { OrbitProgress } from 'react-loading-indicators';


function page() {
  const searchParams = useSearchParams();
    const id = searchParams.get('id'); 
    const [currentSlide, setCurrentSlide] = useState(0);
    const [packages, setPackages] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(packages.length / 2));
      };
    
      const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(packages.length / 2)) % Math.ceil(packages.length / 2));
      };

      useEffect(() => {
        const fetchPackages = async () => {
          try {
            const planner_id = id; 
            const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/planner/packages/getPlannerPackages.php?planner_id=${planner_id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const result = await response.json();
            if (!result.data || result.data.length === 0) {
              setPackages(null); 
            }
            else if (result.status === 'error') {
              console.error(result.message);
              setPackages(null); 
            } else {
              setPackages(result.data);
            }
          } catch (error) {
            console.error('Error fetching packages:', error);
            setPackages(null); 
          } finally {
            setLoading(false); 
          }
        };

        fetchPackages();
      }, [id]);

      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch('http://localhost/Monasbtak-Backend/php/api/planner/packages/getCategorySub.php');
            const result = await response.json();
            setCategories(result.categories);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
      }, []);

      const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown Category';
      };

      const filteredPackages = packages ? packages.filter(pkg => 
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        getCategoryName(pkg.category_id).toLowerCase().includes(searchTerm.toLowerCase())
      ) : [];

  return (
    <div className='page-container'>
        <div className='packages-container'>
        <div className='main-top'>
            <div className='header'>
            <span className='large-font-size bold-font'>Available Packages</span>
            </div>
            <div className="search-container">
                <IoIosSearch className="search-icon" />
                <input 
                  type="search" 
                  className="search-bar mid-font-size" 
                  placeholder="Search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <hr className='line'/>
        <div className='slider'>
          <button className='arrow left-arrow' onClick={prevSlide}>
            <svg className="h-8 w-8 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
            </svg>
          </button>
          <div className='slides'>
          {loading ? (
                <div className='flex w-full justify-center justify-items-center'>
                    <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#D9B349" />
                </div> 
                ) : (
          filteredPackages.length === 0 ? (
            <div>No packages found</div>
          ) : (
            filteredPackages.slice(currentSlide * 2, currentSlide * 2 + 2).map((pkg, index) => (
              <div className='Package-Box' key={index}>
                <div className='Package-img-container'>
                  <img src={`data:image/jpeg;base64,${pkg.image}`} className='Package-img'/>
                  <span className='Price-tag'>$ {pkg.price}</span>
                </div>
                <div className='Package-details'>
                  <span className='mid-font-size'>{pkg.name}</span>
                  <span className='display'>{pkg.description}</span>
                  <span className='display'>{getCategoryName(pkg.category_id)}</span>                  
                  <span className='display'>{pkg.subCat_name}</span>
                  <div className='row-flex'>
                    <div className='location'>
                      <Icon icon="hugeicons:location-04" className="Location-icon" />
                      <span>{pkg.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ))}
          </div>
          <button className='arrow right-arrow' onClick={nextSlide}>
            <svg className="h-8 w-8 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>
        </div>
    </div>
    </div>
  )
}

export default page
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import stl from "./Categories.module.css";
import { useSearchParams } from "next/navigation";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get user ID from the query parameters

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost/Monasbtak-Backend/php/api/admin/categories/categories.php");
        const result = await response.json();

        // Log the result to check the category data
        console.log("Categories fetched:", result);

        if (response.ok && Array.isArray(result) && result.length > 0) {
          setCategories(result);
        } else {
          console.error("Unexpected API response:", result);
          alert("Failed to load categories.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={stl.pageContainer}>
      <span className={`${stl.largeFontSize} ${stl.fontColor} ${stl.boldFont}`}>Categories</span>
      <hr className={stl.line}/>
      <div id="categories" className={`container ${stl.wrapper}`}>
        {loading ? ( // Show spinner while loading
          <div className={stl.spinner}>Loading...</div>
        ) : (
          <div className={stl.Container}>
            {categories.map((category) => (
              <Link
                key={category.id}
                className={stl.categoryCard}
                href={`/customers/subCategories?id=${id}&categoryId=${category.id}`}
              >
                <div className={stl.cardHeader}>
                  <img
                    src={`data:image/jpeg;base64,${category.image}`}
                    alt={category.name}
                    className={stl.categoryImage}
                  />
                </div>

                <div className={stl.cardBody}>
                  <h3 className={stl.categoryName}>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Categories;

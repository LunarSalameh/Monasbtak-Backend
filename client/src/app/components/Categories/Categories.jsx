"use client";
import Link from "next/link";
import stl from "./Categories.module.css";

const categories = [
  { id: 1, name: "Wedding", image: '/wedding-category.jpg' },
  { id: 2, name: "Graduation", image: '/grad-category.jpg' },
  { id: 3, name: "maternity", image: '/maternity.jpg' },
  { id: 4, name: "Bithday", image: '/birthday.jpg' },
  { id: 5, name: "Formal event", image: '/formal.jpg' },
  { id: 6, name: "Customized", image: '/customized.png' },
];

const Categories = () => {
  return (
    <div className={stl.pageContainer}>
      <span className={`${stl.largeFontSize} ${stl.fontColor} ${stl.boldFont}`}>Categories</span>
      <hr className={stl.line}/>
      <div id="categories" className={`container ${stl.wrapper}`}>
      <div className={stl.Container}>
        {categories.map((category) => (
          <Link
            key={category.id}
            className={stl.categoryCard}
            href={`/customers/subCategories`}
          >
            <div className={stl.cardHeader}>
              <img
                src={category.image}
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
      </div>
    </div>
  );
};
export default Categories;

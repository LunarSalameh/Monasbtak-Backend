import stl from "./Scategories.module.css";

const Subcategories = [
  { id: 1, name: "Luxury", image: '/wedding4.jpg' },
  { id: 2, name: "Mid level", image: '/wedding.jpg' },
  { id: 3, name: "On Budget", image: '/wedding5.jpg' },
];

const Scategories = () => {
  return (
    <div className={stl.container}>
      <div className={stl.headLine}>
        <span className={`${stl.largeFontSize} ${stl.fontColor} ${stl.boldFont}`}>Sub Categories</span>
        <hr className={stl.line}/>
      </div>
      <div className={stl.cardsWrapper}>
        {Subcategories.map((Scategory) => (
          <div key={Scategory.id} className={stl.sCategoryCard}>
            <img
              src={Scategory.image}
              alt={Scategory.name}
              className={stl.sCategoryImage}
            />
            <h3 className={stl.sCategoryName}>{Scategory.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scategories;

import stl from "./WebsiteDesc.module.css";

const DescriptionCard = ({ img, description }) => {
  return (
    <div className={stl.card}>
      <div>
        <img src={img} alt="Calender" className="rounded-xl h-[290px]"/>
      </div>
      <p>{description}</p>
    </div>
  );
};

const WebsiteDesc = () => {
  return (
    <div className={stl.wrapper}>
      <span className={`${stl.largeFontSize} ${stl.fontColor} ${stl.boldFont}`}>What do we offer</span>
      <hr className={stl.line}/>

      <DescriptionCard
        img='/offer1.jpg' 
        description=" At Monasbtak, we bring together Jordan’s best event planners, venues, decorators, and photographers, all in one easy-to-use platform. Our goal is to make every step of planning your event smooth, inspiring, and tailored to your vision."
      />

      <DescriptionCard
        img='/offer2.jpg'
        description=" You can easily browse portfolios, read reviews, and make informed decisions all in one place, ensuring you receive top-quality services for a memorable event. To make things even easier, Monasbtak offers both customizable packages and tailored quotes to meet your unique requirements and budget."
      />
    </div>
  );
};
export default WebsiteDesc;

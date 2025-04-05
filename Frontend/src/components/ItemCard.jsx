import images from "../assets/images.jpeg"; 
import image2 from "../assets/image2.webp"; 

const ItemCard = ({ name, description, price }) => {
  return (
    <div className="overflow-hidden transition-all hover:shadow-md flex flex-col h-[300px]  rounded-xl bg-white border-2 border-gray-200">
      
      <div className="w-full h-[200px]  overflow-hidden">
        <img
          src={!price ? images : image2}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

  
      <div className="p-4 flex-1 flex flex-col justify-between ">
        <div>
          <h3 className="font-semibold text-lg truncate">{name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
        </div>
      </div>

     
      {!price ? (
        <div className="p-4 pt-0">
          <span className="text-sm text-blue-400 font-medium ml-auto cursor-pointer">View Content</span>
        </div>
      ) : (
        <div className="p-4 pt-0">
          <p className="font-semibold text-lg truncate text-blue-500">Price: {price}</p>
        </div>
      )}
    </div>
  );
};


export default ItemCard;



import CategoryDiv from "./CategoryDiv";

function CategoryNav() {
  return (
    <div className="text font-roboto flex gap-5 shadow  ps-36 items-center">
      <CategoryDiv />
      <a
        href="/"
        className="category-li ps-2 hover:text-cyan-600 transition-colors"
      >
        Cars
      </a>
      <a href="/" className="category-li hover:text-cyan-600 transition-colors">
        Motorcycles
      </a>
      <a href="/" className="category-li hover:text-cyan-600 transition-colors">
        Mobile Phones
      </a>
      <a href="/" className="category-li hover:text-cyan-600 transition-colors">
        For Sale: Houses & Apartments
      </a>
      <a href="/" className="category-li hover:text-cyan-600 transition-colors">
        Scooters
      </a>
      <a href="/" className="category-li hover:text-cyan-600 transition-colors">
        Commercial & Other Vehicles
      </a>
      <a href="/" className="category-li hover:text-cyan-600 transition-colors">
        For Rent: Houses & Apartments
      </a>
    </div>
  );
}

export default CategoryNav;

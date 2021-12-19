import react from "react";
import { FcSearch } from "react-icons/fc";

const SearchBar = (props) => {
  return (
    <div class="searchbar">
      <input type="text" value="" className="input--search" />
      <FcSearch className="icon icon--large icon--search" />
    </div>
  );
};

export default SearchBar;

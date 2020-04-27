import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const { image, name } = category;
  return (
    <Link to={"/find/" + category.name} className="CategoryItem">
      <span className="is-primary is-top is-medium tooltip">
        <figure className="image is-4by3 imageFade">
          <img style={{ borderRadius: "8px" }} src={image} alt="" />
        </figure>
        <div
          className="subtitle m-t-xs bold"
          style={{
            color: "#212121",
            fontWeight: 700,
            fontFamily:
              "Graphik Meetup,-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif",
          }}
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>
      </span>
    </Link>
  );
};

export default CategoryItem;

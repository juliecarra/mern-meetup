import React, { Component } from "react";
import PropTypes from "prop-types";

import { fetchCategories } from "../../actions";
import { connect } from "react-redux";

import CategoryItem from "./CategoryItem";

class Categories extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <section className="section">
        <div>
          <h1
            className="title"
            style={{
              fontSize: "20px",
              color: "#212121",
              fontFamily:
                "Graphik Meetup,-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif",
            }}
          >
            Categories
          </h1>
          <h2 style={{ color: "#212121", marginTop: "-20px" }}>
            Browse groups by topics you're interested in.
          </h2>
          <br />
          <div className="columns cover is-multiline is-mobile">
            {categories.map((category, i) => (
              <div
                key={i}
                className="column is-one-quarter "
                style={{ minHeight: "160px" }}
              >
                <CategoryItem category={category} key={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

Categories.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
  };
};

export default connect(mapStateToProps, { fetchCategories })(Categories);

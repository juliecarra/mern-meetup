import React from "react";

const HeroFind = (props) => {
  const { categoryName } = props;
  return (
    <section class="hero is-primary is-medium">
      <div class="hero-bg">
        <div class="hero-body">
          <div class="container hero-flex">
            <h1 class="title" style={{ fontWeight: 900 }}>
              Explore{" "}
              {categoryName && (
                <span>
                  {" "}
                  {categoryName.charAt(0).toUpperCase() +
                    categoryName.slice(1)}{" "}
                </span>
              )}
            </h1>

            <h2 class="subtitle">
              Find out what's happening in{" "}
              {categoryName && <span>{categoryName}</span>} Meetup groups around
              the world and start meeting up with the ones near you.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFind;

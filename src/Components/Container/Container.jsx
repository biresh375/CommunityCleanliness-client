import React from "react";

const Container = ({ children }) => {
  return (
    <div className="sm:max-w-full md:max-w-9/12 lg:max-w-10/12 mx-auto">
      {children}
    </div>
  );
};

export default Container;

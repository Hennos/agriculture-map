import React from 'react';

const createPresenter = items =>
  function Presenter({ presented, ...props }) {
    return Object.keys(items)
      .filter(key => key === presented)
      .map(key => {
        const Presented = items[key];
        return <Presented key={presented} {...props} />;
      });
  };

export default createPresenter;

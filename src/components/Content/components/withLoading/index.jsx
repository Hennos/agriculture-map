import React from 'react';

const withLoading = Component => ({ loaded, ...props }) => loaded && <Component {...props} />;

export default withLoading;

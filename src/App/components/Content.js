import React from 'react';

import contentStyles from './Content.css';

const Content = () => (
  <div className={contentStyles.wrapper}>
    <h1 className={contentStyles.heading}>Welcome!</h1>
    <p>
      You are all set. And can start working on your Application now.
    </p>
  </div>
);

export default Content;

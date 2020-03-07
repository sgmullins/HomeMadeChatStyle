import React from 'react';
import { Popup } from 'semantic-ui-react';

function PopupUtil({ content, children }) {
  return <Popup inverted content={content} trigger={children} />;
}

export default PopupUtil;

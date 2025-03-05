import React from 'react';
import { Message } from 'semantic-ui-react';

const UnauthorizedComponent = () => {
  return (
    <Message negative>
      <Message.Header>Unauthorized Access</Message.Header>
      <p>You do not have permission to view this page. Please contact your administrator for assistance.</p>
    </Message>
  );
};

export default UnauthorizedComponent;

import React from 'react'

const AlertMessage = ({ children }) => {
   console.log('ERROR CHILDREN: ', children);
   return (
      <div>
         <span>Error: </span>{children}
      </div>

   );
};
export default AlertMessage;
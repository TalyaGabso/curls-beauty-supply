import React from 'react'
import { Container } from 'react-bootstrap'

const Form = ({ children }) => {
   return (
      <Container>
         <div>
            {children}
         </div>
      </Container>
   );
};

export default Form;
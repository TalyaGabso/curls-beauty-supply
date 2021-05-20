import React from 'react'
// Pages
// Components
// CSS
import { Container, Row, Col } from 'react-bootstrap'


const Footer = () => {

   return (
      <footer>
         <Container>
            <Row>
               <Col className='text-center py-3'>
                  Copyright &copy; Curls Beauty Supply
               </Col>
            </Row>
         </Container>
      </footer>
   );
};

export default Footer;
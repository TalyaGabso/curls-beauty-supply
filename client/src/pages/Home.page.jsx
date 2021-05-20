import React from 'react';

// Pages

// Components
import TextureCard from '../components/TextureCard/TextureCard.component.jsx'
// CSS
import Typography from '@material-ui/core/Typography'


const HomePage = () => {

   return (
      <div className='homepage'>
         <h1>The Curls Beauty Supply Store</h1>
         <Typography variant="h4">a sentence about the curls beauty supply store mission</Typography>
         <TextureCard />
      </div>
   );
};

export default HomePage;
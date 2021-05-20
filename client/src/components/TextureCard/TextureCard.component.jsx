import React from 'react';
import { Link } from 'react-router-dom';
// Pages
// Components
// CSS

// data
const curlsType = [
   {
      image: 'link',
      type: 'Type 2',
      texture: 'Wavy'
   },
   {
      image: 'link',
      type: 'Type 3',
      texture: 'Curly'
   },
   {
      image: 'link',
      type: 'Type 4',
      texture: 'Coily'
   },
]

const CardLink = () => {
   return (
      <div className="card-container-texture">
         <h3>Shop By Curl Type</h3>
         {curlsType.map((type, index) =>
            <div key={index} className="texture-card" >
               <Link to={`shop/${type.texture}`}>
                  <p>image {type.image}</p>
                  <p><strong>{type.type}</strong></p>
                  <h4><strong>{type.texture}</strong></h4>
               </Link>
            </div>
         )}
      </div>
   );
};

export default CardLink;
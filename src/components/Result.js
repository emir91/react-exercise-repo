import React from 'react';
import Pet from './Pet';

const Result = ({ pets }) => {
    return (
        <div className="search">
            {!pets.length ? (
                <h1>No Result Found</h1>
            ) : (
                pets.map(pet => (
                    <Pet 
                      key={pet.id}
                      animal={pet.type}
                      name={pet.name}
                      breed={pet.breeds.primary}
                      media={pet.photos}
                      location={`${pet.contact.address.city}, ${
                        pet.contact.address.state
                      }`}
                      id={pet.id}
                    />
                ))
            )}  
        </div>
    );
};

export default Result;
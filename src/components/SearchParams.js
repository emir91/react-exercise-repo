import React, { useEffect, useState, useContext } from 'react';
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from '../custom-hooks/useDropdown';
import ThemeContext from '../context/ThemeContext';
import Result from './Result';

const SearchParams = () => {
    const [location, setLocation] = useState('Seattle, WA');
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
    const [pets, setPets] = useState([]);

    const [theme, setTheme] = useContext(ThemeContext);

    async function requestPets() {
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal
        })

        setPets(animals || []);
    }

    useEffect(() => {
        setBreeds([]);
        setBreed("");

        pet.breeds(animal)
            .then(({ breeds }) => {
                const breedStrings = breeds.map(({ name }) => name)
                setBreeds(breedStrings);
            }, console.error);
    }, [animal, setBreed, setBreeds])

    return (
            <div className="search-params">
                <form onSubmit={e => {
                    e.preventDefault();
                    requestPets();
                }}>
                    <label htmlFor="location">Location</label>
                    <input 
                        id="location" 
                        value={location} 
                        onChange={e => setLocation(e.target.value)}
                        placeholder="Enter location"/>
                        <AnimalDropdown />
                        <BreedDropdown />
                        <label htmlFor='theme'>
                            Theme
                            <select 
                                value={theme.buttonColor}
                                onChange={e => setTheme({...theme, buttonColor: e.target.value})}
                                onBlur={e => setTheme({...theme, buttonColor: e.target.value})}
                            >
                                <option value="darkblue">Darkblue</option>
                                <option value="peru">Peru</option>
                                <option value="chartreuse">Chartreuse</option>
                                <option value="mediumorchid">Mediumorchid</option>
                            </select>
                        </label>
                    <button style={{backgroundColor: theme.buttonColor}}>Search</button>
                </form>
                <Result pets={pets}/>
            </div>
    )
}

export default SearchParams;
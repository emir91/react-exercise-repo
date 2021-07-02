import React from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "../Modal";
import ThemeContext from "../context/ThemeContext";

class Details extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, isModalOpen: false };
  }
  
  componentDidMount() {
    pet
      .animal(+this.props.id)
      .then(({ animal }) => {
        this.setState({
          animalUrl: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${
            animal.contact.address.state
          }`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false
        });
      })
      .catch(err => this.setState({ error: err }));
  }

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen});

  adopt = () => navigate(this.state.animalUrl)

  render() {
    if (this.state.loading) {
      return <h1>loading … </h1>;
    }

    const { animal, breed, location, description, media, name, isModalOpen } = this.state;

    return (
      <div className="details">
          <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <ThemeContext.Consumer>
            {
              ([theme]) => (
                <button 
                  style={{backgroundColor: theme.buttonColor}}
                  onClick={this.toggleModal}
                  >Adopt {name}</button>
              )
            }
          </ThemeContext.Consumer>
         
          <p>{description}</p>
          { isModalOpen ? (
            <Modal>
              <div>
                <h1>Are sure you want to adopt {name}</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
          </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    )
};
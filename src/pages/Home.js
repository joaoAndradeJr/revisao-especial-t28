import React from 'react';
import { Link } from 'react-router-dom';
import CityCard from '../components/CityCard';
import { BASE_URL, TOKEN } from '../helpers';

class Home extends React.Component {
  state = {
    searchFor: '',
    searchedName: '',
    loading: false,
    cities: [],
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { searchFor } = this.state;
    fetch(`${BASE_URL}search.json?key=${TOKEN}&q=${searchFor}`)
      .then((resp) => resp.json())
      .then((data) => this.setState({ cities: data }))
      .catch((error) => new Error(error.message))
      .finally(() => this.setState({ searchedName: searchFor, searchFor: '', loading: false }));
  };

  render() {
    const { searchFor, loading, cities, searchedName } = this.state;
    return (
      <main>
        { loading
          ? <h1>Loading...</h1>
          : (
            <>
              <form onSubmit={ this.handleSubmit }>
                <label htmlFor="search-city-input">
                  <input
                    type="text"
                    id="search-city-input"
                    value={ searchFor }
                    name="searchFor"
                    onChange={ this.handleChange }
                  />
                </label>
                <button>Pesquisar Cidade</button>
              </form>
              <section>
                { cities.length > 0 &&
                    <h3>{ `Cidades encontradas com o nome: ${searchedName}` }</h3>
                }
                { cities.map((e, index) => (
                    <Link to={ `/forecast/${e.name}` }  key={ `${e.name}${index}` }>
                      <CityCard city={ e.name } />
                    </Link>
                ))}
              </section>
            </>
          )}
      </main>
    );
  }
}

export default Home;

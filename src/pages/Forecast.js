import React, { Component } from 'react';
import ForecastCard from '../components/ForecastCard';
import { BASE_URL, TOKEN } from '../helpers';

export default class Forecast extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { match: { params: { city } } } = this.props;
    fetch(`${BASE_URL}forecast.json?key=${TOKEN}&q=${city}`)
      .then((resp) => resp.json())
      .then(({ forecast: { forecastday }, location }) => (
        this.setState({ forecast: [{ forecastday, location}] })))
      .catch((error) => new Error(error.message))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { loading, forecast } = this.state;
    return (
      <section>
        { loading
          ? <h1>Loading...</h1>
          : (
            forecast.map((e) => (
              <ForecastCard forecast={ e } key={ e.location.name } />
            ))
          )}
      </section>
    );
  }
}

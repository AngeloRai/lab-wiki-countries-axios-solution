import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CountriesList extends Component {
  state = {
    countriesList: [],
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get('https://restcountries.eu/rest/v2/all');
      console.log(response);
      this.setState({ countriesList: [...response.data] });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="col-5" style={{ maxHeight: ' 90vh', overflow: 'scroll' }}>
        <div className="list-group">
          {this.state.countriesList.map((country) => {
            return (
              <Link
                key={country.alpha3Code}
                className="list-group-item list-group-item-action"
                to={country.alpha3Code}
              >
                <img src={country.flag} style={{ width: '15px' }} />{' '}
                {country.name}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CountriesList;

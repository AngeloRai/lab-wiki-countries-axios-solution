import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CountryDetails extends Component {
  state = {
    currentCountry: '',
    countriesList: [],
  };

  //   render -> componentDidMount ---Mudou State--> componentDidUpdate

  componentDidMount = async () => {
    // console.log(this.props.match.params);
    const response = await axios.get('https://restcountries.eu/rest/v2/all');
    this.setState({ countriesList: [...response.data] });
    this.getCountry();
  };

  componentDidUpdate = (prevProps, prevState) => {
    // console.log(this.props.match.params);
    const { country } = this.props.match.params; // equivalente: const country = this.props.match.params.country
    if (prevProps.match.params.country !== country) {
      this.getCountry();
    }
  };

  getCountry = async () => {
    const { country } = this.props.match.params; // equivalente: const country = this.props.match.params.country
    try {
      const response = await axios.get(
        `https://restcountries.eu/rest/v2/alpha/${country}`
      );
      console.log(response.data);
      this.setState({ currentCountry: { ...response.data } });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return this.state.currentCountry ? (
      <div className="col-7">
        <h1>{this.state.currentCountry.name}</h1>
        <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{ width: '30%' }}>Capital</td>
              <td>{this.state.currentCountry.capital}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {this.state.currentCountry.area} km
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                  {this.state.currentCountry.borders.map((code) => {
                    return (
                      <li key={code}>
                        <Link to={`/${code}`}>
                          {
                            this.state.countriesList.find(
                              (country) => country.alpha3Code === code
                            ).name
                          }
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ) : (
      ''
    );
  }
}

export default CountryDetails;

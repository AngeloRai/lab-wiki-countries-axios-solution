import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import CountriesList from './countriesList/CountriesList';
import CountryDetails from './countryDetails/CountryDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="row">
          <CountriesList />
          <Route path="/:country/cities/:city" component={CountryDetails} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

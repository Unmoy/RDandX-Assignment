import "./App.css";
import ExchangeCurrency from "./Components/ExchangeCurrency/ExchangeCurrency";
import Map from "./Components/Map/Map";

import Weather from "./Components/Weather/Weather";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 p-5">
          <Weather />
        </div>
        <div className="col-md-6">
          <Map></Map>
          <ExchangeCurrency></ExchangeCurrency>
        </div>
      </div>
    </div>
  );
}

export default App;

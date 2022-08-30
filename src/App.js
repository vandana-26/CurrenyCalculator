import "./styles.css";
import React, { Component } from "react";
import { currencyCalculator } from "./Components/currencyCalculator";
import { currencyMatrix } from "./Components/currencyMatrix";

function currenyCalculate(currencyCalculator, fromCurrency, toCurrency) {
  var result;
  currencyCalculator.filter(function (el) {
    if (el.base == fromCurrency && el.term == toCurrency) result = el;
  });
  return result;
}
// -1 relects Invalid Selection
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [...currencies],
      fromCurrency: "AUD",
      amount: "",
      toCurrency: "AUD",
      result: ""
    };
    this.selectFromHandler = this.selectFromHandler.bind(this);
    this.selectToHandler = this.selectToHandler.bind(this);
    this.submit = this.submit.bind(this);
  }
  selectFromHandler = (event) => {
    this.setState({
      fromCurrency: event.target.value
    });
  };
  selectToHandler = (event) => {
    this.setState({
      toCurrency: event.target.value
    });
  };
  submit = () => {
    var fromCurrency = this.state.fromCurrency;
    var toCurrency = this.state.toCurrency;
    var currencyCalculate1;
    var currencyCalculate = currenyCalculate(
      currencyCalculator,
      fromCurrency,
      toCurrency
    );
    let currencyMatrixCalculate = currencyMatrix.filter(function (el) {
      return (
        el.fromCurrency === fromCurrency &&
        el.toCurrency === toCurrency &&
        el.betweenCurrency === "INVARIABLE"
      );
    });

    let currencyMatrixCalculateEUR = currencyMatrix.filter(function (el) {
      return (
        el.fromCurrency === fromCurrency &&
        el.toCurrency === toCurrency &&
        el.betweenCurrency != "INVARIABLE"
      );
    });
    if (fromCurrency === toCurrency) {
      var resultcal = this.state.amount;
    } else if (currencyCalculate) {
      resultcal = currencyCalculate["rate"] * this.state.amount;
    } else if (currencyMatrixCalculate && currencyMatrixCalculate.length == 1) {
      resultcal = -1;
    } else if (currencyMatrixCalculateEUR.length === 1) {
      currencyCalculate = currenyCalculate(
        currencyCalculator,
        fromCurrency,
        toCurrency
      );
      currencyCalculate1 = currenyCalculate(
        currencyCalculator,
        fromCurrency,
        toCurrency
      );
      resultcal =
        this.state.amount *
        currencyCalculate["rate"] *
        currencyCalculate1["rate"];
    } else {
      currencyCalculate = currenyCalculate(
        currencyCalculator,
        fromCurrency,
        "USD"
      );
      currencyCalculate1 = currenyCalculate(
        currencyCalculator,
        "USD",
        toCurrency
      );
      console.log("currencyCalculate", currencyCalculate);
      console.log("currencyCalculate1", currencyCalculate1);
      if (currencyCalculate1)
        resultcal =
          this.state.amount *
          currencyCalculate["rate"] *
          currencyCalculate1["rate"];
      else resultcal = 0;
    }

    this.setState({
      result: Number(resultcal).toFixed(2)
    });
  };
  render() {
    return (
      <div className="App">
        <h1>Currency Convertor</h1>
        <div className="content">
          <label>From:</label>
          <select
            name="from"
            onChange={(event) => this.selectFromHandler(event)}
            value={this.state.fromCurrency}
          >
            {this.state.currencies.map((cur) => (
              <option key={cur.id}>{cur.name}</option>
            ))}
          </select>
          <span>&nbsp;&nbsp;</span>
          <label>Amount:</label>
          <input
            name="amount"
            type="text"
            value={this.state.amount}
            onChange={(event) => this.setState({ amount: event.target.value })}
          />
          <span>&nbsp;&nbsp;</span>
          <label>To:</label>
          <select
            name="to"
            onChange={(event) => this.selectToHandler(event)}
            value={this.state.toCurrency}
          >
            {this.state.currencies.map((cur) => (
              <option key={cur.id}>{cur.name}</option>
            ))}
          </select>
          <br></br>
          <br></br>
          <button name="convert" onClick={this.submit}>
            Convert
          </button>
          <br></br>
          <h2>{this.state.result}</h2>
        </div>
      </div>
    );
  }
}

var currencies = [
  {
    name: "AUD",
    id: 1
  },
  {
    name: "CAD",
    id: 2
  },
  {
    name: "CNY",
    id: 3
  },
  {
    name: "CZK",
    id: 4
  },
  {
    name: "DKK",
    id: 5
  },
  {
    name: "EUR",
    id: 6
  },
  {
    name: "GBP",
    id: 7
  },
  {
    name: "JPY",
    id: 8
  },
  {
    name: "NOK",
    id: 9
  },
  {
    name: "NZD",
    id: 10
  },
  {
    name: "USD",
    id: 11
  }
];

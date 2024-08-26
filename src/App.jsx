import { useReducer } from "react";
import "./styles.css";


const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  isLoan: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return { ...state, balance: 500, isActive: true };
    case "deposit":
      return { ...state, balance: state.balance + 150 };
    case "withdrawl":
      return state.balance >= 50 ? { ...state, balance: state.balance - 50 } : { ...state };
    case "getLoan":
      return state.isLoan
        ? { ...state }
        : { ...state, balance: state.balance + 5000, isLoan: true };
    case "payLoan":
      return state.balance >= 5000
        ? { ...state, balance: state.balance - 5000, isLoan: false }
        : { ...state };
    case "closeAccount":
      return { ...initialState };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [{ balance, loan, isActive, isLoan }, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance} €</p>
      <p>Loan: {loan} €</p>

      <p>
        <button onClick={() => dispatch({ type: "openAccount" })} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "deposit" })} disabled={!isActive}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "withdrawl" })} disabled={!isActive}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "getLoan" })} disabled={!isActive || isLoan}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "payLoan" })} disabled={!isActive || !isLoan}>
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive || isLoan || balance > 0}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

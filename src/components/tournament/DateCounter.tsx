// import { useReducer } from "react";

// function reducer(state, action) {
//   console.log(state, action);

//   // return { count: 0, step: 0 };
//   switch (action.type) {
//     case "dec":
//       return { ...state, count: state.count - 1 };
//     case "inc":
//       return { ...state, count: state.count + 1 };
//     case "setCount":
//       return { ...state, count: action.payload };
//     case "setStep":
//       return { ...state, step: action.payload };
//     case "reset":
//       return { step: 0, count: 0 };
//     default:
//       throw new Error("can't find this match");
//   }
//   // return state + action;
//   // if (action.type === "inc") return state + 1;
//   // if (action.type === "dec") return state - 1;
//   // if (action.type === "setCount") return action.payload;
// }

// function DateCounter() {
//   const initialState = { count: 0, step: 0 };
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { count, step } = state;
//   // const [step, setStep] = useState(1);

//   // This mutates the date object.
//   const date = new Date();
//   date.setDate(date.getDate() + count);

//   const dec = function () {
//     dispatch({ type: "dec" });
//     // setCount((count) => count - 1);
//     // setCount((count) => count - step);
//   };

//   const inc = function () {
//     dispatch({ type: "inc" });
//     // setCount((count) => count + 1);
//     // setCount((count) => count + step);
//   };

//   const defineCount = function (e) {
//     // setCount(Number(e.target.value));
//     dispatch({ type: "setCount", payload: Number(e.target.value) });
//   };

//   const defineStep = function (e) {
//     dispatch({ type: "setStep", payload: Number(e.target.value) });
//     // setStep(Number(e.target.value));
//   };

//   const reset = function () {
//     dispatch({ type: "reset" });
//     // setCount(0);
//     // setStep(1);
//   };

//   return (
//     <div className="counter">
//       <div>
//         <input
//           type="range"
//           min="0"
//           max="10"
//           value={step}
//           onChange={defineStep}
//         />
//         <span>{step}</span>
//       </div>

//       <div>
//         <button onClick={dec}>-</button>
//         <input value={count} onChange={defineCount} />
//         <button onClick={inc}>+</button>
//       </div>

//       <p>{date.toDateString()}</p>

//       <div>
//         <button onClick={reset}>Reset</button>
//       </div>
//     </div>
//   );
// }
// export default DateCounter;

import React from "react";

export default function DateCounter() {
  return <div>DateCounter</div>;
}

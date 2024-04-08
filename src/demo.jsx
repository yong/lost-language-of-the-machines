//main.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
//import Chat from './chapter1/Chat';
import AsciiTable from './chapter2/AsciiTable'

function UIPickerView() {
    const [selectedValue, setSelectedValue] = useState('Option 1');

    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative inline-flex">
                <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                    <path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.762-9.763 25.591 0 35.354l189.21 189.211c9.372 9.373 24.749 9.373 34.121 0l189.211-189.211c9.763-9.763 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/>
                </svg>
                <select className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={e => setSelectedValue(e.target.value)}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <p className="mt-3">Selected: {selectedValue}</p>
        </div>
    );
}

export default UIPickerView;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <h1>Demo</h1>
      <UIPickerView/>
      <AsciiTable/>
  </React.StrictMode>
)

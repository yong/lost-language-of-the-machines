import React from 'react';

const AsciiTable = () => {
  const asciiChars = Array.from({length: 95}, (_, i) => String.fromCharCode(i + 32));
  const quarter = Math.ceil(asciiChars.length / 4);
  const firstQuarter = asciiChars.slice(0, quarter);
  const secondQuarter = asciiChars.slice(quarter, quarter * 2);
  const thirdQuarter = asciiChars.slice(quarter * 2, quarter * 3);
  const fourthQuarter = asciiChars.slice(quarter * 3);

  const renderTable = (chars, start) => (
    <table className="w-full text-center divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Hex</th>
          <th className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Character</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {chars.map((char, index) => (
          <tr key={index}>
            <td className="px-2 py-1 whitespace-nowrap">{(start + index).toString(16).toUpperCase()}</td>
            <td className="px-2 py-1 whitespace-nowrap">{char}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">ASCII Table</h1>
      <div className="overflow-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <div>{renderTable(firstQuarter, 32)}</div>
        <div>{renderTable(secondQuarter, 32 + quarter)}</div>
        <div>{renderTable(thirdQuarter, 32 + quarter * 2)}</div>
        <div>{renderTable(fourthQuarter, 32 + quarter * 3)}</div>
      </div>
    </div>
  );
};

export default AsciiTable;

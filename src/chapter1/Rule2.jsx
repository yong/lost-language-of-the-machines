//Rule2.jsx

const DecimalExpression = (symbol, index) => {
  return (
    <>
      <b className="text-blue-500">{symbol}</b>*<span className="text-red-600">10</span><sup className="text-green-600">{index}</sup>
    </>
  )
}

const BinaryExpression = (symbol, index) => {
  return (
    <>
      <b className="text-blue-500">{symbol}</b>*<span className="text-red-600">2</span><sup className="text-green-600">{index}</sup>
    </>
  )
}

const Rule2 = () => {
  return (
    <div className="mb-3 text-center bg-blue-200 border-4 border-dashed border-blue-500 p-4 rounded-lg">
      <div className="text-2xl font-bold">In a number system with base <span className="text-red-600">X</span>, 
      each <span className="text-blue-500">symbol</span>’s place value corresponds to a power of <span className="text-red-600">X</span>, 
      with the exponent being the <span className="text-blue-500">symbol</span>’s <span className="text-green-600">position</span>, starting from <span className="text-green-600">0</span> on the right.</div><br/>
      For example,<br/>
      <b className="text-blue-500">2583</b> = {DecimalExpression(2,3)} + {DecimalExpression(5,2)} + {DecimalExpression(8,1)} + {DecimalExpression(3, 0)}<br/>
      <b className="text-blue-500">1101</b> = {BinaryExpression(1, 3)} + {BinaryExpression(1, 2)}+ {BinaryExpression(0, 1)} + {BinaryExpression(1, 0)} = 13 in Decimal
    </div>
  )
}

export default Rule2;

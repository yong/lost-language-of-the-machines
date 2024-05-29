//Rule2.tsx
import PlaceValues from "./PlaceValues";
import Legos from "./Legos";

const DecimalExpression = (symbol: number, index:number) => {
  return (
    <>
      <b className="text-blue-500">{symbol}</b>*<span className="text-red-600">10</span><sup className="text-green-600">{index}</sup>
    </>
  )
}

const BinaryExpression = (symbol: number, index: number) => {
  return (
    <>
      <b className="text-blue-500">{symbol}</b>*<span className="text-red-600">2</span><sup className="text-green-600">{index}</sup>
    </>
  )
}

const Rule2 = () => {
  return (
    <div className="mb-3 font-mono text-center bg-blue-200 border-4 border-dashed border-blue-500 p-4 rounded-lg">
      <div className="text-2xl font-bold">The places values of a base-<span className="text-red-600">X</span> number system always strat from 1 as the rightmost, then the place value will be multipled by <span className="text-red-600">X</span> each time you move left.
      </div><br/>

      <div className="text-base">For example:</div>
      <div>
        In decimal (which is based on <span className="text-red-600">10</span>), we have places like the 
        <b style={{color: "#BA8C63"}}> ones</b>, 
        <b style={{color: "#BA8C63"}}>tens</b>, 
        <b style={{color: "#BA8C63"}}>hundreds</b>, 
        <b style={{color: "#BA8C63"}}>thousands</b>, and so on. Each place is <span className="text-red-600">10</span> times bigger than the one before it. <br/>
      </div>
      <PlaceValues/>
      <div>
        Similarly, In binary (which is based on <span className="text-red-600">2</span>), we have places like the 
        <b style={{color: "#757575"}}> ones</b>, 
        <b style={{color: "#039be5"}}>twos</b>, 
        <b style={{color: "#43a047"}}>fours</b>,and 
        <b style={{color: "#f63"}}> eights</b>. Each place is 
        <span className="text-red-600"> 2</span> times bigger than the one before it.
      </div>
      <Legos/>
    </div>
  )
}

export default Rule2;

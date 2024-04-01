//Rule1.jsx

const Rule1 = () => {
  return (
      <div className="mb-3 font-mono text-center bg-blue-200 border-4 border-dashed border-blue-500 p-4 rounded-lg">
          <div className="text-2xl font-bold">For a <span className="text-red-600">X</span> based number system, there are <span className="text-red-600">X</span> <span className="text-blue-500">symbols</span> to use.</div><br/>
          <div className="text-base">For example,</div>
          <div className="text-2xl"><span className="text-red-600">10</span> based number system has ten: <b className="text-blue-500">0 1 2 3 4 5 6 7 8 9</b><br/>
          <span className="text-red-600">2</span> based number system has only two: <b className="text-blue-500">1</b> and <b className="text-blue-500">0</b>.</div><br/>
          <div className="max-w-screen-md mx-auto flex items-center justify-center">
              <img src="/chapter1/rule1.jpg" alt="rule1" />
          </div>
      </div>
  )
}

export default Rule1;

//NextButton.jsx
const NextButton = ({ url }) => {
    return (
      <div className="flex items-center justify-center">
        <a href={url} className="animate-bounce mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
          Next Chapter &#8594;
        </a>
      </div>
    )
  }
  
  export default NextButton;
  
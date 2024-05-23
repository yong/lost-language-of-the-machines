//NextButton.jsx

import {UrlProps} from '../common/types'

const NextButton: React.FC<UrlProps> = ({ url }) => {
    return (
      <div className="flex items-center justify-center">
        <a href={url} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
          Next Chapter &#8594;
        </a>
      </div>
    )
  }
  
  export default NextButton;
  
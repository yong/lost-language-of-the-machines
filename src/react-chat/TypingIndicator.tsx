const TypingIndicator = () => {
  return (
    <div className="flex flex-row-reverse mb-4">
      <img src="/starlaxverse_avatar.png" alt="Avatar" className="w-10 h-10 rounded-full" />
      <div className="mr-4 rounded-lg bg-gray-200">
        <div className="flex items-center justify-center w-13 h-10 mx-2 bg-gray-200 rounded-full">
          <div className="w-1 h-1 mx-0.5 bg-gray-700 rounded-full animate-bounce-delay-1"></div>
          <div className="w-1 h-1 mx-0.5 bg-gray-700 rounded-full animate-bounce-delay-2"></div>
          <div className="w-1 h-1 mx-0.5 bg-gray-700 rounded-full animate-bounce-delay-3"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
import React from 'react';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax'; // Import the necessary components

// Define the higher-order component (HOC)
const withParallax = (WrappedComponent, imageSrc) => {
  return class WithParallax extends React.Component {
    render() {
      return (
        <ParallaxProvider>
          <ParallaxBanner
            layers={[
              { image: imageSrc }, // Use the provided image source
              {
                speed: -20,
                children: (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="backdrop-blur-sm text-center font-bold text-black z-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                            Lost Language of the Machines
                        </h1>
                    </div>
                ),
              },
            ]}
            style={{ height: '100vh' }}
          />
        <WrappedComponent {...this.props} />
        </ParallaxProvider>
      );
    }
  };
};

export default withParallax; // Export the HOC

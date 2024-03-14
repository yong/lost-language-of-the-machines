import React from 'react'
import Cover from './Cover'

const TextBox = () => {
  return (
      <div className='text-box'>
          <h3>First Class Ticket</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores doloribus accusantium, quam odio
          repudiandae mollitia eos sapiente quo labore magnam, dignissimos praesentium blanditiis ratione error
          expedita, incidunt rerum corrupti modi enim commodi maxime veniam! Eius repellendus voluptates ducimus
          perspiciatis officiis adipisci quibusdam amet, officia omnis quas id minus ipsam, aliquam qui voluptas quo
          veritatis dolores vero magnam inventore sed numquam dignissimos a nisi. Tempore dolorem provident illo natus
          velit temporibus fugiat odio aperiam a sunt et harum autem sequi officiis quos distinctio quis nihil, modi
          eveniet commodi animi non accusantium! Nesciunt ut voluptatibus cumque et doloribus nihil impedit odio sed.
      </p>
      </div>
  )
}

function App() {
  return (
    <div className={'w-full h-full'}>
      <Cover />
      <TextBox />
    </div>
  );
}

export default App;
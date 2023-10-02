
// import './assistant.scss';
// import React, { useState } from 'react';


// function ButtonAssistant() {
//   const [buttonDescriptions, setButtonDescriptions] = useState({
//     button1: '',
//     button2: '',
//     button3: '',
//     button4: '',
//   });

  
//     const handleButtonClick = (button) => {
//       // Set the button description when clicked
//       const descriptions = {
//         button1: 'Move Right',
//         button2: 'Move Down',
//         button3: 'Move Left',
//         button4: 'Move Up',
//       };
//       setButtonDescriptions((prevDescriptions) => ({
//         ...prevDescriptions,
//         [button]: descriptions[button],
//       }));
  
//       // Trigger the GIF animation
//       const gif = document.getElementById('walk-gif');
//       const description = document.getElementById('description-' + button);
//       if (gif && description) {
//         gif.style.animation = 'move-up 2s linear';
//         gif.addEventListener('animationend', () => {
//           gif.style.animation = '';
  
//           // Scroll to the description using JavaScript
//           description.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
//         });
//       }
//     };
  

//   return (
//     <div className='cont'>
//       <h1>Button Function Descriptions</h1>
//       <div className="button-container">
//         <button className='btn'
//           onClick={() => handleButtonClick('button1')}
//           onMouseEnter={() => setButtonDescriptions({ ...buttonDescriptions, button1: 'Move Right' })}
//           onMouseLeave={() => setButtonDescriptions({ ...buttonDescriptions, button1: '' })}
//         >
//           Button 1
//         </button>
//         {buttonDescriptions.button1 && (
//           <div className="description" id='description-button1'>{buttonDescriptions.button1}</div>
//         )}

//         <button className='btn'
//           onClick={() => handleButtonClick('button2')}
//           onMouseEnter={() => setButtonDescriptions({ ...buttonDescriptions, button2: 'Move Down' })}
//           onMouseLeave={() => setButtonDescriptions({ ...buttonDescriptions, button2: '' })}
//         >
//           Button 2
//         </button>
//         {buttonDescriptions.button2 && (
//           <div className="description" id='description-button2'>{buttonDescriptions.button2}</div>
//         )}

//         <button className='btn'
//           onClick={() => handleButtonClick('button3')}
//           onMouseEnter={() => setButtonDescriptions({ ...buttonDescriptions, button3: 'Move Left' })}
//           onMouseLeave={() => setButtonDescriptions({ ...buttonDescriptions, button3: '' })}
//         >
//           Button 3
//         </button>
//         {buttonDescriptions.button3 && (
//           <div className="description" id='description-button3'>{buttonDescriptions.button3}</div>
//         )}

//         <button className='btn'
//           onClick={() => handleButtonClick('button4')}
//           onMouseEnter={() => setButtonDescriptions({ ...buttonDescriptions, button4: 'Move Up' })}
//           onMouseLeave={() => setButtonDescriptions({ ...buttonDescriptions, button4: '' })}
//         >
//           Button 4
//         </button>
//         {buttonDescriptions.button4 && (
//           <div className="description" id='description-button4'>{buttonDescriptions.button4}</div>
//         )}
//       </div>
//       <img
//         id="walk-gif"
//         src="https://i.ibb.co/yfWwBNy/pngwing-com.png"  
//         alt="Walking GIF"
//       />
//     </div>
//   );
// }

// export default ButtonAssistant;


import React, { useState, useRef } from 'react';
import './assistant.css';

function ButtonAssistant() {
  const [activeButton, setActiveButton] = useState(null);
  const gifRef = useRef(null);

  const buttonDescriptions = {
    button1: 'Move Right',
    button2: 'Move Down',
    button3: 'Move Left',
    button4: 'Move Up',
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);

    // Get the button and description elements
    const buttonElement = document.getElementById(`wrap-${button}`);
    const descriptionElement = document.getElementById(`description-${button}`);

    // Move the image to the button using getBoundingClientRect
    if (gifRef.current && buttonElement && descriptionElement) {
      const gifRect = gifRef.current.getBoundingClientRect();
      const buttonRect = buttonElement.getBoundingClientRect();
      const xOffset = buttonRect.left - gifRect.left + (buttonRect.width - gifRect.width) / 2;
      const yOffset = buttonRect.bottom - gifRect.top ; //+ (buttonRect.height - gifRect.height) / 2;

      gifRef.current.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    }

    // Show the description
    if (descriptionElement) {
      descriptionElement.style.display = 'block';
    }
  };

  return (
    <div className="cont">
      <h1>Button Function Descriptions</h1>
      <div className="button-container">
        {Object.keys(buttonDescriptions).map((button) => (
          <div key={button} className="button-wrapper" id={`wrap-${button}`}>
            <button
              id={button}
              className={`btn ${activeButton === button ? 'active' : ''}`}
              onClick={() => handleButtonClick(button)}
            >
              Button {button.substring(button.length - 1)}
            </button>
            <div
              id={`description-${button}`}
              className={`description ${activeButton === button ? 'visible' : ''}`}
            >
              {buttonDescriptions[button]}
            </div>
          </div>
        ))}
      </div>
      <img
        id="walk-gif"
        src="https://i.ibb.co/yfWwBNy/pngwing-com.png"
        alt="Walking GIF"
        className={`gif ${activeButton ? 'animate' : ''}`}
        ref={gifRef}
      />
    </div>
  );
}

export default ButtonAssistant;


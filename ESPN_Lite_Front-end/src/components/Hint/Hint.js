import React from 'react';

const Hint = ({ name, status_code, hints, target_player}) => {
    if(status_code === 0){
      return(
        <div>
          <div className='white f3'> 
            {`${name}, helloooooooo`}
          </div>
        </div>
      );
    } else if (status_code === 300) {
      console.log(hints)
      console.log(status_code)
      let showhintsAsString = hints.join(', ')
      return(
        <div>
          <div className='white f3'>
              {`${name}, here are some hints:`}
              <br />
              {`${showhintsAsString}`}
          </div>
        </div>  
      );
    } else if (status_code === 200){
      return(
        <div>
          <div className='white f3'>
            {`${name}, here is the player: ${target_player.short_name}`}
          </div>
        </div>
      );
    } else {
      return(
      <div>
        <div className='white f3'>
          {`${name}, your search result is not found, try something else!`}
        </div>
      </div>
      );
    }
}

export default Hint;
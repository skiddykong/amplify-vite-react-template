import { useState } from 'react';
import { sculptureList } from './data';
import { Sculpture } from './data'; // import the Sculpture interface

export default function Gallery() {
  const [index, setIndex] = useState<number>(0);
  const [showMore, setShowMore] = useState<boolean>(false);
  const hasNext = index < sculptureList.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

const sculpture: Sculpture = sculptureList[index];
  return (
    <div>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
    </div>
  );
}
import { useEffect, useState } from "react";

export default function Joke() {
  const [id, setId] = useState(0);

  const [joke, setJoke] = useState();

  useEffect(() => {
    async function startFetching() {
      const response = await fetch(
        `https://example-apis.vercel.app/api/bad-jokes/${id}`
      );
      const newJoke = await response.json();

      setJoke(newJoke);
    }

    startFetching();
  }, [id]);

  function handlePrevJoke() {
    setId(joke.prevId);
  }

  function handleNextJoke() {
    setId(joke.nextId);
  }

  if (!joke) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{joke.joke}</h1>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
    </>
  );
}

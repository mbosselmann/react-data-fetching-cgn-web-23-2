import { useState } from "react";
import useSWR from "swr";

export default function Joke() {
  const [id, setId] = useState(0);
  const [jokesInfo, setJokesInfo] = useState([]);
  // const [joke, setJoke] = useState(null);

  // useEffect(() => {
  //   async function startFetching() {
  //     const response = await fetch(
  //       `https://example-apis.vercel.app/api/bad-jokes/${id}`
  //     );
  //     const newJoke = await response.json();

  //     setJoke(newJoke);
  //   }

  //   startFetching();
  // }, [id]);

  const { data } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );

  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }

  function handleToggleFunny(id) {
    setJokesInfo((jokesInfo) => {
      const info = jokesInfo.find((info) => info.id === id);

      if (info) {
        return jokesInfo.map((info) =>
          info.id === id ? { ...info, isFunny: !info.isFunny } : info
        );
      }

      return [...jokesInfo, { id, isFunny: true }];
    });
  }

  const info = jokesInfo.find((info) => info.id === id) ?? { isFunny: false };

  const { isFunny } = info;

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>
        {data.joke}{" "}
        <span
          role="img"
          aria-label={isFunny ? "a laughing face" : "an unamused face"}
        >
          {isFunny ? "🤣" : "😒"}
        </span>
      </h1>
      <div>
        <button type="button" onClick={() => handleToggleFunny(id)}>
          {isFunny ? "stop laughing" : "this is funny"}
        </button>
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

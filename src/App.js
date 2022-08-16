import { useEffect, useState } from "react";
import "./app.css";
import AuthorQuotes from "./components/AuthorQuotes";
import SingleQuote from "./components/SingleQuote";

function App() {
  const [quote, setQuote] = useState(null);
  const [authorPage, setAuthorPage] = useState(false);

  const randomQuoteHandler = () => {
    setAuthorPage(false);
    if (!authorPage) {
      fetchQuoteHandler();
    }
  };

  const fetchQuoteHandler = async () => {
    try {
      const response = await fetch(
        "https://quote-garden.herokuapp.com/api/v3/quotes/random"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const receivedQuote = {
        quote: data.data[0].quoteText,
        author: data.data[0].quoteAuthor,
        genre: data.data[0].quoteGenre,
      };

      setQuote(receivedQuote);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => fetchQuoteHandler, []);

  return (
    <div className="container">
      <div className="btn-random" onClick={randomQuoteHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
        </svg>

        <div>random</div>
      </div>
      <div className="main">
        {quote && !authorPage && (
          <SingleQuote quote={quote} setAuthorPage={setAuthorPage} />
        )}
        {authorPage && <AuthorQuotes author={quote.author} />}
      </div>

      <footer>
        created by <a href="https://github.com/bashidagha">bashidagha</a> -
        devChallenges.io
      </footer>
    </div>
  );
}

export default App;

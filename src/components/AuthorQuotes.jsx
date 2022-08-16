import { useEffect, useState } from "react";
import "./authorquotes.css";

const AuthorQuotes = (props) => {
  const [quotes, setQuotes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAuthorQuotesHandler = async () => {
    try {
      const response = await fetch(
        `https://quote-garden.herokuapp.com/api/v3/quotes/?author=${props.author}&limit=5`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      console.log(data);

      setQuotes(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => fetchAuthorQuotesHandler(), []);

  return (
    <>
      {isLoading && <p className="loading"> Loading... Please wait. </p>}

      {!isLoading && (
        <div className="multiple">
          <h2>{props.author}</h2>
          {quotes &&
            quotes.map((quote) => {
              return (
                <div className="multiple--quote">
                  <p>{'"' + quote.quoteText + '"'}</p>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default AuthorQuotes;

import './singlequote.css'

const SingleQuote = (props) => {
  return (
    <div className='single'>

    <p className='single--quote'>
        {props.quote.quote}
    </p>

    <div className='single--extra'>
       <div className='single--author'>{props.quote.author}</div> 
       <div className='single--genre'>{props.quote.genre}</div> 
    </div>
    </div>
  )
}

export default SingleQuote
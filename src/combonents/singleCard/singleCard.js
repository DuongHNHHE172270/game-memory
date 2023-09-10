import './singleCard.css'
function SingleCard({ card, handleChoice, flipped, disable }) {
    const handleClick = () =>{
        if(!disable){
            handleChoice(card)
        }
    }
    return(
        <div className='card'> 
            <div className={flipped ? "flipped" : ""}>
                <img className='front' src={card.src} alt='cart-front'/>
                <img className="cover" src='/img/cover.png' onClick={handleClick} alt='cover'/>
            </div>
        </div>   
    ) 
}

export default SingleCard;
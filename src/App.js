import React from "react"
import Card from "./Card"
import imagesData from "./imagesData"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {


const[cards,setCards]=React.useState([])
const [firstCard, setFirstCard] = React.useState(null)
const [secondCard, setSecondCard] = React.useState(null)
const [finishGame,setFinishGame]=React.useState(true)
const [isConfetti,setIsConfetti]=React.useState(false)

//newGame OnClick
function startGame()
{
   
    const newCard=[...imagesData.images,...imagesData.images]

    //newCard dizisini karıştırıyoruz resimler random dağılsın
    newCard.sort(()=>Math.random()-0.5)

    //newCard dizisi maplenip cards değişkenine setlendi
    setCards(newCard.map(image=>{
            return(
                {id:nanoid(),name:image.name,src:image.src,isClose:true}
            )
        })
    )

    //yeni oyunda değişkenler resetlendi
    setFirstCard(null)
    setSecondCard(null)
    setFinishGame(false)
    setIsConfetti(false)
    
    
}

//Card componentini çoğaltmak için cards i mapleyip  <Card> compenentini oluşturuyoruz
const cardElements=cards.map(card=>
    <Card 
        key={card.id} 
        src={card.src} 
        isClose={card.isClose} 
        onClose={()=>onClose(card.id)} />
    )




//Card compenentinin image OnClick fonksiyonu
function onClose(id)
{  

        setCards(oldCards => oldCards.map(card => {  //hangi image tıklandığını bulmak için Cardı mapliyoruz

            if (card.id === id && card.isClose==true) //tıkladığımız kart id eşleşiyormu ve o kart henüz kapalı mı kontrolü
            {
                card={...card, isClose: false} //kartı açık hale getirdik
                if(firstCard==null) //ilk kart boş ise
                {
                    setFirstCard(card) //açılan kart ilk kart olarak atanıyor
                }
                else
                {
                    setSecondCard(card) //ilk kart dolu ise ikinci karta atanıyor
                    
                }
                return card
            }
            else //id eşleşmiyorsa o kart kapalı olarak kalıyor
                return card
        }))
        
        

}





//firstcard ve second kart değiştiğinde tetiklenen useEffect
React.useEffect(()=>{
    
    if(firstCard!=null) //iki kartta boş değilse
    {
    
      
        if(secondCard!=null)
        {

            if(firstCard.name===secondCard.name) //kartlar aynı 
            {  
                finishedGame()
                
                setTimeout(() => { 
            
                    setCards(oldCards => oldCards.map(card => {
                        return card.id === firstCard.id ? {...card, isClose: false} : card  // eşleşme yapıldı ilk kartıda açıyoruz
                        
                    }))
                   
        
                }, 700)
                
                setFirstCard(null)
                setSecondCard(null)
                
            }
            else //kartlar aynı değil
            {
                setTimeout(() => { 
                    
                    setCards(oldCards => oldCards.map(card => {
                        return card.id === firstCard.id ? {...card, isClose: true} : card  //ilk kartı timer ile biraz açık tutup sonra kapatıyoruz (isClose:true)
                    }))
                    

                }, 700)
                setTimeout(() => { 
                    
                    setCards(oldCards => oldCards.map(card => {
                        return card.id === secondCard.id ? {...card, isClose: true} : card  //ikinci kartı timer ile biraz açık tutup sonra kapatıyoruz (isClose:true)
                    }))
                    

                }, 700)
                setFirstCard(null)
                setSecondCard(null)
            }
        }

       
    }
    
    

},[firstCard,secondCard])



function finishedGame(){

    console.log("*")
    let allOpen=0
    for(let i=0;i<cards.length;i++)
    {
        if(cards[i].isClose==false)
        {++allOpen}
    }
    if(allOpen>=9)
    {
        setFinishGame(true)
        setIsConfetti(true)
    }
}
  

  return (
      <main>
       {isConfetti && <Confetti />}
          <div className="cards-container">
              {cardElements}
          </div>
          <br></br>
          {finishGame&&<button className="roll-card" onClick={startGame}>Start Game</button>}
      </main>
  )
}
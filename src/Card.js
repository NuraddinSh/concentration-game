import React from "react"

export default function Card(props) {

    const styles = {
        backgroundColor: props.isClose ? "#0B2434" : "white"
    }

    return (
        <div className="card-face" onClick={props.onClose}  style={styles}>
        
           {!props.isClose&&<img src={props.src} className="card-image"  />}
         </div>
            
       
    )
}
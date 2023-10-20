import React from "react"

export default function Overlay(props) {
    const styles = {
        display: props.isOverlay ? "grid" : "none"
    }
    
    return (
        <div className="overlay" style={styles}>
            <h1 className="overlay-title">Quizzical</h1>
            <p>If you don't know the answer, learn how to pretend ! !</p>
            <button className="overlay-btn" onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}
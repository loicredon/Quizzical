import React from "react"

export default function Question(props) {

    const styles = {
        display: props.isOverlay ? "none" : "block"
    }
    
    // function style(answer) {
    //     if (props.quizEnded) {
    //         return answer === props.allAnswers[props.correctAnswerIndex] ? "answer-correct" :  answer === props.selected ? "answer-incorrect" : "answer-lambda"
    //     } else {
    //          return answer === props.selected  ? "answer-selected" : "" 
    //     }   
    // }


    
    const elementsQuestion = props.allAnswers.map((answer, idx) => {
        if (props.quizEnded) {
            return ( 
            <div key={idx}>
                <input type= "radio" name={answer} id="demo" value={answer}/>
                <label htmlFor={answer}
                className={answer === props.allAnswers[props.correctAnswerIndex] ? "answer-correct" :  answer === props.selected ? "answer-incorrect" : "answer-lambda"}
                name={answer}
                value={answer}
                onClick={() => props.handleClick(idx)}>
                {props.decode(answer)}
                </label>
            </div>
        )
        } else {
            return ( 
                <div key={idx}>
                    <input type= "radio" name={answer} id="demo" value={answer}/>
                    <label htmlFor={answer}
                    className={answer === props.selected  ? "answer-selected" : ""}
                    name={answer}
                    value={answer}
                    onClick={() => props.handleClick(idx)}>
                    {props.decode(answer)}
                    </label>
                </div>
        )
        }

    })
     
    return (
        <div className="question-container" style={styles}>
            <h2 className="question">{props.question}</h2>
            <div className="answers-container">
            {elementsQuestion}
            </div>
        </div>
    )
}

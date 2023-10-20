import React from "react"
import Question from "./Question.js"
import Overlay from "./Overlay.js"
import {nanoid} from "nanoid"

export default function App() {
    
    const [isOverlay, setIsOverlay] = React.useState(true)
    const [questionsData, setQuestionsData] = React.useState([])
    const [endQuiz, setEndQuiz] = React.useState(false)
    const [score, setScore] = React.useState(null)
    const [newData, setNewData] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    

    function decodeHTML(html) {
	    let txt = document.createElement('textarea');
	    txt.innerHTML = html;
	    return txt.value;
}
    
    function removeOverlay() {
        setIsOverlay(prevOverlay => !prevOverlay)
    }
    

    React.useEffect(() => {
        console.log("oui")
        setIsLoading(true)
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                let dataArray = data.results.map((questionItem, index) => {
                    const correctAnswerIndex = Math.floor(Math.random()*(questionItem.incorrect_answers.length + 1))
                    let answers = questionItem.incorrect_answers
                    answers.splice(correctAnswerIndex, 0, questionItem.correct_answer)

                    
                return {
                    id: index,
                    question: decodeHTML(questionItem.question),
                    allAnswers: answers,
                    correctAnswerIndex: correctAnswerIndex,
                    selected:""
                    }//ferme le return
                }) //ferme le map sur dataArray
                setQuestionsData(dataArray)
                setIsLoading(false)
            }) //ferme le fetch de data
    }, [newData]) 
    
    
    function handleClick(event, id) {
        setQuestionsData(prevData => prevData.map(item => {
            return item.id === id ? {...item, selected: event.target.htmlFor} : item
        }))
        
    }
    
    function checkAnswers() {
        setEndQuiz(true)
        const scoreArray = questionsData.map(item => {
            return item.selected === item.allAnswers[item.correctAnswerIndex] ? true : false
            })
        setScore(scoreArray.filter(y => y === true).length)
    }
    

    function startQuiz() {
        setNewData(prevData => !prevData)
        setEndQuiz(false)
        setScore(null)
        setQuestionsData([])
    }
    
    const elements = questionsData.map((question, idx) => {
       return <Question
            key={question.id}
            isOverlay={isOverlay}
            {...question}
            handleClick={() => handleClick(event, question.id)}
            quizEnded = {endQuiz}
            decode={decodeHTML}
        />
    })
    
        if (isLoading && !isOverlay) {
            return (
                <h1 className="data-loading">Data is loading</h1>
            )
        } else {
            return (
                        <div className="container">
            <img className="blob-bleu" src="./images/blob-bleu.png" />
            <img className="blob-jaune" src="./images/blob-jaune.png" />
            <Overlay
            isOverlay={isOverlay}
            handleClick={removeOverlay}
            />
            {elements}
            {endQuiz &&
                <div className="play-again">
                    <h3 className="score--text">You scored {score}/5 correct answers </h3>
                <button className="check-btn" onClick={startQuiz}>Play again</button>
                </div>
            }
            {(!isOverlay && !endQuiz) && <button className="check-btn" onClick={checkAnswers}>Check Answers</button>}
        </div>
            )
        }
}
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route , withRouter} from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthor from './AddAuthor';
import * as serviceWorker from './serviceWorker';
import {shuffle , sample } from 'underscore';

const author = [
    {
        name : "vijay",
        imageSrc: "image/actor4.jpg",
        imageSource: "google common",
        movies:['Sarkar','gilli','pokkiri','thuppaki']
    },
    {
        name : "ajith",
        imageSrc: "image/actor5.jpg",
        imageSource: "google common",
        movies:['visuvasam','billa','mangatha','veeram']
    },
    {
        name : "surya",
        imageSrc: "image/actor3.jpg",
        imageSource: "google common",
        movies:['24','gajini','varaman aeram','aanjan']
    },
    {
        name : "rajini",
        imageSrc: "image/actor2.jpg",
        imageSource: "google common",
        movies:['kaala','billa','ranga','padaiyappa']
    },
    {
        name : "sethupathi",
        imageSrc: "image/actors1.jpg",
        imageSource: "google common",
        movies:['sethupathi','suthukaum','nanu rowdy tha','sethakathi']
    }
];
function getTurnData(author){
    const allMovies = author.reduce(function(p,c){
        return p.concat(c.movies);
    },[]);
    const fourRandomMovies = shuffle(allMovies).slice(0,4);
    const answer = sample(fourRandomMovies);
    return{
        movies : fourRandomMovies,
        author : author.find((author) => author.movies.some((title) => title===answer)),
        answer : answer,
    }
}
function onAnswerSelected(answerclicked){
   
    state.isCorrect = state.turnData.author.movies.some((movie)=> movie === answerclicked);
    const indexOfanswerclicked = state.turnData.movies.findIndex(i => {
        return i===answerclicked;
    });
    if (state.isCorrect){
        
        console.log("index"+indexOfanswerclicked)
        state.highlight[indexOfanswerclicked].col = 'rgba(59, 226, 44, 0.808)';
    }else{
        const indexOfanswer = state.turnData.movies.findIndex(i => {
            return i===state.turnData.answer;
        });
        state.highlight[indexOfanswerclicked].col = 'rgba(224, 46, 46, 0.8)';
        console.log("index"+indexOfanswer)
        state.highlight[indexOfanswer].col = 'rgba(59, 226, 44, 0.808)';
    }
    render();
}
let state = resetState();

function resetState(){
    return state ={
        turnData: getTurnData(author),
        highlight: [
            { id : '0' , col: '' },
            { id : '1' , col: '' },
            { id : '2' , col: '' },
            { id : '3' , col: '' },
        ],
        isCorrect: false,
    }

}
function continueHandler(){
    console.log("continue");
     state = resetState();
        render();
}
function App () {
    return < AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} 
    continueHandler={continueHandler}/>;
}


const AddAuthorFunc = withRouter(({history})=>
     <AddAuthor addActor={(auth)=>{
         console.log(auth);
        author.push(auth);
        history.push('/');
    }} ></AddAuthor>
);

function render(){
ReactDOM.render(
<BrowserRouter>
<React.Fragment>
<Route exact path="/" component={App}/>
<Route   path="/addAuthor" component={AddAuthorFunc} />
</React.Fragment>
</BrowserRouter>
, document.getElementById('root'));

}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
render();
serviceWorker.unregister();

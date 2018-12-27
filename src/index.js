import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthorQuiz from './AuthorQuiz';
import AddAuthor from './AddAuthor';
import * as serviceWorker from './serviceWorker';
import {shuffle , sample } from 'underscore';
import './index.css';

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
// function onAnswerSelected(state ,answerclicked){
//    console.log(answerclicked);
//     state.isCorrect = state.turnData.author.movies.some((movie)=> movie === answerclicked);
//     const indexOfanswerclicked = state.turnData.movies.findIndex(i => {
//         console.log("i-"+i);
//         return i===answerclicked;
//     });
//     console.log("indexOfanswerclicked--"+indexOfanswerclicked);
//     if (state.isCorrect){
        
//         console.log("index"+indexOfanswerclicked)
//         state.highlight[indexOfanswerclicked].col = 'rgba(59, 226, 44, 0.808)';
//     }else{
//         console.log("answer="+state.turnData.answer);
//         const indexOfanswer = state.turnData.movies.findIndex(i => {
//             return i===state.turnData.answer;
//         });
//         state.highlight[indexOfanswerclicked].col = 'rgba(224, 46, 46, 0.8)';
//         console.log("index"+indexOfanswer)
//         state.highlight[indexOfanswer].col = 'rgba(59, 226, 44, 0.808)';
//     }
//     console.log("col0--"+state.highlight[0].col);
//     console.log("col1--"+state.highlight[1].col);
//     console.log("col2--"+state.highlight[2].col);
//     console.log("col3--"+state.highlight[3].col);
//     return state;
// }


function reducer(state =resetState(), action ){
    switch(action.type ){
        case 'onAnswerSelected' :
         const isCorrect = state.turnData.author.movies.some((movie)=> movie === action.answer);
         const highlight = [
            { id : '0' , col: '' },
            { id : '1' , col: '' },
            { id : '2' , col: '' },
            { id : '3' , col: '' },
        ];
            const indexOfanswerclicked = state.turnData.movies.findIndex(i => {
                return i===action.answer;
            });
            
            if (isCorrect){
                highlight[indexOfanswerclicked].col = 'rgba(59, 226, 44, 0.808)';
            }else{
                const indexOfanswer = state.turnData.movies.findIndex(i => {
                    return i===state.turnData.answer;
                });
                highlight[indexOfanswerclicked].col = 'rgba(224, 46, 46, 0.8)';
                highlight[indexOfanswer].col = 'rgba(59, 226, 44, 0.808)';
            }
        return Object.assign({},state,{isCorrect : isCorrect,
        highlight : highlight})
        case 'continueHandler':
        return continueHandler();
        case 'Add_Actor':
        return Object.assign({},state,{
            author : state.author.push(action.addActor),
            
        });
        default:return state;
    }    
    
    
}

let store = Redux.createStore(reducer);

function resetState(){
    return {
        author : author,
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
     return resetState();
        
}





// const AddAuthorFunc = withRouter(({history})=>
//      <AddAuthor addActor={(auth)=>{
//          console.log(auth);
//         author.push(auth);
//         history.push('/');
//     }} ></AddAuthor>
// );


ReactDOM.render(
<BrowserRouter>
<ReactRedux.Provider store = {store}>
<React.Fragment>
<Route exact path="/" component={AuthorQuiz}/>
<Route   path="/addAuthor" component={AddAuthor} />
</React.Fragment>
</ReactRedux.Provider>
</BrowserRouter>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();

import React from 'react';
import propTypes from 'prop-types';
import {connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.css';
import './bootstrap.min.css';




function Hero(){
  return(
  <div className="row">
  <div className="jumbotron col-10 offset-1">
  <h1>Actor Quiz</h1>
  <p>Select the movie of actor shown</p>
  </div>
  </div>)
}

function Book({title,click,highlight,highlightIndex}){
 
  
  return(
    <div className="answer" style={{backgroundColor :highlight[highlightIndex].col}} onClick={()=>click(title)}>
    <h4>{title}</h4></div>
  )
}
function Turn({author, movies, answer,highlight,onAnswerSelected}){
  
  return(<div className="row turn" style={{backgroundColor :"white"}}>
  <div className="col-4 offset-1">
  <img src={author!=null?author.imageSrc:null} className="authorimage" alt="Author"/>
    </div>
    <div className="col-6" >
    {movies!=null?movies.map((title,index) => <Book title={title} answer={answer} highlight={highlight} highlightIndex={index} key={index} 
    click={onAnswerSelected}/>):null
    }</div></div>)
}

function Continue({continueHandler , isCorrect}){
  return(<div className="form-group submitDiv"  >
    <button type="submit" onClick={()=>continueHandler()} disabled={!isCorrect} className="btn btn-primary">Continue</button>
  </div>)
}
function Footer(){
  return(
    <div id="footer" className="row">
    <div className="col-12">
    <p className="text-mute credit">All images are from Google images</p>
    </div>
    </div>
  )
}
function mapStateToProps(state){
  return {
    turnData: state.turnData,
    highlight: state.highlight,
    isCorrect: state.isCorrect

  }
}
function mapDispatchToProps(dispatch){
  return {
    onAnswerSelected:(answer)=>{
        dispatch({type:"onAnswerSelected",answer})
    },
    continueHandler:()=>{
      dispatch({type:"continueHandler"})
    }

  }
}
const AuthorQuiz = connect(mapStateToProps , mapDispatchToProps)(
function ({turnData,highlight,isCorrect,onAnswerSelected,continueHandler}) {

    return (
      <div className="container-fluid">
        <Hero/>
        <div className="row ">
        <div className="col-4 offset-1">
        <p className="submitDiv"><Link to="/addAuthor" className="btn btn-primary">Add Actor</Link></p>
        </div>
        <div className="col-6">
        <Continue isCorrect={isCorrect} continueHandler={continueHandler}/>
        </div>
        </div>
        
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
        
        
        <Footer/>
        </div>
    );
})
Turn.propTypes={
  author: propTypes.shape({
    name : propTypes.string.isRequired,
    imageSrc: propTypes.string.isRequired,
    imageSource: propTypes.string.isRequired,
    movies: propTypes.arrayOf(propTypes.string).isRequired
  }),

}

export default AuthorQuiz;

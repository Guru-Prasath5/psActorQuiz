import React ,{Component} from 'react';
import {connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import './App.css';


class AddActor extends Component{
 
constructor(props){
    super(props);
    this.state={
        
            name : "",
            imageSrc : "",
            imageSource : "Google Common",
            movie : '',
            movies :[],
            errorMsg:""
    };
     
    this.HandleTextChanges = this.HandleTextChanges.bind(this);
    this.addAuthorClicked = this.addAuthorClicked.bind(this);
    this.addMovies = this.addMovies.bind(this);
}

  


 HandleTextChanges(e){
    const id = e.target.id;
     this.setState({
        
            [id] : e.target.value
        
        }
     );
 }
 addAuthorClicked(e){
     e.preventDefault();
     this.setState({
        errorMsg :""
    });
    if(this.state.name === '' ){
        this.setState({
            errorMsg:"Please enter Actor name"
        })
    }else if(this.state.imageSrc ===''){
        this.setState({
            errorMsg:"Please enter Image URL"
        })
    }else if(this.state.movies.length<3){
        this.setState({
            errorMsg:"Please add miminum 4 movies"
        })
    }else{
     this.props.addActor(this.state);
     return;
    }
 }
 addMovies(e){
    e.preventDefault();
    this.setState({
        errorMsg :""
    });
    if(this.state.movie ===  '' ){
        this.setState({
            errorMsg:"Please enter movie name",
        }
        )
        
    }else if(this.state.movies.length>3){
        this.setState({
            errorMsg:"only 4 movie per actor",
        }
        )
        
    }else{
        this.setState(
            {
                movies : this.state.movies.concat([this.state.movie]),
                movie : ''
            }
        )
    }
     
 }
render(){
    return( <div className="container-fluid">
    <div className="row">
    <div className="jumbotron col-10 offset-1">
    <h1>Add Actor</h1>
    <p>Fill the below form and submit</p>
    </div>
    </div>
    
    <form  className="AddAuthor">
    <div className="errorMsg"><h5>{this.state.errorMsg}</h5></div>
        <div className="inputDiv">

            <input type="text" className="inputClass" value = {this.state.name} onChange={this.HandleTextChanges}  id="name" aria-describedby="emailHelp" placeholder="Enter Actor Name"/>
         </div>
            
        <div className="inputDiv"> 
            
            <input type="text" className="inputClass" value = {this.state.imageSrc} onChange={this.HandleTextChanges}  id="imageSrc" placeholder="Paste image URL"/>
        </div>

        <div  className="inputDivcheck">
            <input type="checkbox"  id="imageSource" />
            <label  style={{paddingLeft:"5px"}} value={this.state.imageSource} onChange={this.HandleTextChanges}>Image are from google common</label>
        </div>

        <div  className="inputDiv">
            
            {this.state.movies.map((movie,index) => <p><li key={index}>{movie}</li></p>)}
            <input type="text" className="inputClasslast"  value = {this.state.movie} onChange={this.HandleTextChanges} id="movie" placeholder="Add movies up to 4"/>
            <button className=" inputClassButton" name="movie" onClick={this.addMovies}>+</button>
        </div>
        <div className="addButton">
        <button type="submit" className="btn btn-primary" onClick={this.addAuthorClicked} >Add Actor</button>
        </div>
        
</form>
    </div>)
}
}

function AddAuthor({addActor}){
    return (<AddActor addActor={addActor}></AddActor>)

}
function mapDispatchToProps(dispatch, props){
    return {
        addActor:(addActor)=>{
            
            dispatch({type:"Add_Actor",addActor});
            props.history.push('/');

        },

       
    }
}
export default withRouter(connect(()=>{},mapDispatchToProps)(AddAuthor));
import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import enzyme,{mount,shallow,render} from 'enzyme';
import adapter from 'enzyme-adapter-react-16';
enzyme.configure({adapter:new adapter()});

const state={
  turnData : {
    name : "surya",
    imageSrc: "image/actor3.jpg",
    imageSource: "google common",
    movies:['24','gajini','varaman aeram','aanjan']
},
highlight : [
  { id : '0' , col: '' },
  { id : '1' , col: '' },
  { id : '2' , col: '' },
  { id : '3' , col: '' },
]

}
describe("testing AuthorQuiz", ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe("when no answer selected", () => {
    let wrapper;
    beforeAll(()=>{
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>);
    });
    it("should have no backgruond color", ()=>{
      expect(wrapper.find(".answer").first().style.backgroundColor).toBe("white");
    });
  });
  describe("when no answer selected div", () => {
    let wrapper;
    beforeAll(()=>{
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>);
      
    });
    it("should have no backgruond color", ()=>{
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("white");
    });
  })
});


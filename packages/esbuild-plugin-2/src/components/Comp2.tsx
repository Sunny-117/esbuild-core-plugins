import logo from "../assets/react.svg";
import comps from "./comps.module.css";
import _ from "lodash";
import word from "../assets/word.txt";
import readme from "../assets/readme.md"

export default () => { 
  console.log(word.name,word.age,word.score)
  _.debounce(() => console.log('hello world'), 1000)();
  return (
    <>
      <div dangerouslySetInnerHTML={{__html:readme.html}}></div>
      <h1 className={ comps.title }>Comp2</h1>
      <img src={logo} />
      <h3>name---{ word.name}</h3>
    </>
  )
}
import Header from "./Header";
import Footer from "./Footer";
import ListSection from "./ListSection";

function ToDoView(props) {
    
    return (
      <div className="App">
        <Header loadUser={props.loadUser} user={props.user} setSignIn={props.setSignIn}/>
        <ListSection user={props.user} />
        <Footer user={props.user} />
      </div>
    );
  }
  
  export default ToDoView;
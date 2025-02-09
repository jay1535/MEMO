import AddNote from "./AddNote";



const Home = (props) => {
  
const { showAlert}= props
  return (
    <>
    <AddNote showAlert={showAlert}/>
    
    </>
  );
};

export default Home;

import { useState } from 'react';
import { Button,  Table } from 'react-bootstrap';
import './App.css';
const config = require ('./config.json')


//functional component
function App() {
  //1.states/hook  variable
  const [student,setStudent] = useState({
    data:[]
  });



  //2.functions
  
  let getStudents=(e)=>{
    console.log("hello");
    //always wrap up the api calling code in try and catch block
    try {
      //api calling
      //there are 2 ways to call the api
      //1.fetch api 2.axios
      fetch(`${config.base_url}/api/friends`)
      .then((data)=>{
        //let's make the data readable
        return data.json();
      }).then((data)=>{
        console.log(data);
    
        //now set the data in hook variable
        setStudent(data)
      }).catch((err)=>{
        console.log(err);
      });

    } catch (error) {
      console.log(error)
    }
  }
  //3.return statements
  return (
    
      <>
          <h1>Read Operation</h1>
          <Button onClick={(e)=>{ getStudents (e)}}>Get Friends</Button>
          <br/>
          <br/>
          <br/>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Friend Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                student.data.map(function(currentValue, index, arr){
                  console.log(arr[index].id)
                  console.log(arr[index].attributes.name)
                  return (
                      <tr key={index}>
                        <td>{arr[index].id}</td>
                        <td>{arr[index].attributes.name}</td>
                        <td>
                          <Button variant="primary" size="sm">View</Button>&nbsp;
                          <Button variant="success" size="sm">Edit</Button>&nbsp;
                          <Button variant="danger" size="sm">Delete</Button>
                        </td>
                      </tr>
                  )
                })
              }

            </tbody>

          </Table>
      </>
  )
}

export default App;

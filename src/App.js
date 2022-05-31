import { useState } from 'react';
import { Button,  Pagination,  Table } from 'react-bootstrap';
import './App.css';
const config = require ('./config.json')


//functional component
function App() {
  //1.states/hook  variable
  const [student,setStudent] = useState({
    data:[]
  });

  const [PaginationItem,setPaginationItem]=useState([])   //pass array in initial data because we use map method

  //2.functions
  let goToPage = (e)=>{
    console.log(e.target.innerHTML);
    var pageno = parseInt(e.target.innerHTML);
    getStudents(e,pageno);
  }
  let last= (e)=>{
    console.log("last")
    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
      getStudents(e,student.meta.pagination.pageCount)
    }
  }
  let next= (e)=>{
    console.log("next")
    if (student.meta.pagination.page !== student.meta.pagination.pageCount){
      getStudents(e,student.meta.pagination.page+1)
    }
  }
  let first =(e)=>{
    console.log("first");
    if(student.meta.pagination.page !==1){
      getStudents(e,1);
    }
  }
  let previous =(e)=>{
    console.log("previous")
    if(student.meta.pagination.page !==1){
      getStudents(e,student.meta.pagination.page - 1)
    }
  }
  let getStudents = (e,pageno=1)=>{
    console.log("hello");
    //always wrap up the api calling code in try and catch block
    try {
      //api calling
      //there are 2 ways to call the api
      //1.fetch api 2.axios
      fetch(`${config.base_url}/api/friends?pagination[page]=${pageno}&pagination[pageSize]=10`)
      .then((data)=>{
        //let's make the data readable
        return data.json();
      }).then((data)=>{
        console.log(data);
    
        //now set the data in hook variable
        setStudent(data);
        var start = data.meta.pagination.page

        var arr =[];
        for (let i = start; i <= data.meta.pagination.pageCount; i++) {
          if(i==start){
            arr.push(<Pagination.Item active onClick={(e)=>{goToPage(e)}}>{i}</Pagination.Item>)
          }else{
            arr.push(<Pagination.Item onClick={(e)=>{goToPage(e)}}>{i}</Pagination.Item>)
          }
          
        }
        setPaginationItem(arr);
        
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
          <div className='d-flex justify-content-center'>
          <h1>Read Operation</h1>
          <Button onClick={(e)=>{ getStudents (e)}}>Get Friends</Button>
          </div>
          {
            student.data.length > 0 &&
          <>
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
            <Pagination className="d-flex justify-content-center">
              <Pagination.First onClick={(e)=>{first(e)}} />
              <Pagination.Prev onClick={(e)=>{previous(e)}} />
              {
              //PaginationItem.length > 0 &&
              PaginationItem.map(function (currentValue,index,arr){
                return currentValue
              })
              }
          
              <Pagination.Next onClick={(e)=>{next(e)}} />
              <Pagination.Last onClick={(e)=>{last(e)}} />
            </Pagination>
          </>
          }
      </>
  )
}

export default App;

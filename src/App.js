 
import './App.css';
import { useState, useEffect } from 'react';
import PostListAPI from './component/PostListAPI';
import PostApiGlobal from './component/PostApiGlobal';
import PostApiVietNam from './component/PostApiVietNam';
import PostFilterForm from './component/PostFilterForm';
 

function App() {

  //1. tạo 1 state trước, để lưu trữ danh sách posListAPI lấy từ server về
  // api cases
  const[postListAPI, setPosListtApi] = useState([]);
  useEffect(()=>{
      async function fetchPostListApi(){
        try {
        const requestUrl ='https://corona.lmao.ninja/v2/countries?sort=cases';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setPosListtApi(responseJSON);
      }
    catch (error) {
      console.log("Error: ", error.message)
      
    }
  } 
    fetchPostListApi();
    // [] chỉ chạy đúng 1 lần
  },[]);
   const [filters, setFilters] = useState(['Vietnam']);
  // api vietnam 

  const[postApiVietNam, setPostApiVietNam] = useState({}); 
  useEffect(()=>{
      async function fetchPostListApiVietNam(){
        try {         
            const requestUrl ='https://corona.lmao.ninja/v2/countries/'+filters;
            const response = await fetch(requestUrl);
            const responseJSONVN = await response.json();            
            setPostApiVietNam(responseJSONVN); 
      }      
    catch (error) {
      console.log("Error: ", error.message);

    }
  } 
  fetchPostListApiVietNam();
  },[filters]);

  //  api global
   const apiglobal = 'https://corona.lmao.ninja/v2/all';
   const[postApiGlobal, setPostApiGlobal] = useState({});
   useEffect(()=>{
       async function fetchPostListApiGlobal(){
         try {           
             const requestUrl =apiglobal;
             const response = await fetch(requestUrl);
             const responseJSON = await response.json();
              console.log({responseJSON}); 
             setPostApiGlobal(responseJSON);          
       }      
     catch (error) {
       console.log("Error: ", error.message)
     }
   } 
   fetchPostListApiGlobal();
   },[]);
// search
   function handleSearch(newFilter){
    // console.log("filter: ", newFilter.searchItems);
    if(newFilter.searchItems !==""){
      setFilters( newFilter.searchItems);
    }
       else {
        setFilters('Vietnam');
       }
   }

  return (

    <div className="App">
        <PostApiGlobal postGlobal={postApiGlobal}/>  
        <br></br>       
        <PostFilterForm  onSubmit={handleSearch} listCountry={postListAPI}/>
        <br></br>

        <PostApiVietNam  postVietNam={postApiVietNam} f404={filters} />  
        <br></br>
        
            
        <PostListAPI postApi={postListAPI}  />       
    </div>
  );
}

export default App;

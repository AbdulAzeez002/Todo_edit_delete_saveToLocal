import React, { useEffect, useState } from "react";
import "./App.css";


function App() {


  const [newItem, setNewItem] = useState("");
  const [items,setItems]=useState([])
  const[open,setOpen]=useState(false)
  const[edit,setEdit]=useState("")
  const [newVal,setNewVal]=useState()
  

  useEffect(()=>{

    if(items && items.length>0){
      const temp=JSON.stringify(items)
      localStorage.setItem("items",temp)
    }
   
  },[items])

  useEffect(()=>{
    const temp=localStorage.getItem('items')
     
    const loadedTodos=JSON.parse(temp)
    console.log(loadedTodos,'loaded')

    if(loadedTodos){
      setItems(loadedTodos)
    }
  },[])

  const AddItem=()=>{

    if(!newItem){
      alert('enter an item')
      return
    }
    const item={
      id:Date.now(),
      value:newItem
    }
    setNewItem("")

    setItems((prev)=>[...prev,item])

    console.log(items,'items')
  }

  const deleteItem=(id)=>{
    const newArray=items.filter((item)=>{
      return item.id!=id
    })

    setItems(newArray)
  }

  const EditItem=(todo)=>{
    setEdit(todo)
    setNewVal(todo.value)
    setOpen(true)
  }

  const finalEdit=(id)=>{

    console.log(id,'id')
    // console.log(value,'value')

    const newArray=items.filter((item)=>{
      return item.id!=id
    })

    const editedItem={
      id:id,
      value:newVal
    }

    setItems([...newArray,editedItem])
    setOpen(false)
  }

  return (
    <>
      <div className="App">
        <h1 className="mt-4 mb-4 text-2xl text-rose-800"> Add Your Todo </h1>

        <input type="text" placeholder="Add an item" className="border border-black rounded pl-2" value={newItem} onChange={(e)=>setNewItem(e.target.value)}/>
        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={AddItem}>Add</button>
 
        

         {
          items && items.length>0 ?<><h1 className="mt-8 mb-1 text-2xl text-gray-800"> Your Todos </h1> <div className="flex justify-center">
          <ul  className=" divide-y bg-gray-700 w-full mx-6 md:mx-0 md:w-1/5 divide-gray-200 p-3 mt-5 overflow-hidden hover:overflow-y-scroll  max-h-[200px]">
            {
              items.map((item,index)=>(
                <div className="flex justify-between pt-2">
                  <div>
                  <li className="text-white " key={item.id}> {index+1}. {item.value} </li>
                  </div>
                
                <div className="flex ">

                <button className="ml-2 mb-2  bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-1 px-2 rounded" onClick={()=>EditItem(item)}>Edit</button>
                <button className="ml-2 mb-2  bg-rose-700 hover:bg-rose-900 text-white font-bold py-1 px-2 rounded" onClick={()=>deleteItem(item.id)}>Delete</button>
                </div>
                </div>
              ))
            }
           
          </ul>
          </div></>:null
         }
        
        
      </div>
       
    
 {
  open && open ? <div  className="flex justify-center z-20 absolute left-1/2 top-1/4 ">
  <div class="relative p-4 w-full max-w-md h-full md:h-auto">
      <div class="relative bg-white border border-gray-300  rounded-lg shadow-xl dark:bg-gray-700">
          {/* <button type="button" className=" mb-2 absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={()=>setOpen(false)}>
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Close modal</span>
          </button> */}

          <h1 className="text-center">Edit your Todo</h1>

          <div className="flex justify-center pt-2">
          <input type="text" placeholder="Add an item" className="border border-black rounded pl-2" value={newVal} onChange={(e)=>setNewVal(e.target.value)}/>
        {/* <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={AddItem}>Add</button> */}
          </div>
          <div class="p-6 text-center">
              
          
              <button onClick={()=>setOpen(false)} data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Cancel
              </button>
              <button data-modal-toggle="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
               onClick={()=>finalEdit(edit.id)}>Edit</button>
          </div>
      </div>
  </div>
</div> : null
 }

     
    </>
  );
}

export default App;

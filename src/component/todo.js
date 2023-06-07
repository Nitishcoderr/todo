import React,{useState,useEffect} from 'react'
import './style.css'

// getting local storage data
const getLocalData = () =>{
    const lists = localStorage.getItem("mytodolist")

    if(lists){
        return JSON.parse(lists)
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputdata, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItem, setIsEditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false)

    // add the items function
    const addItem = () =>{
        if(!inputdata){
            alert("Plz fill the box")
        }
        else if(inputdata && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isEditItem){
                        return {...curElem, name:inputdata}
                    }
                    return curElem
                })
            )
            setInputData([])
            setIsEditItem(null)
            setToggleButton(false)
        }
        else{
            const myNewInputData = {
                id : new Date().getTime().toString(),
                name:inputdata,
            }
            setItems([...items,myNewInputData])
            setInputData("")
        }
    }
    // edit function addeing
    const editElem = (index) =>{
        const item_todo_edited = items.find((curElem)=>{
            return curElem.id === index;
        })
        setInputData(item_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)
    }
    // deleteing added item 
    const deleteItems = (index) =>{
        const updateItems = items.filter((curElem)=>{
            return curElem.id !== index
        })
        setItems(updateItems)
    }
    // removing all elements
    const removeAll = ()=>{
        setItems([])
    }

    // adding data to localstorage
    useEffect(() => {
      localStorage.setItem("mytodolist",JSON.stringify(items))
    }, [items])
    

  return (
    <div>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/notes.png" alt="" />
                <figcaption>Add Your List Here ✌️</figcaption>
            </figure>
            <div className="addItems">
                <input value={inputdata} onChange={(event)=>{setInputData(event.target.value)}} type="text" placeholder='✍️ Add Item' className='form-control' />
                {toggleButton ? (
                    <i className="far fa-edit add-btn"onClick={addItem} ></i>
                ) :( <i className="fa fa-plus add-btn"onClick={addItem} ></i>)}
                
            </div>
            {/* Show our items */}
            <div className="showItems">
                {items.map((curElem)=>{
                    return (
                        <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="todo-btn">
                    <i className="far fa-edit add-btn"onClick={()=> editElem(curElem.id)} ></i>
                    <i className="far fa-trash-alt add-btn"onClick={()=>deleteItems(curElem.id)} ></i>
                    </div>
                </div>
                    )
                })}
            </div>
            {/* remove all items */}
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text = "Remove All" onClick={removeAll} >
                  <span>CHECK LIST</span>  
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Todo


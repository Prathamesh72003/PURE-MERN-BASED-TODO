import React, {useEffect, useState} from 'react'
import '../App.css'

function Home() {
    
    const [TodosTaskContainer, setTodosTaskContainer] = useState([]);
    const [data, setData] = useState({});
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/todo', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        console.log(result);
        setData({ title: '', description: '' });
        document.getElementById("taskinput").value = "";
        document.getElementById("descinput").value = "";
      }


    async function fetchfun(){
        try {
        const res = await fetch('http://localhost:5000/todo');
        const todos = await res.json();
        console.log(todos);
        setTodosTaskContainer(todos);
        } catch (error) {
            console.log(error);
        }
    }
      
    useEffect(() => {
        fetchfun();
    }, [TodosTaskContainer])

  
    const deleteCard = async(id) => {
        if (id == null) {
            alert("Cannot delete something went wrong")
        }else{
            try {
                await fetch(`http://localhost:5000/todo/${id}`, {
                    method: 'DELETE'
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
    

  return (
    <div className = 'Container'>
        <div className = 'topAreaContainer'>
            <div className = 'TodosTaskContainer'>
                {TodosTaskContainer.map((item,index)=>{
                    return(
                        <div className = 'TodoTaskCard' key={index}>
                            <div>
                            <p className='todoTitle'>{item.title}</p>
                            <p className='todoDescription'>{item.description}</p>
                            </div>
                            <div>
                                <button onClick={() => deleteCard(item._id)}>Complete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        <div className = 'bottomAreaContainer'>
            <div className = 'InputSectionContainer'>
                <form onSubmit={handleSubmit}>
                <div className = 'TextInputContainer'>
                    <input type="text" className='taskinput' id='taskinput' name='taskinput' placeholder='ToDo Title' onChange={e => setData({...data, title: e.target.value})} required/>
                    <input type="text" className='taskinput' id='descinput' name='descinput' placeholder='ToDo Description' onChange={e => setData({...data, description: e.target.value})} required/>
                </div>
                <div className = 'AddButtonContainer'>
                <button className="button-19" role="button" type="submit">Add Task</button>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Home
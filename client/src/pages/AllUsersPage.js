import React, { useState, useEffect } from "react"

import Grid from '@material-ui/core/Grid';
	
export const AllUsersPage = () => { 
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);       
        const [menu, setMenu] = useState([]);
        const [users, setUsers] = useState([]);
        const [form, setForm] = useState({
                                    name: '',
                                    quantity: ''
                                })
            

    useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);  
          setMenu(result);
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }, []);

    useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);  
          setUsers(result);
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }, []);

    
	// Получение одного пользователя
    async function GetUser(id) {
        const response = await fetch("/api/menu/" + id, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });
        if (response.ok === true) {
            const user = await response.json();                
            setForm(user);                
            console.log("user"); console.log(user);                
        }
    };

    // Добавление пользователя
        async function CreateUser() {
  
            const response = await fetch("api/user", {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,                    
                    quantity: form.quantity                   
                })
            });
            if (response.ok === true) {
                const user = await response.json();
                console.log(user);
                // reset();
                // document.querySelector("tbody").append(row(user));
            }
        }

    // Удаление пользователя
        async function DeleteUser(id) {
            // const response = await fetch("/api/user/" + id, {
            //     method: "DELETE",
            //     headers: { "Accept": "application/json" }
            // });
            // if (response.ok === true) {
            //     const user = await response.json();
            //     console.log("User id)")
            // }
            console.log("User id)"); console.log(id);
        }


        const changeHandler = event => {
            setForm({ ...form, [event.target.name]: event.target.value });            
        }



	// Условный рендеринг компонента
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
          <>
            <h5>Все посетители</h5>
            <form name="userForm">
                <input type="hidden" name="id" value="" />
                <div className="form-group">
                    <label htmlFor="name">Название:</label>
                    <input className="form-control" name="name" value={form.name}
                        onChange={changeHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="cost">Цена:</label>
                    <input className="form-control" name="cost" value={form.age} />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Кол-во:</label>
                    <input className="form-control"
                            name="quantity"
                            value={form.quantity}
                            onChange={changeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="measure">Ед.изм:</label>
                    <input className="form-control" name="measure" value={form.measure} />
                </div>
                <div className="panel-body">
                    <button onClick={CreateUser} className="btn btn-sm btn-primary">Сохранить</button>                    
                </div>
            </form>

        <Grid container spacing={3}>
            <Grid item xs={6}>
            <table>
                <thead>
                    <th>Блюдо</th><th>Цена</th><th>Ед.изм</th>
                </thead>           
                
                {menu.map(product => (
                <tr>    
                    <td>{product.name}</td>
                    <td>{product.age}</td>
                    <td>{product.measure}</td>
                 </tr>                                                                                 
                ))}  
            </table>           
            </Grid>

            <Grid item xs={6}>
            <table>
                <tr>
                    {users.map(value => ( <th>{value.name}</th> ))} 
                </tr>                
                                   
                    {users.map( (product) => (                      
                        <td>                                                    
                                {product.quantity.map(value => (                                     
                                    <tr style={{ height: 55 }}>{value}</tr>                                    
                                ))}
                                <tr><button onClick={DeleteUser(product.id)}>Delete</button></tr>                                
                        </td>                    
                    ))}
                                
            </table>
            </Grid>

         </Grid>   
        </>
        );
  }
}

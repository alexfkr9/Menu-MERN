import React, { useState, useEffect } from "react"

import Table from '@material-ui/core/Table';
	
export const UserMenuPage = () => { 
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);       
        const [menu, setMenu] = useState([]);
        const [name, setName] = useState('');
        const [quantity, setQuantity] = useState([]);
        const [arr, setArr] = useState([]);
            

    useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);  
          setMenu(result);
          setArr(Array.from({ length: result.length }, () => 0));
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])	
	

    // Добавление пользователя
        async function CreateUser() {
  console.log("user");
            const response = await fetch("api/user", {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,                    
                    quantity: quantity                   
                })
            }); 
            if (response.ok === true) {
                const user = await response.json();
                console.log(user);                
            }
        }    

        const getName = (event) => {
            const n = event.target.value;
            setName(n);
            console.log(name);
        }

        const changeHandler = (event) => {             
            arr[event.target.id] = event.target.value;
            setQuantity(arr);         
            console.log(setQuantity);
        }

	// Условный рендеринг компонента
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
          <>
            <h5>Создать заказ</h5>
            <form className="userForm">
                <input type="hidden" name="id" value="" />
                <div className="form-group">
                    <label htmlFor="name">Ваше Имя:</label>
                    <input className="form-control" name="name" value={name}
                        onChange={getName} />
                </div>                
                <div className="panel-body">
                    <button onClick={CreateUser} className="btn btn-sm btn-primary">Сохранить</button>
                    
                </div>
            </form>
            <Table>
                <thead>
                <tr>
                    <th>Блюдо</th><th>Цена</th><th>Ед.изм</th><th>Кол-во</th>
                </tr>
                </thead>
                <tbody>
                {menu.map( (product, id) => (
                <tr key = {product._id}>
                    <td>{product.name}</td>
                    <td>{product.age}</td>
                    <td>{product.measure}</td>
                    <td><input className="form-control"
                                name="quantity"
                                id={id}                            
                                onChange={changeHandler}
                        />
                    </td>                                           
                </tr>
                ))}
                </tbody>
            </Table>
        </>
        );
  }
}

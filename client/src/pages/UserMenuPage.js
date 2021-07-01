import React, { useState, useEffect } from "react"
	
export const UserMenuPage = () => { 
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);       
        const [menu, setMenu] = useState([]);
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
  }, [])	
   

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

    // отправка формы
        // function submitForm() {
        //       // e.preventDefault();              
        //       const form = document.forms["userForm"];
        //       console.log(form);
        //       const id = form.elements["id"].value;
        //       const name = form.elements["name"].value;
        //       const age = form.elements["age"].value;
        //       const quantity = form.elements["quantity"].value;
        //       const measure = form.elements["measure"].value;
        //       if (id == 0)
        //           CreateUser(name, quantity);
        //       // else
        //       //     EditUser(id, name, age, measure);          
        // }
        // загрузка пользователей
        // GetUsers();


        const changeHandler = event => {
            setForm({ ...form, [event.target.name]: event.target.value });
            console.log(form);
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
                    <a id="reset" onClick="{reset}" className="btn btn-sm btn-primary">Сбросить</a>
                </div>
            </form>
            <table>
                {menu.map(product => (
                <tr key = {product._id}>
                <td>{product.name}</td>
                <td>{product.age}</td>
                <td>{product.measure}</td>
                <td><button onClick={ () => {GetUser(product._id)} } data-id={product._id}
                            style={{cursor:'pointer', padding:'15px'}}
                            >Изменить
                    </button>
                </td>                           
                </tr>
                ))}
            </table>
        </>
        );
  }
}

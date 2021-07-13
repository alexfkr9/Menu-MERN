import React from 'react'

import {EditRowModelControlGrid} from './EditRowModelControlGrid'

export const CreateMenuPage = () => {  

    // Получение меню
        async function GetUsers() {
            // отправляет запрос и получаем ответ
            const response = await fetch("/api/menu", {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
            // если запрос прошел нормально
            if (response.ok === true) {
                // получаем данные
                const users = await response.json();                
                console.log(users);
                let rows = document.querySelector("tbody"); 
                users.forEach(user => {
                    // добавляем полученные элементы в таблицу
                    rows.append(row(user));
                });
            }
        }
          // Получение одного пользователя
        async function GetUser(id) {
            const response = await fetch("/api/menu/" + id, {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
            if (response.ok === true) {
                const user = await response.json();
                const form = document.forms["userForm"];
                form.elements["id"].value = user._id;
                form.elements["name"].value = user.name;
                form.elements["age"].value = user.age;
                form.elements["measure"].value = user.measure;
            }
        }
        // Добавление пользователя
        async function CreateUser(userName, userAge, measure) {
  
            const response = await fetch("api/menu", {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: userName,
                    age: parseInt(userAge, 10),
                    measure: measure
                })
            });
            if (response.ok === true) {
                const user = await response.json();
                reset();
                document.querySelector("tbody").append(row(user));
            }
        }
        // Изменение пользователя
        async function EditUser(userId, userName, userAge, measure) {
            const response = await fetch("api/menu", {
                method: "PUT",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: userId,
                    name: userName,
                    age: parseInt(userAge, 10),
                    measure: measure
                })
            });
            if (response.ok === true) {
                const user = await response.json();
                reset();
                document.querySelector("tr[data-rowid='" + user._id + "']").replaceWith(row(user));
            }
        }
        // Удаление пользователя
        async function DeleteUser(id) {
            const response = await fetch("/api/menu/" + id, {
                method: "DELETE",
                headers: { "Accept": "application/json" }
            });
            if (response.ok === true) {
                const user = await response.json();
                document.querySelector("tr[data-rowid='" + user._id + "']").remove();
            }
        }
  
        // сброс формы
        function reset(e) {
            e.preventDefault();
            const form = document.forms["userForm"];
            form.reset();
            form.elements["id"].value = 0;
        }
        // создание строки для таблицы
        function row(user) {
  
            const tr = document.createElement("tr");
            tr.setAttribute("data-rowid", user._id);
  
            const idTd = document.createElement("td");
            idTd.append(user._id);
            tr.append(idTd);
  
            const nameTd = document.createElement("td");
            nameTd.append(user.name);
            tr.append(nameTd);
  
            const ageTd = document.createElement("td");
            ageTd.append(user.age);
            tr.append(ageTd);

            const costTd = document.createElement("td");
            costTd.append(user.measure);
            tr.append(costTd);
              
            const linksTd = document.createElement("td");
  
            const editLink = document.createElement("a");
            editLink.setAttribute("data-id", user._id);
            editLink.setAttribute("style", "cursor:pointer;padding:15px;");
            editLink.append("Изменить");
            editLink.addEventListener("click", e => {
  
                e.preventDefault();
                GetUser(user._id);
            });
            linksTd.append(editLink);
  
            const removeLink = document.createElement("a");
            removeLink.setAttribute("data-id", user._id);
            removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
            removeLink.append("Удалить");
            removeLink.addEventListener("click", e => {
  
                e.preventDefault();
                DeleteUser(user._id);
            });
  
            linksTd.append(removeLink);
            tr.appendChild(linksTd);
  
            return tr;
        }
        
  
        // отправка формы
        function submitForm() {
              // e.preventDefault();              
              const form = document.forms["userForm"];
              console.log(form);
              const id = form.elements["id"].value;
              const name = form.elements["name"].value;
              const age = form.elements["age"].value;
              const measure = form.elements["measure"].value;
              if (id === 0)
                  CreateUser(name, age, measure);
              else
                  EditUser(id, name, age, measure);          
        }
        // загрузка пользователей
        GetUsers();

  return (
    <>
    <EditRowModelControlGrid />
    <div className="row">
          <h5>Создать меню</h5>
    <form name="userForm">
        <input type="hidden" name="id" value="0" />
        <div className="form-group">
            <label htmlFor="name">Название:</label>
            <input className="form-control" name="name" />
        </div>
        <div className="form-group">
            <label htmlFor="age">Цена:</label>
            <input className="form-control" name="age" />
        </div>
        <div className="form-group">
            <label htmlFor="measure">Ед.изм:</label>
            <input className="form-control" name="measure" />
        </div>
        <div className="panel-body">
            <button onClick={submitForm} className="btn btn-sm btn-primary">Сохранить</button>
            <a id="reset" onClick={reset} className="btn btn-sm btn-primary">Сбросить</a>
        </div>
    </form>
    <table className="table table-condensed table-striped table-bordered">
        <thead><tr><th>Id</th><th>Имя</th><th>Цена</th><th>Ед.изм</th></tr></thead>
        <tbody>
        </tbody>
    </table>
  </div>
  </>  
  )
}


import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {AllUsersPage} from './pages/AllUsersPage'
import {CreateMenuPage} from './pages/CreateMenuPage'
import {UserMenuPage} from './pages/UserMenuPage'

import CreateMenuPageMat from './pages/CreateMenuPageMat'

export const useRoutes = isAuthenticated => {

  // if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <div style={{ padding: '30px' }}>          
            <AllUsersPage />
          </div>
        </Route>  
        <Route path="/user" exact>
          <div style={{ padding: '30px' }}>          
            <UserMenuPage />
          </div>
        </Route>
        <Route path="/create" exact>
          <CreateMenuPage />
        </Route>
        <Route path="/create_mat" exact>
          <CreateMenuPageMat />
        </Route>       
        <Redirect to="/create" />
      </Switch>
    )
  // }

  // return (
  //   <Switch>
  //     <Route path="/" exact>
  //       <div style={{ padding: '30px' }}>
  //         <h1>Material Table Example</h1>
  //         <MTable />
  //       </div>
  //     </Route>
  //     <Redirect to="/" />
  //   </Switch>
  // )
}

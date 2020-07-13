import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Nav from './Nav'
import Questions from './Questions'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard'
import PollView from './PollView'
import PageNotFound from './PageNotFound'
import PrivateRoute from './PrivateRoute'

class App extends Component {

  componentDidMount() {
      const { dispatch } = this.props
      dispatch(handleInitialData())
  }

  render () {
    const { loading } = this.props

    return (
      <Router>
        <Fragment>
          <Nav />   
          <div>
            <LoadingBar /> 
            {loading === true
              ? null
              : <div className='ui attached two item container' style={{width:'35%', marginTop:'8em'}}>
                <Switch>
                  <Route path='/login' exact component={Login} />
                  <PrivateRoute path='/' exact component={Questions} />
                  <PrivateRoute path='/add' exact component={AddQuestion} />
                  <PrivateRoute path="/questions/:question_id" component={PollView} />
                  <PrivateRoute path='/leaderboard' exact component={Leaderboard} />
                  <Route component={PageNotFound} /></Switch>
                </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser, loadingBar }) {

  return {
    authedUser,
    loading: loadingBar.default > 0
  }
}

export default connect(mapStateToProps)(App);

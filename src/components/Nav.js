import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Image, Menu } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'
import {logOut} from '../actions/authedUser'

class Nav extends Component {

    onLogout = (e, data) => {
        const { dispatch, history } = this.props
        e.preventDefault()
        if(data.name === 'logOut'){
            dispatch(logOut())
            history.push('/login')
        }
    }
  
    render () {
        const { authedUser, users } = this.props
        const user = users[authedUser]
        return (
            <Menu inverted color='teal' fixed='top' size='large'>
                <Container>
                    <Menu.Item as={NavLink} name='home' exact to='/'>
                        Home
                    </Menu.Item>
                    <Menu.Item as={NavLink} name='add' exact to='/add'>New Question</Menu.Item>
                    <Menu.Item as={NavLink} name='leaderboard' to='/leaderboard'>Leader Board</Menu.Item> 
                    {authedUser && (
                    <Menu.Menu position='right'>
                        <Menu.Item as='a' >
                        <span style={{ marginRight: "12px" }}>Hello, {user.name}</span>
                        <Image avatar src={user.avatarURL}/>
                        </Menu.Item>
                        <Menu.Item as={NavLink} name='logOut' to='/login' onClick={this.onLogout}>Logout</Menu.Item>
                    </Menu.Menu>)}
                </Container>
            </Menu>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    return { 
        authedUser, 
        users 
    }
}

export default withRouter(connect(mapStateToProps)(Nav))
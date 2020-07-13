import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Grid, Icon, Header, Image, Segment } from 'semantic-ui-react'
import { setAuthedUser } from '../actions/authedUser'
import logo from '../logo.svg';

class Login extends Component {
    state = {
        authedUser: ''
    };

    onUserSelection = (event, data) => {
        event.preventDefault()
        this.setState({ 
            authedUser: data.value 
        })
    }

    onUserSignin = () => {
        const { dispatch, history, location } = this.props
        const { authedUser } = this.state

        dispatch(setAuthedUser(authedUser))
    
        const { from } = location.state || { from: { pathname: '/' }}
        history.push(from)
    }
    render(){
        const { authedUser } = this.state;
        const { users } = this.props
        if (!users) {
            return;
        }

        const userSelectionOptions = Object.keys(users).map(userId => ({
            key: userId,
            value: userId,
            text: users[userId].name,
            image: { avatar: true, src: users[userId].avatarURL }
        }));

        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Image src={logo} size="small" centered />
                    <Header as='h2' textAlign='center' color='teal' >
                        Login to your account
                    </Header>
                    <Form size='large'>
                        <Segment style={{textAlign: 'middle', paddingLeft: '6px'}}>
                            <div className="field" style={{textAlign: 'left', paddingLeft: '6px'}}>
                                <label>User</label>
                            </div>
                            <Form.Dropdown fluid selection placeholder='Select a user' options={userSelectionOptions} onChange={this.onUserSelection} />
                                <div className="field" style={{textAlign: 'left', paddingLeft: '6px'}}>
                                    <label>Password</label>
                                </div>
                            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password (optional)' type='password' />
                            <Button animated fluid color='teal' size='large' disabled={authedUser === ''} onClick={this.onUserSignin}>
                                <Button.Content visible>Login</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='sign-in' />
                                </Button.Content>
                            </Button>
                            
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}

function mapStateToProps({ users }) {
    return { 
        users 
    }
}

export default connect(mapStateToProps)(Login);
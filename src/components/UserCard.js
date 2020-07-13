import React, { Component } from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'

class UserCard extends Component {
    render() {
		    const {user} = this.props
		
		    return (
          
            <Card style={{ width: "90%" }}>
                <Card.Content>
                    <Image floated="right" circular size="small" src={user.avatarURL} />
                    <Card.Header>{user.name}</Card.Header>
                    <h4>Total Questions created by {user.name}: {user.created}</h4>
                    <h4>Total Questions answered by {user.name}: {user.answered}</h4>
                    <Button as='div' labelPosition='right'>
                        <Button color='teal'>
                            <Icon name='trophy' />
                            Score
                        </Button>
                        <Label as='a' basic color='teal' pointing='left'>
                            {user.score}
                        </Label>
                    </Button>
                </Card.Content>
            </Card>
		    )
    }
}

export default UserCard
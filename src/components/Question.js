import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Divider, Icon, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { formatDate } from '../utils/helpers'

class Question extends Component {

    onViewPoll = (e, data) => {
        const { history, id } = this.props
        e.preventDefault()
        history.push(`/questions/${id}`)
    }
  
    render(){
        const { question, user } = this.props
        return (
            /** used fluid to dynamically fill the width of component to parent **/
            <Card fluid>
                <Card.Content>
                    <Image circular floated='right' size='small' src={user.avatarURL}/>
                    <Card.Header>{user.name} asks</Card.Header>
                    <Card.Meta>Would you rather</Card.Meta>
                    <br />
                    <span><strong>Q1:</strong>&nbsp;{question.optionOne.text}?</span>
                    <Divider horizontal>OR</Divider>
                    <span><strong>Q2:</strong>&nbsp;{question.optionTwo.text}?</span>
                    <Divider />
                    <span><strong>Question asked on:</strong>&nbsp;{formatDate(question.timestamp)}</span>
                </Card.Content>
                <Card.Content extra>
                    <Button animated fluid color='teal' onClick={this.onViewPoll}>
                        <Button.Content visible>View Poll</Button.Content>
                        <Button.Content hidden>
                            <Icon name='eye' />
                        </Button.Content>
                    </Button>
                </Card.Content>
            </Card>
        )
    }
}

function mapStateToProps({questions, users}, {id}) {
    const question = questions[id]
    const user = users[question.author]
    return {
        question,
        user
    }
}


export default withRouter(connect(mapStateToProps)(Question))
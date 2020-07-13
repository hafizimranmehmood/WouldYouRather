import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Divider, Icon, Image } from 'semantic-ui-react'
import { handleQuestionAnswer } from '../actions/questions'

class QuestionView extends Component {

    onVotePolled = (e, data) => {
        const { authedUser, dispatch, qid } = this.props
        const answer = data.value
        dispatch(handleQuestionAnswer(authedUser, qid, answer))
    }
  
    render(){
        const { authedUser, question, users } = this.props
        if (!question)
            return;
        const user = users[question.author]
        const totalAnswers = Object.keys(users[authedUser].answers).length
        return (
            /** used fluid to dynamically fill the width of component to parent **/
            <Card fluid>
                <Card.Content>
                    <Image circular floated='right' size='small' src={user.avatarURL}/>
                    <Card.Header>{user.name} asks</Card.Header>
                    <h3>Would you rather</h3>
                    <br />
                    <span><strong>Q1:</strong>&nbsp;{question.optionOne.text}?</span>
                    <Divider horizontal>OR</Divider>
                    <span><strong>Q2:</strong>&nbsp;{question.optionTwo.text}?</span><br />
                    <br />
                    <Divider />
                    <span>Total question You answered:&nbsp;<strong>{totalAnswers}</strong></span>
                </Card.Content>
                <Card.Content extra>
                    <Button animated basic color='teal' value='optionOne' onClick={this.onVotePolled}>
                        <Button.Content visible>Go with Q1</Button.Content>
                        <Button.Content hidden>
                            <Icon name='upload' />
                        </Button.Content>
                    </Button>
                    <Button animated basic color='teal' value='optionTwo' onClick={this.onVotePolled}>
                        <Button.Content visible>Go with Q2</Button.Content>
                        <Button.Content hidden>
                            <Icon name='upload' />
                        </Button.Content>
                    </Button>
                </Card.Content>
            </Card>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, {qid}) {
    const question = questions[qid]
    return {
        authedUser,
        question,
        users,
        qid
    }
}

export default connect(mapStateToProps)(QuestionView)
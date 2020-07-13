import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image } from 'semantic-ui-react'
import ResultOption from './ResultOption'
import { formatDate } from '../utils/helpers'

class PollResult extends Component {
    render () {
        const { authedUser, question, users } = this.props

        if (!question)
            return

        const user = users[question.author];

        const votedOptionOne = question.optionOne.votes.includes(authedUser);
        const votedOptionTwo = question.optionTwo.votes.includes(authedUser);
        const optionOneVotes = question.optionOne.votes.length;
        const optionTwoVotes = question.optionTwo.votes.length;
        const totalVotes = optionOneVotes + optionTwoVotes;

        return (
            <Card style={{ width: "90%" }}>
                <Card.Content>
                    <Image floated="right" circular size="small" src={user.avatarURL} />
                    <Card.Header>Asked by {user.name}</Card.Header>
                    <Card.Meta><span><strong>On:</strong>&nbsp;{formatDate(question.timestamp)}</span>
                    </Card.Meta>
                    <h3>Poll Results</h3>
                    <h4>Total votes polled: {totalVotes}</h4>
                    <span>Question 1 polled votes: <strong>{optionOneVotes}</strong></span><br />
                    <span>Question 2 polled votes: <strong>{optionTwoVotes}</strong></span>
                    <br />
                    <div>
                        <ResultOption voted={votedOptionOne} 
                            polledVotes={optionOneVotes} 
                            totalVotes={totalVotes} 
                            question={`Q1: ${question.optionOne.text}`} 
                        />
                        <ResultOption voted={votedOptionTwo} 
                            polledVotes={optionTwoVotes} 
                            totalVotes={totalVotes} 
                            question={`Q2: ${question.optionTwo.text}`} 
                        />
            
                    </div>
                </Card.Content>
            </Card>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, {qid}) {
    const question = questions[qid];
    return {
        authedUser,
        question,
        users
    }
}

export default connect(mapStateToProps)(PollResult)

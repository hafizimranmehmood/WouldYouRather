import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PollResult from './PollResult'
import QuestionView from './QuestionView'
import PageNotFound from './PageNotFound'

class PollView extends Component {

    userAnsweredQuestion() {
        const { authedUser, question } = this.props

        if (!question) 
            return false;

        return (
            question.optionOne.votes.includes(authedUser) ||
            question.optionTwo.votes.includes(authedUser)
        )
    }

    componentDidMount() {
        const { history, question } = this.props
        if (!question) {
            history.push("/404")
        }
    }

    render() {
        const { question, qid } = this.props

        if (!question) {
            return <PageNotFound />
        }

        return (
            this.userAnsweredQuestion() 
                ? <PollResult qid={qid}/>
                : <QuestionView qid={qid}/>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, {match}) {
    const qid = match.params.question_id
    const question = questions[qid]
    return {
        authedUser,
        question,
        users,
        qid
    };
};

export default withRouter(connect(mapStateToProps)(PollView))
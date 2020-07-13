import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label, Menu, Segment, Tab } from 'semantic-ui-react'
import Question from './Question'

class Questions extends Component {
    state = {
        activeIndex: 0,
    }

    onTabChanged= (e, data) => {
        this.setState({activeIndex: data.activeIndex})
        console.log(data.activeIndex)
    }
  
    render()  {
        const {unansweredQuestions, answeredQuestions } = this.props
        const panes = [
        {
            menuItem: (
                <Menu.Item key="unanswered-questions">
                    {
                        /** if frist tab is selected force text to strong **/
                        this.state.activeIndex === 0 
                            ? (<strong>Unanswered Questions</strong>)
                            : (<span>Unanswered Questions</span>)
                    }
                </Menu.Item>
            ),
            render: () => 
            (
                <Tab.Pane>
                    <Segment style={{textAlign: 'center'}}>
                        <strong>Total items in this section are &nbsp; &nbsp;</strong>
                        <Label circular color='teal' size="large">{unansweredQuestions.length}</Label>
                    </Segment>
                    <div>
                    {  
                        unansweredQuestions.map((id) => (
                            <Question key={id} id={id}/>    
                        ))
                    }
                    </div>
                </Tab.Pane>
            )
        },
        {
            menuItem: (
                <Menu.Item key="answered-questions">
                    {
                        /** if second tab is selected force text to strong **/
                        this.state.activeIndex === 1 
                            ? (<strong>Answered Questions</strong>)
                            : (<span>Answered Questions</span>)
                    }
                </Menu.Item>
            ),
            render: () => 
            (
                <Tab.Pane>
                    <Segment style={{textAlign: 'center'}}>
                        <strong>Total items in this section are  </strong>
                        <Label circular color='teal' size="large">{answeredQuestions.length}</Label>
                    </Segment>
                    <div>{
                        answeredQuestions.map((id) => (
                            <Question key={id} id={id}/>    
                        ))
                    }
                    </div>
                </Tab.Pane>
            )
        }]

        return (
            <div>
                <Tab 
                    menu={{attached: true, pointing: true, widths: 2, color: 'teal'}} 
                    panes={panes} 
                    activeIndex={this.state.activeIndex}
                    onTabChange={this.onTabChanged}
                />
            </div>
        )
    }
}

function mapStateToProps({authedUser,questions}) {
    const unansweredQuestions = Object.keys(questions)
        .filter((id) => (
            !questions[id].optionOne.votes.includes(authedUser) &&
            !questions[id].optionTwo.votes.includes(authedUser)
        ))
        .sort((qid1, qid2) => (
            questions[qid2].timestamp - questions[qid1].timestamp
        ))
        const answeredQuestions = Object.keys(questions)
        .filter((id) => (
            questions[id].optionOne.votes.includes(authedUser) ||
            questions[id].optionTwo.votes.includes(authedUser)
        ))
        .sort((qid1, qid2) => (
            questions[qid2].timestamp - questions[qid1].timestamp
        ))
    return {
        unansweredQuestions,
        answeredQuestions
    }
}
export default connect (mapStateToProps)(Questions)
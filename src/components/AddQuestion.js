import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Divider, Icon, Image, Input } from 'semantic-ui-react'
import { handleAddQuestion } from '../actions/questions'
import { withRouter } from 'react-router-dom'

class AddQuestion extends Component {
    state = {
        optionOneText: "",
        optionTwoText: "",
    }

    onOptionChange = (e, data) => {
        this.setState({ 
            [data.name]: data.value, 
        })
    }

    isDisabled = () => {
        const { optionOneText, optionTwoText } = this.state;
        return optionOneText === '' || optionTwoText === ``
    }

    onAddQuestion = (e) => {
        e.preventDefault()
        const { optionOneText, optionTwoText } = this.state;
        const { author, dispatch, history} = this.props;
        
        dispatch(handleAddQuestion(optionOneText, optionTwoText, author));
    
        history.push("/");
    }

    render() {
        const { optionOneText, optionTwoText } = this.state
        const { author, users } = this.props
        const user = users[author]
        return (
            <div>
                <Card style={{ width: "90%" }}>
                    <Card.Content>
                        <Image floated="right" circular size="small" src={user.avatarURL} />
                        <Card.Header>{user.name} is</Card.Header>
                        <Card.Meta>Creating a new question</Card.Meta>
                        <br />
                        <span>Total Questions created by You: <strong>{user.questions.length}</strong></span>
                        <h2>Would you rather</h2>
                        <Card.Description>
                            <Input fluid name="optionOneText" 
                                placeholder="Enter Option One Text Here"
                                value={optionOneText}
                                onChange={this.onOptionChange}
                            /> 
                            <Divider horizontal>OR</Divider>    
                            <Input fluid name="optionTwoText"
                                placeholder="Enter Option Two Text Here"
                                value={optionTwoText}
                                onChange={this.onOptionChange}
                            />        
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className="ui two buttons">
                            <Button animated fluid color="teal" disabled={this.isDisabled()} onClick={this.onAddQuestion}>
                                <Button.Content visible>Submit</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='add' />
                                </Button.Content>
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users}) {

    return { 
        users, 
        author: authedUser
    }
}

export default withRouter(connect(mapStateToProps)(AddQuestion))

import React, { Component } from 'react'
import { Label, Message, Progress } from 'semantic-ui-react'

class ResultOption extends Component {
    render () {
        const { voted, polledVotes, totalVotes, question } = this.props
        const color = voted ? 'teal' : 'grey'

        return (
            <Message color={color} style={{marginTop:'10px', height:'115px'}}>
                <div>{ voted && (<Label as='a' tag floating color="orange">Your Vote</Label>)}
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <Message.Header className='ui header' style={{fontSize: 16}}>
                            {question}
                        </Message.Header>
                        <Progress value={polledVotes} total={totalVotes} indicating progress color='teal' precision={2} style={{marginTop:'18px'}}>
                            {polledVotes} out of {totalVotes} votes
                        </Progress>
                    </div>
                </div>
            </Message>
        )
    }
}

export default ResultOption

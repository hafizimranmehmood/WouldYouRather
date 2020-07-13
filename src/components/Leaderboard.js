import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'

class Learboard extends Component {
    render() {
        const {userDetailInfos} = this.props
        const cards = userDetailInfos.map(userInfo => (
            <UserCard key={userInfo.uid} user={userInfo} />    
        ))

        return (
            <div>{cards}</div>
        )
    }
}

function mapStateToProps({users}) {
    const userDetailInfos = Object.keys(users).map((id) => {
            return {
                uid: id,
                name: users[id].name,
                avatarURL: users[id].avatarURL,
                created: users[id].questions.length,
                answered: Object.keys(users[id].answers).length,
                score: (users[id].questions.length + Object.keys(users[id].answers).length)
            }
        }).sort((user1, user2) => (user2.score - user1.score))
    return {
        userDetailInfos
    }
}

export default connect(mapStateToProps)(Learboard)
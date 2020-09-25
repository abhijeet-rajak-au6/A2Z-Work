import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapToPropsData } from '../redux/mapStateToProps'

const initialState = {
    message: "",
}

class MessageInput extends Component {
    state = initialState

    handleChangeMessage = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmitSendMessage = (event) => {
        event.preventDefault()
        if (this.props.socket) {
            this.props.socket.emit("chatroomMessage", {
                chatRoomId: this.props.dataObj.chatroom._id,
                message: this.state.message
            })
            this.setState({ message: "" })
        }
    }
    render() {
        return (
            <div className="message-input-container">
                <form onSubmit={this.handleSubmitSendMessage} className="form-inline">
                    <input onChange={this.handleChangeMessage} type="text" className="message-input" placeholder="Enter your message..." name="message" value={this.state.message} required />
                    <input type="submit" className="btn btn-success message-submit" value="Send" />
                </form>
            </div>
        )
    }
}

export default connect(mapToPropsData)(MessageInput)
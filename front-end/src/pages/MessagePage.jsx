import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { mapToPropsData } from '../redux/mapStateToProps'
import { socketConnection } from '../redux/socketClient'
import person_icon from '../img/person_icon.png'
import MessageInput from '../components/MessageInput'
import { getAllChatrooms, getSpecificChatroom, fetchChatroomAllMessages } from '../redux/actions/dataAction'
import { headerAuthorization } from '../axios'
import Spinner from '../components/common/Spinner'
import '../styles/MessagePage.css'

const initialState = {
    createChatroom: "",
    socket: null,
    chatRoomId: null,
    allChatroom: "",
    displayMessage: "none",
    messages: [],
    messageRecipients: "",
}

class MessagePage extends Component {
    state = initialState
    messagesEnd = React.createRef()

    async componentDidMount() {
        headerAuthorization()
        try {
            const response = await this.props.getAllChatrooms()
            this.setState({ allChatroom: response })
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
        }
        const socket = this.props.socketConnection()
        this.setState({ socket: socket });
    }
    handleClickMessageSend = async (chatRoomId, recipientName, ...event) => {

        this.setState({ chatRoomId: chatRoomId })
        try {
            const response = await this.props.getSpecificChatroom(chatRoomId)
            const previousMessages = await this.props.fetchChatroomAllMessages(chatRoomId)
            if (response) {
                this.state.socket.emit("joinRoom", {
                    chatRoomId
                });
                this.state.socket.on("newMessage", (message) => {
                    console.log(message);
                    this.setState({ messages: [...this.state.messages, message] })
                    this.scrollToBottom();
                })
                this.setState({ displayMessage: "block", messages: previousMessages, messageRecipients: recipientName })
                this.scrollToBottom();
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
        }
    }
    handleClickCancelChatBox = event => {
        this.setState({ displayMessage: "none" })
        this.state.socket.emit("leaveRoom", {
            chatRoomId: this.state.chatRoomId
        });
    }
    scrollToBottom = () => {
        const messageList = this.messagesEnd.current;
        if (messageList) {
            messageList.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }
    render() {
        return (
            <div className="container-fluid massage-page-container">
                {this.state.allChatroom ? <>
                    {this.props.dataObj.allChatroom.length ?
                        <>
                            <div className="row">
                                <div className="col-5">
                                    <h4 className="m-3">People : </h4>
                                    {this.props.dataObj.allChatroom.map((chatroom) =>
                                        <div key={chatroom._id} className="people-container">
                                            {typeof chatroom.freelancer !== "string" ?
                                                <>
                                                    <img src={chatroom.freelancer.profileImage ? chatroom.freelancer.profileImage : ""} alt="profile" onError={(e) => { e.target.onerror = null; e.target.src = `${person_icon}`; }} width="50"
                                                        height="50" />
                                                    <div className="people-name mr-auto">
                                                        <h6>Name : {chatroom.freelancer.userName}</h6>
                                                        <p>{chatroom.freelancer.address.country}, {chatroom.freelancer.address.state}</p>
                                                    </div>
                                                    <button onClick={(event) => this.handleClickMessageSend(chatroom._id, chatroom.freelancer.userName)} className="btn btn-warning btn-sm message-display" value="{chatroom._id, chatroom.freelancer.userName}">message</button>
                                                </> : <>
                                                    <img src={chatroom.client.profileImage ? chatroom.client.profileImage : ""} alt="profile" onError={(e) => { e.target.onerror = null; e.target.src = `${person_icon}`; }} width="50"
                                                        height="50" />
                                                    <div className="people-name mr-auto">
                                                        <h6>Name : {chatroom.client.userName}</h6>
                                                        <p>{chatroom.client.companyContactDetails.country}, {chatroom.client.companyContactDetails.state}</p>
                                                    </div>
                                                    <button onClick={(event) => this.handleClickMessageSend(chatroom._id, chatroom.client.userName)} className="btn btn-warning btn-sm message-display" value="{chatroom._id chatroom.client.userName}">message</button>
                                                </>}
                                        </div>)}
                                </div>
                                <div className="col-7">
                                    <div className="display-message" style={{ display: this.state.displayMessage }}>
                                        <div className="mesage-header">
                                            <p className="mr-auto">{this.state.messageRecipients}</p>
                                            <button onClick={this.handleClickCancelChatBox} className="btn btn-warning" value={this.state.chatRoomId}>cancel</button>
                                        </div>
                                        <div className="display-board">
                                            {this.state.messages.map(message =>
                                                <p key={message._id}><b>{message.user.userName} : </b> {message.message}</p>
                                            )}
                                            <div ref={this.messagesEnd}></div>
                                        </div>
                                        <MessageInput socket={this.state.socket} />
                                    </div>
                                </div>
                            </div>
                        </>
                        : <h1 className="text-center" style={{ marginTop: '200px' }}>No message connection available for you</h1>}
                </> : <Spinner />}
            </div>
        )
    }
}

export default connect(mapToPropsData, { socketConnection, getAllChatrooms, getSpecificChatroom, fetchChatroomAllMessages })(MessagePage)
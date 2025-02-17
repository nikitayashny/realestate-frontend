import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { Container, Form, Button, ListGroup, Alert, Spinner } from "react-bootstrap";
import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client";
import { findChatMessages, findChatMessage, countNewMessages } from "../http/chatAPI";
import { fetchUserChats, fetchUsers } from "../http/userAPI";


const Chat = observer(() => {
  const { user } = useContext(Context);
  const thisUserId = user.userId;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState({});
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef(null);

  useEffect(() => {
    connect()
    loadUsers();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadUsers = async () => {
    try {
      const userList = await fetchUserChats();
      setUsers(userList);
      userList.map((contact) => {
        countNewMessages(contact.id, thisUserId).then((count) => {  
          console.log(contact.id + ": " + count)
          setUnreadMessagesCount((prev) => ({
            ...prev,
            [contact.id]: (prev[contact.id] || 0) + count,
          }));
        })
      })
      setLoading(false);
    } catch (err) {
      setError("Не удалось загрузить пользователей");
      setLoading(false);
    }
  };

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: (frame) => {
        console.log("Connected: " + frame);
        // if (selectedUser) {
          subscribeToMessages(client);
        //}
      },

      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
        setError("Ошибка соединения с сервером");
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
      }
    });

    client.activate();
    setStompClient(client);
  };

  // const disconnect = () => {
  //   if (stompClient) {
  //     stompClient.deactivate();
  //   }
  // };

  const subscribeToMessages = (client) => {
    console.log(`Подписка на сообщения для пользователя с ID: ${thisUserId}`);
    client.subscribe(`/user/${thisUserId}/queue/messages`, (message) => {
      console.log("Получено сообщение:", message);
      onMessageReceived(message);
    });
  };

  const onMessageReceived = (msg) => {
    const notification = JSON.parse(msg.body);
    const receivedMessageId = notification.id;
    
    findChatMessage(receivedMessageId).then((message) => {
      
        setMessages((prevMessages) => [...prevMessages, message]);
      

      if (message.senderId !== thisUserId) {
        setUnreadMessagesCount((prev) => ({
          ...prev,
          [message.senderId]: (prev[message.senderId] || 0) + 1,
        }));
      }
    });

    
  };

  const selectUser = async (user) => {
    setSelectedUser(user);
    setUnreadMessagesCount((prev) => ({ ...prev, [user.id]: 0 }));
    try {
      const chatMessages = await findChatMessages(thisUserId, user.id);
      setMessages(chatMessages);
      // disconnect();
      // connect();
    } catch (err) {
      setError("Не удалось загрузить сообщения");
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message = {
        senderId: thisUserId,
        recipientId: selectedUser.id,
        senderName: user.userName,
        recipientName: selectedUser.username,
        content: newMessage,
        timestamp: new Date(),
      };

      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(message),
      });

      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="mt-5 mb-5" style={{ height: "80vh", background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px" }}>
      <div className="d-flex" style={{ height: "6%" }}>
        <div className="col-4" style={{ borderRight: "1px solid #ccc"}}>
          <h4>Мессенджер</h4>
        </div>
        <div className="col-5">
          <h4 className="ms-3">{selectedUser && selectedUser.username}</h4>
        </div>
      </div>
      <div className="d-flex" style={{ height: "94%" }}>
        <div className="col-4" style={{ borderRight: "1px solid #ccc", padding: "10px", overflowY: "auto", height: "100%" }}>
          <Form.Control
            type="text"
            placeholder="Поиск по имени..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <ListGroup className="mb-3">
              {filteredUsers.map((user) => (
                user.id !== thisUserId ? (
                  <ListGroup.Item
                    variant="light"
                    key={user.id}
                    action
                    active={selectedUser && selectedUser.id === user.id}
                    onClick={() => selectUser(user)}
                  >
                    {user.username} {unreadMessagesCount[user.id] > 0 && <span style={{ color: 'red' }}>NEW</span>}
                  </ListGroup.Item>
                ) : null
              ))}
            </ListGroup>
          )}
        </div>

        <div className="col-8" style={{ height: "100%", display: "flex", flexDirection: "column", padding: "0 0 0 15px" }}>
          {selectedUser ? (
            <>
              <div style={{ flex: 1, overflowY: "auto" }}>
              <ListGroup>
                {messages
                  .slice()
                  .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                  .filter(msg => msg.senderId === selectedUser.id || msg.senderId === thisUserId)
                  .map((msg, index) => {
                    const messageDate = new Date(msg.timestamp);
                    const today = new Date();
                    const isToday = messageDate.toDateString() === today.toDateString();
                    const currentYear = today.getFullYear();
                    const messageYear = messageDate.getFullYear();
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };

                    return (
                      <ListGroup.Item
                        key={index}
                        style={{
                          display: "inline-block",
                          maxWidth: "70%",
                          textAlign: msg.senderId === thisUserId ? "right" : "left",
                          backgroundColor: msg.senderId === thisUserId ? "#e1f5fe" : "#ffffff",
                          border: "1px solid #ccc",
                          borderRadius: "10px",
                          padding: "10px",
                          margin: "5px 0",
                          alignSelf: msg.senderId === thisUserId ? "flex-end" : "flex-start"
                        }}
                      >
                        {msg.content}
                        <div style={{ textAlign: 'right', fontSize: '0.8em', color: '#888' }}>
                          {isToday 
                            ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                            : messageYear === currentYear
                              ? messageDate.toLocaleDateString([], { month: 'long', day: 'numeric' }) + ' ' + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              : messageDate.toLocaleDateString([], options) + ' ' + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
                <div ref={messagesEndRef} />
              </div>
              <Form style={{ display: "flex", alignItems: "center" }}>
                <Form.Group controlId="messageInput" style={{ flex: 1, marginRight: "10px" }}>
                  <Form.Control
                    type="text"
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault(); 
                        sendMessage();
                      }
                    }}
                  />
                </Form.Group>
                <Button variant="primary" onClick={sendMessage} disabled={!selectedUser || newMessage.trim() === ""}>
                  Отправить
                </Button>
              </Form>
            </>
          ) : (
            <Alert variant="info">Выберите пользователя для начала чата.</Alert>
          )}
        </div>
      </div>
    </Container>
  );
});

export default Chat;
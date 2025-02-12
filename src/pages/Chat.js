import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { Container, Form, Button, ListGroup, Alert, Spinner } from "react-bootstrap";
import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client";
import { findChatMessages, findChatMessage } from "../http/chatAPI";
import { fetchUsers } from "../http/userAPI";

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

  useEffect(() => {
    loadUsers();

    return () => {
      disconnect();
    };
  }, []);

  const loadUsers = async () => {
    try {
      const userList = await fetchUsers();
      setUsers(userList);
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
        //if (selectedUser ? selectedUser : false) {
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

  const disconnect = () => {
    if (stompClient) {
      stompClient.deactivate();
    }
  };

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
    });
  };

  const selectUser = async (user) => {
    setSelectedUser(user);
    try {
      const chatMessages = await findChatMessages(thisUserId, user.id);
      setMessages(chatMessages);

      disconnect(); 
      connect(); 
      
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
        recipientName: selectedUser.userName,
        content: newMessage,
        timestamp: new Date(),
      };

      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(message),
      });

      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);
      setNewMessage("");
    }
  };

  return (
    <Container className="mt-5 mb-5" style={{ background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>
      <h4>Пользователи</h4>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <ListGroup className="mb-3">
          {users.map((user) => (
            <ListGroup.Item 
              key={user.id} 
              action 
              active={selectedUser && selectedUser.id === user.id}
              onClick={() => selectUser(user)}
            >
              {user.username}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <h4>Сообщения</h4>
      <ListGroup>
        {messages.map((msg, index) => (
          <ListGroup.Item key={index}>
            <strong>{msg.senderName}: </strong>{msg.content}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form>
        <Form.Group controlId="messageInput">
          <Form.Control
            type="text"
            placeholder="Введите сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={sendMessage} disabled={!selectedUser || newMessage.trim() === ""}>
          Отправить
        </Button>
      </Form>
    </Container>
  );
});

export default Chat;
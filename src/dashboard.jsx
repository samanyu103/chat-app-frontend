import React, { useState , useEffect, useContext} from 'react'
import './dashboard.css';
import {myContext} from './context';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate();

    const handleClickGetData = () => {
        navigate('/getdata');
    };
    const {senderName} = useContext(myContext)

    const [receiverName, setreceiverName] = useState("");
    const [content, setcontent] = useState("");
    const [messages, setmessages] = useState([]);
    const [receiversList, setreceiversList] = useState([]);
    const [i, seti] = useState("");    
    const [receiveremail, setreceiveremail] = useState("");
    const [nmc, setnmc] = useState("");


    
    const getReceivers = async() =>{
      const response = await fetch(`http://127.0.0.1:8000/dashboard/receivers/${senderName}`);
      const data = await response.json();
      console.log(data);
      setreceiversList(data.receivers);
    }

    const getChat = async() => {
      if (receiverName == "") {
        setmessages([]);
        return;
      }
      const response = await fetch("http://127.0.0.1:8000/dashboard/get", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: "include",
        body: JSON.stringify({senderName, receiverName}),
      });
      const data = await response.json();
      // console.log(receiverName);
      console.log(data);
      if (response.status==200){
        setmessages(data.messages);
      }else{
        setmessages([]);
      }
    };

    const SendClick = async () => {
      // console.log(receiverName);

      const response = await fetch("http://127.0.0.1:8000/dashboard/send", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ``
        },
        credentials: "include",
        body: JSON.stringify({senderName, receiverName, content}),
      });
      const resp = await response.json()
      console.log(resp)
      setcontent("");
      await getChat();
    };
    const SendNewMessage = async() => {
      const response = await fetch("http://127.0.0.1:8000/dashboard/send_new_message", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ``
        },
        credentials: "include",
        body: JSON.stringify({senderName, receiveremail, nmc}),
      });
      seti("");
      setreceiveremail("");
      setnmc("");
      await getReceivers();
    }



    useEffect(() => {
      getReceivers();
      // console.log(messages)
    }, [senderName]);

    useEffect(() => {
      getChat();
      // console.log(messages)
    }, [senderName, receiverName]);
    
  return (
    <div>
      <div className="gap"></div>

      <div className='bigfellow'>
        <div className="leftfellow">
            <div className="topleft" onClick={()=>{
                setreceiverName("");
            }}>{senderName}</div>


          <div className="bottomleft">
            {receiversList.map((receiver, index) => (
              <div
                key={index}
                className="messeger"
                onClick={() => {
                  setreceiverName(receiver.otherUsers[0]);
                  seti("");
                }
                } // Set receiverName on click
              >
                {receiver.otherUsers[0]} {/* Display other user's name */}
              </div>
            ))}
          </div>


        </div>
        <div className="rightfellow">
            <div className="topright">
                <div className={receiverName==''? "friends-container" : "not-active"} >
                  <div className = "friends" onClick={()=>seti("new_message")}>New Message</div>
                  <div className='friends' onClick={getReceivers}>Update</div>
                </div>
                <div className={receiverName==''? "not-active" : "cur-messager"}>{receiverName}</div>
            </div>
              
  

            <div className="bottomright">
              <div className={i==''?"not-active": "new_message"}>
                <input type="text" placeholder='enter receiver email' className='inputmsg'  name = "receiveremail" value = {receiveremail} onChange={(e) => setreceiveremail(e.target.value)}/>
                {/* nmc stands for new message content */}
                <input type="text" placeholder='enter message' className='inputmsg'  name = "nmc" value = {nmc} onChange={(e) => setnmc(e.target.value)}/>
                <button class="send-btn" onClick={SendNewMessage}>Send</button>
                <button class="send-btn" onClick={handleClickGetData}>See all users</button>

              </div>




              <div className="messages-container">
              {messages.map((message, index) => (
              <Message
                key={index}
                content={message.content}
                sender={message.senderName}
                timestamp={message.timestamp}
                currentUser={senderName}
              />
              ))}
              </div>
            </div>
            
            
            <div className="sendpanel">
                <input type="text" placeholder='enter message' className='inputmsg'  name = "content" value = {content} onChange={(e) => setcontent(e.target.value)}/>
                <button class="send-btn" onClick={SendClick}>Send</button>

            </div>
        </div>
        
    </div>

    </div>
  )
}

// Message Component
const Message = ({ content, sender, currentUser, timestamp }) => {
  const isSentByCurrentUser = sender === currentUser;

  return (
    <div className={`message ${isSentByCurrentUser ? 'sent' : 'received'}`}>
      <span>{content}</span>
      <small className="timestamp">
        {new Date(timestamp).toLocaleString()}
      </small>
    </div>
  );
};


export default Dashboard

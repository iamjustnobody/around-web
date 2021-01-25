import React from 'react';
import {Button, message, Modal} from "antd";
import {CreatePostForm} from "./CreatePostForm";
import {API_ROOT, TOKEN_KEY, AUTH_HEADER} from "../constants";
import {Redirect} from "react-router-dom";
import {Home} from "./Home";
import {LOC_SHAKE} from "../constants";

/*
export class CreatePostButton extends React.Component{
    render(){
        return (
            <Button> post </Button>
        );
    }
}*/

const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
}; //<CreatePostForm normFile={normFile}/> //getValueFromEvent={props.normFile} for FC or this.props.normFile for CC

export const CreatePostButton = (props) => { console.log(props);
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [eventMsg, setEventMsg] = React.useState("");
    const [eventImg, setEventImg] = React.useState(null);

    const [homeUpdate, setHomeUpdate] = React.useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleEventImg=(e)=>{
        setEventImg(normFile(e));
    }
    const handleEventMsg=(e)=>{
        setEventMsg(e.target.value);
   //     return e.target.value; //<input value=xxx i.e. {} or ''
    }
//handleEventValue=(getValueFromEvent)=>{setEventValue(getValueFromEvent);}

    const getFormRef = (formIns) => {
        this.formform=formIns;
    }
    const handleOk = () =>  {
        setConfirmLoading(true);
   //     console.log(eventMsg);
     //   console.log(eventImg);
//fire API
        try{
            console.log(eventMsg);
            console.log(eventImg);
            //fire api call
            const formData=new FormData();
            const loc = JSON.parse(localStorage.getItem("POS_KEY"));
            formData.set("lat",loc.lat);
            formData.set("lon",loc.lon);
        //    formData.set("lat",loc.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE);
        //    formData.set("lon",loc.lon + 2*Math.random()*LOC_SHAKE - LOC_SHAKE);
            formData.set("message",eventMsg);
            formData.set("image",eventImg[0].originFileObj);
            const softtoken=localStorage.getItem(TOKEN_KEY);
            fetch(`${API_ROOT}/post`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `${AUTH_HEADER} ${softtoken}`
                }
            }).then((response) => {
                if (response.ok) {
                    setConfirmLoading(false);
                    setVisible(false);
                    this.formform.resetFields();
                    return response;
                }
                throw new Error(response.statusText);
            }).then((response) => {
                message.success('Post Succeed');
                console.log(response);
             //   setConfirmLoading(false);
             //   setVisible(false);
                props.loadNBPost();//this//loadNearbyPost(); //reflesh homepage
                // operations = <CreatePostButton loadNBPost={this.loadNearbyPosts}/>; in home.js
            //    props.history.push("/home"); //<CPB {...props}/> at home.js&& <Home {...props}/> at getStatus @Main.js
                //push history not seem to reflesh the homepage as props.loadNBPost() does
                //operations = <CreatePostButton {...this.props}/> in home.js

          //      setHomeUpdate(true);
                //    return <Redirect to="/home" />;
                //      return <Home toSignOut={props.toLogOut}/>;

            }).catch((e) => {
                message.error('Post Failed');
                console.log(e);
                setConfirmLoading(false);
             //   props.form.resetFields();
            //    form.resetFields();
            });

        }catch(err){
            alert(err);
            console.log(err);
        }
        /*
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
         */
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    //return homeUpdate?<Home toSignOut={props.toLogOut}/>:(
   // return homeUpdate?<Redirect to='/home' />:(
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create New Post
            </Button>
            <Modal
                title="Create New Post"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="Create"
            >
                <CreatePostForm handleEVMsg={handleEventMsg} handleEVImg={handleEventImg}/>
            </Modal>
        </>
    );
    //getValueFromEvent={this.props.normFile}
    //<CreatePostForm normFile={normFile}>
    //getValueFromEvent={this.props.handleEV}
    //<CreatePostForm normFile={normFile} handleEV={handleEventValue}/> <CreatePostForm handleEV={handleEventValue}/>
}
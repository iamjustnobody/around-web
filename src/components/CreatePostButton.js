import React from 'react';
import {Button, message, Modal} from "antd";
import {CreatePostForm} from "./CreatePostForm";
import {API_ROOT, TOKEN_KEY, AUTH_HEADER} from "../constants";
import {Redirect} from "react-router-dom";
import {Home} from "./Home";
import {LOC_SHAKE} from "../constants";


const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
}; 

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
    }

    const getFormRef = (formIns) => {
        this.formform=formIns;
    }
    const handleOk = () =>  {
        setConfirmLoading(true);

        try{
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
                //console.log(response);
             //   setConfirmLoading(false);
             //   setVisible(false);
                props.loadNBPost();

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
}

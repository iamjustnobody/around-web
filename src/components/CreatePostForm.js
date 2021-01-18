import React from 'react';
import {Form, Input, Upload} from "antd";
import {InboxOutlined} from '@ant-design/icons';

/*
const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
}; //getValueFromEvent={normFile}
 */

function b4ULbu (){return false;} //beforeUpload={b4ULbu}
const b4ULbu2 = ()=>{return false;}  //beforeUpload={b4ULbu2}
const b4ULbu3 = () => false; //beforeUpload={b4ULbu3}

export class CreatePostForm extends React.Component{
    b4UL = ()=>{return false;}  //beforeUpload={this.b4UL}
    b4UL2 = () => false; //beforeUpload={this.b4UL2}

  // wrong b4UL3 below
   //  this.state.b4UL3={false}; //b4UL3={false}; //both inside <> or false should be field here inside {} or var/const/let outside class
   // b4UL3=false; ok grammarily//use const b4UL3=false outside class inside/outside function

   // state={b4UL3:false,}
    //equals to constructor (props){super(props);this.state={b4UL3:false,};}
//beforeUpload={this.b4UL3}

    // beforeUpload={false}??? or just beforeUpload???
    //or use const [,]=React.useState(false)

    render(){
        const formItemLayout={
            labelCol :{span: 6},
            wrapperCol: {span: 14},
        }; //{...formItemLayout}
        return (
            <Form {...formItemLayout}>
                <Form.Item
                    name="message"
                    label="Message"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your messages!',
                        },
                    ]}
                >
                    <Input placeholder="Please input your messages" onChange={this.props.handleEVMsg}/>
                </Form.Item>
                <Form.Item label="Image"
                           name="Image"
                           rules={[
                               {
                                   required: true,
                                   message: 'Please select your image!',
                               },
                           ]}
                >
                    <Form.Item name="image"
                               valuePropName="fileList"
                               getValueFromEvent={this.props.handleEVImg}
                               noStyle
                    >
                        <Upload.Dragger name="files" beforeUpload={b4ULbu}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>



        );
        //getValueFromEvent={this.props.normFile} //handleEV=(getValueFromEvent)=>{setEventValue(getValueFromEvent);}
        //<CreatePostForm normFile={normFile}> <CreatePostForm normFile={normFile} handleEV={handleEventValue}/>
        //getValueFromEvent={this.props.handleEV}
        //<CreatePostForm normFile={normFile} handleEV={handleEventValue}/> <CreatePostForm handleEV={handleEventValue}/>

   //onChange={(e)=>{this.props.handleEVMsg(e);}}  getValueFromEvent={(e)=>this.props.handleEVImg}
    }
}
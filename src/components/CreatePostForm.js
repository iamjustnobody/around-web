import React from 'react';
import {Form, Input, Upload} from "antd";
import {InboxOutlined} from '@ant-design/icons';


function b4ULbu (){return false;} //beforeUpload={b4ULbu}
const b4ULbu2 = ()=>{return false;}  //beforeUpload={b4ULbu2}
const b4ULbu3 = () => false; //beforeUpload={b4ULbu3}

export class CreatePostForm extends React.Component{
    b4UL = ()=>{return false;}  //beforeUpload={this.b4UL}
    b4UL2 = () => false; //beforeUpload={this.b4UL2}


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

    }
}

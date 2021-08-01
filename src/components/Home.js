import React from 'react'
import {API_ROOT} from "../constants";
import {TOKEN_KEY,AUTH_HEADER} from "../constants";
import {GalleryShow} from "./GalleryShow";
import {Tabs, Button, Spin, Col, Row, Radio} from "antd";
import {CreatePostButton} from "./CreatePostButton";
import {AroundMap} from "./AroundMap";


const { TabPane } = Tabs;

export class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            error:"",
            isLoadingPosts: false,
            posts:[],
            isLoadingGeoLocation:false,

            radioValue:"around"
        };
    }
    componentDidMount() {
        if("geolocation" in navigator){
            this.setState({isLoadingGeoLocation:true,});
            navigator.geolocation.getCurrentPosition(
                (des)=>{
                    console.log(des);
                    this.setState({isLoadingGeoLocation:false,});
           
                    localStorage.setItem("POS_KEY",JSON.stringify(
                        {
                            lat:des.coords.latitude,
                            lon:des.coords.longitude,
                        }
                    ))
                    this.loadNearbyPosts();
                },
                (err)=>{
                    console.log(err);
                    this.setState({
                        error:'failed to get user location',
                        isLoadingGeoLocation:false,
                    });
                },
                {
                    enableHighAccuracy:true,
                    maximumAge: 3600000,
                    timeout:27000,
                }
            );
        }else{
            this.setState({
                error:'Geolocation is not supported',
            })
        }
        //this.loadNearbyPosts();
    }
    loadNearbyPosts=(center,radius)=>{
        const token=localStorage.getItem(TOKEN_KEY);
        this.setState({
            isLoadingPosts:true
        })
        const pos = JSON.parse(localStorage.getItem("POS_KEY"));
        const wei=center?center.vlat:pos.lat;
        const jing=center?center.vlong:pos.lon;
        const distance = radius?radius:20000;
        fetch(`${API_ROOT}/search?lat=${wei}&lon=${jing}&range=${distance}`,{
            method:'GET',
            headers:{
                Authorization: `${AUTH_HEADER} ${token}`
            },
        })
            .then((response)=>{
            if(response.ok){  //true
                return response.json();
            }
            throw new Error("Fail to load posts");
        }).then((response)=>{
            //console.log(response);   
            this.setState({ 
                isLoadingPosts:false,
                posts:response?response:[]
            });
        }).catch((err)=>{
            this.setState({
                isLoadingPosts:false,
                error:err.message,
            });
            console.log(err.message);
        });

    }

    getVideoPosts = ()=>{      
        const postvideos=this.state.posts
            .filter((epost) => {return epost.type === 'video'?true:false;}) 
            .map(({User,url,message}) => {  
                return ( 
                    <Col span={6} key={url}>
                        <video src={url} controls className="video-block"/>
                        <p>{`${User}: ${message}`}</p>
                    </Col>
                ); 
            }); 
        return <Row gutter={32}>{postvideos}</Row>;
        
    }

    getImagePosts = ()=>{      
        const postimg=this.state.posts
            .filter((epost) => {return epost.type === 'image'?false:true;}) 
            .map(({User,url,message}) => ({  
                user: User,
                src: url,
                thumbnail: url,
                caption: message,
                thumbnailWidth: 400,
                thumbnailHeight: 300
            }));
        return <GalleryShow images={postimg} />;
    } 

    getPanelContents=(posttype)=>{
        if(this.state.error){
            return this.state.error;
        }else if(this.state.isLoadingGeoLocation) {
            return <div> <Spin tip="loading Geolocation..." /> </div>;
        }else if(this.state.isLoadingPosts) {
            return <div> loading posts... </div>;
        }else if(this.state.posts&&this.state.posts.length>0){
            if(posttype==='image'){return this.getImagePosts();}
            else{return this.getVideoPosts();} 
        }else{
            return 'No nearby Posts';
        }
    }

    loadFacesAroundTheWorld = ()=> {
        //fire api similar to loadnearbyposts but without lat & lon endpoints/parameters
        //// check radioValue status -> setstate only when this.state.radioValue==="face"
    }
    onRadioChange=(event)=>{
        this.setState({radioValue: event.target.value});
        if(event.target.value==='face'){  
          //  console.log(this.state.radioValue);
            this.loadFacesAroundTheWorld();
        }
        else
            this.loadNearbyPosts();
    }
    render(){
        const operations = <CreatePostButton loadNBPost={this.loadNearbyPosts}/>;
   
        return (
            <div>
                <Radio.Group value={this.state.radioValue} onChange={this.onRadioChange}>
                    <Radio value="around"> Posts Around Me</Radio>
                    <Radio value="face"> Faces Around The World</Radio>
                </Radio.Group>
                <Tabs className="main-tabs" defaultActiveKey="1" centered tabBarExtraContent={operations}>
                    <TabPane tab="Tab 1" key="1">
                        {this.getPanelContents('image')}
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        {this.getPanelContents('video')}
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        <AroundMap googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                                   loadingElement={<div style={{ height: `100%` }} />}
                                   containerElement={<div style={{ height: '390px' }} />}
                                   mapElement={<div style={{ height: `100%` }} />}
                                   poststuff={this.state.posts}
                                   loadlocalposts={this.state.radioValue==='face'?this.loadFacesAroundTheWorld:this.loadNearbyPosts}
                        />
                    </TabPane>
                </Tabs>
            </div>

        );
    }
}

import React from 'react'
import {API_ROOT} from "../constants";
import {TOKEN_KEY,AUTH_HEADER} from "../constants";
import {GalleryShow} from "./GalleryShow";
import {Tabs,Button,Spin} from "antd";
import {CreatePostButton} from "./CreatePostButton";
import {AroundMap} from "./AroundMap";

// const operations = <Button>Extra Action</Button>;
//    const TabPane = Tabs.TabPane;
const { TabPane } = Tabs;

export class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            error:"",
            isLoadingPosts: false,
            posts:[],
            isLoadingGeoLocation:false,
        };
    }
    componentDidMount() {
        if("geolocation" in navigator){
            this.setState({isLoadingGeoLocation:true,});
            navigator.geolocation.getCurrentPosition(
                (des)=>{
                    console.log(des);
                    this.setState({isLoadingGeoLocation:false,});
                   // localStorage.setItem("lat",des.coords.latitude);
                //    console.log(des.coords.latitude);
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
    loadNearbyPosts=()=>{
        const token=localStorage.getItem(TOKEN_KEY);
        this.setState({
            isLoadingPosts:true
        })
        const pos = JSON.parse(localStorage.getItem("POS_KEY"));
    //    console.log(pos); pos is an object could rewritten as const {lat,lon}
        fetch(`${API_ROOT}/search?lat=${pos.lat}&lon=${pos.lon}&range=20000`,{
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
            console.log(response);
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
    getImagePosts=()=>{
        if(this.state.error){
            return this.state.error;
        }else if(this.state.isLoadingGeoLocation) {
            return <div> <Spin tip="loading Geolocation..." /> </div>;
        }else if(this.state.isLoadingPosts) {
            return <div> loading posts... </div>;
        }else if(this.state.posts&&this.state.posts.length>0){
            const postimg=this.state.posts.map(({User,url,message}) => ({
                user: User,
                src: url,
                thumbnail: url,
                caption: message,
                thumbnailWidth: 400,
                thumbnailHeight: 300
            }));
        //    return 'gallary'+this.state.posts.length;
            return <GalleryShow images={postimg} />
        }else{
            return 'No nearby Posts';
        }
    }
    render(){
        const operations = <CreatePostButton loadNBPost={this.loadNearbyPosts}/>;
    //    const operations = <CreatePostButton {...this.props}/>; //push history in CPB.js
    //    const operations = <CreatePostButton />;
        return ( //tabBarExtraContent={operations}
            <Tabs className="main-tabs" defaultActiveKey="1" centered tabBarExtraContent={operations}>
                <TabPane tab="Tab 1" key="1">
                    {this.getImagePosts()}
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of tab 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    <AroundMap googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                               loadingElement={<div style={{ height: `100%` }} />}
                               containerElement={<div style={{ height: '390px' }} />}
                               mapElement={<div style={{ height: `100%` }} />}
                               poststuff={this.state.posts}
                    />
                </TabPane>
            </Tabs>

        );
    }
}
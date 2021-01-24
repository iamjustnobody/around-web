import React from 'react'
import {API_ROOT} from "../constants";
import {TOKEN_KEY,AUTH_HEADER} from "../constants";
import {GalleryShow} from "./GalleryShow";
import {Tabs, Button, Spin, Col, Row, Radio} from "antd";
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
    loadNearbyPosts=(center,radius)=>{
        const token=localStorage.getItem(TOKEN_KEY);
        this.setState({
            isLoadingPosts:true
        })
        const pos = JSON.parse(localStorage.getItem("POS_KEY"));
    //    console.log(pos); pos is an object could rewritten as const {lat,lon}
        //`${API_ROOT}/search?lat=${pos.lat}&lon=${pos.lon}&range=20000`
      //  const {lat:wei,lon:jing}=center?center:pos; //center.vlat center.vlong
        //const {vlat:wei,vlong:jing}=center; //const {lat:wei,lon:jing}=pos;
        const wei=center?center.vlat:pos.lat;
        const jing=center?center.vlong:pos.lon;
        const distance = radius?radius:20000;
     //   `${API_ROOT}/search?lat=${wei}&lon=${jing}&range=${distance}`
        //search?lat=${center.vlat}&lon=${center.vlong}&range=${distance}
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
            console.log(response);   //json form User url message etc
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

    getVideoPosts = ()=>{      //getVideoPosts = (posttype)=>{
        const postvideos=this.state.posts
            .filter((epost) => {return epost.type === 'video'?true:false;}) //true:false; but no type in post as no ML in main.go
            // or => epost.type === 'video';  //or =>{return epost.type === 'video';}
            // .filter(({type}) => type === 'video') ///type===posttype // or =>{return type === 'video';}
            .map(({User,url,message}) => {  //filter & map act upon arrays
                return ( ////<div key={url} style={{margin:10px}}> </div> //with flex in outside return div
                    //or <div style={{float: left}}
                    <Col span={6} key={url}>
                        <video src={url} controls className="video-block"/>
                        <p>{`${User}: ${message}`}</p>
                    </Col>
                ); //within {} not within ({})
            }); //text only return <p key={url}>{`$(User}: ${message}`}</p>;
        return <Row gutter={32}>{postvideos}</Row>;
        //return <div style={{display:flex}}>{postvideos}</div>;
    } //need to before getPanelContents

    getImagePosts = ()=>{      //getImagePosts = (posttype)=>{
        const postimg=this.state.posts
            .filter((epost) => {return epost.type === 'image'?false:true;}) //true:false; but no type in post as no ML in main.go//=> epost.type === 'image';  //{return epost.type === 'image';}
            // .filter(({type}) => type === 'image') ///type===posttype //{return type === 'image';}
            .map(({User,url,message}) => ({  //filter & map act upon arrays  //or =>{return {};}
                user: User,
                src: url,
                thumbnail: url,
                caption: message,
                thumbnailWidth: 400,
                thumbnailHeight: 300
            }));
       //     return 'gallary'+this.state.posts.length;
        return <GalleryShow images={postimg} />;
    } //need to before getPanelContents

    getPanelContents=(posttype)=>{
        if(this.state.error){
            return this.state.error;
        }else if(this.state.isLoadingGeoLocation) {
            return <div> <Spin tip="loading Geolocation..." /> </div>;
        }else if(this.state.isLoadingPosts) {
            return <div> loading posts... </div>;
        }else if(this.state.posts&&this.state.posts.length>0){
           // this.getImagePosts(); //need to return galleryshow
            if(posttype==='image'){return this.getImagePosts();} //this.getImagePosts(posttype) must add return
            else{return this.getVideoPosts();} //this.getVideoPosts(posttype); //need to return
        //    return this.getImagePosts();
        }else{
            return 'No nearby Posts';
        }
    }
    //getImagePosts func //need to before getPanelContents

    onRadioChange=(event)=>{
        console.log(event);
        this.setState({radioValue: event.target.value});
    }
    render(){
        const operations = <CreatePostButton loadNBPost={this.loadNearbyPosts}/>;
    //    const operations = <CreatePostButton {...this.props}/>; //push history in CPB.js
    //    const operations = <CreatePostButton />;
        return ( //tabBarExtraContent={operations} //<Radio.Group defaultValue="around" //face radio canbe selected
            // value={this.state.radioValue} //face radio can not be selected  so need onclick/onchange to change state radioValue
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
                                   loadlocalposts={this.loadNearbyPosts}
                        />
                    </TabPane>
                </Tabs>
            </div>

// previously return <Tabs>; now adding <radiogroup> so need wrapped by <div>
        );
    }
}
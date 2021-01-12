import React from 'react'
import {API_ROOT} from "../constants";
import {TOKEN_KEY,AUTH_HEADER} from "../constants";
import {GalleryShow} from "./GalleryShow";

export class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            error:"",
            isLoadingPosts: false,
            posts:[],
        };
    }
    componentDidMount() {
        this.loadNearbyPosts();
    }
    loadNearbyPosts=()=>{
        const token=localStorage.getItem(TOKEN_KEY);
        this.setState({
            isLoadingPosts:true
        })
        fetch(`${API_ROOT}/search?lat=37.5&lon=-120&range=20000`,{
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
        return (
            <div>
                <p>home</p>
                <button onClick={this.props.toSignOut}>log out</button>
                {this.getImagePosts()}
            </div>
        );
    }
}
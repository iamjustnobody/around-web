import React from 'react';
import  {Marker,InfoWindow} from "react-google-maps";
import {LOC_SHAKE} from "../constants";
import bluemarkerURLrandomvariablename from "../assets/images/blue-marker.svg"

export class AroundMarker extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isOpen:false,
            lantitd2:0, //m & m3
          //  lantitd2: this.props.postinfo.location.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE, //s
            longitd2:0, //m & m3
         //   longitd2: this.props.postinfo.location.lon+2*Math.random()*LOC_SHAKE - LOC_SHAKE, //s
            location2:this.getitude22(), //s-location //same outcome as s
        };
    }
    toggleOpen=()=>{
     //   this.setState({isOpen:(preState=>{return !preState;})()});//onmouse over ok but not out
     //   this.setState({isOpen:(preState=>{return !preState;})}); //onmouse over ok but not out
     //   this.setState(preState=>{return {isOpen: !preState}}); //onmouse not showing any
          this.setState(preState=>{return {isOpen: !preState.isOpen}}); //ok
     //   this.setState((preState=>{return {isOpen: !preState.isOpen}})()); //error
      //  this.setState(preState=>{return {isOpen: !preState}}); //hover not working
      //    this.setState({isOpen:(preState=>{return !preState.isOpen})}); //hover ok out not ok
     //   this.setState({isOpen:(preState=>{return !preState.isOpen})()}); //error

    }
    //use func props{lat lon}+random to return {lat lng}; or random +props =state
    getitude2=()=>{
        this.state.lantitd2=this.props.postinfo.location.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        this.state.longitd2=this.props.postinfo.location.lon + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        return {lat:this.state.lantitd2,lng:this.state.longitd2};
        //alternatively the below wrong as  position={this.getitude2()} constantly setState
        /*
        this.setState({
            lantitd2:this.props.postinfo.location.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE,
            longitd2:this.props.postinfo.location.lon + 2*Math.random()*LOC_SHAKE - LOC_SHAKE,
        })
        return {lat:this.state.lantitd2,lng:this.state.longitd2};
         */
    } //m
    getitude22=()=>{
        const lan22=this.props.postinfo.location.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        const long22=this.props.postinfo.location.lon + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        return {lat:lan22, lng:long22};
        /* alternatively
        this.props.postinfo.location.lat =this.props.postinfo.location.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        this.props.postinfo.location.lon=this.props.postinfo.location.lon + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        return {lat:this.props.postinfo.location.lat , lng:this.props.postinfo.location.lon};
         */
    } //m2
    getitude23=()=>{
        this.setState({
            lantitd2:this.props.postinfo.location.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE,
            longitd2:this.props.postinfo.location.lon + 2*Math.random()*LOC_SHAKE - LOC_SHAKE,
        })
    } //m3

    render(){
    //    const { location:{lat, lon:lng}, User:user, message,url}=this.props.postinfo;
    //    const latitude = lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
    //    const longitude = lng + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        //position={{lat:latitude,lng:longitude}} within <Marker />

      //  const { User:user, message,url}=this.props.postinfo; //a
     //   console.log(this.props);
        const { User:user, message,url,location:{lat:lat,lon:lng,}}=this.props.postinfo; //b
       // const { User:user, message,url,location:{lat,lon,}}=this.props.postinfo; //c
        const whichicon=(this.props.postinfo.type==='image'?null:({
            url:bluemarkerURLrandomvariablename,
            scaledSize: new window.google.maps.Size(26,41),
        }));
        return ( //remove onClick={this.toggleOpen} from inside Marker //onmouseover (before clock) already show post
            <Marker
            //    position={{lat:this.props.latitude,lng:this.props.longitude}} //a
            //    position={{lat:lat,lng:lng}} //b or position={{lat,lng}}
            //    position={{lat:lat,lng:lon}} //c or position={{lat,lng:lon}}
            //    position={{lat:this.props.postinfo.location.lat,lng:this.props.postinfo.location.lon}} //general
            //    position={this.getitude2()} //m
            //    position={{lat:this.state.lantitd2,lng:this.state.longitd2}} //s & m3 (but getitude23 not executed so state not changed - still 0 0)
            //    position={this.getitude22()} //m2
              //  position={{lat:this.props.postinfo.location.lat,lng:this.props.postinfo.location.lon}} //one marker
              //  position={{lat,lng}}
             //   position={{lat:this.props.lantitd1,lng:this.props.longitd1}} //wrong array from aroundmap.js
                position={this.state.location2} //s-location //same outcome as s
                onMouseOver={this.toggleOpen}
                onMouseOut={this.toggleOpen}
                onClick={this.toggleOpen} //this.props.postinfo.type==='image'?null:
                icon={whichicon}
            >
                {this.state.isOpen?
                    <InfoWindow onCloseClick={this.toggleOpen}>
                        <div>
                            {
                                this.props.postinfo.type==='image'?
                                    (
                                        <video src={url} controls className="around-marker-video" />
                                    ):
                                    (
                                        <img src={url} alt={message} className="around-marker-image" />
                                       // <p>{`${user}: ${message}`}</p>
                                    )
                            }
                            <p>{`${user}: ${message}`}</p>
                        </div>
                    </InfoWindow>
                :null}

            </Marker>
        );
        //position={{lat,lng}}
        //const { lat,lon:lng}=this.props.postinfo.location;
        //const { location:{lat,lon:lng}, User:User}=this.props.postinfo;
        //const { location:{lat,lon:lng}, User}=this.props.postinfo;
        //position={{lat:lat,lng:lng}}
        //<div>this.props.postinfo.User</div>
        //<Marker />
        // <div>{user}</div>
        //div straight follow inforwindow
        //<div><img /><p>{}</p></div>

    }
}
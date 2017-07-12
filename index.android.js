/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,TextInput,TouchableOpacity,
  View,Dimensions,Button
} from 'react-native';

const {width,height}=Dimensions.get("window")

const loc={}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export default class mesh extends Component {
  constructor(props){
    super(props)
    this.props=props;
    this.state={lat:0,lng:0,changed:0,d:0,lat_prof:32.8824851,lng_prof:-117.2348409}
  }
  componentDidMount(){
    this.getPosition();
    this.watchPosition();
  }
getPosition(){
  navigator.geolocation.getCurrentPosition(
      (e)=>{
        this.state.lat=e.coords.latitude;
        this.state.lng=e.coords.longitude;
        this.getDistanceFromLatLonInKm(this.state.lat_prof,this.state.lng_prof,this.state.lat,this.state.lng)
        this.setState(this.state)   
      },
      ()=>{
        console.warn("Couldn't")
      })
}
watchPosition(){
  navigator.geolocation.watchPosition(
      (e)=>{
        console.warn(e.coords.latitude);
        this.state.lat=e.coords.latitude;
        this.state.lng=e.coords.longitude;
        this.getDistanceFromLatLonInKm(this.state.lat_prof,this.state.lng_prof,this.state.lat,this.state.lng)
        this.setState(this.state)   
      },
      ()=>{
        console.warn("Couldn't watch")
      },{timeout: 20000, maximumAge: 0, distanceFilter: 1})
}
updateCoords(val,type){
  this.state[type+"_prof"]=val;
  this.setState(this.state);
  this.getDistanceFromLatLonInKm(this.state.lat_prof,this.state.lng_prof,this.state.lat,this.state.lng)
}
getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = ((R * c)*1000).toFixed(4); // Distance in metres
  this.state.d=d;
  this.setState(this.state);
  return d
}
signIn(){
  this.getPosition()
  if(this.state.d<100)alert("Welcome to class :)")
  else alert("You are not in the classroom!")
}
render() {
  return (
    <View style={{backgroundColor:'rgb(230,230,230)',padding:20,flex:1}}>
      <View style={{backgroundColor:'white',padding:20,flex:1,justifyContent:'center',alignItems:'center',elevation:1,borderRadius:10}}>
        <Text style={{fontSize:30,marginBottom:20}}>Sign In</Text>
        <TextInput onChangeText={(t)=>this.updateCoords(t,"lat")} style={{height:40,marginBottom:20,borderColor: 'gray', borderWidth: 1,fontSize:16,paddingLeft:22,paddingTop:10,borderRadius:10,width:width-100}} underlineColorAndroid={'transparent'} placeholder="Login" defaultValue={'32.8824851'} />
        <TextInput onChangeText={(t)=>this.updateCoords(t,"lng")} style={{height:40,marginBottom:20,borderColor: 'gray', borderWidth: 1,fontSize:16,paddingLeft:22,paddingTop:10,borderRadius:10,width:width-100}} placeholder="Password" underlineColorAndroid={'transparent'} defaultValue={'-117.2348409'}/>
        <TouchableOpacity style={{width:250,height:35,backgroundColor:'rgb(102, 207, 130)',borderRadius:5}}>
          <Text style={{textAlign:'center',fontSize:20,color:'white'}} onPress={this.signIn.bind(this)}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width:250,height:35,margin:10}}>
          <Text style={{textAlign:'center',fontSize:16}}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={{textAlign:'center',fontSize:16}}>You are at {this.state.lat},{this.state.lng}</Text>
        <Text style={{textAlign:'center',fontSize:16}}>At a Distance of {this.state.d} metres</Text>
        <Text style={{textAlign:'center',fontSize:16}}>From {this.state.lat_prof},{this.state.lng_prof}</Text>
        <View style={{height:2,backgroundColor:'rgb(230,230,230)',width:width-120,marginTop:50}}></View>
        <TouchableOpacity style={{width:250,height:35,margin:10}}>
          <Text style={{textAlign:'center',fontSize:16}}>New to Meshedu? <Text style={{color:'rgb(102, 207, 130)'}}> Sign Up!</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('mesh', () => mesh);

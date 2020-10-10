import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList,Image,Linking} from 'react-native';
 
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
 
export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource:[]
     };
   }
 //http://jsonplaceholder.typicode.com/posts
 //https://newsapi.org/v2/top-headlines?country=us&apiKey=93924eebe4bd4fae8fd6b884f8a805ba
  componentDidMount(){
    fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=93924eebe4bd4fae8fd6b884f8a805ba")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       dataSource: responseJson.articles
      });
      console.log(responseJson.articles[0])
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    }
 
    render(){
     return(
      <View style={{padding:10}}>
      <FlatList
      padding ={30}
         data={this.state.dataSource}
         renderItem={({item}) => 
         <View style={{height: 400}}>
         <Image source={{uri:item.urlToImage}} style={{width: 400, height: 200}} ></Image>
         <Text>SOURCE:{item.source.name}</Text>
         <Text style={{height: 50}}>{item.content}</Text>
         <Text>Published:{item.publishedAt}</Text>
         <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL(item.url)}>
            Read More
         </Text>
         <View style={{height: 1,backgroundColor:'gray'}}></View>
         </View>
        }
       />
      
     </View>
     )}
}


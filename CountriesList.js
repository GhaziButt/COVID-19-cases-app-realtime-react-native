import * as React from 'react';
import { Button, View , Text, ActivityIndicator, StyleSheet , FlatList, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
class CountriesFlatList extends React.Component{
  
    constructor(props){
      super(props);
 
      this.state = {
        isLoading: true,
        data:[],
        temp:[], 
        search:null,
        
    }
    
   }
 
    componentDidMount() {
     fetch('https://api.covid19api.com/countries')
       .then((response) => response.json())
       .then((responseJSON) => {
         this.setState({
           isLoading: false,
           data: responseJSON,
           temp: responseJSON
         })
         
       })
   }
 
 
    renderHeader = () => {
      return (
          <SearchBar placeholder='Enter Country name e.g Austria,Australia..'  
                     round
                     editable={true}
                     value={this.state.search} 
                     onChangeText={this.updateSearch}
         />
      );
    }
 
 
    updateSearch = search =>{
      this.setState({search}, () =>{
        
       if('' == search){
         this.setState({
           data: [...this.state.temp]
         });
         return;
       }
       this.state.data = this.state.temp
         .filter(function(item){
         return item.Country.includes(search);
       })
         .map(function({Country,Slug,ISO2}){
         return {Country,Slug,ISO2};
         });
      });
    };
 
 
 goToNext(sc){
   this.props.navigation.navigate('SelectedCountry', {slug: sc})
 }
 
    render(){
     
         
     if (this.state.isLoading) {
       return (
           <View style={styles.container}>
               <ActivityIndicator/>
           </View>
       )
   }
 
       else{
 
         return(
           <FlatList data={this.state.data} keyExtractor={item => item.ISO2} backgroundColor='black' ListHeaderComponent={this.renderHeader} stickyHeaderIndices={[0]}
              renderItem={({item}) => (
  
               <ListItem title= {item.Country} 
               ListEmptyComponent={() => (
                     <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
                             <Text style={{fontFamily: 'serif', fontSize: 24}}>No Countries Found</Text>
                     </View>
               )}
               titleStyle={{ fontWeight: 'bold' ,fontSize: 15}} 
               onPress={() => this.goToNext(item.Slug)}
               
               />
        )}
          
          />
        );
 
      }
    }
  }

  export default CountriesFlatList;

  const styles = StyleSheet.create({
    container : {
      flex:1,
      backgroundColor: '#191919',
      alignItems: 'center',
      justifyContent :'center',
     
    },
    item : {
      flex : 1,
      alignSelf : 'stretch',
      margin : 3,
      alignItems :'center',
      justifyContent : 'center',
      borderBottomWidth : 1,
      borderBottomColor : '#eee',
      marginTop: 35,
      marginBottom: 35,
    },
  
    Flist : {
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
  
    },

    welcome: {
      flex: 1,
      margin: 20,
      backgroundColor: 'orange',
      margin: 10,
      textAlign: 'center',
      fontSize: 20,
      paddingTop: 70,
    }
  })
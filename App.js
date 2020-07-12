import * as React from 'react';
import { Button, View , Text, ActivityIndicator, StyleSheet , FlatList, ScrollView, SafeAreaView, StatusBar,Image} from 'react-native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import Countries from './CountriesList';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';






import { enableScreens } from 'react-native-screens';

enableScreens();

const OneTwoStack = createStackNavigator();


//STACKS


const OneTwoStackScreen = () => (
<OneTwoStack.Navigator
    initialRouteName="Country"
    screenOptions={{
        headerStyle: {
        backgroundColor: '#191919',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
       <OneTwoStack.Screen name="Country" component={Countries}/>
       <OneTwoStack.Screen name="SelectedCountry" component={CountryS}/>
</OneTwoStack.Navigator>

);







 class CountryS extends React.Component{
   constructor(props){
     super(props);
     const slugg = this.props.route.params.slug;

     this.state = {
       cSlug : slugg,
       cName :'',
       TheCases:'',
       TheDeaths: '',
       TheRecovered: '',
       TheActive: '',
       TheDate: '',
       TheConfirmed: '',
      }

    }



    componentDidMount() {
      const sluggg = this.state.cSlug
      fetch('https://api.covid19api.com/dayone/country/'+sluggg+'/status/confirmed')
          .then(response => response.json())
          .then(responseJSON => {
              this.setState({
                  TheCases: responseJSON[0].Cases,
                  cName: responseJSON[0].Country,
                  TheDate: responseJSON[0].Date.slice(0, 10)
              })
          })
      fetch('https://api.covid19api.com/country/'+sluggg)
          .then(response => response.json())
          .then(responseJSON => {
              const latest = responseJSON
              this.setState({
                  TheConfirmed: latest[Object.keys(responseJSON).length - 1].Confirmed,
                  TheDeaths: latest[Object.keys(responseJSON).length - 1].Deaths,
                  TheRecovered: latest[Object.keys(responseJSON).length - 1].Recovered,
                  TheActive: latest[Object.keys(responseJSON).length - 1].Active
              })

          })
  }

    render(){
      return(
        
       <View style ={styles.container} backgroundColor='#191919'>
         <View style={styles.item}>
            <Text style={{fontSize: 60 , fontWeight: 'bold' , allignItems : 'center', color:'white'}} >{this.state.cName}</Text>
         </View>   
        <View style={styles.item}>
            <Text style={{fontSize: 22 , fontWeight: 'bold' , allignItems : 'center', color:'#4c4c4c', fontFamily: 'monospace'}} >Date of first case </Text>
            <Text style={{fontSize: 32 , fontWeight: 'bold' , allignItems : 'center', color:'#b2b2b2'}}>{this.state.TheDate}</Text>
         </View>
         <View style={styles.item}>
            <Text style={{fontSize: 22, fontWeight: 'bold' , allignItems : 'center', color:'#4c4c4c',fontFamily: 'monospace'}} >Cases on first day</Text>
            <Text style={{fontSize: 32 , fontWeight: 'bold' , allignItems : 'center', color:'#b2b2b2'}}>{this.state.TheCases}</Text>
         </View>
         <View style={styles.item}>
             <Text style={{fontSize: 22 , fontWeight: 'bold' , allignItems : 'center', color:'#4c4c4c',fontFamily: 'monospace'}}>Coronavirus Cases</Text>
             <Text style={{fontSize: 32 , fontWeight: 'bold' , allignItems : 'center', color:'#b2b2b2'}}>{this.state.theConfirmed}</Text>
         </View>
         <View style={styles.item}>
             <Text style={{fontSize: 25 , fontWeight: 'bold' , allignItems : 'center', color:'#4c4c4c',fontFamily: 'monospace'}}>Deaths</Text>
             <Text style={{fontSize: 50 , fontWeight: 'bold' , allignItems : 'center', color:'#DC143C'}}>{this.state.TheDeaths}</Text>
         </View>
         <View style={styles.item}>
             <Text style={{fontSize: 25 , fontWeight: 'bold' , allignItems : 'center', color:'#4c4c4c',fontFamily: 'monospace'}}>Recovered</Text>
             <Text style={{fontSize: 50 , fontWeight: 'bold' , allignItems : 'center', color:'#228B22'}}>{this.state.TheRecovered}</Text>
         </View>
         <View style={styles.item}>
             <Text style={{fontSize: 22, fontWeight: 'bold' , allignItems : 'center', color:'#4c4c4c',fontFamily: 'monospace'}}>Active</Text>
             <Text style={{fontSize: 32 , fontWeight: 'bold' , allignItems : 'center', color:'#b2b2b2'}}>{this.state.TheActive}</Text>
         </View>

        </View>

        ) ;
    }
 }



//  function SingleCountryScreen(){
//   return(
//   <>
//     <StatusBar barStyle="dark-content"/>
//     <SafeAreaView style={{flex:1 , }}>
//         <CountriesFlatList/>
//     </SafeAreaView>
//   </>
//  );

// }











const Drawernav = createDrawerNavigator();

class App extends React.Component{
render = () => {

  return (
   
    <NavigationContainer   >
      <Drawernav.Navigator  initialRouteName="Select Country" drawerStyle={{backgroundColor:'#191919'}}  drawerContentOptions={{
                labelStyle: { fontSize: 15, color:'#4c4c4c', padding: 2, fontFamily :'monospace'}, }}>
        <Drawernav.Screen name="Select Country" component={OneTwoStackScreen} options={{
                    drawerIcon: () => <FontAwesome5 name="font-awesome-flag" size={30} color='white' />
               }} />
        <Drawernav.Screen name="The Earth" component={GlobalSummaryScreen} options={{
                    drawerIcon: () => <Fontisto name="world" size={30} color='white' />
                }}/>
        <Drawernav.Screen name="Select Continent" component={mainTabScreen}  options={{
                    drawerIcon: () => <FontAwesome5 name="globe-europe" size={30} color='white'  />
                }} />
      </Drawernav.Navigator>
    </NavigationContainer>
   
  );
}
}

export default App;

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor: '#8f8f8f',
    alignItems: 'center',
    justifyContent :'center',

  },
  item : {
    flex : 1,
    alignSelf : 'stretch',
    margin : 3,
    alignItems :'center',
    justifyContent : 'center',
    marginTop: 35,
    marginBottom: 35,
  },

  Flist : {
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',

  },



})


const AsiaStack = createStackNavigator();
const EuropeStack = createStackNavigator();
const NorthAmericaStack = createStackNavigator();
const SouthAmericaStack = createStackNavigator();
const AfricaStack = createStackNavigator();
const AustraliaStack = createStackNavigator();

const AsiaStackScreen = () => (
<AsiaStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#0a0a0a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <AsiaStack.Screen name="Asia" component={AsiaScreen} options={{
        title:'Asia',

        }} />
</AsiaStack.Navigator>
);

const EuropeStackScreen = ({navigation}) => (
<EuropeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#141414',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <EuropeStack.Screen name="Europe" component={EuropeScreen} options={{
        title:"Europe",
        }} />
</EuropeStack.Navigator>
);

const NAStackScreen = ({navigation}) => (
  <NorthAmericaStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f1f1f',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <NorthAmericaStack.Screen name="NorthAmerica" component={NorthAmericaScreen} options={{
          title:"NorthAmerica",
          }} />
  </NorthAmericaStack.Navigator>
  );


  const SAStackScreen = ({navigation}) => (
    <SouthAmericaStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#292929',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <SouthAmericaStack.Screen name="SouthAmerica" component={SouthAmericaScreen} options={{
            title:"SouthAmerica",
            }} />
    </SouthAmericaStack.Navigator>
    );



    const AfricaStackScreen = ({navigation}) => (
      <AfricaStack.Navigator screenOptions={{
              headerStyle: {
              backgroundColor: '#333333',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold'
              }
          }}>
              <AfricaStack.Screen name="Africa" component={AfricaScreen} options={{
              title:"Africa",
              }} />
      </AfricaStack.Navigator>
      );


      const AustraliaStackScreen = ({navigation}) => (
        <AustraliaStack.Navigator screenOptions={{
                headerStyle: {
                backgroundColor: '#3d3d3d',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold'
                }
            }}>
                <AustraliaStack.Screen name="Australia" component={AustraliaScreen} options={{
                title:"Australia",
                }} />
        </AustraliaStack.Navigator>
        );







//SCREENS

class AsiaScreen extends React.Component {
 constructor(props) {
    super(props)
    this.state = {
        isLoading:true,
        countries: []
    }
}


componentDidMount(){
  fetch('https://covid19-update-api.herokuapp.com/api/v1/world/continent/asia')
         .then(response => response.json())
         .then(responseJSON => {
             this.setState({
                 isLoading : false,
                 countries : responseJSON.countries,
             })
         })


}


render= () => {

  if(this.state.isLoading){
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator/>
        </View>
      )
  }

  else{


    return(

     <View style ={styles.container} backgroundColor='#191919'>
       <ScrollView>
         {this.state.countries.map((item) =>
           <View style = {stylesS.welcome}>
             <Text style={{fontSize: 25 , fontWeight: 'bold' , allignItems : 'center', color:'white'}}>{item.name}      </Text>

                     <Text style={{ fontSize: 15,color:'#4c4c4c'}}>Total Cases: </Text>
                     <Text style={{fontSize: 15,fontWeight: 'bold',color:'white'}}>{item.cases}</Text>


                     <Text style={{ fontSize: 15,color:'#4c4c4c'}}>   Total Deaths: </Text>
                     <Text style={{fontSize: 15, fontWeight: 'bold', color:'red'}}>{item.deaths}</Text>

            </View>
                    )}
                </ScrollView>

      </View>
     );
    }
}
}



class EuropeScreen extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
        isLoading:true,
        countries: []
    }
}


componentDidMount(){
  fetch('https://covid19-update-api.herokuapp.com/api/v1/world/continent/europe')
         .then(response => response.json())
         .then(responseJSON => {
             this.setState({
                 isLoading : false,
                 countries : responseJSON.countries,
             })
         })


}


render= () => {

  if(this.state.isLoading){
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator/>
        </View>
      )
  }

  else{


    return(


      <View style ={styles.container} backgroundColor='#191919'>
      <ScrollView>
        {this.state.countries.map((item) =>
          <View style = {stylesS.welcome}>
            <Text style={{fontSize: 25 , fontWeight: 'bold' , allignItems : 'center', color:'white'}}>{item.name}      </Text>

                    <Text style={{ fontSize: 15,color:'#4c4c4c'}}>Total Cases: </Text>
                    <Text style={{fontSize: 15,fontWeight: 'bold',color:'white'}}>{item.cases}</Text>


                    <Text style={{ fontSize: 15,color:'#4c4c4c'}}>   Total Deaths: </Text>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color:'red'}}>{item.deaths}</Text>

           </View>
                   )}
               </ScrollView>

     </View>
     );
    }
}
}

class NorthAmericaScreen extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
        isLoading:true,
        countries: []
    }
}


componentDidMount(){
  fetch('https://covid19-update-api.herokuapp.com/api/v1/world/continent/north america')
         .then(response => response.json())
         .then(responseJSON => {
             this.setState({
                 isLoading : false,
                 countries : responseJSON.countries,
             })
         })


}


render= () => {

  if(this.state.isLoading){
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator/>
        </View>
      )
  }

  else{


    return(


      <View style ={styles.container} backgroundColor='#191919'>
      <ScrollView>
        {this.state.countries.map((item) =>
          <View style = {stylesS.welcome}>
            <Text style={{fontSize: 25 , fontWeight: 'bold' , allignItems : 'center', color:'white'}}>{item.name}      </Text>

                    <Text style={{ fontSize: 15,color:'#4c4c4c'}}>Total Cases: </Text>
                    <Text style={{fontSize: 15,fontWeight: 'bold',color:'white'}}>{item.cases}</Text>


                    <Text style={{ fontSize: 15,color:'#4c4c4c'}}>   Total Deaths: </Text>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color:'red'}}>{item.deaths}</Text>

           </View>
                   )}
               </ScrollView>

     </View>
     );
    }
}
}




class  SouthAmericaScreen extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
        isLoading:true,
        countries: []
    }
}


componentDidMount(){
  fetch('https://covid19-update-api.herokuapp.com/api/v1/world/continent/south america')
         .then(response => response.json())
         .then(responseJSON => {
             this.setState({
                 isLoading : false,
                 countries : responseJSON.countries,
             })
         })


}


render= () => {

  if(this.state.isLoading){
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator/>
        </View>
      )
  }

  else{


    return(


      <View style ={styles.container} backgroundColor='#191919'>
      <ScrollView>
        {this.state.countries.map((item) =>
          <View style = {stylesS.welcome}>
            <Text style={{fontSize: 25 , fontWeight: 'bold' , allignItems : 'center', color:'white'}}>{item.name}      </Text>

                    <Text style={{ fontSize: 15,color:'#4c4c4c'}}>Total Cases: </Text>
                    <Text style={{fontSize: 15,fontWeight: 'bold',color:'white'}}>{item.cases}</Text>


                    <Text style={{ fontSize: 15,color:'#4c4c4c'}}>   Total Deaths: </Text>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color:'red'}}>{item.deaths}</Text>

           </View>
                   )}
               </ScrollView>

     </View>
     );
    }
}
}

class  AfricaScreen extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
        isLoading:true,
        countries: []
    }
}


componentDidMount(){
  fetch('https://covid19-update-api.herokuapp.com/api/v1/world/continent/africa')
         .then(response => response.json())
         .then(responseJSON => {
             this.setState({
                 isLoading : false,
                 countries : responseJSON.countries,
             })
         })


}


render= () => {

  if(this.state.isLoading){
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator/>
        </View>
      )
  }

  else{


    return(

      <View style ={styles.container} backgroundColor='#191919'>
      <ScrollView>
        {this.state.countries.map((item) =>
          <View style = {stylesS.welcome}>
            <Text style={{fontSize: 25 , fontWeight: 'bold' , allignItems : 'center', color:'white'}}>{item.name}      </Text>

                    <Text style={{ fontSize: 15,color:'#4c4c4c'}}>Total Cases: </Text>
                    <Text style={{fontSize: 15,fontWeight: 'bold',color:'white'}}>{item.cases}</Text>


                    <Text style={{ fontSize: 15,color:'#4c4c4c'}}>   Total Deaths: </Text>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color:'red'}}>{item.deaths}</Text>

           </View>
                   )}
               </ScrollView>

     </View>
     );
    }
}
}

class  AustraliaScreen extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
        isLoading:true,
        countries: []
    }
}


componentDidMount(){
  fetch('https://covid19-update-api.herokuapp.com/api/v1/world/continent/australia')
         .then(response => response.json())
         .then(responseJSON => {
             this.setState({
                 isLoading : false,
                 countries : responseJSON.countries,
             })
         })


}


render= () => {

  if(this.state.isLoading){
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator/>
        </View>
      )
  }

  else{


    return(

      <View style ={styles.container} backgroundColor='#191919'>
      <ScrollView>
        {this.state.countries.map((item) =>
          <View style = {stylesS.welcome}>
            <Text style={{fontSize: 25 , fontWeight: 'bold' , allignItems : 'center', color:'white'}}>{item.name}      </Text>

                    <Text style={{ fontSize: 15,color:'#4c4c4c'}}>Total Cases: </Text>
                    <Text style={{fontSize: 15,fontWeight: 'bold',color:'white'}}>{item.cases}</Text>


                    <Text style={{ fontSize: 15,color:'#4c4c4c'}}>   Total Deaths: </Text>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color:'red'}}>{item.deaths}</Text>

           </View>
                   )}
               </ScrollView>

     </View>
     );
    }
}
}

class GlobalSummaryScreen extends React.Component{
  constructor(props){
    super(props);


    this.state = {
      isLoading : true,
      newConfirmed: '',
      totalConfirmed: '',
      newDeaths: '',
      totalDeaths: '',
      newRecovered: '',
      totalRecovered: '',
  }
  }

  componentDidMount(){
     fetch('https://api.covid19api.com/summary')
            .then(response => response.json())
            .then(responseJSON => {
                this.setState({
                    isLoading : false,
                    newConfirmed: responseJSON.Global.NewConfirmed,
                    totalConfirmed: responseJSON.Global.TotalConfirmed,
                    newDeaths: responseJSON.Global.NewDeaths,
                    totalDeaths: responseJSON.Global.TotalDeaths,
                    newRecovered: responseJSON.Global.NewRecovered,
                    totalRecovered: responseJSON.Global.TotalRecovered,
                })
            })
  }


  render= () => {

      if(this.state.isLoading){
          return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator/>
            </View>
          )
      }

      else{


        return(

         <View style ={styles.container} backgroundColor='#191919'>
          <View style={styles.item}>
              <Text style={{fontSize: 22 , fontWeight: 'bold' , allignItems : 'center', color:'#4c4c4c',fontFamily: 'monospace'}} >New Confirmed </Text>
              <Text style={{fontSize: 35 , fontWeight: 'bold' , allignItems : 'center', color:'#b2b2b2'}}>{this.state.newConfirmed}</Text>
           </View>
           <View style={styles.item}>
              <Text style={{fontSize: 22, fontWeight: 'bold' , allignItems : 'center', color:'#4c4c4c',fontFamily: 'monospace'}} >Total Confirmed </Text>
              <Text style={{fontSize: 35 , fontWeight: 'bold' , allignItems : 'center', color:'#b2b2b2'}}>{this.state.totalConfirmed}</Text>
           </View>
           <View style={styles.item}>
               <Text style={{fontSize: 22 , fontWeight: 'bold' , allignItems : 'center', color:'#4c4c4c',fontFamily: 'monospace'}}>New Deaths </Text>
               <Text style={{fontSize: 35 , fontWeight: 'bold' , allignItems : 'center', color:'#b2b2b2'}}>{this.state.newDeaths}</Text>
           </View>
           <View style={styles.item}>
               <Text style={{fontSize: 35 , fontWeight: 'bold' , allignItems : 'center', color:'#4c4c4c',fontFamily: 'monospace'}}>Total Deaths </Text>
               <Text style={{fontSize: 60 , fontWeight: 'bold' , allignItems : 'center', color:'#DC143C'}}>{this.state.totalDeaths}</Text>
           </View>
           <View style={styles.item}>
               <Text style={{fontSize: 22 , fontWeight: 'bold' , allignItems : 'center', color:'#4c4c4c',fontFamily: 'monospace'}}>New Recovered </Text>
               <Text style={{fontSize: 35 , fontWeight: 'bold' , allignItems : 'center', color:'#b2b2b2'}}>{this.state.newRecovered}</Text>
           </View>
           <View style={styles.item}>
               <Text style={{fontSize: 22, fontWeight: 'bold' , allignItems : 'center', color:'#4c4c4c',fontFamily: 'monospace'}}>Total Recovered</Text>
               <Text style={{fontSize: 35 , fontWeight: 'bold' , allignItems : 'center', color:'#b2b2b2'}}>{this.state.totalRecovered}</Text>
           </View>

          </View>

         );
        }
}
}

//NAVIGATORS



const Tab = createMaterialBottomTabNavigator();


function mainTabScreen() {
   return (

      <Tab.Navigator
        initialRouteName="Asia"
        activeColor="#fff"
      >
        <Tab.Screen
          name="Asia"
          component={AsiaStackScreen}
          options={{
            tabBarLabel: 'Asia',
            tabBarColor: '#0a0a0a',
            tabBarIcon: ( { color }) => (
              <MaterialCommunityIcons name="dots-horizontal" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Europe"
          component={EuropeStackScreen}
          options={{
            tabBarLabel: 'Europe',
            tabBarColor: '#141414',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="dots-horizontal" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="NorthAmerica"
          component={NAStackScreen}
          options={{
            tabBarLabel: 'North America',
            tabBarColor:'#1f1f1f',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="dots-horizontal" color={color} size={26} />
            ),
          }}
        />
         <Tab.Screen
          name="SouthAmerica"
          component={SAStackScreen}
          options={{
            tabBarLabel: 'South America',
            tabBarColor: '#292929',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="dots-horizontal" color={color} size={26} />
            ),
          }}
        />
         <Tab.Screen
          name="Africa"
          component={AfricaStackScreen}
          options={{
            tabBarLabel: 'Africa',
            tabBarColor: '#333333',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="dots-horizontal" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Australia"
          component={AustraliaStackScreen}
          options={{
            tabBarLabel: 'Australia',
            tabBarColor: '#3d3d3d',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="dots-horizontal" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );


}




const stylesS = StyleSheet.create({
  welcome: {
    flexDirection:'row',
    flex: 1,
    margin: 20,
    backgroundColor: '#191919',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 30,


  },

  item2 : {

  }
})


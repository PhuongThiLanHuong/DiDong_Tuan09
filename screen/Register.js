import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView, TextInput} from "react-native";
import { useState } from "react";

const Register = ({navigation}) => {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [fullName,setFullName]=useState("");
  function Register(){
    if(username&&password){
      fetch("http://localhost:3000/login",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username:username, password:password,fullName:fullName}),
      })
      .then((response) => response.json())
        .then((data) => {
          // Xử lý phản hồi từ API
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra: ", error);
        });
    }
    else{
      console.log("vui lòng làm đầy đủ tt")
    }
   
  }
  return(
    <View style={styles.container}>
       <View>
            <Image source={require('../assets/login.png')} style={{width: 200, height: 200, alignSelf: 'center'}}/>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:900,color:'black'}}>Register</Text>
        </View>
        <View style={{marginTop:40,marginLeft:20}}>
          <View style={{width:350}}>
                  <Text  style={{fontSize: 20, fontWeight: 700}}>Username:</Text>
                  <TextInput placeholder='Enter your username' style={{backgroundColor: 'white', borderRadius: 10, marginTop: 8, height: 60, fontSize: 18, fontWeight: 700, color: 'gray', paddingHorizontal: 16, paddingVertical:19}} value={username} onChangeText={(username)=>{setUsername(username)}} ></TextInput>
          </View>
          <View style={{width:350}}>
                  <Text  style={{fontSize: 20, fontWeight: 700}}>Password:</Text>
                  <TextInput placeholder='Enter your password' style={{backgroundColor: 'white', borderRadius: 10, marginTop: 8, height: 60, fontSize: 18, fontWeight: 700, color: 'gray', paddingHorizontal: 16, paddingVertical:19}} value={password} onChangeText={(password)=>{setPassword(password)}}></TextInput>
          </View>
          <View style={{width:350}}>
                  <Text  style={{fontSize: 20, fontWeight: 700}}>Full name:</Text>
                  <TextInput placeholder='Enter your full name' style={{backgroundColor: 'white', borderRadius: 10, marginTop: 8, height: 60, fontSize: 18, fontWeight: 700, color: 'gray', paddingHorizontal: 16, paddingVertical:19}} value={fullName} onChangeText={(fullName)=>{setFullName(fullName)}}></TextInput>
          </View>
        </View>
        <View style={{width:250,borderRadius:10,marginTop:40,alignSelf:'center'}}>
            <TouchableOpacity onPress={Register}>
                <Text style={{backgroundColor:'red',textAlign:'center',color:'white',fontSize:20,fontWeight:700}}>REGISTER</Text>
            </TouchableOpacity>
        </View>
        <View style={{marginTop:40,marginLeft:30,flexDirection:'row'}}>
        <Text style={{fontSize:20,fontWeight:700}}>Already have account ?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
            <Text style={{fontSize:20,fontWeight:700,color:'orange',left:30}}>Login</Text>
        </TouchableOpacity>
       </View>
    </View>
  )
}
export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
});
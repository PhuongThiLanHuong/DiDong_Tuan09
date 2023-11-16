import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native'
import React, {useEffect} from 'react'
import { Alert } from 'react-native';
const Login = ({navigation}) => {
    const [username,setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    console.log(username);
    console.log(password);
    const [data, setData] = React.useState([]);
    const [notes, setNotes] = React.useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/login', {
            method: 'GET',
            headers: {'content-type':'application/json'},
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(tasks => {
            console.log(tasks);
            setData(tasks);
        }).catch(error => {
            // handle error
        })
    }, []);
    const handleLogin = () => {
        const user = data.find((user) => user.username === username && user.password === password);
        console.log(user);
        if (user) {
            console.log('Login successful');
            navigation.navigate({
                name: 'TakeNote',
                params:{
                    id: user.id,
                }
            })
        } else {
            Alert.alert('Invalid Credentials', 'Please check your email and password.');
        }
    };
    console.log(data);
    return (
    <View style={styles.container}> 
        <View>
            <Image source={require('../assets/login.png')} style={{width: 200, height: 200, alignSelf: 'center'}}/>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:900,color:'black'}}>Login</Text>
        </View>
       <View style={{marginTop:40,marginLeft:10}}> 
            <View style={{width:350}}>
                <Text  style={{fontSize: 20, fontWeight: 700}}>Username:</Text>
                <TextInput placeholder='Enter your username' style={{backgroundColor: 'white', borderRadius: 10, marginTop: 8, height: 60, fontSize: 18, fontWeight: 700, color: 'gray', paddingHorizontal: 16, paddingVertical:19}} value={username} onChangeText={(username)=>{setUsername(username)}}></TextInput>
            </View>
            <View style={{width:350}}>
                <Text  style={{fontSize: 20, fontWeight: 700}}>Password:</Text>
                <TextInput placeholder='Enter your password' style={{backgroundColor: 'white', borderRadius: 10, marginTop: 8, height: 60, fontSize: 18, fontWeight: 700, color: 'gray', paddingHorizontal: 16, paddingVertical:19}} value={password} onChangeText={(password)=>{setPassword(password)}}></TextInput>
            </View>
       </View>
       <View style={{width:250,borderRadius:10,marginTop:40,alignSelf:'center'}}>
            <TouchableOpacity onPress={handleLogin}>
                <Text style={{backgroundColor:'red',textAlign:'center',color:'white',fontSize:20,fontWeight:700}}>LOGIN</Text>
            </TouchableOpacity>
       </View>
       <View style={{marginTop:40,marginLeft:30,flexDirection:'row'}}>
        <Text style={{fontSize:20,fontWeight:700}}>Don't have account ?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
            <Text style={{fontSize:20,fontWeight:700,color:'orange',left:30}}>Register</Text>
        </TouchableOpacity>
       </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
})
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, AntDesign} from '@expo/vector-icons';

const TakeNote = ({route, editingMode, navigation}) => {
    const [refresh, setRefresh] = useState(false);
    const [data1, setData1] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/login/${route.params.id}`, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(tasks => {
            // console.log(tasks);
            setData1(tasks.note);
        }).catch(error => {
            // handle error
        })
    }, []);
    // useEffect(() => {
    //     setData1(route.params.user.notes);
    // },[])
    var deleteTask = (noteId) => {
        // Lấy ID của user từ route.params (trong trường hợp này, có vẻ là "1")
        const userId = route.params.id;

        fetch(`http://localhost:3000/login/${userId}`, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Failed to fetch user data');
        }).then(userData => {
            // Lấy danh sách ghi chú của user
            const userNotes = userData.notes || [];
            console.log(userNotes);

            // Tìm và xoá ghi chú có id trùng khớp
            const updatedNotes = userNotes.filter(note => note.id !== noteId);
            console.log(updatedNotes);
            setData1(updatedNotes);
            // Cập nhật dữ liệu trên server
            fetch(`http://localhost:3000/login/${userId}`, {
                method: 'PUT',
                headers: {'content-type':'application/json'},
                body: JSON.stringify({ ...userData, notes: updatedNotes }),
            }).then(res => {
                if (res.ok) {
                    setRefresh(prevRefresh => !prevRefresh);
                } else {
                    throw new Error('Failed to update user data');
                }
            }).catch(error => {
                console.error("Error deleting task:", error);
            });
        }).catch(error => {
            console.error("Error fetching user data:", error);
        });
    }
    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={data1}
                    renderItem={({item}) => (
                        <View style={{flexDirection:'row',marginTop:10,backgroundColor:'white',width:350,height:100,borderRadius:10}}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                    <AntDesign name="delete" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:9,justifyContent:'center'}}>
                                <Text style={{fontSize:20,fontWeight:700}}>{item.name}</Text>
                                <Text style={{fontSize:15,fontWeight:700}}>{item.time}</Text>
                            </View>
                           
                        </View>
                    )}
                ></FlatList>
            </View>
        </View>
    )
}

export default TakeNote

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    style1:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    style2:{
        flex: 9,
        alignItems: 'center',
    },
    style3:{
        position: 'fixed',
        alignItems: 'center',
        width: '100%',
        bottom: 90,
        justifyContent: 'center',
    },
})
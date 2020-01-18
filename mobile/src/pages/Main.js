import React, { useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../src/services/api';

function Main({ navigation }){
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion ] = setState(null);
    
    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionAsync();

            if (granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }

        }
        loadInitialPosition();

    }, []);

    async function loadDevs(){
        const { latitude, longiude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs: 'PHP'
            }
        });

        setDevs(response.data);
    }

    function handleRegionChanged(region){
        console.log(region);
        setCurrentRegion(region);
    }

    if (!currentRegion){
        return null;
    }

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} 
                initialRegion={currenRegion} 
                style={styles.map}
            >

                {devs.map(dev =>(
                    <Marker
                        coordinate={{ 
                            longitude: dev.location.coordinates[0],
                            latitude: dev.location.coordinates[1],
                        }}>
                        <Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/33108475?s=460&v=4' }}/>
                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: 'Christefer' });
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>Christeffer</Text>
                                <Text style={styles.devBio}>Full Stack</Text>
                                <Text style={styles.devTechs}>PHP, Java, Ionic</Text>
                            </View>
                        </Callout>
                    </Marker>      
                ))}      
            </MapView>   
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}

                />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF"/>                    
                </TouchableOpacity>
            </View>
        </>    
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },  
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout:{
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,

    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },  

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },    
})
export default Main;
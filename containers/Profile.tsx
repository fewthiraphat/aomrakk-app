import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ProfileCircle from "../compoennts/ProfileCircle";
import Character from "../compoennts/Character";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  const handleChangeDisplayName = (text: string) => {
    setDisplayName(text);
  };

  const handleChangeLocation = (text: string) => {
    setLocation(text);
  };

  const handleChangeAnimal = (text: string) => {
    setAnimal(text);
  };

  const getProfile = async () => {
    const data = await AsyncStorage.getItem("@profile");
    if (data != null) {
      const profile = JSON.parse(data);
      setDisplayName(profile.displayName);
      setLocation(profile.location);
      setAnimal(profile.animal);
      return profile;
    }
    setDisplayName("นักออมนิรนาม");
    setLocation("โรงเรียนการออม");
    setAnimal("แมว");
    return null;
  };

  const saveProfile = async () => {
    const profile = {
      displayName,
      location,
      animal,
    };
    try {
      await AsyncStorage.setItem("@profile", JSON.stringify(profile));
      Alert.alert("บันทึกข้อมูลเรียบร้อยแล้ว");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.profile}>
        <ProfileCircle animal={animal} />
      </View>
      <View style={styles.profileDetail}>
        <View style={styles.gender}>
          <Pressable onPress={() => handleChangeAnimal("แมว")}>
            <Character title="แมว" active={animal === "แมว"} />
          </Pressable>
          <Pressable onPress={() => handleChangeAnimal("หมา")}>
            <Character title="หมา" active={animal === "หมา"} />
          </Pressable>
          <Pressable onPress={() => handleChangeAnimal("กระต่าย")}>
            <Character title="กระต่าย" active={animal === "กระต่าย"} />
          </Pressable>
        </View>
        <View style={styles.labelAndTextInput}>
          <Text style={styles.textLabel}>ชื่อที่แสดงผล</Text>
          <TextInput
            style={styles.input}
            onChange={(e) => handleChangeDisplayName(e.nativeEvent.text)}
          >
            {displayName}
          </TextInput>
        </View>
        <View style={styles.labelAndTextInput}>
          <Text style={styles.textLabel}>สถานที่</Text>
          <TextInput
            style={styles.input}
            onChange={(e) => handleChangeLocation(e.nativeEvent.text)}
          >
            {location}
          </TextInput>
        </View>
        <View style={styles.labelAndTextInput}>
          <Pressable style={styles.button} onPress={saveProfile}>
            <Text style={styles.buttonText}>บันทึกข้อมูล</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  profileDetail: {
    flexDirection: "column",
    alignItems: "center",
    marginTop:20
  },
  input: {
    marginTop: 10,
    height: 60,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    width: 300,
    backgroundColor: "white",
  },
  labelAndTextInput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    margin: 12,
  },
  textLabel: {
    fontSize: 18,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    backgroundColor: "#3c90d4",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  gender: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },
});

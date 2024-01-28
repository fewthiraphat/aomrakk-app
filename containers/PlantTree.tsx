import { Alert, Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Tree from "../assets/tree.png";
import Reward from "../assets/reward.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const PlantTree = (naviagte: any) => {
  const [plantScore, setPlantScore] = useState<PlantInfo>({ score: 0, date: new Date() });
  interface PlantInfo {
    score: number;
    date: Date;
  }

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        setPlantScore(data);
      }
    });
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@tree");
      if (jsonValue !== null) {
        const plantScore: PlantInfo = JSON.parse(jsonValue);
        return plantScore;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const addScore = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@tree");
      if (jsonValue !== null) {
        const plantScore: PlantInfo = JSON.parse(jsonValue);
        const newScore = plantScore.score + 1;
        const today = new Date();
        const lastDate = new Date(plantScore.date);
        if (today.getDate() !== lastDate.getDate()) {
          const newPlantScore: PlantInfo = { score: newScore, date: new Date() };
          await AsyncStorage.setItem("@tree", JSON.stringify(newPlantScore));
          setPlantScore(newPlantScore);
        }
        else{
          Alert.alert("คุณได้สะสมแต้มไปแล้ววันนี้");
        }
      } else {
        const newPlantScore: PlantInfo = { score: 1, date: new Date() };
        await AsyncStorage.setItem("@tree", JSON.stringify(newPlantScore));
        setPlantScore(newPlantScore);
      }
    } catch (error) {
      return null;
    }
  };



  const renderImage = () => {
    if (plantScore.score < 1) {
      return <Image source={Reward} style={{ width: 300, height: 300 }} />;
    } 
    return <Image source={Reward} style={{ width: 300, height: 300 }} />;
  };

  const renderTree = () => {
    if ((plantScore.score / 10) > 1){
      return 'คุณปลูกต้นไม่ไปแล้ว 1 ต้น'
    }
      return 'อีกนิดนึง คุณจะได้ปลูกต้นไม้แล้ว!'
  }

  const renderText = () => {
    if (plantScore.score < 1) {
      return (<>
        <Text style={styles.footerText}>0/10🌲</Text>
        <Text style={styles.footerText}>เริ่มบันทึกและสะสมแต้ม</Text>
        <Text style={styles.footerText}>เพื่อปลูกต้นไม้ร่วมกันวันนี้!</Text>
        </>
      )
    }
    return (
      <>
      <Text style={styles.footerText}>{plantScore.score}/10🌲</Text>
      <Text style={styles.footerText}>{renderTree()}</Text>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.tree}>{renderImage()}</View>
      <View style={styles.footer}>
        {
          renderText()
        }
        <Pressable onPress={addScore} style={styles.rewardButtonPress}>
          <View style={styles.rewardButton}>
            <Text>สะสมแต้ม</Text>
          </View>
        </Pressable>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21a26c",
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
  },
  tree: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 70,
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 20,
    lineHeight: 40,
  },
  rewardButton: {
    backgroundColor: '#f0ca23',
    padding: 15,
    borderRadius: 10,
  },
  rewardButtonPress: {
    marginTop: 20,
  }
});

import { Image, StyleSheet, Text, View } from "react-native";
import Tree from "../assets/tree.png";

export const PlantTree = () => {

  return (
    <View style={styles.container}>
      <View style={styles.tree}>
        <Image source={Tree} style={{ width: 300, height: 300 }} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
        ระบบปลูกต้นไม้ยังไม่พร้อมใช้งาน
        </Text>
        <Text style={styles.footerText}>
          ติดตามและรีทวิตที่ @saveplant_thai
        </Text>
        <Text style={styles.footerText}>
          เพื่อร่วมกันปลดล็อคระบบปลูกต้นไม้!
        </Text>
      </View>
      <View>
     
      </View>
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
    marginTop: 70
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
    lineHeight: 50,
  },
});

import { StyleSheet, Text, View } from "react-native";

export type GenderProps = {
  title?: string;
  active?: boolean;
};

const Gender: React.FC<GenderProps> = ({ title, active }) => {
  return (
    <View style={active ? styles.activeContainer : styles.container}>
      <Text style={active ? styles.textActive : styles.text}>{title}</Text>
    </View>
  );
};

export default Gender;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1e1e1",
    borderRadius: 100 / 2,
    width: 100,
    padding: 10,
  },
  activeContainer: {
    backgroundColor: "#656565",
    borderRadius: 100 / 2,
    width: 100,
    padding: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  textActive: {
    textAlign: "center",
    fontSize: 18,
    color: "#e1e1e1",
  },
});

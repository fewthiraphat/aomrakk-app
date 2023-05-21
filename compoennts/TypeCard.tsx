import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

export type TypeCardProps = {
  title?: string;
  active?: boolean;
};
const TypeCard: React.FC<TypeCardProps> = ({ title, active }) => {
  return (
    <View style={active ?styles.containerActive : styles.container}>
      <Text style={active ? styles.titleActive : styles.title}>{title}</Text>
    </View>
  );
};

export default TypeCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    borderRadius: 99999,
    backgroundColor: "#e1e1e1",
    width: 100,
    padding: 14,
  },
  containerActive: {
    display: "flex",
    alignItems: "center",
    borderRadius: 99999,
    backgroundColor: "#656565",
    width: 100,
    padding: 14,
    color:'#e1e1e1'
  },
  title: {
    fontSize: 16,
  },
  titleActive:{
    fontSize: 16,
    color:'#e1e1e1'
  }

});

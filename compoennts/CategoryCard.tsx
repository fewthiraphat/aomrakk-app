import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export type CategoryCardProps = {
  title?: any;
  icon?: any;
  color?: string;
  onPress?: (e:any) => void;
  active?: boolean;
};
const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  icon,
  color,
  onPress,
  active,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={active ? styles.activeContainer : styles.container}>
        <Ionicons name={icon} size={36} color={active ? '#e1e1e1' :color} />
        <Text style={active ? styles.activeTitle : styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e1e1",
    width: 110,
    height: 110,
    borderRadius: 9999,
    padding: 20,
    gap: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
  },
  activeContainer:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#656565",
    width: 110,
    height: 110,
    borderRadius: 9999,
    padding: 20,
    gap: 10,
  },
  activeTitle: {
    textAlign: "center",
    fontSize: 16,
    color:'#e1e1e1',
  }
});

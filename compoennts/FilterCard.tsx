import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface FilterCardProps {
  icon?: any;
  size?: number;
  color?: string;
  onPress?: () => void;
  label?: string;
  active?: boolean;
}

const FilterCard: React.FC<FilterCardProps> = ({
  icon,
  size = 40,
  color,
  onPress,
  label,
  active,
}) => {
  return (
    <View style={active ? styles.activeContainer : styles.container}>
      <View style={styles.row}>
        <Ionicons name={icon} size={size} color={active ? '#e1e1e1' : color} />
        <Text style={active && styles.textActive}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#e1e1e1",
    border: "1px solid #e1e1e1",
    borderRadius: 20,
    marginRight: 5,
    marginLeft: 5,
    width: 170,
  },
  activeContainer: {
    display: "flex",
    backgroundColor: "#656565",
    border: "1px solid #656565",
    borderRadius: 20,
    marginRight: 5,
    marginLeft: 5,
    width: 170,
  },
  textActive: {
    color: "#e1e1e1",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    gap: 10,
  },
});

export default FilterCard;

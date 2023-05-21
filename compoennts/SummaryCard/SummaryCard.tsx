//@ts-nocheck
import { Image, StyleSheet, Text, View } from "react-native";
import HandMoney from "../../assets/hand-money.png";
import HandCoffee from "../../assets/hand-coffee.png";
import HandStudy from "../../assets/hand-study.png";
import HandEntertain from "../../assets/hand-chess.png";
import HandGift from "../../assets/hand-gift.png";
import HandFood from "../../assets/hand-food.png";
import { category } from "../../types/category";
import React from "react";

interface SummaryCardProps {
  onPress?: () => void;
  label?: string;
  summary?: string;
  type?: category;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  onPress,
  label,
  summary,
  type = "default",
}) => {
  const renderLogo = (type: category) => {
    switch (type) {
      case "drinks":
        return HandCoffee;
      case "study":
        return HandStudy;
      case "entertain":
        return HandEntertain;
      case "gift":
        return HandGift;
      case "food":
        return HandFood;
      default:
        return HandMoney;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.rowOnly}>
          <View style={styles.handMoney}>
            <Image source={renderLogo(type)} style={styles.handMoneyImage} />
          </View>
          <Text>{label}</Text>
        </View>
        <Text style={type === 'income' ? styles.income : styles.expense}>{summary}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e1e1e1",
    border: "1px solid #e1e1e1",
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  rowOnly: {
    flexDirection: "row",
    alignItems: "center",
  },
  income:{
    color: '#43b543'
  },
  expense:{
    color: '#ea6666'
  },
  handMoney: {
    left: 0,
    height: 50,
    width: 100,
  },
  handMoneyImage: {
    height: "100%",
    width: "100%",
  },
});

export default SummaryCard;

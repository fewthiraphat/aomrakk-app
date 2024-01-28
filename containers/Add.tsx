import {
  TextInput,
  Text,
  StyleSheet,
  View,
  Pressable,
  Alert,
  Image,
} from "react-native";
import TypeCard from "../compoennts/TypeCard";
import CategoryCard from "../compoennts/CategoryCard";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { category } from "../types/category";
import PiggyBank from "../assets/piggy-bank.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type SpendingType = {
  label?: string;
  amount?: number;
  category?: category;
  timestamp?: Date;
};
const Add = () => {
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<category>("income" as category);
  const [incomeOrExpense, setIncomeOrExpense] = useState("income");
  const [spending, setSpending] = useState<SpendingType>({});

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage");
      if (jsonValue !== null) {
        const spendingData: SpendingType[] = JSON.parse(jsonValue);
        return spendingData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    getData()
  }, [])

  const storeData = async (value: SpendingType) => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage");
      if (jsonValue !== null) {
        const existingData: SpendingType[] = JSON.parse(jsonValue);
        const newData: SpendingType[] = [...existingData, value];
        await AsyncStorage.setItem("@storage", JSON.stringify(newData));
      } else {
        const newData: SpendingType[] = [value];
        await AsyncStorage.setItem("@storage", JSON.stringify(newData));
      }
    } catch (error) {
      console.log("Error storing data:", error);
    }
  };

  const handleNoteChange = (e: any) => {
    setNote(e);
  };

  const handleIncomeOrExpense = (type: string) => {
    setIncomeOrExpense(type);
  };

  const handleAmountChange = (e: any) => {
    setAmount(e.replace(/[^0-9]/g, ""));
  };

  const handleChangeCategory = (category: category) => {
    setCategory(category);
  };

  const activeCategory = (categoryNow: category) => {
    if (category === categoryNow) {
      return true;
    }
  };

  const handleAddSpending = () => {
    setSpending({
      label: note,
      amount: Number(amount),
      category: category,
      timestamp: new Date(),
    });

    storeData({
      label: note,
      amount: Number(amount),
      category: category,
      timestamp: new Date(),
    }).then(() => {
      setNote("");
      setAmount("");
      setCategory("" as category);
      setIncomeOrExpense("");
      Alert.alert("บันทึกข้อมูลสำเร็จ");
    });
  };
  return (
    <>
      <View style={styles.labelAndTextInput}>
        <Text style={styles.title}>หัวข้อ</Text>
        <TextInput
          value={note}
          style={styles.input}
          onChangeText={(e) => handleNoteChange(e)}
        />
      </View>
      <View style={styles.labelAndTextInput}>
        <Text style={styles.title}>จำนวนเงิน</Text>
        <TextInput
          value={amount}
          style={styles.input}
          onChangeText={(e) => handleAmountChange(e)}
        />
      </View>
      <View style={styles.typeContainer}>
        <Pressable onPress={() => handleIncomeOrExpense("income")}>
          <TypeCard title="รายรับ" active={incomeOrExpense === "income"} />
        </Pressable>
        <Pressable onPress={() => handleIncomeOrExpense("expense")}>
          <TypeCard title="รายจ่าย" active={incomeOrExpense === "expense"} />
        </Pressable>
      </View>
      {incomeOrExpense === "expense" ? (
        <>
          <ScrollView
            style={styles.viewContainer}
            contentContainerStyle={{ paddingBottom: 170 }}
          >
            <View style={styles.categoryContainer}>
              <CategoryCard
                title="อาหาร"
                icon="fast-food-outline"
                onPress={() => handleChangeCategory("food")}
                active={activeCategory("food")}
              />

              <CategoryCard
                title="เครื่องดื่ม"
                icon="cafe-outline"
                onPress={() => handleChangeCategory("drinks")}
                active={activeCategory("drinks")}
              />
              <CategoryCard
                title="เดินทาง"
                icon="bus-outline"
                onPress={() => handleChangeCategory("traffic")}
                active={activeCategory("traffic")}
              />
            </View>
            <View style={styles.categoryContainer}>
              <CategoryCard
                title="บันเทิง"
                icon="game-controller-outline"
                onPress={() => handleChangeCategory("entertain")}
                active={activeCategory("entertain")}
              />
              <CategoryCard
                title="เรียน"
                icon="book-outline"
                onPress={() => handleChangeCategory("study")}
                active={activeCategory("study")}
              />
              <CategoryCard
                title="ของขวัญ"
                icon="gift-outline"
                onPress={() => handleChangeCategory("gift")}
                active={activeCategory("gift")}
              />
            </View>
            <View style={styles.categoryContainer}>
              <CategoryCard
                title="ค่าโทรศัพท์"
                icon="phone-portrait-outline"
                onPress={() => handleChangeCategory("mobile")}
                active={activeCategory("mobile")}
              />
              <CategoryCard
                title="สวยงาม"
                icon="cut-outline"
                onPress={() => handleChangeCategory("beauty")}
                active={activeCategory("beauty")}
              />
              <CategoryCard
                title="เสื้อผ้า"
                icon="shirt-outline"
                onPress={() => handleChangeCategory("shirts")}
                active={activeCategory("shirts")}
              />
            </View>
            <View style={styles.categoryContainer}>
              <CategoryCard
                title="สัตว์เลี้ยง"
                icon="heart-circle-outline"
                onPress={() => handleChangeCategory("pets")}
                active={activeCategory("pets")}
              />
              <CategoryCard
                title="เที่ยว"
                icon="car-outline"
                onPress={() => handleChangeCategory("travel")}
                active={activeCategory("travel")}
              />
              <CategoryCard
                title="ผ่อนชำระ"
                icon="card-outline"
                onPress={() => handleChangeCategory("rent")}
                active={activeCategory("rent")}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={{ width: 200, height: 200, alignSelf: "center" }}>
          <Image
            source={PiggyBank}
            style={{ width: 300, height: 300, alignSelf: "center" }}
          />
        </View>
      )}
      <View style={styles.buttonAddContainer}>
        <Pressable style={styles.buttonAdd} onPress={() => handleAddSpending()}>
          <Text style={styles.textButtonAdd}>เพิ่ม</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Add;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  input: {
    marginTop: 10,
    height: 60,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
  },
  labelAndTextInput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    margin: 12,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 10,
    paddingBottom: 20,
  },
  categoryContainer: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 20,
    marginEnd: 20,
    flexDirection: "row",
    gap: 6,
    justifyContent: "space-between",
  },
  buttonAdd: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "green",
    width: 140,
    height: 60,
    borderRadius: 10,
    padding: 10,
  },
  textButtonAdd: {
    display: "flex",
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
  },
  buttonAddContainer: {
    position: "absolute",
    left: 130,
    bottom: 90,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    // marginTop: 20,
  },
  viewContainer: {
    flex: 1,
  },
});

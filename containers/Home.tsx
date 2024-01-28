import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Image,
  Pressable,
} from "react-native";
import FilterCard from "../compoennts/FilterCard";
import SummaryCard from "../compoennts/SummaryCard/SummaryCard";
import Empty from "../assets/green.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SpendingType } from "./Add";
import React, { useEffect, useState } from "react";
import { category } from "../types/category";
import { filterCardData } from "../data/data";

const Home = () => {
  useEffect(() => {
    spendingData();
  }, []);
  const [data, setData] = useState<SpendingType[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [filter, setFilter] = useState<category>("all");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    spendingData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const spendingData = async () => {
    const data = await AsyncStorage.getItem("@storage");
    if (data != null) {
      const dataSpending = JSON.parse(data);

      setData(dataSpending);
      return dataSpending;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>หมวดหมู่</Text>
      <View style={styles.categoryContainer}>
        <ScrollView horizontal>
          {filterCardData.map((item, index) => (
            <Pressable key={index} onPress={() => setFilter(item.activeWord)}>
              <FilterCard
                icon={item.icon}
                label={item.label}
                active={filter === item.activeWord}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.title}>การใช้จ่ายวันนี้</Text>

      {data.filter((item) => {
        const itemTimestamp = item.timestamp && new Date(item.timestamp);
        const todayTimestamp = new Date();
        if (itemTimestamp && !isNaN(itemTimestamp.getTime())) {
          itemTimestamp.setHours(0, 0, 0, 0);
          todayTimestamp.setHours(0, 0, 0, 0);
          return itemTimestamp.getTime() === todayTimestamp.getTime();
        }
        return false;
      }).length >= 1 ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={
            data &&
            data
              .filter((item) => {
                const itemTimestamp =
                  item.timestamp && new Date(item.timestamp);
                const todayTimestamp = new Date();
                if (itemTimestamp && !isNaN(itemTimestamp.getTime())) {
                  itemTimestamp.setHours(0, 0, 0, 0);
                  todayTimestamp.setHours(0, 0, 0, 0);
                  return itemTimestamp.getTime() === todayTimestamp.getTime();
                }
                return false;
              })
              .sort((a, b) => {
                const timestampA = a.timestamp && new Date(a.timestamp);
                const timestampB = b.timestamp && new Date(b.timestamp);
                return timestampA && timestampB
                  ? timestampB.getTime() - timestampA.getTime()
                  : 0;
              })
              .filter((item) => {
                if (filter !== "all") {
                  return item.category === filter;
                }
                return true;
              })
          }
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <SummaryCard
              label={item.label}
              summary={String(item.amount)}
              type={item.category}
            />
          )}
          contentContainerStyle={styles.summaryContainer}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ width: 200, height: 200, alignSelf: "center" }}>
            <Image
              source={Empty}
              style={{ width: 300, height: 300, alignSelf: "center" }}
            />
            <Text style={styles.text}>วันนี้คุณไม่มีการใช้จ่าย</Text>
            <Text style={styles.text}>บันทึกและร่วมปลูกต้นไม้กัน!</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    padding: 15,
    fontWeight: "bold",
  },
  categoryContainer: {
    display: "flex",
  },
  rowCategoryContainer: {
    flexDirection: "row",
  },
  summary: {
    flexDirection: "row",
  },
  summaryContainer: {
    paddingBottom: 100,
    flexGrow: 1,
  },
  text: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Home;

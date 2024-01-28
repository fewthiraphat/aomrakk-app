import AsyncStorage from "@react-native-async-storage/async-storage";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Button, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { SpendingType } from "./Add";
import SummaryCard from "../compoennts/SummaryCard/SummaryCard";

const Filter = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await AsyncStorage.getItem("@storage");
    if (data != null) {
      const dataSpending = JSON.parse(data);
      setData(dataSpending);
      return dataSpending;
    }
    return null;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [data, setData] = useState<SpendingType[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const setDateStartChange = (event: DateTimePickerEvent, date: Date) => {
    if (event.nativeEvent.timestamp !== 1682922977985) {
      setDateStart(date);
      const {
        type,
        nativeEvent: { timestamp },
      } = event;
    }
  };

  const setDateEndChange = (event: DateTimePickerEvent, date: Date) => {
    if (event.nativeEvent.timestamp !== 1682922977985) {
      setDateEnd(date);
      const {
        type,
        nativeEvent: { timestamp },
      } = event;
    }
  };

  return (
    <>
      <Text style={styles.text}>ประวัติของคุณ</Text>
      <View style={styles.filterDatepicker}>
        <View style={styles.datepickerContainer}>
          <Text style={styles.textDate}>เริ่มต้น</Text>
          <RNDateTimePicker
            value={dateStart}
            mode="date"
            maximumDate={new Date()}
            onChange={setDateStartChange as any}
            positiveButtonLabel="OK!"
          />
        </View>
        <View style={styles.datepickerContainer}>
          <Text style={styles.textDate}>สิ้นสุด</Text>
          <RNDateTimePicker
            value={dateEnd}
            mode="date"
            maximumDate={new Date()}
            onChange={setDateEndChange as any}
            positiveButtonLabel="OK!"
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {data
          .filter((item) => {
            const itemTimestamp = item.timestamp && new Date(item.timestamp);
            const startDate = new Date(dateStart);
            const endDate = new Date(dateEnd);

            if (itemTimestamp && !isNaN(itemTimestamp.getTime())) {
              itemTimestamp.setHours(0, 0, 0, 0);
              startDate.setHours(0, 0, 0, 0);
              endDate.setHours(23, 59, 0, 0);
              return itemTimestamp >= startDate && itemTimestamp <= endDate;
            }
            return false;
          })
          .sort((a, b) => {
            const timestampA = a.timestamp && new Date(a.timestamp);
            const timestampB = b.timestamp && new Date(b.timestamp);
            if (timestampA && timestampB) {
              return timestampB.getTime() - timestampA.getTime();
            }
            return 0;
          })
          .map((item, index) => {
            return (
              <SummaryCard
                label={item.label}
                type={item.category}
                summary={String(item.amount)}
                key={index}
              />
            );
          })}
      </ScrollView>
    </>
  );
};

export default Filter;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    margin: 12,
    fontWeight: "bold",
  },
  filterDatepicker: {
    flexDirection: "row",
  },
  datepickerContainer: {
    flexDirection: "column",
    marginTop: 6,
    marginBottom: 6,
    marginRight: 12,
  },
  textDate: {
    marginLeft: 12,
    fontSize: 18,
    marginBottom: 6,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
});

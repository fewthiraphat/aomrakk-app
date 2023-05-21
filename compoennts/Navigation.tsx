import React from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../containers/Home";
import Add from "../containers/Add";
import Filter from "../containers/Filter";
import Profile from "../containers/Profile";
import { PlantTree } from "../containers/PlantTree";

export default function Navigation() {
  const _renderIcon = (routeName: any, selectedTab: any) => {
    let icon = "";

    switch (routeName) {
      case "หน้าหลัก":
        icon = "ios-home-outline";
        break;
      case "ปลูกต้นไม้":
        icon = "leaf-outline";
        break;
      case "Filter":
        icon = "pie-chart-outline";
        break;
      case "Profile":
        icon = "person-circle-outline";
        break;
    }

    return (
      <Ionicons
        name={icon as any}
        size={25}
        color={routeName === selectedTab ? "black" : "gray"}
      />
    );
  };

  const renderTabBar = ({
    routeName,
    selectedTab,
    navigate,
  }: {
    routeName: string;
    selectedTab: string;
    navigate: any;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="title1"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate("เพิ่มรายการ")}
            >
              <Ionicons name={"cash"} color="green" size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="หน้าหลัก"
          position="LEFT"
          component={() => <Home />}
        />
        <CurvedBottomBarExpo.Screen
          name="ปลูกต้นไม้"
          component={() => <PlantTree />}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
          name="Filter"
          position="LEFT"
          component={() => <Filter />}
        />
        <CurvedBottomBarExpo.Screen
          name="เพิ่มรายการ"
          component={() => <Add />}
          position="CENTER"
        />
        <CurvedBottomBarExpo.Screen
          name="Profile"
          component={() => <Profile />}
          position="RIGHT"
        />
      </CurvedBottomBarExpo.Navigator>

    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
  screen2: {
    flex: 1,
    backgroundColor: "#21a26c",
  },
});

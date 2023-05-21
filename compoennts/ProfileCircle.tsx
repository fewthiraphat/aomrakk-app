import { Image, StyleSheet, Text, View } from "react-native";
import CatProfile from "../assets/cat-profile.png";
import DogProfile from "../assets/dog-profile.png";
import BunnyProfile from "../assets/bunny-profile.png";
import { FC } from "react";

interface ProfileCircleProps {
  animal?: string;
}
const ProfileCircle: FC<ProfileCircleProps> = ({ animal }) => {
  const renderProfile = (animal: string) => {
    if (animal === "แมว") {
      return <Image source={CatProfile} style={styles.image} />;
    }
    if (animal === "หมา") {
      return <Image source={DogProfile} style={styles.image} />;
    }
    if (animal === "กระต่าย") {
      return <Image source={BunnyProfile} style={styles.image} />;
    }
  };
  return <View style={styles.circle}>{animal && renderProfile(animal)}</View>;
};

export default ProfileCircle;

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    width: 150,
    height: 150,
  },

  image: {
    width: "90%",
    height: "120%",
  },
});

import { useState } from "react";
import { View } from "react-native";

import { AddButton } from "./AddButton";
import { AddPopUp } from "./AddPopUp";

export const AddRow = ({ addNewCountable, countables }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenPopup = () => {
    setModalVisible(true);
  };

  const handleClosePopup = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <AddButton
        label={require("../assets/add-icon.png")}
        submit={handleOpenPopup}
      />
      <AddPopUp
        visible={isModalVisible}
        onClose={handleClosePopup}
        addNewCountable={addNewCountable}
        countables={countables}
      />
    </View>
  );
};

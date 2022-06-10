import { Button, Text } from "components";
import React, { memo } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { alertStore } from "./alert.store";
import { styles } from "./styles";

export const AlertModal = memo(() => {
  const store = alertStore();

  return (
    <Modal
      testID={"alert_modal"}
      isVisible={store.isVisible}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.4}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      onModalHide={store.onDismiss}
      onDismiss={store.onDismiss}
      onModalShow={store.onShow}
      onShow={store.onShow}>
      <View style={styles.container}>
        {!store.title ? null : <Text style={styles.title} value={store.title} />}
        <Text style={styles.message} value={store.message} />
        <View style={styles.actionsView}>
          <Button buttonStyle={styles.btAction} title={store.btLeftTitle} onPress={store.btLeftAction} />
          {!store.btRightTitle ? null : (
            <Button
              buttonStyle={[styles.btAction, { marginLeft: 8 }]}
              title={store.btRightTitle}
              onPress={store.btRightAction}
            />
          )}
        </View>
      </View>
    </Modal>
  );
});

AlertModal.displayName = "AlertModal";

import React, { memo, useMemo } from "react";
import { Pressable, Text, View } from "components";
import TaskDemoModel from "models/demo/TaskDemoModel";
import { PressableProps } from "components/shared/pressable/props";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { colorDemoStore } from "stores";

interface Props extends PressableProps {
  data: TaskDemoModel;
}

export const TodoDemoItem = memo((props: Props) => {
  const colors = colorDemoStore().colors;
  const updatedTime = props.data.updatedTime ? moment(props.data.updatedTime).format("H:mm D/M/Y") : undefined;

  const updatedTimeView = useMemo(() => {
    return updatedTime ? (
      <View flexRow alignItems="center" marginTop={5}>
        <Icons name="clock-outline" size={16} />
        <Text flex1 size={16} value={updatedTime} marginLeft={6} />
      </View>
    ) : null;
  }, [updatedTime]);

  return (
    <Pressable {...props}>
      <View flexRow alignItems="center">
        <Icons name="key" size={16} />
        <Text flex1 value={props.data.id} marginLeft={6} />
      </View>
      <View flexRow alignItems="center" marginTop={5}>
        <Icons name="android-messages" size={16} />
        <Text flex1 size={16} value={props.data.des} marginLeft={6} />
      </View>
      {updatedTimeView}
      <View height={1} marginTop={14} backgroundColor={colors.line_01} />
    </Pressable>
  );
});

TodoDemoItem.displayName = "TodoDemoItem";

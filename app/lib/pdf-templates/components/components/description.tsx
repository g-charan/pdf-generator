import { Text, View } from "@react-pdf/renderer";
import { isValidJSON } from "../../utils";
import { EditorContent } from "./editor-content";

export function Description({ content }: { content: string }) {
  const value = isValidJSON(content) ? JSON.parse(content) : null;

  if (!value) {
    return <Text style={{ fontFamily: "Inter", fontSize: 9 }}>{content}</Text>;
  }

  return (
    <View
      style={{
        alignSelf: "flex-start",
        marginTop: -10,
      }}
    >
      <EditorContent content={value} />
    </View>
  );
}

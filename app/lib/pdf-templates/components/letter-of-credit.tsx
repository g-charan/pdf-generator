import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { LetterOfCredit } from "../types";
import { formatCurrencyForPDF } from "../utils";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#fff",
    fontFamily: "Inter",
    fontSize: 12,
    lineHeight: 1.6,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 40,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    width: 80,
    fontWeight: 600,
  },
  value: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      borderStyle: "dashed",
  },
  paragraph: {
    marginBottom: 20,
    marginTop: 20,
  },
  signatureBlock: {
    marginTop: 50,
  },
});

interface Props {
  data: LetterOfCredit;
}

// Helper to replace placeholders
const formatText = (text: string, data: any) => {
  return text.replace(/{(\w+)}/g, (match, key) => {
      if (key === 'amount') {
          return formatCurrencyForPDF({ amount: data[key], currency: data.currency });
      }
    return typeof data[key] !== 'undefined' ? data[key] : match;
  });
}

export function LetterOfCreditTemplate({ data }: Props) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>{data.title}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>{data.fromLabel}</Text>
          <Text>{data.from}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{data.dateLabel}</Text>
          <Text style={styles.value}>{data.date}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{data.toLabel}</Text>
          <Text>{data.to}</Text>
        </View>

         <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.label}>{data.subjectLabel}</Text>
          <Text style={styles.value}>{data.subject}</Text>
        </View>

        <Text style={styles.paragraph}>
          {formatText(data.bodyText1, data)}
        </Text>

        <View style={styles.row}>
            <Text>Drawn under </Text>
            <Text style={[styles.value, { borderBottomStyle: "dashed" }]}>{data.drawnUnder}</Text>
        </View>

        <Text style={styles.paragraph}>
          {formatText(data.bodyText2, data)}
        </Text>

        {data.closingText.split('\n').map((line, i) => (
             <Text key={i} style={{ marginTop: i === 0 ? 20 : 5 }}>{line}</Text>
        ))}

        <View style={styles.signatureBlock}>
          <Text>(Name and signature of the sender)</Text>
          <Text style={{ marginTop: 10 }}>{data.senderName}</Text>
        </View>

        <Text style={{ marginTop: 20 }}>(Name of the organisation)</Text>
         <Text>{data.organizationName}</Text>

      </Page>
    </Document>
  );
}

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CreditReference } from "../types";
import { formatCurrencyForPDF } from "../utils";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#fff",
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#444",
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    width: 150,
  },
  value: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
  },
  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingHorizontal: 4,
    minWidth: 50,
    textAlign: "center",
  },
  paragraph: {
    marginBottom: 15,
    textAlign: "justify",
  },
  signatureBlock: {
    marginTop: 40,
  },
});

interface Props {
  data: CreditReference;
}

// Helper to replace placeholders like {name} with data values
const formatText = (text: string, data: any) => {
  return text.replace(/{(\w+)}/g, (match, key) => {
    if (key === 'amount' || key === 'checkingBalance' || key === 'savingsBalance') {
        return formatCurrencyForPDF({ amount: data[key], currency: data.currency });
    }
    return typeof data[key] !== 'undefined' ? data[key] : match;
  });
}

export function CreditReferenceTemplate({ data }: Props) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subtitle}>
            {data.subtitle}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>{data.date}</Text>
        </View>

        <View style={styles.section}>
          <Text>Att {data.recipientName}</Text>
          <Text>{data.recipientCompany}</Text>
          <Text>{data.recipientAddress}</Text>
        </View>

        <View style={styles.section}>
          <Text>{data.salutation}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.paragraph}>
            {formatText(data.introText, data)}
          </Text>
          <Text style={styles.paragraph}>
            {data.conductText}
          </Text>
          <Text style={styles.paragraph}>
            {data.characterText}
          </Text>
          <Text style={styles.paragraph}>
            {data.conclusionText}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            {data.checkingLabel} <Text style={{ textDecoration: 'underline' }}>{data.checkingAccount}</Text> in the name(s) of <Text style={{ textDecoration: 'underline' }}>{data.subjectName}</Text> opened on <Text style={{ textDecoration: 'underline' }}>{data.checkingDate}</Text> {data.checkingBalanceLabel} <Text style={{ textDecoration: 'underline' }}>{formatCurrencyForPDF({ amount: data.checkingBalance, currency: data.currency })}</Text> as of Date: <Text style={{ textDecoration: 'underline' }}>{data.date}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            {data.savingsLabel} <Text style={{ textDecoration: 'underline' }}>{data.savingsAccount}</Text> in the name(s) of <Text style={{ textDecoration: 'underline' }}>{data.subjectName}</Text> opened on <Text style={{ textDecoration: 'underline' }}>{data.savingsDate}</Text> {data.savingsBalanceLabel} <Text style={{ textDecoration: 'underline' }}>{formatCurrencyForPDF({ amount: data.savingsBalance, currency: data.currency })}</Text> as of Date: <Text style={{ textDecoration: 'underline' }}>{data.date}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            {data.assistanceLabel}
            {"\n"}
            <Text style={{ textDecoration: 'underline' }}>{data.officerContact}</Text>
          </Text>
        </View>

        <View style={styles.signatureBlock}>
          <Text>{data.officerName}</Text>
          <Text style={{ fontStyle: "italic" }}>{data.officerTitle}</Text>
          <Text>Telephone and email {data.officerContact}</Text>
        </View>
      </Page>
    </Document>
  );
}

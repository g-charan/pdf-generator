import { Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import { toZonedTime } from 'date-fns-tz';

interface MetaProps {
  invoiceNo?: string | null;
  issueDate?: string | null;
  dueDate?: string | null;
  invoiceNoLabel: string;
  issueDateLabel: string;
  dueDateLabel: string;
  dateFormat?: string;
  timezone: string;
  title: string;
}

export function Meta({
  invoiceNo,
  issueDate,
  dueDate,
  invoiceNoLabel,
  issueDateLabel,
  dueDateLabel,
  dateFormat = "MM/dd/yyyy",
  timezone,
  title,
}: MetaProps) {
  // Safe helper to format date with timezone
  const formatDate = (dateString: string) => {
    try {
        // Fallback for environment where TZDate might behave differently
      const date = new Date(dateString);
      return format(date, dateFormat);
    } catch {
      return dateString;
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 21, fontWeight: 500, marginBottom: 8 }}>
        {title}
      </Text>
      <View style={{ flexDirection: "column", gap: 4 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 9, fontWeight: 500, marginRight: 2 }}>
            {invoiceNoLabel ? `${invoiceNoLabel}:` : ""}
          </Text>
          <Text style={{ fontSize: 9 }}>{invoiceNo}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 9, fontWeight: 500, marginRight: 2 }}>
            {issueDateLabel ? `${issueDateLabel}:` : ""}
          </Text>
          <Text style={{ fontSize: 9 }}>
            {issueDate ? formatDate(issueDate) : ""}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 9, fontWeight: 500, marginRight: 2 }}>
            {dueDateLabel ? `${dueDateLabel}:` : ""}
          </Text>
          <Text style={{ fontSize: 9 }}>
            {dueDate ? formatDate(dueDate) : ""}
          </Text>
        </View>
      </View>
    </View>
  );
}

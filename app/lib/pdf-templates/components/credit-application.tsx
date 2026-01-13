import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CreditApplication } from "../types";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#fff",
    fontFamily: "Inter",
    fontSize: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  headerLeft: {
     // Logo placeholder styling
     width: 100,
     height: 40,
     backgroundColor: "#ddd",
     justifyContent: "center",
     alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
  },
  headerRight: {
    textAlign: "right",
    fontSize: 7,
  },
  sectionTitle: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 2,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 8,
    fontWeight: 700,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "center",
  },
  fieldLabel: {
    marginRight: 4,
    minWidth: 60,
  },
  fieldValue: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 1,
    minHeight: 12,
  },
  checkboxRow: {
     flexDirection: "row",
     alignItems: "center",
     marginBottom: 4,
  },
  checkbox: {
     width: 10,
     height: 10,
     borderWidth: 1,
     borderColor: "#000",
     marginRight: 4,
  },
  checkboxLabel: {
     marginRight: 15,
  },
  textSmall: {
      fontSize: 6,
      marginTop: 2,
  },
  warningText: {
      color: "red",
      fontSize: 7,
      textAlign: "center",
      marginTop: 2,
      fontWeight: 700,
  },
  footer: {
      marginTop: 20,
      borderTopWidth: 2,
      borderTopColor: "#000",
      paddingTop: 5,
  },
});

interface Props {
  data: CreditApplication;
}

export function CreditApplicationTemplate({ data }: Props) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.headerRow}>
           <View style={styles.headerLeft}>
               <Text style={{fontSize: 8}}>MAHER</Text>
               <Text style={{fontSize: 6}}>TERMINALS</Text>
           </View>
           <View>
               <Text style={styles.headerTitle}>{data.mainTitle}</Text>
           </View>
           <View style={styles.headerRight}>
               <Text style={{fontWeight: 700}}>{data.subTitle}</Text>
               <Text>1210 CORBIN STREET</Text>
               <Text>ELIZABETH, NJ 07201</Text>
               <Text>(908) 527-8200</Text>
           </View>
        </View>

        <View style={styles.row}>
            <Text style={styles.fieldLabel}>{data.firmNameLabel}</Text>
            <View style={styles.fieldValue}><Text>{data.firmName}</Text></View>
        </View>
        <View style={styles.row}>
            <Text style={styles.fieldLabel}>{data.addressLabel}</Text>
            <View style={styles.fieldValue}><Text>{data.address}</Text></View>
        </View>
        <View style={styles.row}>
            <Text style={styles.fieldLabel}>{data.cityLabel}</Text>
            <View style={[styles.fieldValue, {flex: 2}]}><Text>{data.city}</Text></View>
            <Text style={[styles.fieldLabel, {minWidth: 50, marginLeft: 5}]}>{data.stateLabel}</Text>
            <View style={[styles.fieldValue, {flex: 1}]}><Text>{data.state}</Text></View>
            <Text style={[styles.fieldLabel, {minWidth: 40, marginLeft: 5}]}>{data.zipLabel}</Text>
            <View style={[styles.fieldValue, {flex: 1}]}><Text>{data.zip}</Text></View>
        </View>
        <View style={styles.row}>
            <Text style={styles.fieldLabel}>{data.phoneLabel}</Text>
            <View style={[styles.fieldValue, {flex: 1}]}><Text>{data.phone}</Text></View>
            <Text style={[styles.fieldLabel, {minWidth: 30, marginLeft: 5}]}>{data.faxLabel}</Text>
            <View style={[styles.fieldValue, {flex: 1}]}><Text>{data.fax}</Text></View>
        </View>
        <View style={styles.row}>
            <Text style={styles.fieldLabel}>{data.websiteLabel}</Text>
            <View style={styles.fieldValue}><Text>{data.website}</Text></View>
        </View>

        <View style={styles.sectionTitle}>
            <Text>{data.businessInfoTitle}</Text>
        </View>

        <View style={styles.checkboxRow}>
            <Text style={styles.fieldLabel}>*Type of Business:</Text>
            
            <View style={styles.checkbox}></View>
            <Text style={styles.checkboxLabel}>Agent</Text>
            
            <View style={styles.checkbox}></View>
            <Text style={styles.checkboxLabel}>NVOCC</Text>
            
            <View style={styles.checkbox}></View>
            <Text style={styles.checkboxLabel}>Forwarder / Broker</Text>
        </View>
        
        <View style={styles.row}>
             <Text style={styles.fieldLabel}>*A/P Contact Name:</Text>
             <View style={[styles.fieldValue, {flex: 2}]}><Text>{data.apContact}</Text></View>
             <Text style={[styles.fieldLabel, {minWidth: 30, marginLeft: 5}]}>*Title:</Text>
             <View style={[styles.fieldValue, {flex: 1}]}><Text>{data.apTitle}</Text></View>
        </View>

        <View style={styles.row}>
             <Text style={styles.fieldLabel}>{data.phoneLabel}</Text>
             <View style={[styles.fieldValue, {flex: 1}]}></View>
             <Text style={{marginHorizontal: 5}}>Extension:</Text>
             <View style={[styles.fieldValue, {flex: 1}]}></View>
             <Text style={{marginHorizontal: 5}}>{data.faxLabel}</Text>
             <View style={[styles.fieldValue, {flex: 1}]}></View>
        </View>

        <View style={styles.row}>
             <Text style={styles.fieldLabel}>Email Address:</Text>
             <View style={styles.fieldValue}><Text>{data.email}</Text></View>
        </View>
         <View style={styles.row}>
             <Text style={styles.fieldLabel}>*State of Company Registration:</Text>
             <View style={[styles.fieldValue, {flex: 1}]}><Text>{data.companyRegState}</Text></View>
             <Text style={{marginHorizontal: 5}}>*FMC / Brokerage License # :</Text>
             <View style={[styles.fieldValue, {flex: 2}]}></View>
        </View>

        <View style={styles.sectionTitle}>
            <Text>{data.bankInfoTitle}</Text>
        </View>

        <View style={styles.row}>
             <Text style={styles.fieldLabel}>*Name of Bank:</Text>
             <View style={styles.fieldValue}><Text>{data.bankName}</Text></View>
        </View>
         <View style={styles.row}>
             <Text style={styles.fieldLabel}>*Account Number:</Text>
             <View style={styles.fieldValue}><Text>{data.bankAccount}</Text></View>
        </View>
        <View style={styles.row}>
             <Text style={styles.fieldLabel}>{data.addressLabel}</Text>
             <View style={styles.fieldValue}><Text>{data.bankAddress}</Text></View>
        </View>
        <View style={styles.row}>
             <Text style={styles.fieldLabel}>*Contact Person:</Text>
             <View style={[styles.fieldValue, {flex: 1}]}><Text>{data.bankContact}</Text></View>
             <Text style={{marginHorizontal: 5}}>{data.phoneLabel}</Text>
             <View style={[styles.fieldValue, {flex: 1}]}></View>
        </View>
         <View style={styles.row}>
             <Text style={styles.fieldLabel}>Email:</Text>
             <View style={[styles.fieldValue, {flex: 1}]}></View>
             <Text style={{marginHorizontal: 5}}>{data.faxLabel}</Text>
             <View style={[styles.fieldValue, {flex: 1}]}></View>
        </View>
        <Text style={styles.warningText}>***NOTE: PLEASE INCLUDE A LETTER AUTHORIZING MAHER TERMINALS, LLC. TO CONTACT THE BANK REFERENCE TO AVOID PROCESSING DELAYS***</Text>


        <View style={styles.sectionTitle}>
            <Text>{data.tradeReferencesTitle}</Text>
        </View>

        {/* Trade Refs Loop - assuming 3 max for template */}
        {[1, 2, 3].map((i) => (
            <View key={i} style={{marginBottom: 5}}>
                 <View style={styles.row}>
                     <Text style={styles.fieldLabel}>*{i}. Name:</Text>
                     <View style={styles.fieldValue}><Text>{data.tradeReferences?.[i-1]?.name}</Text></View>
                </View>
                <View style={styles.row}>
                     <Text style={styles.fieldLabel}>{data.addressLabel}</Text>
                     <View style={styles.fieldValue}><Text>{data.tradeReferences?.[i-1]?.address}</Text></View>
                </View>
                 <View style={styles.row}>
                    <Text style={styles.fieldLabel}>{data.cityLabel}</Text>
                    <View style={[styles.fieldValue, {flex: 2}]}></View>
                    <Text style={{marginHorizontal: 5}}>{data.stateLabel}</Text>
                    <View style={[styles.fieldValue, {flex: 1}]}></View>
                    <Text style={{marginHorizontal: 5}}>{data.zipLabel}</Text>
                    <View style={[styles.fieldValue, {flex: 1}]}></View>
                </View>
            </View>
        ))}

        <View style={styles.sectionTitle}>
             <Text>{data.agreementTitle}</Text>
        </View>
        <Text style={{fontSize: 6, fontStyle: "italic", textAlign: "center"}}>* Indicates required information</Text>


        <View style={{flexDirection: "row", marginTop: 10, border: "1px solid #000"}}>
            <View style={{width: "40%", padding: 5, borderRight: "1px solid #000"}}>
                <View style={[styles.sectionTitle, {marginTop: 0}]}><Text>FOR MAHER TERMINALS USE ONLY</Text></View>
                <Text>Rec'd By ____________ Date _________</Text>
                {/* Internal use checkboxes */}
            </View>
            <View style={{flex: 1, padding: 5}}>
                <Text style={{marginBottom: 5}}>Please Send completed Credit Application form and other documents email: Credit@maherterminals.com or Fax to: (908) 436-4855</Text>
                <Text style={{fontSize: 7}}>All information obtained is for the sole purpose of establishing credit with Maher Terminals, LLC.</Text>
            </View>
        </View>

        <Text style={{textAlign: "center", marginTop: 10, fontWeight: 700}}>*** In Order to Process Application, Form Must Be Completed In Full ***</Text>
      </Page>
    </Document>
  );
}

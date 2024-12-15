import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { formatAddress } from "../../helpers/formatAddress";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#000",
    padding: 20,
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #000",
    marginBottom: 10,
    paddingBottom: 5,
    fontStyle: "bold",
  },
  dataRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    marginBottom: 5,
    paddingBottom: 5,
  },
  column: {
    flex: 1,
    fontSize: 12,
    textAlign: "left",
    paddingRight: 10,
  },
  headerColumn: {
    flex: 1,
    fontSize: 12,
    fontWeight: 900,
    textAlign: "left",
    paddingRight: 10,
  },

  dateColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    gap: 2,
    fontSize: 12,
    textAlign: "left",
    paddingRight: 10,
  },
  viewer: {
    width: "100vw",
    height: "100vh",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});

function PDFAppointments() {
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("appointments");
    if (storedData) {
      setAppointmentData(JSON.parse(storedData));
    }
  }, []);

  if (!appointmentData) {
    return <Text>Loading...</Text>;
  }
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.headerRow}>
            <Text style={styles.headerColumn}>Date / Time</Text>
            <Text style={styles.headerColumn}>Name</Text>
            <Text style={styles.headerColumn}>Email</Text>
            <Text style={styles.headerColumn}>Address</Text>
          </View>
          {appointmentData.map((appointment, index) => (
            <View key={index} style={styles.dataRow}>
              <View style={styles.dateColumn}>
                <Text>{appointment.date}</Text>
                <Text>{appointment.time}</Text>
              </View>
              <Text style={styles.column}>
                {appointment.firstName} {appointment.lastName}
              </Text>
              <Text style={styles.column}>{appointment.email}</Text>
              <Text style={styles.column}>
                {formatAddress(appointment.address)}
              </Text>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default PDFAppointments;

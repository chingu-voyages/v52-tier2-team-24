import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";


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
            <Text style={styles.column}>Name</Text>
            <Text style={styles.column}>Email</Text>
            <Text style={styles.column}>Address</Text>
            <Text style={styles.column}>Preferred Timeslot</Text>
          </View>
          {appointmentData.map((appointment, index) => (
            <View key={index} style={styles.dataRow}>
              <Text style={styles.column}>{appointment.name}</Text>
              <Text style={styles.column}>{appointment.email}</Text>
              <Text style={styles.column}>{appointment.address}</Text>
              <Text style={styles.column}>{appointment.time}</Text>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default PDFAppointments;

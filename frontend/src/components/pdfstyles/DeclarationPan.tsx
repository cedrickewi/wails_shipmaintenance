import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
// import {Table, TR, TH, TD, } from '@ag-media/react-pdf-table';
import logo from "../../assets/images/logo.png"
import { db } from '../../../wailsjs/go/models';


// Register font (ensure the path is correct)
Font.register({
  family: 'Helvetica',
  src: 'https://fonts.cdnfonts.com/s/31112/Helvetica.woff', // Example URL for Helvetica
});

const cellColor = "#e8edef"

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 10,
    border: '1px solid black',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  cell: {
    flex: 1,
    borderRight: '1px solid black',
    paddingRight: 4,
  },
  lastCell: {
    flex: 1,
    paddingLeft: 4,
  },
  label: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 10,
    fontSize: 8,
    textAlign: 'right',
  },
});

type DeclarationProps = {
  issue: db.LogIssueReport
}

const MaintenanceReportPDF = ({ issue }: DeclarationProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* PAD HEADER */}
      <View style={{ display: "flex", flexDirection: "row", width: "100%", height: "90px", border: "2px solid black", marginBottom: "2px", fontWeight: "bold" }}>
        <View style={{ display: "flex", flex: 1, padding: "8px" }}>
          <Image src={logo} style={{ height: "85px" }}></Image>
        </View>
        <View style={{ display: "flex", flex: 3, flexDirection: "column", borderRight: "1.1px solid black", borderLeft: "1.1px solid black" }}>
          <View style={{ height: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}> <Text>SYSTEME DE MANAGEMENT DE LA QUALITE</Text> </View>
          <View style={{ height: "30px", display: "flex", justifyContent: "center", alignItems: "center", margin: 0, borderTop: "1.1px solid black", borderBottom: "1.1px solid black" }}>
            <Text>DEPARTEMENT LOGISTIQUE MARITIME (DDLM)</Text>
          </View>
          <View style={{ height: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}><Text>MAINTENANCE DE ENGINS NAUTIQUES</Text></View>
        </View>
        <View style={{ display: "flex", flexDirection: "column", flex: 1, padding: "14px", gap: "6px" }}>
          <Text>Version: 01</Text>
          <Text>Date: 07/10/2025</Text>
          <Text>Page: 1 sur 1</Text>
        </View>
      </View>

      {/* DECLARATION DE PANNES */}
      <View style={{ display: "flex", flexDirection: "column", width: "100%", height: "260px", border: "2px solid black", marginBottom: "2px", fontSize: "9px" }}>
        <View style={{ display: "flex", flexDirection: "row", height: "40px", margin: 0, borderBottom: "1.1px solid black" }}>
          <View style={{
            display: "flex", flex: 3, justifyContent: "center", alignItems: "center", textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            height: "100%"
          }}> <Text>DECLARATION DE PANNES</Text> </View>
          <View style={{ display: "flex", flexDirection: "column", flex: 2, margin: 0, borderLeft: "1.1px solid black" }}>
            <View style={{ borderBottom: "1.1px solid black", height: "25px", display: "flex", flexDirection: "row" }}>
              <Text style={{ margin: 0, borderRight: "1.1px solid black", width: "66px", paddingLeft: "3px", backgroundColor: cellColor }}>No Fiche</Text>
              <Text></Text>
            </View>
            <View style={{ height: "25px", display: "flex", flexDirection: "row" }}>
              <Text style={{ margin: 0, borderRight: "1.1px solid black", width: "66px", paddingLeft: "3px", backgroundColor: cellColor }}>Date</Text>
              <Text></Text>
            </View>
          </View>
        </View>

        {/* Nom Engin, type, code engin */}
        <View style={{ display: "flex", flexDirection: "row", height: "30px", margin: 0, borderBottom: "1.1px solid black", width: "100%" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "30%", borderRight: "1.1px solid black" }}>
            <Text>Nom de l'engin</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "28%", borderRight: "1.1px solid black" }}>
            <Text>{issue.ship_name}</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "17%", borderRight: "1.1px solid black" }}>
            <Text>type d'engin</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "17%", borderRight: "1.1px solid black" }}>
            <Text>Code engin</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
        </View>

        {/* Equipement code  */}
        <View style={{ display: "flex", flexDirection: "row", height: "40px", margin: 0, borderBottom: "1.1px solid black", width: "100%" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "30%", borderRight: "1.1px solid black" }}>
            <Text>Equipement</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "28%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "17%", borderRight: "1.1px solid black" }}>
            <Text>Code Equipement</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "17%", borderRight: "1.1px solid black" }}>
            <Text>Etat Equipement</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
        </View>

        {/* Commandant/patron */}
        <View style={{ display: "flex", flexDirection: "row", height: "30px", margin: 0, borderBottom: "1.1px solid black", width: "100%" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "30%", borderRight: "1.1px solid black" }}>
            <Text>Commandant / Patron</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "45%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "17%", borderRight: "1.1px solid black" }}>
            <Text>Visa</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
        </View>

        {/* Chef Mecanicien */}
        <View style={{ display: "flex", flexDirection: "row", height: "25px", margin: 0, borderBottom: "1.1px solid black", width: "100%" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "30%", borderRight: "1.1px solid black" }}>
            <Text>Chef Mecanicien</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "45%", borderRight: "1.1px solid black" }}>
            <Text>{issue.mechanic_name}</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "17%", borderRight: "1.1px solid black" }}>
            <Text>Visa</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
        </View>

        {/* Nature de la panne */}
        <View style={{ display: "flex", flexDirection: "row", height: "35px", margin: 0, borderBottom: "1.1px solid black", width: "100%" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>Nature de la Panne</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "30%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>Localisation de l'engin</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%" }}>
            <Text></Text>
          </View>
        </View>

        {/* Objet de la defaillance */}
        <View style={{ display: "flex", flexDirection: "row", height: "35px", margin: 0, borderBottom: "1.1px solid black", width: "100%" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>Objet de la defaillance</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "80%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
        </View>

        {/* Date Probable apparition */}
        <View style={{ display: "flex", flexDirection: "row", height: "25px", margin: 0, width: "100%" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>Date apparition</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "30%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>Date detection</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%" }}>
            <Text></Text>
          </View>
        </View>
      </View>

      {/* Horos contrôles  */}
      <View style={{ display: "flex", flexDirection: "column", width: "100%", height: "60px", border: "2px solid black", marginBottom: "2px" }}>
        <View style={{ width: "100%", height: "20px", display: "flex", justifyContent: "center", alignItems: "center", borderBottom: "2px solid black", backgroundColor: cellColor }}>
          <Text style={{ textAlign: "center" }}>Horos controles</Text>
        </View>

        {/* information */}
        <View style={{ display: "flex", flexDirection: "row", height: "25px", margin: 0, borderBottom: "1.1px solid black", width: "100%", fontSize: "10px" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "10%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", flexWrap: "wrap", padding: "4px", justifyContent: "center", alignItems: "center", width: "35%", backgroundColor: cellColor, borderRight: "1.1px solid black" }}>
            <Text>Temps de functionnement autre Equipement</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "17%", borderRight: "1.1px solid black" }}>
            <Text>MP babord</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>MP tribord</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "17%", borderRight: "1.1px solid black" }}>
            <Text>GE1/GE</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>GE2</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "10%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
        </View>

        {/* response */}
        <View style={{ display: "flex", flexDirection: "row", height: "15px", margin: 0, width: "100%", fontSize: "10px" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "10%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", flexWrap: "wrap", padding: "4px", justifyContent: "center", alignItems: "center", width: "35%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "17%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "17%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "10%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
        </View>
      </View>

      {/* Detection de la Pannes */}
      <View style={{ display: "flex", flexDirection: "column", width: "100%", height: "280px", border: "2px solid black", marginBottom: "2px" }}>
        <View style={{ width: "100%", height: "20px", display: "flex", justifyContent: "center", alignItems: "center", borderBottom: "2px solid black", backgroundColor: cellColor }}>
          <Text style={{ textAlign: "center" }}>Detection de la Pannes</Text>
        </View>

        {/*Mode de detection */}
        <View style={{ display: "flex", flexDirection: "row", height: "25px", margin: 0, width: "100%", borderBottom: "1.1px solid black" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>Mode de detection</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "30%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>Identification possible ?</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%" }}>
            <Text></Text>
          </View>
        </View>

        {/*Mode de detection */}
        <View style={{ display: "flex", flexDirection: "row", height: "25px", margin: 0, width: "100%", borderBottom: "1.1px solid black" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>Element</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "30%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>Code Element</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%" }}>
            <Text></Text>
          </View>
        </View>

        {/*Mode de detection */}
        <View style={{ display: "flex", flexDirection: "row", height: "25px", margin: 0, width: "100%", borderBottom: "1.1px solid black" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>Organe</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "30%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "20%", borderRight: "1.1px solid black" }}>
            <Text>Code Organe ?</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%" }}>
            <Text></Text>
          </View>
        </View>

        <View style={{ display: "flex", flexDirection: "row", height: "20px", margin: 0, borderBottom: "1.1px solid black", width: "100%", fontSize: "9px" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "10%", borderRight: "1.1px solid black" }}>
            <Text>Incedent ?</Text>
          </View>
          <View style={{ display: "flex", flexWrap: "wrap", padding: "4px", justifyContent: "center", alignItems: "center", width: "10%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "10%", borderRight: "1.1px solid black" }}>
            <Text>No Incident</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "10%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "10%", borderRight: "1.1px solid black" }}>
            <Text>Description</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50%", borderRight: "1.1px solid black" }}>
            <Text>{issue.issue_description}</Text>
          </View>
        </View>
        <View style={{ width: "100%", height: "20px", display: "flex", justifyContent: "center", alignItems: "center", borderBottom: "1.1px solid black", backgroundColor: cellColor }}>
          <Text style={{ textAlign: "center" }}>Cause Probale</Text>
        </View>
        <View style={{ width: "100%", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", borderBottom: "1.1px solid black" }}>
          <Text style={{ textAlign: "left" }}></Text>
        </View>
        <View style={{ width: "100%", height: "20px", display: "flex", justifyContent: "center", alignItems: "center", borderBottom: "1.1px solid black", backgroundColor: cellColor }}>
          <Text style={{ textAlign: "center" }}>Consequences de la Panne</Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row", height: "25px", margin: 0, width: "100%", borderBottom: "1.1px solid black" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "35%", borderRight: "1.1px solid black" }}>
            <Text>Necessite d'immobiliser L'engin</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "15%", borderRight: "1.1px solid black" }}>
            <Text></Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "35%", borderRight: "1.1px solid black" }}>
            <Text>Niveau de gravite</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "15%" }}>
            <Text></Text>
          </View>
        </View>
        <View style={{ width: "100%", height: "20px", display: "flex", justifyContent: "center", alignItems: "center", borderBottom: "1.1px solid black", backgroundColor: cellColor }}>
          <Text style={{ textAlign: "center" }}>Proposer solutions</Text>
        </View>
        <View style={{ width: "100%", height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ textAlign: "left" }}></Text>
        </View>
      </View>

      {/* Signatures */}
      <View style={{ display: "flex", flexDirection: "column", width: "100%", height: "100px", border: "2px solid black", marginBottom: "2px" }}>
        <View style={{ display: "flex", flexDirection: "row", height: "20px", margin: 0, width: "100%", borderBottom: "1.1px solid black" }}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: "3px", backgroundColor: cellColor, width: "35%", borderRight: "1.1px solid black" }}>
            <Text>CHEF S.M.E.N</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "35%", backgroundColor: cellColor, borderRight: "1.1px solid black" }}>
            <Text>CHEF DE BUREAU MAINTENANCE</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: cellColor, width: "35%", borderRight: "1.1px solid black" }}>
            <Text>EMETTEUR</Text>
          </View>
        </View>
      </View>

    </Page>
  </Document>
);

export default MaintenanceReportPDF;

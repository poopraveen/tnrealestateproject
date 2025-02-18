import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Define the styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  container: {
    marginBottom: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
});

// The SaleDeed component that renders the agreement
const SaleDeed = ({ data }: { data: any }) => {
  const { personalDetails, contactDetails, propertyPreferences, financialDetails, propertyHistory, additionalInfo } = data;

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>SALE DEED AGREEMENT</Text>

        {/* Personal Details */}
        <View style={styles.container}>
          <Text style={styles.subHeader}>Personal Details</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>First Name: {personalDetails.firstName}</Text>
              <Text style={styles.text}>Last Name: {personalDetails.lastName}</Text>
              <Text style={styles.text}>Date of Birth: {personalDetails.dob}</Text>
              <Text style={styles.text}>Gender: {personalDetails.gender}</Text>
            </View>
          </View>
        </View>

        {/* Contact Details */}
        <View style={styles.container}>
          <Text style={styles.subHeader}>Contact Details</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Phone: {contactDetails.phone}</Text>
              <Text style={styles.text}>Email: {contactDetails.email}</Text>
              <Text style={styles.text}>Address: {contactDetails.address}</Text>
              <Text style={styles.text}>Preferred Contact: {contactDetails.preferredContact}</Text>
            </View>
          </View>
        </View>

        {/* Property Preferences */}
        <View style={styles.container}>
          <Text style={styles.subHeader}>Property Preferences</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Property Type: {propertyPreferences.type}</Text>
              <Text style={styles.text}>Budget Min: {propertyPreferences.budgetMin}</Text>
              <Text style={styles.text}>Budget Max: {propertyPreferences.budgetMax}</Text>
              <Text style={styles.text}>Location: {propertyPreferences.location}</Text>
              <Text style={styles.text}>Desired Features: {propertyPreferences.desiredFeatures}</Text>
            </View>
          </View>
        </View>

        {/* Financial Details */}
        <View style={styles.container}>
          <Text style={styles.subHeader}>Financial Details</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Employment Status: {financialDetails.employmentStatus}</Text>
              <Text style={styles.text}>Income: {financialDetails.income}</Text>
              <Text style={styles.text}>Down Payment: {financialDetails.downPayment}</Text>
              <Text style={styles.text}>Credit Score: {financialDetails.creditScore}</Text>
            </View>
          </View>
        </View>

        {/* Property History */}
        <View style={styles.container}>
          <Text style={styles.subHeader}>Property History</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Current Housing: {propertyHistory.currentHousing}</Text>
              <Text style={styles.text}>Reason for Moving: {propertyHistory.reasonForMoving}</Text>
              <Text style={styles.text}>Previous Agent: {propertyHistory.previousAgent}</Text>
            </View>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.container}>
          <Text style={styles.subHeader}>Additional Information</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Referral Source: {additionalInfo.referralSource}</Text>
              <Text style={styles.text}>Marketing Consent: {additionalInfo.marketingConsent ? 'Yes' : 'No'}</Text>
            </View>
          </View>
        </View>

        {/* Terms Agreement */}
        <View style={styles.container}>
          <Text style={styles.subHeader}>Terms Agreement</Text>
          <Text style={styles.text}>Agreement: {data.termsAgreement ? 'Agreed' : 'Not Agreed'}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default SaleDeed;

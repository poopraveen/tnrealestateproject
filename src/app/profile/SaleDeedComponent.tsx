import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';

const SaleDeed = ({ data }: {data: any}) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
    },
    header: {
      flexDirection: 'row',
      backgroundColor: '#f8b400', // Golden color for the header
      color: '#ffffff',
      padding: '10px',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      alignItems: 'center',
    },
    logo: {
      width: 50, // Adjust logo size
      height: 50,
      marginRight: 15, // Space between logo and text
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    footer: {
      backgroundColor: '#f8b400', // Golden color for the footer
      color: '#ffffff',
      padding: '10px',
      textAlign: 'center',
      fontSize: 12,
      position: 'absolute',
      bottom: 30,
      left: 30,
      right: 30,
    },
    section: {
      marginBottom: 15,
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333333', // Dark gray for section headings
    },
    text: {
      fontSize: 12,
      color: '#555555', // Lighter gray for text
    },
    goldenStrip: {
      backgroundColor: '#d4af37', // Rich gold color for the strips
      height: 5,
      marginBottom: 10,
    },
    boldText: {
      fontWeight: 'bold',
      fontSize: 12,
    },
    content: {
      fontSize: 12,
    },
    termsSection: {
      marginTop: 20,
      marginBottom: 20,
    },
    termsHeading: {
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 5,
    },
    termsText: {
      fontSize: 12,
      color: '#555555',
      lineHeight: 1.6,
    },
  });

  const safeGet = (obj: any, path: any, defaultValue = 'N/A') => {
    return path.split('.').reduce((acc: any, part: any) => acc && acc[part] ? acc[part] : defaultValue, obj);
  };

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image style={styles.logo} src="/icons/web-app-manifest-512x512.png" /> {/* Replace with actual logo path */}
          <Text style={styles.headerText}>Sale Deed Agreement</Text>
        </View>

        {/* Personal Details Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Personal Details</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>First Name:</Text> {safeGet(data, 'personalDetails.firstName')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Last Name:</Text> {safeGet(data, 'personalDetails.lastName')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Date of Birth:</Text> {safeGet(data, 'personalDetails.dob')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Gender:</Text> {safeGet(data, 'personalDetails.gender')}</Text>
        </View>

        {/* Contact Details Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Contact Details</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>Phone:</Text> {safeGet(data, 'contactDetails.phone')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Email:</Text> {safeGet(data, 'contactDetails.email')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Address:</Text> {safeGet(data, 'contactDetails.address')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Preferred Contact:</Text> {safeGet(data, 'contactDetails.preferredContact')}</Text>
        </View>

        {/* Property Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Property Preferences</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>Type:</Text> {safeGet(data, 'propertyPreferences.type')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Min Budget:</Text> {safeGet(data, 'propertyPreferences.budgetMin')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Max Budget:</Text> {safeGet(data, 'propertyPreferences.budgetMax')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Location:</Text> {safeGet(data, 'propertyPreferences.location')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Desired Features:</Text> {safeGet(data, 'propertyPreferences.desiredFeatures')}</Text>
        </View>

        {/* Financial Details Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Financial Details</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>Employment Status:</Text> {safeGet(data, 'financialDetails.employmentStatus')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Income:</Text> {safeGet(data, 'financialDetails.income')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Down Payment:</Text> {safeGet(data, 'financialDetails.downPayment')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Credit Score:</Text> {safeGet(data, 'financialDetails.creditScore')}</Text>
        </View>

        {/* Property History Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Property History</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>Current Housing:</Text> {safeGet(data, 'propertyHistory.currentHousing')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Reason for Moving:</Text> {safeGet(data, 'propertyHistory.reasonForMoving')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Previous Agent:</Text> {safeGet(data, 'propertyHistory.previousAgent')}</Text>
        </View>

        {/* Additional Info Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Additional Information</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>Referral Source:</Text> {safeGet(data, 'additionalInfo.referralSource')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Marketing Consent:</Text> {safeGet(data, 'additionalInfo.marketingConsent') ? 'Yes' : 'No'}</Text>
        </View>

        {/* Terms and Conditions Section */}
        <View style={styles.termsSection}>
          <Text style={styles.termsHeading}>Terms and Conditions</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.termsText}>
            1. This Sale Deed Agreement is executed as per the provisions of the Indian Contract Act, 1872.
            {'\n'}2. The Buyer has inspected the property and is satisfied with the condition of the same.
            {'\n'}3. The Seller hereby transfers the property rights to the Buyer for the agreed consideration amount.
            {'\n'}4. The Buyer agrees to pay the full sale consideration as per the terms agreed upon, and the Sale Deed will be executed after the payment is made.
            {'\n'}5. The Buyer shall not transfer or assign the property without the consent of the Seller.
            {'\n'}6. Any dispute arising between the Buyer and Seller shall be resolved as per the jurisdiction of the court in [State Name].
            {'\n'}7. This Agreement shall be binding and enforceable once signed by both parties.
          </Text>
        </View>

        {/* Terms and Agreement Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Terms Agreement</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>Agreed:</Text> {safeGet(data, 'termsAgreement') ? 'Yes' : 'No'}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Sale Deed Agreement - Customer Copy</Text>
        </View>
      </Page>
    </Document>
  );
};

export default SaleDeed;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page, Text, View, StyleSheet, pdf, Image, Font } from '@react-pdf/renderer';
Font.register({
  family: 'Thendral',
  src: '/tamilfont.ttf', // Use the URL of the font
});

const SaleDeed = ({ data }: { data: any }) => {
  const { t, i18n } = useTranslation();
  // Register the Tamil font (Noto Sans Tamil)

  const fontFamily = i18n.language === 'ta' ? 'Thendral' : 'Helvetica';
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily,
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
    signatureContainer: {
      marginTop: 40,
      textAlign: 'center',
    },
    signatureText: {
      fontSize: 14,
      fontStyle: 'italic',
      marginBottom: 10,
    },
    signatureImage: {
      width: 150,
      height: 60,
    },
     // New styles for profile image and initials
     profileImageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end', // Align the profile image to the right
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25, // Circle shape
      marginLeft: 10, // Space between text and image
    },
    profileInitials: {
      width: 50,
      height: 50,
      borderRadius: 25, // Circle shape
      backgroundColor: '#cccccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 18,
      color: '#ffffff',
      fontWeight: 'bold',
    },
  });
  const safeGet = (obj: any, path: any, defaultValue = 'N/A') => {
    return path.split('.').reduce((acc: any, part: any) => acc && acc[part] ? acc[part] : defaultValue, obj);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return (firstName[0] || '') + (lastName[0] || '');
  };

  const profileImage = safeGet(data, 'personalDetails.imageUrl');
  const firstName = safeGet(data, 'personalDetails.firstName');
  const lastName = safeGet(data, 'personalDetails.lastName');

 
  return (
    <Document>
      <Page style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image style={styles.logo} src="/icons/web-app-manifest-512x512.png" /> {/* Replace with actual logo path */}
          <Text style={styles.headerText}>{t('Sale Deed Agreement')}</Text>
        </View>

        {/* Personal Details Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>{t('Personal Details')}</Text>
          <View style={styles.goldenStrip}></View>
          
         {/* Profile Image or Initials */}
         <View style={styles.profileImageContainer}>
            {profileImage ? (
              <Image style={styles.profileImage} src={profileImage} />
            ) : (
              <View style={styles.profileInitials}>
                <Text>{getInitials(firstName, lastName)}</Text>
              </View>
            )}
          </View>

          <Text style={styles.text}><Text style={styles.boldText}>{t('First Name')}:</Text> {firstName}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Last Name')}:</Text> {lastName}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Date of Birth')}:</Text> {safeGet(data, 'personalDetails.dob')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Gender')}:</Text> {safeGet(data, 'personalDetails.gender')}</Text>
        </View>

        {/* Contact Details Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>{t('Contact Details')}</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Phone')}:</Text> {safeGet(data, 'contactDetails.phone')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Email')}:</Text> {safeGet(data, 'contactDetails.email')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Address')}:</Text> {safeGet(data, 'contactDetails.address')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Preferred Contact')}:</Text> {safeGet(data, 'contactDetails.preferredContact')}</Text>
        </View>

        {/* Property Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>{t('Property Preferences')}</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Type')}:</Text> {safeGet(data, 'propertyPreferences.type')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Min Budget')}:</Text> {safeGet(data, 'propertyPreferences.budgetMin')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Max Budget')}:</Text> {safeGet(data, 'propertyPreferences.budgetMax')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Location')}:</Text> {safeGet(data, 'propertyPreferences.location')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Desired Features')}:</Text> {safeGet(data, 'propertyPreferences.desiredFeatures')}</Text>
        </View>

        {/* Financial Details Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>{t('Financial Details')}</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Employment Status')}:</Text> {safeGet(data, 'financialDetails.employmentStatus')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Income')}:</Text> {safeGet(data, 'financialDetails.income')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Down Payment')}:</Text> {safeGet(data, 'financialDetails.downPayment')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Credit Score')}:</Text> {safeGet(data, 'financialDetails.creditScore')}</Text>
        </View>

        {/* Property History Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>{t('Property History')}</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Current Housing')}:</Text> {safeGet(data, 'propertyHistory.currentHousing')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Reason for Moving')}:</Text> {safeGet(data, 'propertyHistory.reasonForMoving')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Previous Agent')}:</Text> {safeGet(data, 'propertyHistory.previousAgent')}</Text>
        </View>

        {/* Additional Info Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>{t('Additional Information')}</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Referral Source')}:</Text> {safeGet(data, 'additionalInfo.referralSource')}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Marketing Consent')}:</Text> {safeGet(data, 'additionalInfo.marketingConsent') ? t('Yes') : t('No')}</Text>
        </View>

        {/* Terms and Conditions Section */}
        <View style={styles.termsSection}>
          <Text style={styles.termsHeading}>{t('Terms and Conditions')}</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.termsText}>
            1. {t('SaleDeedAgreement.provisionsIndianContractAct')}{'\n'}
            2. {t('SaleDeedAgreement.buyerInspectedProperty')}{'\n'}
            3. {t('SaleDeedAgreement.sellerTransfersRights')}{'\n'}
            4. {t('SaleDeedAgreement.buyerAgreesToPay')}{'\n'}
            5. {t('SaleDeedAgreement.buyerNotTransferProperty')}{'\n'}
            6. {t('SaleDeedAgreement.disputeResolution')}{'\n'}
            7. {t('SaleDeedAgreement.bindingAgreement')}
          </Text>
        </View>

        {/* Terms Agreement Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>{t('Terms Agreement')}</Text>
          <View style={styles.goldenStrip}></View>
          <Text style={styles.text}><Text style={styles.boldText}>{t('Agreed')}:</Text> {safeGet(data, 'termsAgreement') ? t('Yes') : t('No')}</Text>
        </View>

        {/* <View style={styles.signatureContainer}>
          <Text style={styles.signatureText}>Signed by:</Text>
          <Text style={styles.signatureText}>_________</Text> 
          <Text style={styles.signatureText}>Seller/Buyer Name</Text>
        </View> */}


        {/* Footer */}
        <View style={styles.footer}>
          <Text>{t('Sale Deed Agreement - Customer Copy')}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default SaleDeed;

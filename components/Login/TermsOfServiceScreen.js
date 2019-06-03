// @flow

import React from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView
} from "react-native";

import styles from "../../styles/login/privacy";
import i18n from "../../i18n";
import GreenHeader from "../GreenHeader";

type Props = {
  navigation: any
}

const TermsOfServiceScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <SafeAreaView style={styles.safeViewTop} />
    <SafeAreaView style={styles.safeView}>
      <GreenHeader navigation={navigation} header={i18n.t( "inat_signup.terms" )} />
      <ScrollView contentContainerStyle={styles.textContainer}>
        <Text style={styles.text}>
          {/* {"Last Modified on June 16, 2016\r\n\r\nWelcome to the iNaturalist.org website. The following terms and conditions of use, in conjunction with the Terms and Conditions of Use of the California Academy of Sciences website, available at http://www.calacademy.org/terms-of-use, govern all use of the California Academy of Sciences’ iNaturalist.org website, all related applications, and all content, services and products available at or through the website (collectively, the "Website"). The Website is owned and operated by the California Academy of Sciences (the "Academy"). The Website is offered subject to your acceptance without modification of all of the terms and conditions contained herein and all other operating rules, policies (including, without limitation, the privacy policy) and procedures that may be published from time to time on this Site by iNaturalist and by the Academy (collectively, the “Agreement”).\r\n\r\nPlease read this Agreement carefully before accessing or using the Website. By accessing or using any part of the Website, each user ("You", "Your" or "User") agree to the terms and conditions of this Agreement. If You do not agree to all the terms and conditions of this Agreement, You should not access the Website or use any services made available via the Website. The Website is available only to individuals who are at least 13 years old.\r\n\r\nYour iNaturalist.org Account and Site. If You create an account on the Website, You are responsible for maintaining the security of Your account, and You are fully responsible for all activities that occur under the account and any other actions taken in connection with the account. You must not post content to Your account in a misleading or unlawful manner, including in a manner intended to trade on the name or reputation of others. iNaturalist may, at its discretion, change or remove any description or keyword that it considers inappropriate or unlawful. You must immediately notify iNaturalist of any unauthorized uses of Your account or any other breaches of security. iNaturalist will not be liable for any acts or omissions by You, including any damages of any kind incurred as a result of such acts or omissions.\r\n\r\nResponsibility of Contributors. If You post material to the Website, or otherwise make (or allow any third party to make) material available by means of the Website (any such material, “Content”), You are entirely responsible for the content of, and any harm resulting from, that Content. That is the case regardless of whether the Content in question constitutes text, graphics, an audio file, or computer software. By making Content available, You represent and warrant that:\r\n\r\nthe Content does not contain or install any viruses, worms, malware, Trojan horses or other harmful or destructive content;\r\n\r\nthe Content is not spam, is not machine- or randomly-generated, and does not contain unethical or unwanted commercial content designed to drive traffic to third party sites or boost the search engine rankings of third party sites, or to further unlawful acts (such as phishing) or mislead recipients as to the source of the material (such as spoofing);\r\n\r\nthe Content is not libelous or defamatory, does not contain threats or incite violence towards individuals or entities, and does not violate the privacy or publicity rights of any third party;\r\n\r\nYour login is not named in a manner that misleads Your readers into thinking that You are another person or company. For example, Your login name is not the name of a person other than Yourself or company other than Your own;\r\n\r\nYour content is not getting advertised via unwanted electronic messages such as spam links on newsgroups, email lists, journals and web sites, and similar unsolicited promotional methods.\r\n\r\nBy submitting Content to iNaturalist for inclusion on the Website, You grant iNaturalist a world-wide, royalty-free, and non-exclusive license to reproduce, modify, adapt and publish the Content solely for the purpose of displaying, distributing and promoting Your observations and journal. You represent and warrant that (a) You own and control all of the rights to the Content that You post or you otherwise have the right to post such Content to the Site; (b) the Content is accurate and not misleading; and (c) use and posting of the Content You supply does not violate these Terms of Use and will not violate any rights of or cause injury to any person or entity. If You delete Content, iNaturalist will use reasonable efforts to remove it from the Website, but You acknowledge that caching or references to the Content may not be made unavailable immediately.  \r\n\r\nWithout limiting any of those representations or warranties, iNaturalist has the right (though not the obligation), in iNaturalist’s sole discretion, to terminate or deny access to and use of the Website to any individual or entity for any reason. In the event of any such termination, iNaturalist will have no obligation to provide a refund of any amounts previously paid.\r\n\r\nResponsibility of Website Visitors. iNaturalist has not reviewed, and cannot review, all of the material, including computer software, posted to the Website, and cannot therefore be responsible for that material’s content, use or effects. By operating the Website, iNaturalist does not represent or imply that it endorses the material posted to the Website, or that it believes such material to be accurate, useful or non-harmful. You are responsible for taking precautions as necessary to protect Yourself and Your computer systems from viruses, worms, Trojan horses, and other harmful or destructive content. The Website may contain content that is offensive, indecent, or otherwise objectionable, as well as content containing technical inaccuracies, typographical mistakes, and other errors. The Website may also contain material that violates the privacy or publicity rights, or infringes the intellectual property and other proprietary rights, of third parties, or the downloading, copying or use of which is subject to additional terms and conditions, stated or unstated. iNaturalist disclaims any responsibility for any harm resulting from the use by visitors of the Website, or from any downloading by those visitors of content posted to the Website.\r\n\r\nNon-Commercial Use. You agree not to use the Website or the iNaturalist Service for commercial purpose without prior authorization which may be withheld in Academy’s sole discretion, or for any illegal, unlawful, inappropriate or unauthorized purpose or activity. You further agree not to threaten, abuse, solicit, spam, harass, stalk, impersonate or intimidate other iNaturalist Users and not to collect or store any location or other personal information about any iNaturalist Users that You obtain from the Website.\r\n\r\nContent Posted on Other Websites. We have not reviewed, and cannot review, all of the material, including computer software, made available through the websites and webpages to which iNaturalist.org links, and that link to iNaturalist.org. iNaturalist does not have any control over those non-iNaturalist websites and webpages, and is not responsible for their contents or their use. By providing a link to a non-iNaturalist website or webpage, iNaturalist does not represent or imply that it endorses such website or webpage. You are responsible for taking precautions as necessary to protect Yourself and Your computer systems from viruses, worms, Trojan horses, and other harmful or destructive content. iNaturalist disclaims any responsibility for any harm resulting from Your use of non-iNaturalist websites and webpages.\r\n\r\nCopyright Infringement and DMCA Policy.  iNaturalist respects the intellectual property rights of others, and requests that users of the iNaturalist Website and Service do the same. All content, including copyrightable works, trademarks, service marks, and patentable inventions, on the iNaturalist Website are the property of iNaturalist and Academy, or other iNaturalist users.\r\n\r\nIf You believe that Your work has been copied on the Website in a way that constitutes copyright infringement, please provide iNaturalist’s Copyright Agent with the information specified below in the form of a “Notification of Alleged Infringement.” It is iNaturalist’s policy to respond to clear Notifications of Alleged Infringement, and our policy is designed to make submitting Notifications of Alleged Infringement as straightforward as possible while reducing the number of Notifications that we receive that are fraudulent or difficult to understand or verify. If You are concerned about the removal of or blocked access to your content, please provide iNaturalist’s Copyright Agent with a “Counter-Notification.” The process specified below is consistent with that provided under the Digital Millennium Copyright Act (the “DMCA”) (the text of which can be found at the U.S. Copyright Office Website at http://www.copyright.gov).\r\n\r\nDMCA Notification of Alleged Copyright InfringementIf You would like to submit a claim of copyright infringement, please substantiate each claim by sending iNaturalist’s registered Copyright Agent a Notification of Claimed Infringement at the email or mailing address below:\r\n\r\nCopyright Agent\r\n\r\nLegal Manager\r\n\r\nCalifornia Academy of Sciences \r\n\r\niNaturalist\r\n\r\n55 Music Concourse Drive\r\n\r\nSan Francisco, California 94118\r\n\r\nlegal@calacademy.org\r\n\r\nDetail of what an effective Notification of Alleged Infringement must include is available at the U.S. Copyright Office Website at http://www.copyright.gov.\r\n\r\nDMCA Counter-notification\r\n\r\nIf You elect to submit a Counter-Notification, please send the iNaturalist registered Copyright Agent a Counter Notification at the email or mailing address below:\r\n\r\nCopyright Agent\r\n\r\nLegal Manager\r\n\r\nCalifornia Academy of Sciences \r\n\r\niNaturalist\r\n\r\n55 Music Concourse Drive\r\n\r\nSan Francisco, California 94118\r\n\r\nlegal@calacademy.org\r\n\r\nDetail of what an effective Counter-Notification must include is available at the U.S. Copyright Office Website at http://www.copyright.gov.\r\n\r\niNaturalist will respond to all such notices, including as required or appropriate by removing the infringing material or disabling all links to the infringing material. In the case of a visitor who may infringe or repeatedly infringes the copyrights or other intellectual property rights of iNaturalist or others, iNaturalist may, in its discretion, terminate or deny access to and use of the Website. In the case of such termination, iNaturalist will have no obligation to provide a refund of any amounts previously paid to iNaturalist.\r\n\r\nIntellectual Property. This Agreement does not transfer to You any iNaturalist or third party intellectual property, and all right, title and interest in and to such property will remain (as between the parties) solely with iNaturalist. All trademarks, service marks, graphics and logos used in connection with iNaturalist.org, or the Website are trademarks or registered trademarks of iNaturalist and the Academy, or iNaturalist’s licensors. Other trademarks, service marks, graphics and logos used in connection with the Website may be the trademarks of other third parties. Your use of the Website grants You no right or license to reproduce or otherwise use any iNaturalist or third-party trademarks.\r\n\r\nChanges. iNaturalist reserves the right, at its sole discretion, to modify or replace any part of this Agreement. It is Your responsibility to check this Agreement periodically for changes. Notice of material changes to these Terms and Conditions of Use will be posted at the beginning of these Terms and Conditions of Use. Your continued use of or access to the Website following the posting of any changes to this Agreement constitutes acceptance of those changes. iNaturalist may also, in the future, offer new services and/or features through the Website (including, the release of new tools and resources). Such new features and/or services shall be subject to the terms and conditions of this Agreement. \r\n\r\nTermination. iNaturalist may terminate Your access to all or any part of the Website at any time, with or without cause, with or without notice, effective immediately. If You wish to terminate this Agreement or Your iNaturalist.org account, You may simply discontinue using the Website. All provisions of this Agreement which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.\r\n\r\nDisclaimer of Warranties. The Website is provided “as is.” iNaturalist and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement. Neither iNaturalist nor its suppliers and licensors makes any warranty that the Website will be error free or that access thereto will be continuous or uninterrupted. You understand that You download from, or otherwise obtain content or services through, the Website at Your own discretion and risk.\r\n\r\nLimitation of Liability. In no event will iNaturalist, or its suppliers or licensors be liable with respect to any subject matter of this Agreement under any contract, negligence, strict liability or other legal or equitable theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement or substitute products or services; (iii) for interruption of use or loss or corruption of data; or (iv) for any amounts that exceed the fees paid by You to iNaturalist under this Agreement during the twelve (12) month period prior to the cause of action. iNaturalist shall have no liability for any failure or delay due to matters beyond their reasonable control. The foregoing shall not apply to the extent prohibited by applicable law.\r\n\r\nGeneral Representation and Warranty. You represent and warrant that (i) your use of the Website will be in strict accordance with the iNaturalist Privacy Policy, with this Agreement and with all applicable laws and regulations (including without limitation any local laws or regulations in Your country, state, city, or other governmental area, regarding online conduct and acceptable content, and including all applicable laws regarding the transmission of technical data exported from the United States or the country in which You reside) and (ii) Your use of the Website will not infringe or misappropriate the intellectual property rights of any third party.\r\n\r\nIndemnification. You agree to indemnify and hold harmless iNaturalist, the Academy, their contractors, and licensors, and their respective directors, officers, employees and agents from and against any and all claims and expenses, including attorneys’ fees, arising out of Your use of the Website, including but not limited to Your violation this Agreement.\r\n\r\nOpen Source. You agree to indemnify and hold harmless iNaturalist, its code contributors, its contractors, and its licensors, and their respective directors, officers, employees and agents from and against any and all claims and expenses, including attorneys’ fees, arising out of the publishing of iNaturalist's source code or the acceptance of code contributions from outside parties.\r\n\r\nMiscellaneous. This Agreement constitutes the entire agreement between iNaturalist and You concerning the subject matter hereof, and may be modified only by a written amendment signed by an authorized executive of iNaturalist or Academy, or by the posting by iNaturalist of a revised version of these Terms and Conditions of Use. Except to the extent applicable law, if any, provides otherwise, this Agreement, any access to or use of the Website will be governed by the laws of the state of California, U.S.A., excluding its conflict of law provisions, and the proper venue for any disputes arising out of or relating to any of the same will be the state and federal courts located within 60 miles of San Francisco, California. The prevailing party in any action or proceeding to enforce this Agreement shall be entitled to costs and attorneys’ fees. If any part of this Agreement is held invalid or unenforceable, that part will be construed to reflect the parties’ original intent, and the remaining portions will remain in full force and effect. A waiver by either party of any term or condition of this Agreement or any breach thereof, in any one instance, will not waive such term or condition or any subsequent breach thereof. You may not assign Your rights under this Agreement; iNaturalist may assign its rights under this Agreement without condition. This Agreement will be binding upon and will inure to the benefit of the parties, their successors and permitted assigns."} */}
        </Text>
      </ScrollView>
    </SafeAreaView>
  </View>
);

export default TermsOfServiceScreen;

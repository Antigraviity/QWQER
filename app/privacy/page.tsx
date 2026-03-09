import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white text-gray-900 selection:bg-[#ee3425] selection:text-white" data-blog-detail="true">
            <style dangerouslySetInnerHTML={{ __html: `nav:not([style*="border-radius: 9999px"]) { background-color: rgba(0,0,0,0.85) !important; }` }} />
            <Navbar />

            <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-14">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <div className="w-20 h-1 bg-[#ee3425] rounded-full mb-4" />
                    <p className="text-sm text-gray-400">Last updated: February 2026</p>
                </div>

                {/* Content */}
                <div className="space-y-10">

                    <section>
                        <p className="text-[15px] text-gray-600 leading-[1.85]">
                            This Privacy Policy (&quot;Policy&quot;) describes the policies and procedures on the collection, use, disclosure and protection of your information when you use our website located at qwqer.in or the QWQER mobile application (collectively, &quot;QWQER Platform&quot;) made available by QWY Technologies Private Limited (&quot;QWQER&quot;, &quot;QWY&quot;, &quot;Company&quot;, &quot;We&quot;, &quot;Us&quot; and &quot;Our&quot;), a private company established under the laws of India having its registered office at 1st Floor, Anthill IQ, Cunningham Road, Vasanth Nagar, Bengaluru, Karnataka 560052.
                        </p>
                        <p className="text-[15px] text-gray-600 leading-[1.85] mt-4">
                            The terms &quot;You&quot; and &quot;Your&quot; refer to the user of the QWQER Platform. The term &quot;Services&quot; refers to any services offered by QWQER whether on the QWQER Platform or otherwise. Please read this Policy before using the QWQER Platform or submitting any personal information to QWQER.
                        </p>
                        <p className="text-[15px] text-gray-600 leading-[1.85] mt-4">
                            This Policy is a part of and incorporated within, and is to be read along with, the Terms of Use.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">1. Your Consent</h2>
                        <p className="text-[15px] text-gray-600 leading-[1.85]">
                            By using the QWQER Platform and the Services, you agree and consent to the collection, transfer, use, storage, disclosure and sharing of your information as described and collected by us in accordance with this Policy. If you do not agree with the Policy, please do not use or access the QWQER Platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">2. Policy Changes</h2>
                        <p className="text-[15px] text-gray-600 leading-[1.85]">
                            We reserve the unconditional right to change, modify, add, or remove portions of this Privacy Policy at any time, without specifically notifying You of such changes. Any changes or updates will be effective immediately. If we make any material changes, we will endeavour to provide you with reasonable notice of such changes, such as via prominent notice on the Platform or to your email address on record and where required by applicable law, we will obtain your consent. To the extent permitted under the applicable law, your continued use of our Services after we publish or send a notice about our changes to this Policy shall constitute your acceptance of the updated Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">3. Links to Other Sites</h2>
                        <p className="text-[15px] text-gray-600 leading-[1.85]">
                            Our Website links to other websites that may collect personally identifiable information about you. QWQER is not responsible for the privacy practices or the content of those linked websites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">4. Collection of Information</h2>
                        <p className="text-[15px] text-gray-600 leading-[1.85] mb-6">
                            In order to enhance the user experience and provide Our Services, Company collects information about You. Your information may be voluntarily given to us or it may be automatically collected when You visit Our Platform or use any of Our Services, and it includes information we receive from third parties.
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">(a) Information you give us</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85] mb-3">This includes information submitted when you:</p>
                                <ul className="space-y-2 ml-5">
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> Create or update your QWQER account, which may include your name, email, phone number, login name and password, address, payment or banking information, date of birth and profile picture</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> Provide content to us, which may include reviews, ordering details and history, special merchant requests, contact information of people you refer to us and other information you provide on the QWQER Platform (&quot;Your Content&quot;)</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> Use our Services, we may collect and store information about you to process your requests and automatically complete forms for future transactions, including (but not limited to) your phone number, address, email, billing information and credit or payment card information</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> Correspond with QWQER for customer support</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> Participate in the interactive services offered by the QWQER Platform such as discussion boards, competitions, promotions or surveys, or other social media functions</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> Enable features that require access to your address book</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> Report problems for troubleshooting</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">(b) Information we collect about you</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85] mb-3">
                                    Regarding each of your visits to the QWQER Platform, we will automatically collect and analyse the following demographic and other information:
                                </p>
                                <ul className="space-y-2 ml-5">
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> When you communicate with us via email or phone, through the QWQER Platform or otherwise, we may maintain a record of your communications</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> <span><span className="font-bold text-gray-800">Location Information:</span> Depending on the Services that you use, and your app settings or device permissions, we may collect your real-time information, or approximate location information as determined through data such as GPS, IP address</span></li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> <span><span className="font-bold text-gray-800">Usage and Preference Information:</span> We collect information as to how you interact with our Services, preferences and settings chosen</span></li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> <span><span className="font-bold text-gray-800">Transaction Information:</span> We collect transaction details related to your use of our Services, and information about you and your activity on the Services, including the full Uniform Resource Locators (URL), the type of browser you use, your operating system, access times, pages viewed, credit and debit card numbers, length of visits, and pages visited, unique identifiers</span></li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> <span><span className="font-bold text-gray-800">Device Information:</span> We may collect information about the devices you use to access our Services, including the hardware models, operating systems and versions, software, file names, preferred languages, device identifiers, and mobile network information</span></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">(c) Information we receive from other sources</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    We may receive information about you from third parties, such as other users, partners (including ad partners, analytics providers, search information providers), or our affiliated companies or if you use any of the other websites/apps we operate or the other Services we provide. Users of our Ad Services and other third-parties may share information with us such as the cookie ID, device ID, or demographic or interest data, and information about content viewed or actions taken on a third-party website, online services or apps.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">5. Cookies</h2>
                        <p className="text-[15px] text-gray-600 leading-[1.85]">
                            A &quot;cookie&quot; is a small piece of information stored on a web browser (or device) so it can be later read back. Cookies are useful for enabling the browser to remember information specific to a given user. We place both permanent and temporary cookies. The cookies do not contain any of your personally identifiable information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">6. Use of Personal Information</h2>
                        <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">The information collected by Us through our Platform maybe used for the following purposes:</p>
                        <ul className="space-y-2 ml-5">
                            {[
                                "To allow You to use Services on the Platform",
                                "To allow You to understand or validate any transactions on the Platform",
                                "For internal record keeping of the Company",
                                "To improve our Services",
                                "To monitor Your usage of the Platform, to manage Your Service, etc.",
                                "To process payments with respect to transactions made on the Platform",
                                "To respond to Your comments, reviews, queries and feedback, and to provide better Service",
                                "To communicate important notices or changes to the Services provided by Company on the Platform, use of the Platform and the terms/policies which govern the relationship between You and the Company",
                                "For internal purposes of the Company such as auditing, data analysis and research to conduct/improve other relevant offerings by Company",
                                "For promotional marketing or advertising campaigns by Company",
                                "For any other purposes with Your consent",
                            ].map((item, i) => (
                                <li key={i} className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> {item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">7. Sharing of Personal Information</h2>
                        <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                            We share Your information with third parties and third party service providers (merchants/providers) and service providers to fulfil specific requests, provide deliveries, process payment gateways, analytics, marketing campaigns and provide better Service to you.
                        </p>
                        <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                            We may also share your information with payment service providers for the purpose of billing Service fee to you.
                        </p>
                        <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                            We may disclose Your personal information if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process. We may disclose personal information to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to enforce our Terms or Privacy Policy, respond to claims that an advertisement, posting or other content violates the rights of a third party, or protect the rights, property or personal safety of our Users or the general public.
                        </p>
                        <p className="text-[15px] text-gray-600 leading-[1.85]">
                            Company may need to disclose Your information to protect and defend the rights or property of the Company, including to enforce Our agreements, policies, and Terms, and to protect the personal safety of You, the Company, its members and employees, or any person, in an emergency, and to protect Company from any liability, applicable laws, including any applicable law. Your information (including personally identifiable) may be shared with any current or future subsidiaries of the Company.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">8. Security Precautions</h2>
                        <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                            All information is saved and stored on servers, which are secured with passwords and pins to ensure no unauthorised person has access to it. Once your information is in our possession, we adhere to strict security guidelines, protecting it against unauthorised access. Company shall have reasonable steps to help protect your rights of privacy, and your information (personal or otherwise) in an effort to prevent loss, misuse, unauthorised access, disclosure, alteration, or destruction of such information, in compliance with the applicable laws.
                        </p>
                        <p className="text-[15px] text-gray-600 leading-[1.85]">
                            Although we will try our best to protect your data, we cannot take any guarantee for the security of Your data transmitted through the Platform. You are responsible for keeping Your personal information and account secure. You should not share Your electronic identity, passwords, or other security-related provisions for Your account with anyone.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">9. Grievances</h2>
                        <p className="text-[15px] text-gray-600 leading-[1.85]">
                            In the event You have any grievance relating to the Privacy Policy, please inform within 24 hours of occurrence of the instance from which the grievance has arisen, by writing an email to the Grievance Officer at <a href="mailto:grievance@qwqer.in" className="text-[#ee3425] hover:underline font-medium">grievance@qwqer.in</a>.
                        </p>
                    </section>

                </div>
            </article>

            <Footer />
        </main>
    );
}

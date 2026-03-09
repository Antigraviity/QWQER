import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white text-gray-900 selection:bg-[#ee3425] selection:text-white" data-blog-detail="true">
            <style dangerouslySetInnerHTML={{ __html: `nav:not([style*="border-radius: 9999px"]) { background-color: rgba(0,0,0,0.85) !important; }` }} />
            <Navbar />

            <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-14">

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                    <div className="w-20 h-1 bg-[#ee3425] rounded-full mb-4" />
                    <p className="text-sm text-gray-400">Last updated: February 2026</p>
                </div>

                {/* TOS Content */}
                <div className="space-y-10">

                    {/* INTRODUCTION */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">INTRODUCTION</h2>
                        <p className="text-[15px] text-gray-600 leading-[1.85]">
                            Welcome to operate (&quot;Website&quot;) or Our mobile application (&quot;App&quot;). When you use Our Services, You will be subject to the Terms of Service, guidelines, and policies set forth in these Terms of Service, the term &quot;QWQER,&quot; &quot;QWY,&quot; or &quot;Us&quot; or &quot;We&quot; or &quot;Our&quot; or &quot;Company&quot; refers to QWY Technologies Private Limited, the term &quot;You&quot; or &quot;Your&quot; refers to the merchants availing Our Services through the Website and/or App for accessing Our platform (&quot;Platform&quot;). As long as You comply with these Terms of Service, we grant You a personal, non-exclusive, non-transferable, limited privilege to enter and use Our Platforms and Services (defined below).
                        </p>
                    </section>

                    {/* 1. ACCEPTANCE AND REGISTRATION */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">1. ACCEPTANCE AND REGISTRATION</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">1.1 Acceptance of Terms</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    These Terms of Service set forth the legally binding Terms of Service for Your use of Our Platforms and Services. By using the Platforms, You agree to be bound by these Terms, whether You are a &quot;Visitor&quot; (who simply browses) or a &quot;Subscriber&quot; (who has registered with QWQER). If You do not accept these Terms of Service, You should leave the Website and/or App and discontinue the use of the Service immediately.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">1.2 General Registration Requirements</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                                    To access and use Our Platforms, You must be of legal age to form a binding contract and not be barred from receiving Services under any law in force in India. You agree to provide true, accurate, current, and complete information about Yourself while registering and to promptly update Your registration data to keep it true, accurate, and complete. If You provide any information that is untrue, inaccurate, or incomplete, we reserve the right to suspend or terminate Your account and refuse any and all current or future use of Our Platforms.
                                </p>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    By registering Your phone number with us, You consent to be contacted by us via phone calls, SMS notifications, or instant messages regarding Service updates.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">1.3 Subscriber Account and Security</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    Upon registering with QWY, You may be required to complete a verification process. Once Your account is set up, You are responsible for maintaining the confidentiality of Your account information and are fully responsible for all activities that occur through Your account. If there is any unauthorized use of Your account or any other breach of security, please notify us to stop processing requests from Your account until further instructions.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 2. SERVICES AND PAYMENTS */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">2. SERVICES AND PAYMENTS</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">2.1 Our Role as a Technology Platform</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    QWY&apos;s Services constitute a technology platform that connects You to a deliver executive to schedule and complete Your everyday requirements and errands (&quot;Services&quot;). QWY does not run Your tasks or errands itself nor does it actively supervise the completion of Your tasks. We act solely as a software intermediary that facilitates the placement of orders via an API on Our Platform. We do not engage in or guarantee the delivery of items nor assume responsibility for the delivery process or any mishaps that may occur during delivery.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">2.2 Payments</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                                    When You use the Services, You will incur a charge (&quot;Service Fee&quot;). QWY will facilitate Your payment for the Services through integrated payment platforms. Payment of Service Fee is inclusive of taxes.
                                </p>
                                <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                                    Subscribers may make prepayments into a digital wallet provided by QWQER, which will be used to deduct charges for Services as they are availed. By choosing to deposit funds into the wallet, Subscribers agree that these funds are non-refundable under any circumstances. Goods and Services Tax (GST) is applicable and collected at the time of each deposit into the wallet.
                                </p>
                                <p className="text-[15px] text-gray-600 leading-[1.85] mb-3">QWY also offers credit Terms of Service for select Subscribers:</p>
                                <ul className="space-y-2 ml-5">
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> QWY will raise weekly/monthly invoices to the registered e-mail address of the Subscriber</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> The Subscriber is liable to make payment to QWY within specified days of receipt of the invoice</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> Failure to pay within specified days will incur an interest charge per annum</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">•</span> Failure to make payments for a continuous period gives QWY the right to initiate legal action against the merchant</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 3. DISCLAIMER */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">3. DISCLAIMER</h2>
                        <p className="text-[15px] text-gray-600 leading-[1.85]">
                            The Platform and the Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis without any representations or warranties of any kind, whether express or implied. You acknowledge that QWQER acts as a technology platform connecting You with third-party partners. QWQER does not warrant the quality, merchantability, or fitness for any purpose of any products or services sold or transported. You must raise any grievance related to a product or service directly with the third-party merchant or service provider. QWQER makes no warranty or representation regarding the timeliness, accuracy, or completeness of any information or data provided on the Platform. QWQER assumes no liability for any monetary or other damage suffered by You due to the delay of delivery, failure, or corruption of any data.
                        </p>
                    </section>

                    {/* 4. PROHIBITED CONDUCT AND LIABILITIES */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">4. PROHIBITED CONDUCT AND LIABILITIES</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">4.1 Prohibited Conduct</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85] mb-5">
                                    You are prohibited from using the Platform in any way that violates these Terms or Applicable Law. You must not, and must not permit any third party to, engage in the following activities:
                                </p>

                                <h4 className="text-base font-bold text-gray-800 mb-3">Misuse of the Platform and its Features:</h4>
                                <ul className="space-y-3 ml-5 mb-6">
                                    <li className="text-[15px] text-gray-600 leading-[1.85]"><span className="font-bold text-gray-800">Fraudulent or Misleading Information:</span> You may not provide false, inaccurate, or misleading information about Yourself, Your business, Your Consignment, or the recipient. This includes misrepresenting Your identity, or impersonating another person or entity.</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85]"><span className="font-bold text-gray-800">Unauthorized Access and Interference:</span> Do not use any automated device, program, algorithm, or methodology, such as &quot;robots,&quot; or &quot;spiders,&quot; to access, acquire, copy, or monitor any portion of the Platform. You must not attempt to gain unauthorized access to any part of the Platform or interfere with its operations.</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85]"><span className="font-bold text-gray-800">Exploiting the Service:</span> Do not use the Platform to engage in any criminal activity, promote illegal enterprises, or provide instructional information about illegal activities.</li>
                                </ul>

                                <h4 className="text-base font-bold text-gray-800 mb-3">Handling of Consignments:</h4>
                                <p className="text-[15px] text-gray-600 leading-[1.85] mb-3">
                                    <span className="font-bold text-gray-800">Prohibited Items:</span> You must not request a Service for a Consignment that contains any prohibited or restricted items as defined in these Terms, including but not limited to:
                                </p>
                                <ul className="space-y-1.5 ml-5 mb-5">
                                    {[
                                        ["Arms:", "Firearms, explosives, and ammunition"],
                                        ["Chemicals & Fertilizers:", "Insecticides, acids, fertilizers, and garden poisons"],
                                        ["Fuels:", "Fuel for stoves, lanterns, or heating elements"],
                                        ["Jewellery:", "Precious stones, diamonds, or gems"],
                                        ["Currency:", "Cash, coins, or cheques"],
                                        ["Toxins:", "Hazardous chemicals or biological toxins"],
                                        ["Other Prohibited Items:", "Highly perishable food items, livestock, and original documents (e.g., passports, Aadhaar Cards)"],
                                    ].map(([label, desc]) => (
                                        <li key={label} className="text-[15px] text-gray-600 leading-[1.85] flex gap-2">
                                            <span className="text-[#ee3425] mt-1.5">•</span>
                                            <span><span className="font-bold text-gray-800">{label}</span> {desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">4.2 Abuse and Harassment</h3>
                                <ul className="space-y-3 ml-5 mb-4">
                                    <li className="text-[15px] text-gray-600 leading-[1.85]"><span className="font-bold text-gray-800">Offensive Behavior:</span> You are prohibited from engaging in any conduct that is patently offensive, harassing, abusive, threatening, or promotes racism, bigotry, hatred, or physical harm against any individual or group.</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85]"><span className="font-bold text-gray-800">Privacy Violations:</span> Do not post or transmit any private or personal information of another person, such as telephone numbers, street addresses, or email addresses, without their express consent. You must not include a photograph of another person without their permission.</li>
                                </ul>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    Any violation of these prohibitions may result in the immediate suspension or termination of Your account, at QWQER&apos;s sole discretion, with or without prior notice.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 5. INTELLECTUAL PROPERTY */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">5. INTELLECTUAL PROPERTY</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">5.1 Intellectual Property</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                                    The Services provided by QWY are based on a proprietary software developed exclusively by QWY. QWY is the sole owner of the App, Website, and all software created to provide You with the Services. The content, design, and functionality of Our Website, App, Platform and Services are owned by QWY and are protected by intellectual property laws.
                                </p>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    You acknowledge that all content on Our Platforms is for limited, non-commercial, personal use only. No materials may be copied, reproduced, republished, or distributed in any way without QWY&apos;s prior express written permission.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 6. INDEMNITY AND LIMITATION OF LIABILITY */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">6. INDEMNITY AND LIMITATION OF LIABILITY</h2>

                        <div className="space-y-8">
                            <div>
                                <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                                    You agree to indemnify and hold harmless QWQER, its subsidiaries, affiliates, and their respective officers, directors, employees, and agents (the &quot;Indemnified Parties&quot;) from and against any and all Losses, liabilities, actions, suits, claims, costs, damages, and expenses (including attorney&apos;s fees) arising out of or in connection with the following:
                                </p>
                                <ul className="space-y-3 ml-5 mb-6">
                                    {[
                                        ["Breach of Agreement:", "Your breach of any provision of these Terms of Service or any other policies incorporated herein by reference."],
                                        ["Your Negligence:", "Your negligence, fraud, or willful misconduct in the performance of Your obligations under this agreement."],
                                        ["Mis-description of Goods:", "Any claims, fines, or damages resulting from the mis-description of a Consignment, including its contents, quantity, or value."],
                                        ["Violation of Law:", "Your violation of any applicable law, rule, or regulation, or the infringement of any third-party rights, including intellectual property rights."],
                                        ["Third-Party Claims:", "Any claim or demand from a consignee or other third party arising from Your actions or omissions related to the Consignment."],
                                        ["Costs:", "Any costs incurred by the Indemnified Parties in defending or settling such claims, actions, or suits."],
                                    ].map(([label, desc]) => (
                                        <li key={label} className="text-[15px] text-gray-600 leading-[1.85] flex gap-2">
                                            <span className="text-[#ee3425] mt-1.5">•</span>
                                            <span><span className="font-bold text-gray-800">{label}</span> {desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">6.1 Limitation of Liability</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    In no event shall QWQER, its affiliates, directors, employees, or agents be liable to You or any third party for any indirect, incidental, special, consequential, or punitive damages, including, but not limited to, loss of profits, income, goodwill, data, or business interruptions, arising out of or in connection with the Services or Your access and use of the Platform. QWQER&apos;s liability for any direct loss or damage to a Consignment is strictly limited.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 7. MISCELLANEOUS */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">7. MISCELLANEOUS</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">7.1 Termination</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    You agree that QWY may at any time and for any reason terminate Your access to Our Platforms or suspend Your access to all or any part of the Website or the App, with or without prior notice, and without liability. If You wish to cancel a task after we have commenced work, You may incur a Service fee.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">7.2 Governing Law and Venue</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    These Terms are governed by the laws of India. Any matters arising under these Terms of Service shall be subject to the exclusive jurisdiction of courts located in Kerala, India.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">7.3 Grievance Officer</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    In case of any grievance arising from the use of the Website or the App, please write to the Grievance Officer at <a href="mailto:grievance@qwqer.in" className="text-[#ee3425] hover:underline font-medium">grievance@qwqer.in</a>.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
            </article>

            <Footer />
        </main>
    );
}

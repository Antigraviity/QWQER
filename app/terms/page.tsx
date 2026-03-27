import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Read QWQER's terms of service. Understand the terms and conditions for using our express delivery and fleet logistics platform.",
    alternates: { canonical: "https://qwqer.in/terms" },
};

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
                            Welcome to qwqer.in (&quot;Website&quot;) or Our mobile application (&quot;App&quot;). When You use Our Services, You will be subject to the Terms of Service, guidelines, and policies set forth in these Terms of Service. For the purposes of these Terms of Service, the term &quot;QWQER,&quot; &quot;QWY,&quot; or &quot;Us&quot; or &quot;We&quot; or &quot;Our&quot; or &quot;Company&quot; refers to QWY Technologies Private Limited. The term &quot;You&quot; or &quot;Your&quot; refers to the merchants availing Our Services through the Website and/or App for accessing Our platform (&quot;Platform&quot;). As long as You comply with these Terms of Service, we grant You a personal, non-exclusive, non-transferable, limited privilege to enter and use Our Platforms and Services (defined below).
                        </p>
                    </section>

                    {/* 1. ACCEPTANCE AND REGISTRATION */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">1. ACCEPTANCE AND REGISTRATION</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">1.1 Acceptance of Terms</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    These Terms of Service set forth the legally binding Terms of Service for Your use of Our Platforms and Services. By using the Platforms, You agree to be bound by these Terms of Service, whether You are a &quot;Visitor&quot; (who simply browses) or a &quot;Subscriber&quot; (who has registered with QWQER). If You do not accept these Terms of Service, You should leave the Website and/or App and discontinue the use of the Service immediately.
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
                                    QWY&apos;s Services constitute a technology platform that connects You to a deliver executive to schedule and complete Your everyday requirements and errands (&quot;Services&quot;). QWY does not itself perform or manage Your tasks or errands and acts solely as a software intermediary facilitating the placement of orders through Our Platform. Notwithstanding the foregoing, We may supervise the completion of Your tasks to the extent required under the agreed terms.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">2.2 Payments</h3>
                                <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                                    When You use the Services, You will incur a charge (&quot;Service Fee&quot;). QWY will facilitate Your payment for the Services through integrated payment platforms. Payment of Service Fee is inclusive of taxes.
                                </p>
                                <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                                    Subscribers may make online or prepayments into a digital wallet provided by QWQER, which will be used to deduct charges for Services as they are availed. By choosing to deposit funds into the wallet, Subscribers agree that these funds are non-refundable under any circumstances. Goods and Services Tax (GST) is applicable and collected at the time of each deposit into the wallet.
                                </p>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    The availability of a post-payment facility is subject to the execution of a credit agreement. QWY reserves the sole discretion to grant, modify, or withdraw such a facility at any time, for any reason, and without prior notice.
                                </p>
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
                                    <li className="text-[15px] text-gray-600 leading-[1.85]"><span className="font-bold text-gray-800">Unauthorized Access and Interference:</span> Do not use any automated device, program, algorithm, or methodology, such as &quot;robots&quot; or &quot;spiders,&quot; to access, acquire, copy, or monitor any portion of the Platform. You must not attempt to gain unauthorized access to any part of the Platform or interfere with its proper working.</li>
                                    <li className="text-[15px] text-gray-600 leading-[1.85]"><span className="font-bold text-gray-800">Exploiting the Service:</span> Do not use the Platform to engage in any criminal activity, promote illegal enterprises, or provide instructional information about illegal activities. You may not use the Service to send &quot;junk mail,&quot; &quot;chain letters,&quot; or any other form of unsolicited communication.</li>
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
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">4.2</h3>
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
                                    You acknowledge that all content on Our Platform is for limited, non-commercial, personal use only. No material may be copied, reproduced, republished, or distributed in any way without QWY&apos;s prior express written permission.
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
                                        ["Mis-declaration of Goods:", "Any claims, fines, or damages resulting from the mis-declaration of a Consignment, including its contents, nature, quantity, or value."],
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
                                    In no event shall QWQER, its affiliates, directors, employees, or agents be liable to You or any third party for any indirect, incidental, special, consequential, or punitive damages, including, but not limited to, loss of profits, income, goodwill, data, or business interruption, arising out of or in connection with the Services or Your access and use of the Platform. QWQER&apos;s liability for any direct loss or damage to a Consignment is strictly limited. You acknowledge that You are solely responsible for obtaining and maintaining separate insurance coverage at Your own cost. Any time of arrival or delivery is an estimate only. QWQER shall not be liable for any loss arising from delays in pickup, transportation, or delivery of any Consignment, regardless of the cause of such delays. In all circumstances, QWQER&apos;s total cumulative liability for all claims arising from or related to the Services shall not exceed the Service Fees actually paid and retained by QWQER from You for the specific transaction in question.
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
                                    In case of any grievance arising from the use of the Website or the App, please write to the Grievance Officer.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>

                {/* ═══════════════════════════════════════════════ */}
                {/* DELIVERY EXECUTIVE TERMS AND CONDITIONS */}
                {/* ═══════════════════════════════════════════════ */}
                <div className="mt-20 pt-16 border-t-2 border-gray-200">
                    <div className="mb-14">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms and Conditions — Delivery Executive</h1>
                        <div className="w-20 h-1 bg-[#ee3425] rounded-full mb-4" />
                        <p className="text-sm text-gray-400">Last updated: February 2026</p>
                    </div>

                    <div className="space-y-10">

                        {/* INTRODUCTION */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">INTRODUCTION</h2>
                            <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                                Welcome to qwqer.in (&quot;Website&quot;) or our mobile application (&quot;App&quot;). When You sign up for providing services through our Website or App, You will be subject to the terms, guidelines, and policies set forth in these Terms and Conditions. For the purposes of these Terms and Conditions, the term &quot;Qwqer,&quot; &quot;QWY,&quot; or &quot;Us&quot; or &quot;We&quot; or &quot;Our&quot; or &quot;Company&quot; refers to QWY Technologies Private Limited. The term &quot;You&quot; or &quot;Your&quot; refers to the Delivery Executive (defined below). As long as You comply with these Terms and Conditions, we grant You a personal, non-exclusive, non-transferable, limited privilege to enter and use our Platforms for providing services.
                            </p>
                            <p className="text-[15px] text-gray-600 leading-[1.85]">
                                These Terms and Conditions are an electronic record in the form of a contract created under the Information Technology Act, 2000, and the rules made thereunder. It does not require any physical, electronic, or digital signature. This document is published in accordance with the provisions of Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011. By accessing or using the Qwqer Platforms, You agree to be bound by these Terms and Conditions.
                            </p>
                        </section>

                        {/* 1. GENERAL PARTNER REQUIREMENTS */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">1. GENERAL PARTNER REQUIREMENTS</h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">1.1 Definitions</h3>
                                    <ul className="space-y-2 ml-5">
                                        <li className="text-[15px] text-gray-600 leading-[1.85]"><span className="font-bold text-gray-800">Services:</span> The offerings or products provided by Qwqer, which constitute a technology platform that connects You to a Customer to complete delivery tasks.</li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85]"><span className="font-bold text-gray-800">Delivery Executive:</span> A person who has registered with Qwqer to provide delivery and logistics services using their vehicle.</li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85]"><span className="font-bold text-gray-800">Qwqer Platforms:</span> The Website and App used to provide the Services.</li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85]"><span className="font-bold text-gray-800">Customer:</span> Any Customer who used Qwqer delivery services.</li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85]"><span className="font-bold text-gray-800">Consignment:</span> The goods, couriers, or parcels entrusted to You by a customer for delivery.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">1.2 Registration and Eligibility</h3>
                                    <p className="text-[15px] text-gray-600 leading-[1.85]">
                                        You must be of legal age to form a binding contract and not be barred from receiving services under any applicable law in India. You agree to provide true, accurate, current, and complete information about yourself while registering on our Platforms to avail the Services. If You provide any information that is untrue, inaccurate, or incomplete, we reserve the right to suspend or terminate Your account at any time.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">1.3 Your Role as an Independent Partner</h3>
                                    <p className="text-[15px] text-gray-600 leading-[1.85]">
                                        You are an independent contractor, and nothing in this agreement establishes an employer-employee relationship between You and Qwqer. You are responsible for providing your services using your own vehicle based on communicated payout plan.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 2. DRIVER PARTNER RESPONSIBILITIES AND CONDUCT */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">2. DRIVER PARTNER RESPONSIBILITIES AND CONDUCT</h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">2.1 Provision of Services</h3>
                                    <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                                        You agree to use Your vehicle to fulfill delivery requests as communicated through the Qwqer Platform. You shall ensure that You will not indulge in any activities that require You to break any regulatory and government rules for any purpose. You agree and acknowledge that You are solely responsible for the contents of any packages entrusted to You. You hereby represent and warrant that You will not check any bags or packages for any contents.
                                    </p>
                                    <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                                        You acknowledge that as an independent contractor, You are not obligated to accept any order available to You on the Website and/or App. You have full flexibility to select assignments at Your own discretion and convenience.
                                    </p>
                                    <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                                        Further, You agree and accept that upon accepting an order on the Website and/or App, a binding contract is formed. Accordingly, You are then responsible for fulfilling the service by picking up and delivering the order within the stipulated and agreed timeframe / service level agreements (SLAs).
                                    </p>
                                    <p className="text-[15px] text-gray-600 leading-[1.85] mb-4">
                                        You also agree that failure to perform the order within SLAs can lead to monetary financial penalties which shall be deducted from Your payment.
                                    </p>
                                    <p className="text-[15px] text-gray-600 leading-[1.85]">
                                        Repeated or severe failure to fulfill accepted orders, such as frequent delays, missed deliveries or unexplained no-shows, can lead to You being blocked or deactivation of Your account on the Website and/or App per Our discretion. You understand that such blocking and/or deactivation means Your contract with Us will end, and You will no longer be able to receive or complete delivery orders through Our Website and/or App.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">2.2 Prohibited Conduct</h3>
                                    <p className="text-[15px] text-gray-600 leading-[1.85] mb-3">You shall not:</p>
                                    <ul className="space-y-2 ml-5">
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>Engage in any misconduct or inappropriate behavior towards Customers or their clients (hereinafter referred to as End Customers).</span></li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>Damage or cause the loss of a Consignment during transit.</span></li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>Misrepresent Your identity or provide false or misleading information.</span></li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>Engage in any criminal activity or enterprise or provide instructional information about illegal activities.</span></li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>Solicit passwords or personal identifying information from users.</span></li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>Use any automated devices (&quot;robots,&quot; &quot;spiders&quot;) to access our Platforms.</span></li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 3. DISCLAIMER */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">3. DISCLAIMER</h2>
                            <p className="text-[15px] text-gray-600 leading-[1.85]">
                                You acknowledge and agree that your relationship with Qwqer is that of an independent contractor and not an employee, partner, or agent. You assume all operational and financial risks associated with performing Services, including all costs related to your vehicle, fuel, maintenance, insurance, and taxes. The Platform and its Services are provided to You on an &quot;as is&quot; and &quot;as available&quot; basis without any express or implied warranties. Qwqer makes no guarantees regarding the platform&apos;s reliability, availability, or uptime. We also do not guarantee a specific number of delivery requests, a minimum income, or the accuracy of user-provided information.
                            </p>
                        </section>

                        {/* 4. QWQER'S RESPONSIBILITIES AND RIGHTS */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">4. QWQER&apos;S RESPONSIBILITIES AND RIGHTS</h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">4.1 Our Role as a Technology Platform</h3>
                                    <p className="text-[15px] text-gray-600 leading-[1.85]">
                                        QWY&apos;s services constitute a technology platform that connects You to the Customers. QWY does not run Your tasks or errands itself nor does it actively supervise the completion of Your tasks. We operate as a software platform on a principal-to-principal basis and do not guarantee order availability and/or fulfilment at all times.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">4.2 Payments to Partners</h3>
                                    <p className="text-[15px] text-gray-600 leading-[1.85]">
                                        QWY shall facilitate payment for the delivery services provided by you through its integrated payment platforms. QWY shall ensure payments are made in a timely manner and that rates remain transparent and standardized.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 5. INTELLECTUAL PROPERTY */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">5. INTELLECTUAL PROPERTY</h2>
                            <div className="space-y-4">
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    The Services provided by QWY are based on its proprietary software, which is a key component of the Qwqer Platforms. QWY is the sole and exclusive owner of the App, the Website, and all underlying software and technology used to provide You with the Services.
                                </p>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    QWY grants You a limited, non-exclusive, non-transferable, and non-sublicensable license to use the Qwqer Platforms and their embedded Intellectual Property solely for the purpose of fulfilling delivery requests. This license does not, at any time, grant You any ownership rights or interest in QWY&apos;s Intellectual Property.
                                </p>
                                <p className="text-[15px] text-gray-600 leading-[1.85]">
                                    You agree not to copy, reproduce, modify, distribute, or create derivative works from any QWY content or software. You shall not, directly or indirectly, reverse engineer, decompile, or disassemble any part of the Qwqer Platforms or attempt to discover their source code. Any unauthorized use of our Intellectual Property is strictly prohibited and may result in legal action.
                                </p>
                            </div>
                        </section>

                        {/* 6. INDEMNITY AND LIMITATION OF LIABILITY */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">6. INDEMNITY AND LIMITATION OF LIABILITY</h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">6.1 Indemnification by You</h3>
                                    <p className="text-[15px] text-gray-600 leading-[1.85] mb-3">You agree to indemnify and hold harmless QWY, its subsidiaries, affiliates, and employees from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including legal fees) arising from:</p>
                                    <ul className="space-y-2 ml-5">
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>Your negligence or willful misconduct, including but not limited to damage to a Consignment, mis-delivery, or non-delivery.</span></li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>Your violation of any law, including traffic and transportation laws, while delivering a Consignment.</span></li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>Your breach of these Terms, including any misrepresentation or failure to provide accurate information.</span></li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>Any third-party claims arising from Your actions while delivering Consignment through the Services.</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">6.2 Indemnification by QWY</h3>
                                    <p className="text-[15px] text-gray-600 leading-[1.85] mb-3">QWY agrees to indemnify and hold You harmless from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including legal fees) arising from:</p>
                                    <ul className="space-y-2 ml-5">
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>QWY&apos;s gross and wilful negligence.</span></li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>Third-party claims related to Intellectual Property, or the fraudulent or unlawful nature of a delivery request that was not reasonably discoverable by You.</span></li>
                                        <li className="text-[15px] text-gray-600 leading-[1.85] flex gap-2"><span className="text-[#ee3425] mt-1.5">&bull;</span><span>Any data breaches or security incidents that compromise Your personal information on the Platform, unless such a breach is caused by Your own actions.</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">Limitation of Liability</h3>
                                    <p className="text-[15px] text-gray-600 leading-[1.85]">
                                        As an independent contractor, You acknowledge that You access and use the Platforms and Services at Your sole risk. QWY is a technology platform that connects You with the Customer; We are not Your employer and do not assume liability for risks associated with Your work. In no event shall QWY, its affiliates, directors, employees, or agents be liable to you for any indirect, incidental, punitive, or consequential damages. This includes, but is not limited to, losses arising from your business operations, loss of profits, income, or goodwill. In all circumstances, QWY&apos;s total cumulative liability to You for any and all claims arising from Your access of the Services will be limited to the service fees you actually received and retained for the specific transaction in question.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 7. MISCELLANEOUS */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">7. MISCELLANEOUS</h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">7.1 Termination and Suspension of Account</h3>
                                    <p className="text-[15px] text-gray-600 leading-[1.85]">
                                        You agree that QWY may at any time and for any reason terminate Your access to our Platforms or restrict or suspend Your access to all or any part of the App at any time, for any or no reason, with or without prior notice, and without liability.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">7.2 Governing Law and Venue</h3>
                                    <p className="text-[15px] text-gray-600 leading-[1.85]">
                                        These Terms and Conditions are governed by the laws of India. Any matters arising under these terms shall be subject to the exclusive jurisdiction of courts located in Kerala, India.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">7.3 Grievance Officer</h3>
                                    <p className="text-[15px] text-gray-600 leading-[1.85]">
                                        In case of any grievance arising from the use of the Website or the App, please write to the Grievance Officer at Maria Augustine.
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>

            </article>

            <Footer />
        </main>
    );
}

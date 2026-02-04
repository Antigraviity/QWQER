import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#ee3425] text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 mb-16 border-b border-white/20 pb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-white p-2 rounded-lg">
                                <Image src="/qwqer-logo.png" alt="QWQER Logo" width={100} height={30} className="h-8 w-auto object-contain" />
                            </div>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed max-w-xs">
                            A transportation solution provider built for express delivery and fleet operations.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Our Services</h4>
                        <ul className="space-y-4 text-sm text-white/80">
                            <li><a href="#" className="hover:text-white transition-colors">QWQER Fleet</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">QWQER Express</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Our Locations</h4>
                        <p className="text-sm text-white/80">Karnataka, Kerala, Tamilnadu, Telangana</p>

                        <h4 className="font-bold mt-8 mb-4">Quick Links</h4>
                        <ul className="flex flex-wrap gap-4 text-xs font-medium text-white/70">
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">PR Perks</a></li>
                            <li><a href="#" className="hover:text-white">Case Studies</a></li>
                            <li><a href="#" className="hover:text-white">FAQs</a></li>
                            <li><a href="#" className="hover:text-white">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-xs text-white/50">
                    © {new Date().getFullYear()} QWQER. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

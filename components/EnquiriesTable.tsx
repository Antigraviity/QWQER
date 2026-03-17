"use client";

import { useState, useTransition } from 'react';
import { FaCircle, FaCheck, FaEnvelope, FaPhone } from 'react-icons/fa';
import { markEnquiryRead } from '@/lib/data-actions';

type Enquiry = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: string;
    createdAt: string;
};

export default function EnquiriesTable({ enquiries: initialEnquiries }: { enquiries: Enquiry[] }) {
    const [enquiries, setEnquiries] = useState(initialEnquiries);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleMarkRead = (id: string) => {
        startTransition(async () => {
            await markEnquiryRead(id);
            setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: 'READ' } : e));
        });
    };

    if (enquiries.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <FaEnvelope className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500">No enquiries found.</p>
                <p className="text-sm text-gray-400 mt-1">Enquiries will appear here when visitors submit the contact form.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {enquiries.map((enquiry) => (
                <div
                    key={enquiry.id}
                    className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-colors ${
                        enquiry.status === 'NEW' ? 'border-[#ee3425]/20 bg-red-50/30' : 'border-gray-200'
                    }`}
                >
                    {/* Summary row */}
                    <button
                        onClick={() => setExpandedId(expandedId === enquiry.id ? null : enquiry.id)}
                        className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-gray-50/50 transition-colors"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            {enquiry.status === 'NEW' ? (
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ee3425] flex-shrink-0 animate-pulse" />
                            ) : (
                                <span className="w-2.5 h-2.5 rounded-full bg-gray-200 flex-shrink-0" />
                            )}
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-gray-900 truncate">{enquiry.name}</p>
                                    {enquiry.status === 'NEW' && (
                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#ee3425]/10 text-[#ee3425] uppercase">New</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-400 truncate">{enquiry.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <p className="text-xs text-gray-400 hidden md:block max-w-[200px] truncate">{enquiry.message}</p>
                            <span className="text-xs text-gray-400 whitespace-nowrap">{enquiry.createdAt}</span>
                            <span className={`hidden md:inline-block px-2 py-1 rounded text-xs font-medium ${
                                enquiry.status === 'NEW' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                            }`}>
                                {enquiry.status}
                            </span>
                            <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === enquiry.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>

                    {/* Expanded details */}
                    {expandedId === enquiry.id && (
                        <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FaEnvelope className="w-3.5 h-3.5 text-gray-400" />
                                    <a href={`mailto:${enquiry.email}`} className="text-[#ee3425] hover:underline">{enquiry.email}</a>
                                </div>
                                {enquiry.phone && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <FaPhone className="w-3.5 h-3.5 text-gray-400" />
                                        <a href={`tel:${enquiry.phone}`} className="hover:text-[#ee3425]">{enquiry.phone}</a>
                                    </div>
                                )}
                                <div className="text-sm text-gray-500">
                                    Submitted: {enquiry.createdAt}
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Message</p>
                                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{enquiry.message}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                {enquiry.status === 'NEW' && (
                                    <button
                                        onClick={() => handleMarkRead(enquiry.id)}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors border border-green-200"
                                    >
                                        <FaCheck className="w-3 h-3" /> Mark as Read
                                    </button>
                                )}
                                <a
                                    href={`mailto:${enquiry.email}`}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ee3425] text-white text-sm font-medium hover:bg-red-600 transition-colors"
                                >
                                    <FaEnvelope className="w-3 h-3" /> Reply via Email
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

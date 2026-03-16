"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaTrash, FaBriefcase, FaUsers, FaCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFilePdf } from 'react-icons/fa';

type Career = {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    published: boolean;
    createdAt: Date;
};

type Application = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    coverNote: string | null;
    careerTitle: string;
    careerSlug: string;
    resumeUrl: string | null;
    status: string;
    createdAt: string;
};

export default function CareersAdminTabs({
    careers,
    applications,
    newAppCount,
}: {
    careers: Career[];
    applications: Application[];
    newAppCount: number;
}) {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<'postings' | 'applications'>(
        searchParams.get('tab') === 'applications' ? 'applications' : 'postings'
    );
    const [expandedApp, setExpandedApp] = useState<string | null>(null);

    return (
        <>
            {/* Tabs */}
            <div className="flex items-center gap-4 border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('postings')}
                    className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                        activeTab === 'postings'
                            ? 'border-[#ee3425] text-[#ee3425]'
                            : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                    }`}
                >
                    <FaBriefcase className="w-3.5 h-3.5" />
                    Postings
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        activeTab === 'postings' ? 'bg-red-50 text-[#ee3425]' : 'bg-gray-100 text-gray-500'
                    }`}>
                        {careers.length}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('applications')}
                    className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                        activeTab === 'applications'
                            ? 'border-[#ee3425] text-[#ee3425]'
                            : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                    }`}
                >
                    <FaUsers className="w-3.5 h-3.5" />
                    Applications
                    {newAppCount > 0 && (
                        <span className="flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full bg-red-50 text-[#ee3425] text-[10px] font-bold animate-pulse">
                            <FaCircle className="w-1.5 h-1.5" /> {newAppCount} new
                        </span>
                    )}
                    {newAppCount === 0 && (
                        <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                            activeTab === 'applications' ? 'bg-red-50 text-[#ee3425]' : 'bg-gray-100 text-gray-500'
                        }`}>
                            {applications.length}
                        </span>
                    )}
                </button>
            </div>

            {/* Postings Tab */}
            {activeTab === 'postings' && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <table className="w-full text-left text-sm md:text-base">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-medium">Title</th>
                                <th className="p-4 font-medium hidden md:table-cell">Department</th>
                                <th className="p-4 font-medium hidden md:table-cell">Location</th>
                                <th className="p-4 font-medium hidden md:table-cell">Type</th>
                                <th className="p-4 font-medium hidden md:table-cell">Status</th>
                                <th className="p-4 font-medium relative"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {careers.map((career) => (
                                <tr key={career.id} className="hover:bg-gray-50 transition-colors text-gray-800">
                                    <td className="p-4 max-w-xs truncate font-medium">{career.title}</td>
                                    <td className="p-4 hidden md:table-cell text-gray-500">{career.department}</td>
                                    <td className="p-4 hidden md:table-cell text-gray-500">{career.location}</td>
                                    <td className="p-4 hidden md:table-cell text-gray-500">{career.type}</td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${career.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {career.published ? 'Live' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button disabled className="text-gray-300 p-2 rounded cursor-not-allowed" title="Delete disabled">
                                            <FaTrash className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {careers.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-6 text-center text-gray-500">No career postings yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
                <div className="space-y-3">
                    {applications.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <FaUsers className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                            <p className="text-gray-500">No job applications yet.</p>
                            <p className="text-sm text-gray-400 mt-1">Applications will appear here when candidates apply for open positions.</p>
                        </div>
                    ) : (
                        applications.map((app) => (
                            <div
                                key={app.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
                            >
                                {/* Summary row */}
                                <button
                                    onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
                                    className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        {app.status === 'NEW' && (
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#ee3425] flex-shrink-0 animate-pulse" />
                                        )}
                                        {app.status !== 'NEW' && (
                                            <span className="w-2.5 h-2.5 rounded-full bg-gray-200 flex-shrink-0" />
                                        )}
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{app.name}</p>
                                            <p className="text-xs text-[#ee3425] font-medium">{app.careerTitle}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <span className={`hidden md:inline-block px-2 py-1 rounded text-xs font-medium ${
                                            app.status === 'NEW' ? 'bg-green-100 text-green-700'
                                            : app.status === 'REVIEWED' ? 'bg-yellow-100 text-yellow-700'
                                            : app.status === 'SHORTLISTED' ? 'bg-blue-100 text-blue-700'
                                            : app.status === 'REJECTED' ? 'bg-red-100 text-red-700'
                                            : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {app.status}
                                        </span>
                                        <span className="text-xs text-gray-400">{app.createdAt}</span>
                                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedApp === app.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </button>

                                {/* Expanded details */}
                                {expandedApp === app.id && (
                                    <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <FaEnvelope className="w-3.5 h-3.5 text-gray-400" />
                                                <a href={`mailto:${app.email}`} className="text-[#ee3425] hover:underline">{app.email}</a>
                                            </div>
                                            {app.phone && (
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <FaPhone className="w-3.5 h-3.5 text-gray-400" />
                                                    <a href={`tel:${app.phone}`} className="hover:text-[#ee3425]">{app.phone}</a>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <FaBriefcase className="w-3.5 h-3.5 text-gray-400" />
                                                {app.careerTitle}
                                            </div>
                                        </div>
                                        {app.resumeUrl && (
                                            <div className="mb-4">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Resume</p>
                                                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-[#ee3425] text-sm font-medium hover:bg-red-100 transition-colors">
                                                    <FaFilePdf className="w-4 h-4" /> Download Resume
                                                </a>
                                            </div>
                                        )}
                                        {app.coverNote && (
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cover Note</p>
                                                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{app.coverNote}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </>
    );
}

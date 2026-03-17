"use client";

import { useState, useEffect, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaTrash, FaBriefcase, FaUsers, FaCircle, FaEnvelope, FaPhone, FaFilePdf, FaEdit, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { deleteCareer, updateCareerStatus } from '@/lib/data-actions';

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

function DeleteModal({ career, onConfirm, onCancel, isDeleting }: {
    career: Career;
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting: boolean;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in">
                <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                        <FaExclamationTriangle className="w-6 h-6 text-[#ee3425]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Position</h3>
                    <p className="text-sm text-gray-500 mb-1">Are you sure you want to delete</p>
                    <p className="text-sm font-semibold text-gray-800 mb-4 px-4 leading-relaxed">
                        &ldquo;{career.title}&rdquo;
                    </p>
                    <p className="text-xs text-gray-400 mb-6">This action cannot be undone.</p>
                    <div className="flex items-center gap-3 w-full">
                        <button onClick={onCancel} disabled={isDeleting}
                            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
                            Cancel
                        </button>
                        <button onClick={onConfirm} disabled={isDeleting}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-[#ee3425] text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                            {isDeleting ? (
                                <><FaSpinner className="w-3.5 h-3.5 animate-spin" /> Deleting...</>
                            ) : (
                                <><FaTrash className="w-3.5 h-3.5" /> Delete</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes animate-in { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                .animate-in { animation: animate-in 0.2s ease-out; }
            `}} />
        </div>
    );
}

function StatusDropdown({ career, onStatusChange }: {
    career: Career;
    onStatusChange: (id: string, published: boolean) => void;
}) {
    const [open, setOpen] = useState(false);
    const [updating, setUpdating] = useState(false);

    const statuses = [
        { label: 'Live', published: true, bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', desc: 'Visible on careers page' },
        { label: 'Paused', published: false, bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500', desc: 'Hidden, accepting later' },
        { label: 'Closed', published: false, bg: 'bg-red-100', text: 'text-red-600', dot: 'bg-red-500', desc: 'Position filled' },
        { label: 'Draft', published: false, bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400', desc: 'Not yet published' },
    ];

    const [selectedLabel, setSelectedLabel] = useState<string>(
        career.published ? 'Live' : 'Closed'
    );
    const current = statuses.find(s => s.label === selectedLabel) || statuses[0];

    const handleChange = async (status: typeof statuses[0]) => {
        if (status.label === selectedLabel) {
            setOpen(false);
            return;
        }
        setUpdating(true);
        try {
            await updateCareerStatus(career.id, status.published);
            setSelectedLabel(status.label);
            onStatusChange(career.id, status.published);
        } catch (e) {
            console.error('Failed to update status:', e);
        }
        setUpdating(false);
        setOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                disabled={updating}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-gray-200 ${current.bg} ${current.text}`}
            >
                {updating ? (
                    <FaSpinner className="w-2.5 h-2.5 animate-spin" />
                ) : (
                    <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
                )}
                {current.label}
                <svg className={`w-3 h-3 ml-0.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute bottom-full left-0 mb-1 z-50 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 min-w-[180px]">
                        {statuses.map((s) => (
                            <button
                                key={s.label}
                                onClick={() => handleChange(s)}
                                className={`w-full flex items-center gap-2 px-3 py-2.5 text-xs transition-colors ${
                                    s.label === selectedLabel
                                        ? `${s.bg} ${s.text} font-semibold`
                                        : 'text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                                <div className="text-left">
                                    <span className="block font-medium">{s.label}</span>
                                    <span className="block text-[10px] font-normal opacity-60">{s.desc}</span>
                                </div>
                                {s.label === selectedLabel && (
                                    <svg className="w-3 h-3 ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function CareersAdminTabs({
    careers: initialCareers,
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
    const [careers, setCareers] = useState(initialCareers);
    const [deleteTarget, setDeleteTarget] = useState<Career | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        try {
            startTransition(async () => {
                await deleteCareer(deleteTarget.id);
                setCareers((prev) => prev.filter((c) => c.id !== deleteTarget.id));
                setDeleteTarget(null);
                setIsDeleting(false);
            });
        } catch (error) {
            console.error('Failed to delete career:', error);
            setIsDeleting(false);
        }
    };

    return (
        <>
            {/* Delete Modal */}
            {deleteTarget && (
                <DeleteModal
                    career={deleteTarget}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => { if (!isDeleting) setDeleteTarget(null); }}
                    isDeleting={isDeleting}
                />
            )}

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
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <table className="w-full text-left text-sm md:text-base">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200 rounded-t-xl">
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
                                        <StatusDropdown career={career} onStatusChange={(id, published) => {
                                            setCareers(prev => prev.map(c => c.id === id ? { ...c, published } : c));
                                        }} />
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/careers/${career.id}/edit`}
                                                className="text-gray-400 hover:text-[#ee3425] hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                title="Edit position"
                                            >
                                                <FaEdit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setDeleteTarget(career)}
                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                title="Delete position"
                                            >
                                                <FaTrash className="w-4 h-4" />
                                            </button>
                                        </div>
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
                            <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
                                <button
                                    onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
                                    className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        {app.status === 'NEW' ? (
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#ee3425] flex-shrink-0 animate-pulse" />
                                        ) : (
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

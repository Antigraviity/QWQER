'use client';

import { useFormState } from 'react-dom';
import { createCareer } from '@/lib/data-actions';
import Link from 'next/link';
import { State } from '@/lib/definitions';
import RichTextEditor from '@/components/RichTextEditor';

const DEPARTMENTS = ['Engineering', 'Operations', 'Marketing', 'Sales', 'Design', 'Finance', 'HR', 'Customer Support', 'Logistics', 'Product'];
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];

export default function CreateCareerPage() {
    const initialState: State = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createCareer, initialState);

    return (
        <main className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Add Career Position</h1>
                <Link href="/admin/careers" className="text-sm text-gray-500 hover:text-gray-900">Cancel</Link>
            </div>

            <form action={dispatch} className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input id="title" name="title" type="text" placeholder="e.g. Senior Software Engineer" required
                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" />
                    {state.errors?.title?.map((e: string) => <p key={e} className="mt-2 text-sm text-red-500">{e}</p>)}
                </div>

                {/* Slug */}
                <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                    <input id="slug" name="slug" type="text" placeholder="e.g. senior-software-engineer" required
                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" />
                    {state.errors?.slug?.map((e: string) => <p key={e} className="mt-2 text-sm text-red-500">{e}</p>)}
                </div>

                {/* Department + Location */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <select id="department" name="department" required
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm">
                            <option value="">Select department</option>
                            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        {state.errors?.department?.map((e: string) => <p key={e} className="mt-2 text-sm text-red-500">{e}</p>)}
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input id="location" name="location" type="text" placeholder="e.g. Chennai, Remote" required
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" />
                        {state.errors?.location?.map((e: string) => <p key={e} className="mt-2 text-sm text-red-500">{e}</p>)}
                    </div>
                </div>

                {/* Type + Experience */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                        <select id="type" name="type" required
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm">
                            {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                        <input id="experience" name="experience" type="text" placeholder="e.g. 2-4 years, Fresher"
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm" />
                    </div>
                </div>

                {/* Description - Rich Text */}
                <RichTextEditor
                    name="description"
                    placeholder="Describe the role, responsibilities, requirements, and benefits..."
                    required
                    errors={state.errors?.description}
                />

                {/* Global Error */}
                {state.message && <p className="mt-2 text-sm text-red-500">{state.message}</p>}

                <div className="flex justify-end gap-4 mt-8">
                    <Link href="/admin/careers"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
                        Cancel
                    </Link>
                    <button type="submit"
                        className="flex h-10 items-center rounded-lg bg-[#ee3425] px-4 text-sm font-medium text-white transition-colors hover:bg-red-600">
                        Publish Position
                    </button>
                </div>
            </form>
        </main>
    );
}

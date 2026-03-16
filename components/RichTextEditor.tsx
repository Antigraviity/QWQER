"use client";

import { useRef, useCallback, useState } from 'react';
import {
    FaBold, FaItalic, FaUnderline, FaHeading, FaListUl, FaListOl,
    FaQuoteLeft, FaLink, FaUnlink, FaAlignLeft, FaAlignCenter,
    FaAlignRight, FaCode, FaUndo, FaRedo
} from 'react-icons/fa';

type RichTextEditorProps = {
    name: string;
    placeholder?: string;
    required?: boolean;
    errors?: string[];
};

const ToolbarButton = ({
    onClick,
    active,
    title,
    children,
}: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
}) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className={`p-2 rounded transition-colors ${
            active
                ? 'bg-[#ee3425] text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
        }`}
    >
        {children}
    </button>
);

const ToolbarDivider = () => <div className="w-px h-6 bg-gray-200 mx-1" />;

export default function RichTextEditor({ name, placeholder, required, errors }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

    const syncContent = useCallback(() => {
        if (hiddenInputRef.current && editorRef.current) {
            hiddenInputRef.current.value = editorRef.current.innerHTML;
        }
    }, []);

    const updateActiveFormats = useCallback(() => {
        const formats = new Set<string>();
        if (document.queryCommandState('bold')) formats.add('bold');
        if (document.queryCommandState('italic')) formats.add('italic');
        if (document.queryCommandState('underline')) formats.add('underline');
        if (document.queryCommandState('insertUnorderedList')) formats.add('ul');
        if (document.queryCommandState('insertOrderedList')) formats.add('ol');
        setActiveFormats(formats);
    }, []);

    const exec = useCallback((command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        updateActiveFormats();
        syncContent();
    }, [updateActiveFormats, syncContent]);

    const handleHeading = useCallback((tag: string) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const parentBlock = range.startContainer.parentElement?.closest('h2, h3, p, div');

        if (parentBlock && parentBlock.tagName.toLowerCase() === tag) {
            // Remove heading - convert to paragraph
            exec('formatBlock', 'p');
        } else {
            exec('formatBlock', tag);
        }
    }, [exec]);

    const handleLink = useCallback(() => {
        const selection = window.getSelection();
        if (!selection || selection.toString().length === 0) {
            alert('Please select some text first to add a link.');
            return;
        }
        const url = prompt('Enter URL:', 'https://');
        if (url) {
            exec('createLink', url);
        }
    }, [exec]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        // Ctrl+B, Ctrl+I, Ctrl+U shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'b': e.preventDefault(); exec('bold'); break;
                case 'i': e.preventDefault(); exec('italic'); break;
                case 'u': e.preventDefault(); exec('underline'); break;
            }
        }
    }, [exec]);

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 p-2 bg-gray-50 border border-gray-300 border-b-0 rounded-t-lg">
                {/* Headings */}
                <ToolbarButton onClick={() => handleHeading('h2')} title="Heading 2 (Section Title)">
                    <span className="text-xs font-bold">H2</span>
                </ToolbarButton>
                <ToolbarButton onClick={() => handleHeading('h3')} title="Heading 3 (Subtitle)">
                    <span className="text-xs font-bold">H3</span>
                </ToolbarButton>

                <ToolbarDivider />

                {/* Text formatting */}
                <ToolbarButton onClick={() => exec('bold')} active={activeFormats.has('bold')} title="Bold (Ctrl+B)">
                    <FaBold className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => exec('italic')} active={activeFormats.has('italic')} title="Italic (Ctrl+I)">
                    <FaItalic className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => exec('underline')} active={activeFormats.has('underline')} title="Underline (Ctrl+U)">
                    <FaUnderline className="w-3.5 h-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Lists */}
                <ToolbarButton onClick={() => exec('insertUnorderedList')} active={activeFormats.has('ul')} title="Bullet List">
                    <FaListUl className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => exec('insertOrderedList')} active={activeFormats.has('ol')} title="Numbered List">
                    <FaListOl className="w-3.5 h-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Block */}
                <ToolbarButton onClick={() => exec('formatBlock', 'blockquote')} title="Blockquote">
                    <FaQuoteLeft className="w-3.5 h-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Link */}
                <ToolbarButton onClick={handleLink} title="Insert Link">
                    <FaLink className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => exec('unlink')} title="Remove Link">
                    <FaUnlink className="w-3.5 h-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Alignment */}
                <ToolbarButton onClick={() => exec('justifyLeft')} title="Align Left">
                    <FaAlignLeft className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => exec('justifyCenter')} title="Align Center">
                    <FaAlignCenter className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => exec('justifyRight')} title="Align Right">
                    <FaAlignRight className="w-3.5 h-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Undo/Redo */}
                <ToolbarButton onClick={() => exec('undo')} title="Undo (Ctrl+Z)">
                    <FaUndo className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => exec('redo')} title="Redo (Ctrl+Y)">
                    <FaRedo className="w-3.5 h-3.5" />
                </ToolbarButton>
            </div>

            {/* Editable Content Area */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={syncContent}
                onKeyDown={handleKeyDown}
                onMouseUp={updateActiveFormats}
                onKeyUp={updateActiveFormats}
                data-placeholder={placeholder || 'Write your blog content here...'}
                className="w-full min-h-[350px] max-h-[600px] overflow-y-auto bg-white border border-gray-300 rounded-b-lg p-4 text-gray-900 focus:border-[#ee3425] focus:outline-none focus:ring-1 focus:ring-[#ee3425] transition-colors shadow-sm prose prose-sm max-w-none
                    [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-400
                    [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-gray-100
                    [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-4 [&_h3]:mb-2
                    [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-3
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ul_li]:mb-1 [&_ul_li]:text-gray-700
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_ol_li]:mb-1 [&_ol_li]:text-gray-700
                    [&_blockquote]:border-l-4 [&_blockquote]:border-[#ee3425] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:my-4
                    [&_a]:text-[#ee3425] [&_a]:underline
                    [&_strong]:font-bold [&_strong]:text-gray-900"
            />

            {/* Hidden input for form submission */}
            <input type="hidden" name={name} ref={hiddenInputRef} required={required} />

            {errors && (
                <div aria-live="polite" aria-atomic="true">
                    {errors.map((error: string) => (
                        <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
                    ))}
                </div>
            )}

            <p className="mt-2 text-xs text-gray-400">
                Use the toolbar to format content. H2 for section titles, H3 for subtitles, Bold for emphasis.
            </p>
        </div>
    );
}

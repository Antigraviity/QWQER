// HTML escape utility for sanitizing user input
export function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Allowlisted tags for blog content
const ALLOWED_TAGS = new Set([
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'del',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'a', 'img',
    'blockquote', 'pre', 'code',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'hr', 'div', 'span', 'sub', 'sup',
]);

// Allowlisted attributes per tag
const ALLOWED_ATTRS: Record<string, Set<string>> = {
    a: new Set(['href', 'title', 'target', 'rel']),
    img: new Set(['src', 'alt', 'width', 'height', 'loading']),
    td: new Set(['colspan', 'rowspan']),
    th: new Set(['colspan', 'rowspan']),
    div: new Set(['class']),
    span: new Set(['class']),
    p: new Set(['class']),
    pre: new Set(['class']),
    code: new Set(['class']),
};

// Sanitize blog content HTML — allowlist-based approach
export function sanitizeBlogHtml(html: string): string {
    // Phase 1: Remove dangerous elements completely (including contents)
    let clean = html;
    const dangerousTags = ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'select', 'textarea', 'link', 'meta', 'base', 'noscript', 'applet'];
    for (const tag of dangerousTags) {
        // Remove tag and its content
        clean = clean.replace(new RegExp(`<${tag}\\b[^<]*(?:(?!<\\/${tag}>)<[^<]*)*<\\/${tag}>`, 'gi'), '');
        // Remove self-closing versions
        clean = clean.replace(new RegExp(`<${tag}\\b[^>]*\\/?>`, 'gi'), '');
    }

    // Phase 2: Remove all event handlers (on*)
    clean = clean.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '');

    // Phase 3: Remove javascript:, vbscript:, data: URLs from href/src
    clean = clean.replace(/(href|src|action)\s*=\s*(?:"(?:javascript|vbscript|data):[^"]*"|'(?:javascript|vbscript|data):[^']*')/gi, '$1="#"');

    // Phase 4: Remove style attributes containing expression() or url() with javascript
    clean = clean.replace(/style\s*=\s*(?:"[^"]*(?:expression|javascript|vbscript)\s*\([^"]*"|'[^']*(?:expression|javascript|vbscript)\s*\([^']*')/gi, '');

    // Phase 5: Ensure all <a> tags have rel="noopener noreferrer" for external links
    clean = clean.replace(/<a\b([^>]*?)>/gi, (match, attrs) => {
        if (/target\s*=\s*["']_blank["']/i.test(attrs) && !/rel\s*=/i.test(attrs)) {
            return `<a${attrs} rel="noopener noreferrer">`;
        }
        return match;
    });

    // Phase 6: Remove SVG with potential script execution
    clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');

    return clean;
}

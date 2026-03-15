import React from 'react';

/**
 * Lightweight Markdown renderer for AI chat responses.
 * Handles: headings, bold, italic, code blocks, inline code, bullet/numbered lists, horizontal rules.
 */
const MarkdownMessage = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  let keyCounter = 0;
  const key = () => keyCounter++;

  const renderInline = (text) => {
    // Handle bold+italic, bold, italic, inline code
    const parts = [];
    const regex = /(`[^`]+`|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__)/g;
    let last = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > last) parts.push(text.slice(last, match.index));
      const raw = match[0];
      if (raw.startsWith('`'))
        parts.push(<code key={key()} className="bg-black/30 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">{raw.slice(1, -1)}</code>);
      else if (raw.startsWith('***'))
        parts.push(<strong key={key()}><em>{raw.slice(3, -3)}</em></strong>);
      else if (raw.startsWith('**'))
        parts.push(<strong key={key()} className="font-bold text-[var(--text-primary)]">{raw.slice(2, -2)}</strong>);
      else if (raw.startsWith('*') || raw.startsWith('_'))
        parts.push(<em key={key()}>{raw.slice(1, -1)}</em>);
      last = match.index + raw.length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
  };

  while (i < lines.length) {
    const line = lines[i];

    // --- Code block ---
    if (line.trimStart().startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={key()} className="bg-black/40 border border-white/10 rounded-xl p-4 my-3 overflow-x-auto text-sm font-mono text-blue-200 leading-relaxed">
          {codeLines.join('\n')}
        </pre>
      );
      i++;
      continue;
    }

    // --- Horizontal rule ---
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(line.trim())) {
      elements.push(<hr key={key()} className="border-white/10 my-4" />);
      i++;
      continue;
    }

    // --- Headings ---
    const h3 = line.match(/^###\s+(.*)/);
    const h2 = line.match(/^##\s+(.*)/);
    const h1 = line.match(/^#\s+(.*)/);
    if (h1) {
      elements.push(<h1 key={key()} className="text-xl font-bold mt-5 mb-2 text-[var(--text-primary)]">{renderInline(h1[1])}</h1>);
      i++; continue;
    }
    if (h2) {
      elements.push(<h2 key={key()} className="text-lg font-bold mt-4 mb-2 text-[var(--text-primary)]">{renderInline(h2[1])}</h2>);
      i++; continue;
    }
    if (h3) {
      elements.push(<h3 key={key()} className="text-base font-bold mt-3 mb-1 text-[var(--text-primary)]">{renderInline(h3[1])}</h3>);
      i++; continue;
    }

    // --- Bullet list ---
    if (/^[\s]*[-*•]\s+/.test(line)) {
      const listItems = [];
      while (i < lines.length && /^[\s]*[-*•]\s+/.test(lines[i])) {
        const itemText = lines[i].replace(/^[\s]*[-*•]\s+/, '');
        listItems.push(
          <li key={key()} className="flex gap-2 items-start leading-relaxed">
            <span className="text-blue-400 mt-1.5 flex-shrink-0">•</span>
            <span>{renderInline(itemText)}</span>
          </li>
        );
        i++;
      }
      elements.push(<ul key={key()} className="space-y-1.5 my-2 pl-1">{listItems}</ul>);
      continue;
    }

    // --- Numbered list ---
    if (/^[\s]*\d+[.)]\s+/.test(line)) {
      const listItems = [];
      let num = 1;
      while (i < lines.length && /^[\s]*\d+[.)]\s+/.test(lines[i])) {
        const itemText = lines[i].replace(/^[\s]*\d+[.)]\s+/, '');
        listItems.push(
          <li key={key()} className="flex gap-2 items-start leading-relaxed">
            <span className="text-blue-400 font-bold flex-shrink-0 w-5 text-right">{num}.</span>
            <span>{renderInline(itemText)}</span>
          </li>
        );
        i++; num++;
      }
      elements.push(<ol key={key()} className="space-y-1.5 my-2 pl-1">{listItems}</ol>);
      continue;
    }

    // --- Empty line → paragraph break ---
    if (line.trim() === '') {
      elements.push(<div key={key()} className="h-2" />);
      i++;
      continue;
    }

    // --- Normal paragraph ---
    elements.push(
      <p key={key()} className="leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-0.5 text-[15px]">{elements}</div>;
};

export default MarkdownMessage;

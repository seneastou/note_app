
import React from 'react';
import ReactMarkdown from 'react-markdown';

type MarkdownViewerProps = {
  content: string;
};

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

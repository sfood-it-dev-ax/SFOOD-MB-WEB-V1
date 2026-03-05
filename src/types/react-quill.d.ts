declare module 'react-quill' {
  import * as React from 'react';
  import type QuillType from 'quill';

  export interface ReactQuillProps {
    className?: string;
    theme?: string;
    value?: string;
    defaultValue?: string;
    modules?: Record<string, unknown>;
    formats?: string[];
    readOnly?: boolean;
    placeholder?: string;
    bounds?: string | HTMLElement;
    onChange?: (value: string, delta: unknown, source: string, editor: unknown) => void;
    onFocus?: (range: unknown, source: string, editor: unknown) => void;
    onBlur?: (previousRange: unknown, source: string, editor: unknown) => void;
  }

  export default class ReactQuill extends React.Component<ReactQuillProps> {
    focus(): void;
    blur(): void;
    getEditor(): QuillType;
  }
}

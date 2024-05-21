declare module 'react-csv' {
  import * as React from 'react';

  type Data = string[][] | object[];
  type Headers = { label: string; key: string }[];

  export interface CSVLinkProps {
    data: Data;
    headers?: Headers;
    separator?: string;
    filename?: string;
    uFEFF?: boolean;
    className?: string;
    asyncOnClick?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>, done: (proceed: boolean) => void) => void;
    target?: string;
  }

  export class CSVLink extends React.Component<CSVLinkProps> {}

  export interface CSVDownloadProps {
    data: Data;
    headers?: Headers;
    separator?: string;
    filename?: string;
    uFEFF?: boolean;
    target?: string;
  }

  export class CSVDownload extends React.Component<CSVDownloadProps> {}
}

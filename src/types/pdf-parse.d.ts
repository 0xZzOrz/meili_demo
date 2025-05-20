declare module 'pdf-parse' {
  interface PDFParseData {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
    text: string;
  }
  function pdfParse(buffer: Buffer | Uint8Array): Promise<PDFParseData>;
  export = pdfParse;
} 
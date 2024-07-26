import React from 'react';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { pdfjs } from 'react-pdf';
import { Button } from 'antd';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
  };

const maxWidth = 300;

export default function MemoireLecture() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  //useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function doTheWork(e){
    e.preventDefault();
    if((pageNumber+1) <= numPages){
        setPageNumber(pageNumber+1)
    }
  }


  const doTheWorkBack = e =>{
    e.preventDefault();
    if((pageNumber-1) > 0){
        setPageNumber(pageNumber-1)
    }
  }

  return (
    <>
    <div>
        <Button onClick={doTheWorkBack}>previous page</Button>
        <Button onClick={doTheWork}>next page</Button>
        <Document file={require('./book.pdf')} options={options} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} 
                    width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}/>
            {/* {Array.from(new Array(numPages), (el, index) => (
                <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                />
                ))} */}
        </Document>
        <Button onClick={doTheWorkBack}>previous page</Button>
        <Button onClick={doTheWork}>next page</Button>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
    </>
  );
}


// import { Button } from 'antd';
// import React from 'react';


// export default function MemoireLecture() {
//     return (
//         <><div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//             <div style={{ backgroundColor: '#BEC9CB', padding: '20px', textAlign: 'right' }}>
//                 <Button style={{ backgroundColor: '#fff', color: '#BEC9CB' }}>Enregistrer</Button>
//             </div>
//             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//                 <h1 style={{ fontSize: '50px', fontFamily: 'monospace' }}>Titre Mémoire</h1>
//                 <p>PAGE1 - page2 - page3 - ...</p>
//             </div>
//         </div></>
//     );
// }
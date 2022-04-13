

declare module 'react-web-vector-icons' {

  export default function Icon({name,size,color,font}:icon):any;
}
// import Icon from './src/index'

declare module 'react-file-preview-latest' {

  export default function FileViewer({file,type,url,onError}:FileViewerType):any;
}
declare module 'react-file-viewer' {

  export default function FileViewer({fileType,filePath,errorComponent,onError}:reactFileViewer):any;
}


declare module 'frappe-gantt' {

  export default class Gantt extends React.Component<any,any,any> {
    constructor(ref:any,data:any,options:any);
  }
}

interface icon {
name: string,
size: number,
color: string,
font:string,
style?:{},
className?:string

}



interface reactFileViewer {
  fileType: string,
  filePath?: any,
  errorComponent?:()=>void,

  onError?:()=>void,
  }
interface FileViewerType {
  type: string,
  file?: any,
  url?: string,

  onError?:()=>void,
  }






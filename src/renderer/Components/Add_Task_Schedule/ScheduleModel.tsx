export const  projectScheduleModel= {


  name:'',
  start:'',
  end:'',
  team:[] as any,
  dependencies:"",
  progress:0,
  id:0


}

export type  projectScheduleModelType= {


  name:string,
  start:string,
  end:string,
  team:any[],
  dependencies:string,
  progress:number;
  id?:number

}

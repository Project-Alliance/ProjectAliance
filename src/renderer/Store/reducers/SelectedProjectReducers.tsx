

interface ActionType{
type:"SELECT_PROJECT"|"REMOVE_PROJECT";
  project:any;
}

export const SelectedProject=(state={},action:ActionType)=>{

  debugger;
  const {project,type}=action
  switch(type)
  {
    case "SELECT_PROJECT":
      return project;
    case "REMOVE_PROJECT":
      return {};
    default:
      return state;
  }

}

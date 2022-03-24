
export const HomeSideBarButtons=[
  {

            title:"Home",
            font:"AntDesign",
            iconName:"home",
            to:"/"
  },
  {

    title:"My Task",
    font:"FontAwesome",
    iconName:"tasks",
    to:"/mytask"
},
{

  title:"Reporting",
  font:"Entypo",
  iconName:"line-graph",
  to:"/reporting",
},
{

  title:"Inbox",
  font:"AntDesign",
  iconName:"message1",
  to:"/inbox"
},
{

  title:"Goals",
  font:"Entypo",
  iconName:"bar-graph",
  to:"/goals",
  seprator:true
},
{

  title:"Account",
  font:"MaterialCommunityIcons",
  iconName:"account-outline",
  to:"/account",

},
{

  title:"Invite Teammates",
  font:"AntDesign",
  iconName:"addusergroup",
  to:"/invites",

},
{

  title:"Settings",
  font:"AntDesign",
  iconName:"setting",
  to:"/setting",

},
{

  title:"Help",
  font:"Ionicons",
  iconName:"ios-help-circle-outline",
  to:"/help",
}
]
export const ProjectSideBarButtons=[
  {

            title:"Back",
            font:"AntDesign",
            iconName:"back",
            to:"/"
  },
  {

    title:"Requirement Analysis",
    font:"FontAwesome",
    iconName:"tasks",
    to:"/requirementanalysis"
},
{

  title:"Design",
  font:"FontAwesome",
  iconName:"tasks",
  to:"/design"
},
{

  title:"Development",
  font:"FontAwesome",
  iconName:"tasks",
  to:"/development"
},
{

  title:"Testing",
  font:"FontAwesome",
  iconName:"tasks",
  to:"/testing"
},
{

  title:"Deployment",
  font:"FontAwesome",
  iconName:"tasks",
  to:"/deployment"
},
{

  title:"Release",
  font:"FontAwesome",
  iconName:"tasks",
  to:"/release"
},
  {

    title:"My Task",
    font:"FontAwesome",
    iconName:"tasks",
    to:"/mytask"
},
{

  title:"Reporting",
  font:"Entypo",
  iconName:"line-graph",
  to:"/reporting",
},
{

  title:"Inbox",
  font:"AntDesign",
  iconName:"message1",
  to:"/inbox"
},
{

  title:"Goals",
  font:"Entypo",
  iconName:"bar-graph",
  to:"/goals",
  seprator:true
},
{

  title:"Account",
  font:"MaterialCommunityIcons",
  iconName:"account-outline",
  to:"/account",

},
{

  title:"Invite Teammates",
  font:"AntDesign",
  iconName:"addusergroup",
  to:"/invites",

},
{

  title:"Settings",
  font:"AntDesign",
  iconName:"setting",
  to:"/setting",

},
{

  title:"Help",
  font:"Ionicons",
  iconName:"ios-help-circle-outline",
  to:"/help",
}
]







interface ActionType{
  type:"HOME_SCREEN"|"PROJECT_SCREEN";
}

export const SideBarButton=(state=HomeSideBarButtons,action:ActionType)=>{

  const {type}=action
  switch(type)
  {
    case "HOME_SCREEN":
      return HomeSideBarButtons;
    case "PROJECT_SCREEN":
      return ProjectSideBarButtons;
    default:
      return state;
  }

}

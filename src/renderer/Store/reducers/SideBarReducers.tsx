
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
    iconName:"linode",
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

    title:"Manage Documents",
    font:"AntDesign",
    iconName:"switcher",
    to:"/manage-documents"
},
  {

    title:"Manage Requirements",
    font:"AntDesign",
    iconName:"switcher",
    to:"/requirements"
},
{

  title:"Design",
  font:"FontAwesome",
  iconName:"tencent-weibo",
  to:"/design"
},
{

  title:"Development",
  font:"Entypo",
  iconName:"code",
  to:"/development"
},
{

  title:"Testing",
  font:"Feather",
  iconName:"sliders",
  to:"/testing"
},
{

  title:"Release",
  font:"AntDesign",
  iconName:"rocket1",
  to:"/release"
},
  {

    title:"My Task",
    font:"FontAwesome",
    iconName:"linode",
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

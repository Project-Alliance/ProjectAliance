
export const HomeSideBarButtons=[
  {

            title:"Home",
            font:"AntDesign",
            iconName:"home",
            to:"/"
  },
  {

    title:"Mail Box",
    font:"AntDesign",
    iconName:"switcher",
    to:"/mailbox"
},
// {

//   title:"Inbox",
//   font:"AntDesign",
//   iconName:"message1",
//   to:"/inbox"
// },
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
  to:"/addmembers",


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

    title:"DashBoard",
    font:"MaterialCommunityIcons",
    iconName:"view-dashboard-outline",
    to:"/Projects"
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

  title:"Quality",
  font:"Feather",
  iconName:"sliders",
  to:"/quality"
},
{

  title:"Change Management",
  font:"MaterialIcons",
  iconName:"track-changes",
  to:"/change"
},

{

  title:"Manage Project Team",
  font:"Feather",
  iconName:"users",
  to:"/ManageTeam"
},
{

  title:"Project Schedule",
  font:"FontAwesome",
  iconName:"linode",
  to:"/mytask"
},
// {

//   title:"Inbox",
//   font:"AntDesign",
//   iconName:"message1",
//   to:"/inbox"
// },
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
  to:"/addmembers",

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

import React from "react";
import { useLocation, useParams } from "react-router-dom";

const ElementWrapper = (props) => {
  const params = useParams();
  const locations = useLocation();
  const Element = props.routeElement;

  return <Element params={params} locations={locations} {...props} />;
};

export default ElementWrapper;








































// import {
//     useLocation,
//     useNavigate,
//     useParams,
//   } from "react-router-dom";
  
// export default function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//       let location = useLocation();
//       let navigate = useNavigate();
//       let params = useParams();
//       return (
//         <Component
//           {...props}
//           router={{ location, navigate, params }}
//         />
//       );
//     }
  
//     return ComponentWithRouterProp;
//   }
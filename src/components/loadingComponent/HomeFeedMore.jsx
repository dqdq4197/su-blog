import React from "react"
import ContentLoader from "react-content-loader" 

const HomeFeed = () => (
  <ContentLoader 
    speed={3}
    width={'100%'}
    height={400}
    viewBox="0 0 100% 340"
    backgroundColor="#e1e1e1"
    foregroundColor="#d3d1d1"
  >
    <circle cx="36" cy="36" r="20" /> 
    <rect x="64" y="24" rx="3" ry="3" width="88" height="6" /> 
    <rect x="64" y="42" rx="3" ry="3" width="52" height="6" /> 
    <rect x="16" y="82" rx="3" ry="3" width="120" height="23" /> 
    <rect x="16" y="112" rx="3" ry="3" width="45" height="20" /> 
    <rect x="0" y="146" rx="3" ry="3" width="100%" height="240" />     
  </ContentLoader>
)

export default HomeFeed
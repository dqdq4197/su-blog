import React from "react"
import ContentLoader from "react-content-loader" 

const HomeFeed = () => (
  <ContentLoader 
    speed={3}
    width={'100%'}
    height={1160}
    viewBox="0 0 800 1200"
    backgroundColor="#e1e1e1"
    foregroundColor="#d3d1d1"
    >
    <circle cx="36" cy="36" r="20" /> 
    <rect x="64" y="24" rx="3" ry="3" width="88" height="6" /> 
    <rect x="64" y="42" rx="3" ry="3" width="52" height="6" /> 
    <rect x="16" y="82" rx="3" ry="3" width="120" height="23" /> 
    <rect x="16" y="112" rx="3" ry="3" width="45" height="20" /> 
    <rect x="0" y="146" rx="3" ry="3" width="100%" height="360" /> 
    <rect x="65" y="112" rx="3" ry="3" width="45" height="20" /> 
    <rect x="16" y="515" rx="3" ry="3" width="90%" height="10" /> 
    <rect x="16" y="530" rx="3" ry="3" width="90%" height="10" /> 
    <rect x="16" y="545" rx="3" ry="3" width="90%" height="10" /> 
    <rect x="80%" y="560" rx="3" ry="3" width="100" height="10" /> 
    
    <circle cx="36" cy="615" r="20" /> 
    <rect x="64" y="603" rx="3" ry="3" width="88" height="6" /> 
    <rect x="64" y="621" rx="3" ry="3" width="52" height="6" /> 
    <rect x="16" y="661" rx="3" ry="3" width="120" height="23" /> 
    <rect x="16" y="691" rx="3" ry="3" width="45" height="20" /> 
    <rect x="0" y="725" rx="3" ry="3" width="100%" height="360" /> 
    <rect x="65" y="691" rx="3" ry="3" width="45" height="20" /> 
    <rect x="16" y="1094" rx="3" ry="3" width="90%" height="10" /> 
    <rect x="16" y="1109" rx="3" ry="3" width="90%" height="10" /> 
    <rect x="16" y="1124" rx="3" ry="3" width="100" height="10" />
    <rect x="80%" y="1139" rx="3" ry="3" width="100" height="10" /> 
  </ContentLoader>
)

export default HomeFeed
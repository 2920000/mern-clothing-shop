const toggle=(e,timeout1Ref,timeout2Ref,userFeatureRef)=>{
    if (e.type === "mouseenter") {
        clearTimeout(timeout2Ref.current);
        userFeatureRef.current.style.opacity = "1";
        timeout1Ref.current = setTimeout(() => {
          userFeatureRef.current.style.display = "block";
        }, 150);
      } else {
        clearTimeout(timeout1Ref.current);
        userFeatureRef.current.style.opacity = "0";
        timeout2Ref.current = setTimeout(() => {
          userFeatureRef.current.style.display = "none";
        },150);
      }
}
export default toggle
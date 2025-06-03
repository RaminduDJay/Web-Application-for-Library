import MySVG from "./404.svg";
const PageNotFound = () => {
    return ( 
        
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
            
          }}>
        <img src={MySVG} height={700} alignItems={'center'} />
        </div>
     );
}
 
export default PageNotFound;
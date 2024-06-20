import reactLogo from '../assets/react.svg';


export const ReactLogo = ()=>{
    return (
        <img 
            src={reactLogo} 
            alt="Logo de react" 
            className='floating-elements'
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '60px',
            }} 
        />
    )
}
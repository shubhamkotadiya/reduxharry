import { createContext, useEffect, useReducer, useState } from 'react';
export const StuffGridContext = createContext({});
const StuffGridConfig = (props) => {
    const [config, setConfig] = useState({
        spacing: 2,
        tiles_at_md: 6,
        tiles_at_sm: 6,
        tiles_at_xs: 6,
    });

    const onResize = () => {
        if (window.innerWidth >960 ) {
            setConfig({
                spacing: 4,
                tiles_at_md: 6,
                tiles_at_sm: 12,
                tiles_at_xs: 12,
            })
        } else if (window.innerWidth <= 960 && window.innerWidth >= 480) {
            setConfig({
                spacing: 2,
                tiles_at_md: 12,
                tiles_at_sm: 12,
                tiles_at_xs: 12,
            })
        } else {
            setConfig({
                spacing: 2,
                tiles_at_md: 12,
                tiles_at_sm: 12,
                tiles_at_xs: 12,
            })
        }
    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])
    return (
        <StuffGridContext.Provider value={config}>
            {props.children}
        </StuffGridContext.Provider>
    );
}
export default StuffGridConfig;



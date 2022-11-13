import { createContext, useEffect, useReducer, useState } from 'react';
export const GridContext = createContext({});
const GridConfig = (props) => {
    const [config, setConfig] = useState({
        spacing: 4,
        tiles_at_md: 3,
        tiles_at_sm: 4,
        tiles_at_xs:6,
    });

    const onResize = () => {
        if (window.innerWidth > 960) {
            setConfig({
                spacing: 4,
                tiles_at_md: 3,
                tiles_at_sm: 4,
                tiles_at_xs:6,
            })
        } else if (window.innerWidth <= 960 && window.innerWidth >= 480) {
            setConfig({
                spacing: 2,
                tiles_at_md: 3,
                tiles_at_sm: 4,
                tiles_at_xs:6,
            })
        } else {
            setConfig({
                spacing: 2,
                tiles_at_md: 3,
                tiles_at_sm: 4,
                tiles_at_xs:6,
            })
        }
    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])
    return (
        <GridContext.Provider value={config}>
            {props.children}
        </GridContext.Provider>
    );
}
export default GridConfig;
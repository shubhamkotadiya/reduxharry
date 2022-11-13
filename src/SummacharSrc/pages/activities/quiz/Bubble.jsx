import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LiquidFillGauge from 'react-liquid-gauge';
const Bubble = (Props) => {
        
    const value = Props.value;    
    let fillColor = "#4DFEA0";
    if(Props.type=="success"){
        fillColor = "#4DFEA0";
    }else if(Props.type=="danger"){
        fillColor = "#FF6D6D";
    }else{
        fillColor = "#B8B8B9"
    }


    const [radius, setSize] = useState(72);
    let lastTime = 0;

    useEffect(() => {
        if (window.innerWidth <= 350) {
            setSize(40)
        } else if(window.innerWidth > 350 && window.innerWidth <650) {
            setSize(55)
        } else {
            setSize(72)
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 350) {
                setSize(40)
            } else if(window.innerWidth > 350 && window.innerWidth <650) {
                setSize(55)
            } else {
                setSize(72)
            }
        });
        return () => { return window.removeEventListener('resize', () => { }) }
    }, [])
    const gradientStops = [
        {
            key: '0%',
            stopColor: color(fillColor).darker(0.5).toString(),
            stopOpacity: 1,
            offset: '0%'
        },       
        {
            key: '50%',
            stopColor: fillColor,
            stopOpacity: 0.75,
            offset: '50%'
        },
        {
            key: '100%',
            stopColor: color(fillColor).brighter(0.5).toString(),
            stopOpacity: 0.5,
            offset: '100%'
        }
    ];
    return(
        <div>
            <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={radius * 2}
                    height={radius * 2}
                    value={value}
                    percent="%"
                    textSize={1.3}
                    textOffsetX={0}
                    textOffsetY={12}
                    textRenderer={(props) => {
                                                
 
                        return (
                            <tspan>
                                <tspan className="value" style={{fontSize:"38px",fontWeight:"600",color:"#0C0A29"}}>{Props.count}</tspan>                                
                            </tspan>
                        );
                    }}
                    riseAnimation
                    waveAnimation
                    waveFrequency={2}
                    waveAmplitude={2}
                    gradient
                    gradientStops={gradientStops}
                    circleStyle={{
                        fill: fillColor
                    }}
                    waveStyle={{
                        fill: fillColor
                    }}
                    textStyle={{
                        fill: color('#0C0A29').toString(),
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: color('#0C0A29').toString(),
                        fontFamily: 'Arial'
                    }}
                    
                />
        </div>
    )
}
export default Bubble;
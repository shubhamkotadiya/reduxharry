import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import jokeEmo from "../../assets/images/joke-laughing-emoji.gif";

function ValueLabelComponent(props) {
    const { children, value } = props;

    return (
        { children }
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
};





const PrettoSlider = styled(Slider)({
    color: '#BFDBF3',
    background: "linear-gradient(90deg, #348FD9 0 %, rgba(52, 143, 217, 0) 185.16 %)",
    position: "relative",
    height: 16,
    '& .MuiSlider-track': {
        border: 'none',
    }
});



export default function CustomizedSlider(props) {
    const [visible, setVisible] = React.useState({ visiblity: false, value: 0 })
    const [sliderVal, setSLideVal] = React.useState(props.data.stuff_rating ? props.data.stuff_rating : 0)
    const handleChangeCommitted = async (event, newValue) => {
        setSLideVal(newValue)
        await props.submitRange(newValue, props.data.uuid)
        setVisible({ visiblity: true, value: newValue })
        setTimeout(() => {
            setVisible({ visiblity: false, value: 0 })
        }, 1000)
    };

    const ImageThumb = (props) => {
        if (props) {
            const { children, ...other } = props;
            return (
                <div className='row df column p-relative'>
                    <SliderThumb {...other}>
                        {children}
                        <img
                            src={jokeEmo}
                            alt="loading"
                            style={{ borderRadius: 20, transition: 'all 1s linear', height: '50' + 'px', width: '50' + 'px' }}
                        />
                    </SliderThumb>
                    {visible.visiblity && <img

                        src={jokeEmo}
                        className='animate-jok-of-day'
                        alt="loading"
                        style={{ borderRadius: 20, position: "absolute", zIndex: 1, transform: "translate(-50%,-50%)", left: visible.value + "%", top: '0px', transition: 'all 1s linear', height: '50' + 'px', width: '50' + 'px' }}
                    />}
                </div>

            );
        }
        else {
            return (
                <></>
            );
        }
    };
    return (

        <PrettoSlider
            valueLabelDisplay="none"
            aria-label="none"
            defaultValue={sliderVal}
            
            disabled={props.data.stuff_rating && props.data.stuff_rating}
            components={{ Thumb: ImageThumb }}
            ThumbComponent={ImageThumb}
            onChangeCommitted={props.data.stuff_rating && props.data.stuff_rating !== false ? () => { } : handleChangeCommitted}
        />

        //    <><form > <input type="range" min="1" max="100" defaultValue="50" class="sliders" name="range"/> </form> </>
    );
}


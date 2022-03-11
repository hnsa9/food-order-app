import classes from './Input.module.css';
import React from "react";

const Input = React.forwardRef((props, ref) => {

    // const inputRef = useRef();

    // const activate = () => {
    //     // inputRef.current.event.target.value();
    //     console.log(inputRef.current.event.target.value());

    // };

    // useImperativeHandle(ref, () => {
    //     return {
    //         focus: activate //refer to function 
    //     };
    // })

    return <div className={classes.input}>
    <label htmlFor={props.input.id}>{props.label}</label>
    <input ref={ref} {...props.input}/>
    </div>



});

export default Input;
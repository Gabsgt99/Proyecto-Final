/* import React, {useState} from "react";
import TimePicker from "rc-time-picker";
import moment from "moment";
import "rc-time-picker/assets/index.css";

export default function TimePickerComp({initial}) {
  const [time, setTime] = useState();

  const onChange = (e) => {
    console.log(moment(e).format("H:mm"));
    setTime(moment(e).format("H:mm"));
  };

  return (
    <TimePicker onChange={onChange} 
        value={ time ?  moment(time, "H:mm") : initial ? moment(initial, "H:mm"): null }
        minuteStep={30}
        showSecond={false}
      />
    
    );
}; */
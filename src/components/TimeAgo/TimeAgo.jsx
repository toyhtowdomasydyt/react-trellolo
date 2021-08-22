import React, {useEffect, useState} from "react";
import moment from "moment";

const TimeAgo = ({fromDate, updateInterval = 60000}) => {
    const [fromMoment, setFromMoment] = useState(moment(fromDate).fromNow());

    useEffect(() => {
        const interval = setInterval(() => {
            setFromMoment(moment(fromDate).fromNow());
        }, updateInterval);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>{fromMoment}</div>
    );
};

export default TimeAgo;

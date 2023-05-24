import React from "react";
import {embedDashboard} from "@superset-ui/embedded-sdk";


class ChartMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount = () => {
    };


    render() {
        console.log(document.querySelector('superset-container'))
        return (
            <div
                style={{
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                    height: "500px",
                    backgroundColor: "#dddddd"
                }}>

            </div>);
    }
}

export {ChartMain};
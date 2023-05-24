import './App.css';
import React from "react";
/*import {ChartMain} from "./components/ChartMain";
import {MainMenu} from "./components/MainMenu";
import {Grid} from "@mui/material"*/
import {embedDashboard} from "@superset-ui/embedded-sdk";
import { useEffect } from "react"

function App() {
    const getToken = async () => {
        const response = await fetch("/guest-token")
        console.log(response)
        const token = await response.json()
        return token
    }

    useEffect(() => {
        const embed = async () => {
            await embedDashboard({
                id: "45c5846b-aa8c-47c7-9d61-3d4559efc1f1",
                supersetDomain: "http://172.18.5.243:8088",
                mountPoint: document.getElementById("dashboard"), // html element in which iframe render
                fetchGuestToken: () => getToken(),
                dashboardUiConfig: {
                    hideTitle: true,
                    hideChartControls: true,
                    hideTab: true,
                },
            })
        }
        if (document.getElementById("dashboard")) {
            embed();
        }
    }, [])

    return (
        <div className="App">
            <h1>How to Embed Superset Dashboard into React</h1>
            <div id="dashboard"/>
        </div>
    )
}

/*class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: "0 8px",
                }}
            >
                <MainMenu
                    appName=""
                    components={{
                        ToolbarButtons: (props) => {
                            return (
                                <Grid container style={{width: 50}}>
                                </Grid>
                            );
                        },

                        Menu: (props) => {
                            return (
                                <div>
                                </div>
                            );
                        },
                    }}
                />
                <div style={{marginTop: "70px", height: "600px", width: "100%", flexGrow: 1}} >
                    <iframe
                        title="Dashboard"
                        src="http://localhost:8088/login?token=1234abcd456&next=/superset/dashboard/11?standalone=3"
                        width="100%"
                        height="800px"
                        sandbox="allow-same-origin allow-scripts"
                        id={"superset-container"}
                    >
                    </iframe>
                    {/!*<div >
                    </div>*!/}
                </div>
            </div>
        );
    }
}*/

export default App;
import React, {useRef} from 'react';
import {embedDashboard} from "@superset-ui/embedded-sdk"
import {useEffect} from "react"
import "./App.css"
import config from "config";
import {MainMenu} from "./components/MainMenu"
import {List} from '@mui/material';

function App() {
    const fetchAccessToken = async () => {
        let access_token = "";
        try {
            const body = {
                username: "UserForGuestToken",
                password: "Qge-vhr-Z6T-G3B",
                provider: "db",
                refresh: true,
            }
            await fetch(
                "http://superset.kopr:8088/api/v1/security/login",
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then(response => response.json()).then(res => access_token = res.access_token);
            return access_token;
        } catch (error) {
            return access_token;
        }
    }

    const fetchGuestToken = async () => {
        const accessToken = await fetchAccessToken()
        let token = "";
        try {
            const body = {
                resources: [
                    {
                        type: "dashboard",
                        id: "b3ff142c-67a8-4318-82c1-4a6ae769f565",
                    },
                ],
                rls: [],
                user: {
                    username: "UserForDashboard",
                    first_name: "NameUserForDashboard",
                    last_name: "FamilyUserForDashboard",
                },
            }
            let resultUrl = (config["apiUrlDev"] + "/" + "guest_token/").trim();
            await fetch(
                resultUrl,
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                        'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            ).then(response => response.json()).then(res => token = res.token);
            return token;
        } catch (error) {
            return token;
        }
    }

    const id = "b3ff142c-67a8-4318-82c1-4a6ae769f565";
    useEffect(() => {
        const embed = async () => {
            await embedDashboard({
                id: id,
                supersetDomain: "http://superset.kopr:8088",
                mountPoint: document.getElementById("dashboard"),
                fetchGuestToken: () => fetchGuestToken(),
                dashboardUiConfig: {
                    hideTitle: true,
                    hideChartControls: true,
                    hideTab: true,
                },
            })
        }
        if (document.getElementById("dashboard")) {
            embed().then((res) => {
            });
        }

    }, [])

    return (
        <div className="App">
            <MainMenu
                components={{
                    Menu: (props) => {
                        return (
                            <List>
                            </List>
                        );
                    },
                }}
            />
            <div style={{paddingTop: "50px"}}>
                <div id="dashboard" ></div>
            </div>
        </div>
    )
}

export default App
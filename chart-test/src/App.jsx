import { embedDashboard } from "@superset-ui/embedded-sdk"
import { useEffect } from "react"
import "./App.css"

function App() {

  async function fetchAccessToken() {
    try {
      const body = {
        username: "UserForGuestToken",
        password: "Qge-vhr-Z6T-G3B",
        provider: "db",
        refresh: true,
      }

      const response = await fetch(
        "http://superset.kopr:8088/api/v1/security/login",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const jsonResponse = await response.json()

      console.log(jsonResponse)

      return jsonResponse?.access_token
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchGuestToken() {
    const accessToken = await fetchAccessToken()
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
      const response = await fetch(
        "http://superset.kopr:8088/api/v1/security/guest_token",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const jsonResponse = await response.json()

      console.log(jsonResponse)

      return jsonResponse?.token
    } catch (error) {
      console.error(error)
    }
  }

  const getToken = async () => {
    const response = await fetch("http://localhost:5000/guest-token")
    const token = await response.json()
    return token
    // return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7Imxhc3RfbmFtZSI6IkZhbWlseVVzZXJGb3JEYXNoYm9hcmQiLCJ1c2VybmFtZSI6IlVzZXJGb3JEYXNoYm9hcmQiLCJmaXJzdF9uYW1lIjoiTmFtZVVzZXJGb3JEYXNoYm9hcmQifSwicmVzb3VyY2VzIjpbeyJpZCI6ImIzZmYxNDJjLTY3YTgtNDMxOC04MmMxLTRhNmFlNzY5ZjU2NSIsInR5cGUiOiJkYXNoYm9hcmQifV0sInJsc19ydWxlcyI6W10sImlhdCI6MTY4NjkyNDE4MS4xMTA0NjksImV4cCI6MTY4NjkyNDQ4MS4xMTA0NjksImF1ZCI6Imh0dHA6Ly9zdXBlcnNldDo4MDg4LyIsInR5cGUiOiJndWVzdCJ9.VON5JbtBtAHLM3U568h4AGQxp0SDtzbFuLYOg3zOvOA"
  }

  useEffect(() => {
    const embed = async () => {
      await embedDashboard({
        id: "b3ff142c-67a8-4318-82c1-4a6ae769f565", // given by the Superset embedding UI
        supersetDomain: "http://superset.kopr:8088",
        mountPoint: document.getElementById("dashboard"), // html element in which iframe render
        fetchGuestToken: () => getToken(),
//        fetchGuestToken: () => fetchGuestToken(),
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: true,
          hideTab: true,
        },
      })
    }
    if (document.getElementById("dashboard")) {
      embed()
    }
  }, [])

  return (
    <div className="App">
      <h1>How to Embed Superset Dashboard into React</h1>
      <div id="dashboard" />
    </div>
  )
}

export default App
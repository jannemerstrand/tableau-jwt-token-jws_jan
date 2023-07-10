import "./styles.css";
import { v4 as uuidv4 } from "uuid";

var jws = require("jws");

export default function App() {
  const url =
    "https://tableau.mozark.co/views/DeviceMonitoringandAvailabilityDashboard/DeviceUsage?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link";

  const connectedAppClientId = "13da5d42-603b-4676-8410-eb38263a634e";
  const connectedAppSecretId = "de0dab3a-8ca4-48da-b545-70cfe0c6e522";
  const connectedAppSecretKey = "VckvpxOssu0jpodQrw6oHcWkE1euhl4jueOcyfB+2gA=";
  const userName = "brajesh@mozark.ai";
  let data = {
    iss: connectedAppClientId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    jti: uuidv4(),
    aud: "tableau",
    sub: userName,
    scp: ["tableau:views:embed", "tableau:metrics:embed"]
  };
  let header = {
    alg: "HS256",
    typ: "JWT",
    kid: connectedAppSecretId,
    iss: connectedAppClientId
  };

  const token = jws.sign({
    header: header,
    payload: data,
    secret: connectedAppSecretKey
  });
  console.log(token);
  //console.log(uuidv4()),
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <tableau-viz
        id="tableauViz"
        src="https://tableau.mozark.co/views/DeviceMonitoringandAvailabilityDashboard/DeviceUsage?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link"
        toolbar="hidden"
        iframeSizedToWindow="true"
      ></tableau-viz>
    </div>
  );
}

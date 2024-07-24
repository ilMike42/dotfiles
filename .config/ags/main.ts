import Bar from "./panels/bar"
import { NotificationPopups } from "./panels/notificationPopups"


App.config({
	windows: [
		NotificationPopups(),
		Bar(0)
	],
	style: `${App.configDir}/style.css`
})

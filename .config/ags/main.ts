import Bar from "./panels/bar"
import { NotificationPopups } from "./panels/notificationPopups"
import OSD from "./widgets/osd/osd"


App.config({
	windows: [
		OSD(0),
		NotificationPopups(),
		Bar(0)
	],
	style: `${App.configDir}/style.css`
})

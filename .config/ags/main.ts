import Bar from "./panels/bar"
import { NotificationPopups } from "./panels/notificationPopups"
import BrightnessPopup from "./widgets/brightness-popup"
import VolumePopup from "./widgets/volume-popup"


App.config({
	windows: [
		VolumePopup(0),
		BrightnessPopup(0),
		NotificationPopups(),
		Bar(0)
	],
	style: `${App.configDir}/style.css`
})

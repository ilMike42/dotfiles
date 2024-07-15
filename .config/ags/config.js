import Bar from "./panels/bar.js"
import { NotificationPopups } from "./panels/notificationPopups.js"

Utils.monitorFile(
    // directory that contains the scss files
    `${App.configDir}/styles`,

    // reload function
    function() {
        // main scss file
        const scss = `${App.configDir}/styles/style.scss`

        // target css file
        const css = `${App.configDir}/style.css`

        // compile, reset, apply
        Utils.exec(`sassc ${scss} ${css}`)
        App.resetCss()
        App.applyCss(css)
    },
)

App.config({
    windows: [
        NotificationPopups(),
        Bar(0),
    ],
    style: `${App.configDir}/style.css`
})

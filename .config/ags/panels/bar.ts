import Battery from "../widgets/battery"
import Brightness from "../widgets/brightness"
import DateTime from "../widgets/date-time"
import Workspaces from "../widgets/hyprland"
import Power from "../widgets/power-button"
import PowerProfiles from "../widgets/power-profiles"
import Rofi from "../widgets/rofi"
import SysTray from "../widgets/system-tray"
import Volume from "../widgets/volume"

//********** Menu box **********
const MenuBox = () => Widget.Box({
    class_name: 'widget-menu',
    children: [
        Brightness(),
        Volume(),
        Battery(),
        // PowerProfiles(),
    ]
})


const StartWidget = () => Widget.Box({
    class_name: 'start-widget',
    spacing: 5,
    children: [
        Rofi(),
        Workspaces()
    ]
})

const CenterWidget = () => Widget.Box({
    class_name: 'center-widget',
    children: [
        DateTime()
    ]
})

const EndWidget = () => Widget.Box({
    class_name: 'end-widget',
    spacing: 10,
    hpack: 'end',
    children: [
        SysTray(),
        MenuBox(),
        Power()
    ]
})

const Bar = (monitor: number) => Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
        start_widget: StartWidget(),
        center_widget: CenterWidget(),
        end_widget: EndWidget()
    }),
})

export default Bar;
import brightness from './../services/brightness'

const BrightnessIcon = () => Widget.Label({
    label: '󰃠'
})

const brightnessText = (brightness: number) => `${Math.floor(brightness)}%`

const BrightnessLabel = (brightness: number) => Widget.Label({
    label: brightnessText(brightness)
})

const BrightnessBar = (brightness: number) => Widget.LevelBar({
    class_name: 'osd-bar',
    widthRequest: 100,
    heightRequest: 20,
    value: brightness / 100,
})

// TODO: change hierarchy (too much functions maybe) and fix styling
const BrightnessBox = () => Widget.Box({
    class_name: 'box',
    vertical: true,
    spacing: 10,
    children: brightness.bind('screen_value').as(b => [
        BrightnessIcon(),
        BrightnessLabel(b),
        BrightnessBar(b)
    ])
})

// TODO: write better
let revealerTimer = setTimeout(
    () => { },
    1500
)

// TODO: change name
const revealer = Widget.Revealer({
    revealChild: false,
    transitionDuration: 1000,
    transition: 'crossfade',
    child: BrightnessBox(),
    setup: self => self.hook(brightness, self => {
        self.reveal_child = true;
        clearTimeout(revealerTimer);
        revealerTimer = setTimeout(
            () => {
                self.reveal_child = false;
            },
            1500
        )
    })
})

const BrightnessPopup = (monitor: number) => Widget.Window({
    monitor,
    class_name: 'osd',
    name: `brightnessPopup${monitor}`,
    layer: 'top',
    child: revealer
})

export default BrightnessPopup

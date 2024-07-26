const Icon = (icon: string) => Widget.Label({
    label: icon
})

const Label = (value: number) => Widget.Label({
    label: `${Math.floor(value)}%`
})

const Bar = (value: number) => Widget.LevelBar({
    class_name: 'osd-bar',
    widthRequest: 100,
    heightRequest: 20,
    value: value / 100,
})

// TODO: change hierarchy (too much functions maybe) and fix styling
const OSDBox = (icon: string, value: number) => Widget.Box({
    class_name: 'box',
    vertical: true,
    spacing: 10,
    children: [
        Icon(icon),
        Label(value),
        Bar(value)
    ]
})

export default OSDBox;

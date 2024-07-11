import brightness from './services/brightness.js'

const time = Variable('', {
    poll: [1000, function() {
        const date = new Date();

        const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };

        // Formatta la data e l'ora
        const formattedDate = `${date.toLocaleDateString('it-IT', optionsDate)} ${date.toLocaleTimeString('it-IT', optionsTime)}`;

        return formattedDate
    }],
})

//********** Rofi **********
const Rofi = () => Widget.Button({
    class_name: 'rofi',
    label: '󰣇',
    onPrimaryClick: () => Utils.exec('rofi -show drun')
})

//********** Hyprland **********
const hyprland = await Service.import('hyprland')

const focusedTitle = Widget.Label({
    label: hyprland.active.client.bind('title'),
    visible: hyprland.active.client.bind('address')
        .as(addr => !!addr),
})

const dispatch = ws => hyprland.messageAsync(`dispatch workspace ${ws}`);

const Workspaces = () => Widget.EventBox({
    class_name: 'workspaces',
    child: Widget.Box({
        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
            class_name: 'workspace',
            attribute: i,
            label: `${i}`,
            onClicked: () => dispatch(i),
            // width_request: 70
        })),

        // remove this setup hook if you want fixed number of buttons
        setup: self => self.hook(hyprland, () => self.children.forEach((btn, index) => {
            btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute);
            if (index === 0) {
                btn.label = ''
            }

            if (index === 1) {
                btn.label = ''
            }


            btn.toggleClassName('active', hyprland.active.workspace.id === index + 1)
        })),
    }),
})

//********** Battery **********
const battery = await Service.import('battery')

const getBatteryIcon = (percent, charging, charged) => {


    if (charged) {
        return '󰂅'
    }

    if (percent < 20) return charging ? '󰢜' : '󰁺';
    if (percent < 40) return charging ? '󰂆' : '󰁻';
    if (percent < 60) return charging ? '󰂈' : '󰁽';
    if (percent < 80) return charging ? '󰂉' : '󰁿';
    if (percent < 100) return charging ? '󰂊' : '󰂁';
    if (percent === 100) return '󰁹';


    return ''
}

const getBatteryString = (percent, charging, charged) => {
    return `${getBatteryIcon(percent, charging, charged)}  ${percent}%`
}


const Battery = () => Widget.Button({
    label: Utils.merge([battery.bind('percent'), battery.bind('charging'), battery.bind('charged')], getBatteryString)
})


//********** Brightness **********
let brightnessEnabled = Variable(false);

const Brightness = () => Widget.Box({
    children: [
        Widget.Button({
            label: brightness.bind('screen_value').as(b => `󰃠  ${b} %`),
            on_primary_click: () => brightnessEnabled.value = !brightnessEnabled.value
        }),
        Widget.Revealer({
            revealChild: brightnessEnabled.bind(),
            transitionDuration: 800,
            transition: 'slide_right',
            child:
                Widget.Slider({
                    class_name: 'brightness',
                    min: 1,
                    max: 100,
                    value: brightness.bind('screen_value'),
                    draw_value: false,
                    on_change: self => brightness.screen_value = self.value,
                    widthRequest: 175,
                }),
        })
    ]
})

//********** Volume **********
const audio = await Service.import('audio');
let volumeEnabled = Variable(false);

const Volume = () => Widget.Box({
    children: [
        Widget.Button({
            label: audio.speaker.bind('volume').as(v => `  ${Math.floor(v * 100)} %`),
            on_primary_click: () => volumeEnabled.value = !volumeEnabled.value
        }),
        Widget.Revealer({
            revealChild: volumeEnabled.bind(),
            transitionDuration: 800,
            transition: 'slide_right',
            child:
                Widget.Slider({
                    class_name: 'volume',
                    min: 1,
                    max: 100,
                    value: audio.speaker.bind('volume').as(v => v * 100),
                    draw_value: false,
                    on_change: self => audio.speaker.volume = self.value / 100,
                    widthRequest: 175,
                }),
        })
    ]
})

//********** System Tray **********
const systemtray = await Service.import('systemtray')

/** @param {import('types/service/systemtray').TrayItem} item */
const SysTrayItem = item => Widget.Button({
    child: Widget.Icon().bind('icon', item, 'icon'),
    tooltipMarkup: item.bind('tooltip_markup'),
    onPrimaryClick: (_, event) => item.openMenu(event),
    onSecondaryClick: (_, event) => item.activate(event),
});

const SysTray = () => Widget.Box({
    class_name: 'systray',
    children: systemtray.bind('items').as(i => i.map(SysTrayItem))
})

//********** Power Profiles **********
const powerProfiles = await Service.import('powerprofiles');

const getProfileIcon = (profile) => {
    switch (profile) {
        case 'power-saver':
            return '󰡳'
        case 'balanced':
            return '󰡵'
        case 'performance':
            return '󰡴'
    }

    return ''
}

const setPowerProfile = (powerProfile) => {
    Utils.exec(`powerprofilesctl set ${powerProfile}`)
}

const setNextPowerProfile = () => {
    const profiles = powerProfiles.profiles
    const activeProfile = powerProfiles.active_profile

    const activeProfileIndex = profiles.findIndex(profile => profile.Profile === activeProfile)

    const nextProfileIndex = (activeProfileIndex + 1) % profiles.length

    setPowerProfile(profiles[nextProfileIndex].Profile)
}

const PowerProfiles = () => Widget.Button({
    class_name: 'power-profiles',
    label: powerProfiles.bind('active_profile').as(p => getProfileIcon(p)),
    onPrimaryClick: (_, event) => {
        setNextPowerProfile();
    },
    setup: self => self.hook(powerProfiles, () => {
        self.toggleClassName('power-saver', powerProfiles.active_profile === 'power-saver')
        self.toggleClassName('performance', powerProfiles.active_profile === 'performance')
    })
})

//********** Power Button **********
const Power = () => Widget.Button({
    label: '⏻',
    class_name: 'power-button',
    onPrimaryClick: () => Utils.exec('rofi -show p -modi p:\'rofi-power-menu\'')
})

//********** Menu box **********
const MenuBox = () => Widget.Box({
    class_name: 'widget-menu',
    children: [
        Brightness(),
        Volume(),
        Battery(),
        PowerProfiles(),
    ]
})

//********** Date and Time **********
const DateTime = () => Widget.Label({
    class_name: 'date-label',
    hpack: 'center',
    label: time.bind(),
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

const Bar = (/** @type {number} */ monitor) => Widget.Window({
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
    windows: [Bar(0)],
    style: `${App.configDir}/style.css`
})

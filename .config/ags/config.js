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

//********** Hyprland **********
const hyprland = await Service.import('hyprland')

const focusedTitle = Widget.Label({
    label: hyprland.active.client.bind('title'),
    visible: hyprland.active.client.bind('address')
        .as(addr => !!addr),
})

const dispatch = ws => hyprland.messageAsync(`dispatch workspace ${ws}`);

const Workspaces = () => Widget.EventBox({
    onScrollUp: () => dispatch('+1'),
    onScrollDown: () => dispatch('-1'),
    child: Widget.Box({
        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
            attribute: i,
            label: `${i}`,
            onClicked: () => dispatch(i),
        })),

        // remove this setup hook if you want fixed number of buttons
        setup: self => self.hook(hyprland, () => self.children.forEach((btn, index) => {
            btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute);
            if (index === 0) {
                btn.label = ''
            }
        })),
    }),
})

//********** Battery **********
const battery = await Service.import('battery')

const Battery = () => Widget.Label({
    label: battery.bind('percent').as(p => `${p.toString()}%`)
})


//********** System Tray **********
const systemtray = await Service.import('systemtray')

/** @param {import('types/service/systemtray').TrayItem} item */
const SysTrayItem = item => Widget.Button({
    child: Widget.Icon().bind('icon', item, 'icon'),
    tooltipMarkup: item.bind('tooltip_markup'),
    onPrimaryClick: (_, event) => item.activate(event),
    onSecondaryClick: (_, event) => item.openMenu(event),
});

const sysTray = Widget.Box({
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

const PowerProfiles = Widget.Button({
    label: powerProfiles.bind('active_profile').as(p => getProfileIcon(p))
})



const Bar = (/** @type {number} */ monitor) => Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
        start_widget: Workspaces(),
        center_widget: Widget.Label({
            hpack: 'center',
            label: time.bind(),
        }),
        end_widget: Widget.Box({
            hpack: 'end',
            children: [
                sysTray,
                Battery(),
                PowerProfiles
            ]
        })
    }),
})


App.config({
    windows: [Bar(0)],
})

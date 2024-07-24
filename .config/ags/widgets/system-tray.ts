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

export default SysTray;

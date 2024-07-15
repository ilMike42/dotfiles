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

            if (index === 2) {
                btn.label = ''
            }

            if (index === 3) {
                btn.label = ''
            }


            btn.toggleClassName('active', hyprland.active.workspace.id === index + 1)
        })),
    }),
})

export default Workspaces;

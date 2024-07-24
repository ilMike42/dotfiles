import { Workspace } from "../types/service/hyprland";

//********** Hyprland **********
const hyprland = await Service.import('hyprland')

// const focusedTitle = Widget.Label({
//     label: hyprland.active.client.bind('title'),
//     visible: hyprland.active.client.bind('address')
//         .as(addr => !!addr),
// })

const dispatch = (ws: number) => hyprland.messageAsync(`dispatch workspace ${ws}`);

const getWorkspaceButton = (workspaceId: number) => {
    return Widget.Button({
        class_name: 'workspace',
        attribute: workspaceId,
        label: `${workspaceId}`,
        onClicked: () => dispatch(workspaceId),
        // width_request: 70
    });
}

const getWorkspaces = (workspaces: Workspace[]) => {
    return workspaces
        .sort((a, b) => a.id - b.id)
        .map(w => getWorkspaceButton(w.id));
}



const Workspaces = () => Widget.EventBox({
    class_name: 'workspaces',
    child: Widget.Box({
        children: hyprland.bind('workspaces').as(getWorkspaces),
        setup: self => self.hook(hyprland, () => self.children.forEach((btn) => {

            if (btn.attribute === 1) {
                btn.label = ''
            }

            if (btn.attribute === 2) {
                btn.label = ''
            }

            if (btn.attribute === 3) {
                btn.label = ''
            }

            if (btn.attribute === 4) {
                btn.label = ''
            }

            if (btn.attribute === 10) {
                btn.label = '󰌔'
            }


            btn.toggleClassName('active', hyprland.active.workspace.id === btn.attribute)
        })),
    }),
})

export default Workspaces;

import { Workspace } from "../types/service/hyprland";

enum WorkspaceEnum {
    Firefox = 1,
    Term,
    Obsidian,
    Spotify,
    Kodi = 10
}

//********** Hyprland **********
const hyprland = await Service.import('hyprland')

const dispatch = (ws: number) => hyprland.messageAsync(`dispatch workspace ${ws}`);

const workspaceIcon = (workspaceId: number) => {
    switch (workspaceId) {
        case WorkspaceEnum.Firefox:
            return '';
        case WorkspaceEnum.Term:
            return '';
        case WorkspaceEnum.Obsidian:
            return '';
        case WorkspaceEnum.Spotify:
            return '';
        case WorkspaceEnum.Kodi:
            return '󰌔';

        default:
            return `${workspaceId}`;
    }
}

const getWorkspaceButton = (workspaceId: number) => {
    return Widget.Button({
        class_name: 'workspace',
        attribute: workspaceId,
        label: workspaceIcon(workspaceId),
        onClicked: () => dispatch(workspaceId),
        // width_request: 70
    });
}

const getWorkspaces = (workspaces: Workspace[]) => {
    return workspaces
        .sort((a, b) => a.id - b.id)
        .map(w => getWorkspaceButton(w.id));
}

const workspacesSignal = Utils.watch(getWorkspaces(hyprland.workspaces), [
    [hyprland, 'workspace-added'],
    [hyprland, 'workspace-removed']
], () => {
    return getWorkspaces(hyprland.workspaces)
});



const Workspaces = () => Widget.EventBox({
    class_name: 'workspaces',
    child: Widget.Box({
        children: workspacesSignal,
        setup: self => self.hook(hyprland, () => self.children.forEach((btn) => {
            btn.toggleClassName('active', hyprland.active.workspace.id === btn.attribute)
        })),
    }),
})

export default Workspaces;

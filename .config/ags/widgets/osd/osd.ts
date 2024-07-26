const audio = await Service.import('audio');
import brightness from './../../services/brightness'
import OSDBox from './widgets/osd-box';

const VolumeIconText = (volume: number, is_muted: boolean | null) => {
    const percent_volume = Math.floor(volume * 100);

    if (is_muted || percent_volume === 0) return '';

    if (percent_volume < 50) return '';

    return '';
}



// TODO: fix memory leak (signals staying open?)

const volumeBox = Widget.Box({
    child: Utils.merge(
        [audio.speaker.bind('volume'), audio.speaker.bind('is_muted')],
        (volume: number, is_muted: boolean) => OSDBox(VolumeIconText(volume, is_muted), volume * 100))
})

const brightnessBox = Widget.Box({
    child: brightness.bind('screen_value').as(b => OSDBox('󰃠', b))
})

type StackType = 'volume' | 'brightness';
const stack = Widget.Stack({
    children: {
        'volume': volumeBox,
        'brightness': brightnessBox
    },
    shown: 'volume',
})

let visibilityTimer = setTimeout(
    () => { },
    1500
)

const onOSDStatusChanged = (widget: any, eventType: StackType) => {
    stack.shown = eventType;
    widget.visible = true;
    clearTimeout(visibilityTimer);

    visibilityTimer = setTimeout(
        () => {
            widget.visible = false;
        },
        1500
    )
}


const OSD = (monitor: number) => Widget.Window({
    monitor,
    class_name: 'osd',
    name: `volumePopup${monitor}`,
    layer: 'top',
    child: stack,
})
    .hook(brightness, (self) => onOSDStatusChanged(self, 'brightness'), 'screen-changed')
    .hook(audio.speaker, (self) => onOSDStatusChanged(self, 'volume'), 'notify::volume')
    .hook(audio.speaker, (self) => onOSDStatusChanged(self, 'volume'), 'notify::is-muted')

export default OSD;

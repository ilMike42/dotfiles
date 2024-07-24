const audio = await Service.import('audio');

const VolumeIconText = (volume: number, is_muted: boolean | null) => {
    const percent_volume = Math.floor(volume * 100);

    if (is_muted || percent_volume === 0) return '';

    if (percent_volume < 50) return '';

    return '';
}

const VolumeIcon = () => Widget.Label({
    label: Utils.merge(
        [audio.speaker.bind('volume'), audio.speaker.bind('is_muted')],
        VolumeIconText
    )
})


const VolumeText = () => audio.speaker.bind('volume').as(volume => `${Math.floor(volume * 100)}%`)

const VolumeLabel = () => Widget.Label({
    label: VolumeText()
})

const VolumeBar = () => Widget.LevelBar({
    class_name: 'osd-bar',
    widthRequest: 100,
    heightRequest: 20,
    value: audio.speaker.bind("volume").as(p => p),
})

// TODO: change hierarchy (too much functions maybe) and fix styling
const VolumeBox = () => Widget.Box({
    class_name: 'box',
    vertical: true,
    spacing: 10,
    children: [
        VolumeIcon(),
        VolumeLabel(),
        VolumeBar()
    ]
})

// TODO: write better and change names
let revealerTimer = setTimeout(
    () => { },
    1500
)

const revealer = Widget.Revealer({
    revealChild: false,
    transitionDuration: 1000,
    transition: 'crossfade',
    child: VolumeBox(),
    setup: self => self.hook(audio, self => {
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

const VolumePopup = (monitor: number) => Widget.Window({
    monitor,
    class_name: 'osd',
    name: `volumePopup${monitor}`,
    layer: 'top',
    child: revealer
})

export default VolumePopup;

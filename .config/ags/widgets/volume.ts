//********** Volume **********
const audio = await Service.import('audio');
let volumeEnabled = Variable(false);

const VolumeIcon = (volume: number, is_muted: boolean | null) => {
    const percent_volume = Math.floor(volume * 100);

    if (is_muted || percent_volume === 0) return '';

    if (percent_volume < 50) return '';

    return '';
}

const VolumeLabel = () => {
    return Utils.merge([audio.speaker.bind('volume'), audio.speaker.bind('is_muted')], (volume, is_muted) => `${VolumeIcon(volume, is_muted)}    ${Math.floor(volume * 100)}%`)
}

const Volume = () => Widget.Box({
    children: [
        Widget.Button({
            label: VolumeLabel(),
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

export default Volume;

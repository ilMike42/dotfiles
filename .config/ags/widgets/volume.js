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

export default Volume;
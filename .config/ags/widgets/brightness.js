//********** Brightness **********
import brightness from './../services/brightness.js'
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

export default Brightness;

// Price bar & price line (shader)

export default class Price {

    constructor(comp) {
        this.comp = comp
        this.data = comp.$props.data
    }

    // Defines an inline shader (has access to both
    // target & overlay's contexts)
    init_shader() {

        let layout = this.comp.$props.layout
        let config = this.comp.$props.config
        let comp = this.comp

        this.comp.$emit('new-shader', {
            target: 'sidebar', draw: ctx => {
                let w = ctx.canvas.width
                let h = config.PANHEIGHT
                let price = 0.0051;
                let lbl = /*bar.price*/(price).toFixed(layout.prec)
                ctx.fillStyle = 'red'; // bar.color

                let x = - 0.5
                let y = layout.$2screen(price) - h * 0.5 - 0.5
                let a = 7
                ctx.fillRect(x - 0.5, y, w + 1, h)
                ctx.fillStyle = comp.$props.colors.textHL
                ctx.textAlign = 'left'
                ctx.fillText(lbl, a, y + 15)

            }
        })
        this.shader = true
    }

    // Regular draw call for overaly
    draw(ctx, price) {
        if (!this.comp.$props.meta.last) return
        if (!this.shader) this.init_shader()

        let layout = this.comp.$props.layout
        let last = this.comp.$props.meta.last

        let dir = last[4] >= last[1]
        let color = dir ? this.green() : this.red()
        let y = layout.$2screen(price);

        ctx.strokeStyle = color
        ctx.setLineDash([1, 1])
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(layout.width, y)
        ctx.stroke()
        ctx.setLineDash([])
    }

    green() {
        return this.comp.colorCandleUp
    }

    red() {
        return this.comp.colorCandleDw
    }

}
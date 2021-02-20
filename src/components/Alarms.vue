<script>
import { Overlay } from 'trading-vue-js'

export default {
    name: 'Alarms',
    mixins: [Overlay],
    methods: {
        meta_info() {
            return { author: 'North', version: '1.0.0' }
        },
        draw(ctx) {
            let layout = this.$props.layout

            this.$props.data.forEach((p) => {
                ctx.beginPath()

                let pos = p[4] || this.y_position
                let y = layout.$2screen(pos);
                
                ctx.lineWidth = this.line_width
                ctx.strokeStyle = p[3] || this.line_color
                
                ctx.setLineDash([10, 10])
                ctx.moveTo(0, y)
                ctx.lineTo(this.layout.width, y)
                ctx.stroke()
                
                if (p[1]) this.draw_label(ctx, 0, p)
            })
        },
        draw_label(ctx, x, p) {
            let layout = this.$props.layout
            let side = p[2] ? 1 : -1
            x += 2.5 * side
            ctx.font = this.new_font
            let w = ctx.measureText(p[1]).width + 10
            let pos = p[4] || this.y_position
            let y = layout.$2screen(pos);

            if (p[2] == 0) {
                x += w + 25;
            }
            // x += w;

            ctx.fillStyle = p[3] || this.flag_color
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x + 10 * side, y - 10 * side)
            ctx.lineTo(x + (w + 10) * side, y - 10 * side)
            ctx.lineTo(x + (w + 10) * side, y + 10 * side)
            ctx.lineTo(x + 10 * side, y + 10 * side)
            ctx.closePath()
            ctx.fill()
            ctx.fillStyle = this.label_color
            ctx.textAlign = side < 0 ? 'right' : 'left'
            ctx.fillText(p[1], x + 15 * side, y + 4)
        },
        use_for() { return ['Alarms'] }
    },
    // Define internal setting & constants here
    computed: {
        sett() {
            return this.$props.settings
        },
        new_font() {
            return this.sett.font ||
            '12px ' + this.$props.font.split('px').pop()
        },
        flag_color() {
            return this.sett.flagColor || '#4285f4'
        },
        label_color() {
            return this.sett.labelColor || '#fff'
        },
        line_color() {
            return this.sett.lineColor || '#4285f4'
        },
        line_width() {
            return this.sett.lineWidth || 1.0
        },
        y_position() {
            return this.sett.yPosition || 0.9
        }
    }
}
</script>
/*
 * @Author: your name
 * @Date: 2020-04-18 09:07:24
 * @LastEditTime: 2020-04-18 09:08:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \git\Demo-3\dist\index.js
 */

// 初始变量
let canvas, ctx, w, h

// 集合站
let setup = () => {
    canvas = document.querySelector("#canvas")
    ctx = canvas.getContext("2d")
    reset()
    window.addEventListener("resize", () => {
        reset()
        draw()
    })
    canvas.addEventListener("click", draw)
}

// 获取边框属性
let reset = () => {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
    ctx.lineWidth = 4
}

// 逻辑函数
let draw = () => {
    // float(0~360)
    let hueOffset = Math.random() * 360
    ctx.fillRect(0, 0, w, h)
    let nrOfLines = 2500
    let deltaAngle = (Math.PI * 2) / nrOfLines
    ctx.save()
    ctx.translate(w / 2, h / 2)
    let a = w / 2,
        b = h / 2,
        c = Math.sqrt(a * a + b * b) * 1.05
    for (let i = 0; i < nrOfLines; i++) {
        let angle = i * deltaAngle
        let x = Math.cos(angle) * c
        let y = Math.sin(angle) * c
        let cp1x = Math.cos(angle + 1.6) * c * 0.15
        let cp1y = Math.sin(angle + 1.6) * c * 0.15
        let cp2x = Math.cos(angle + 0.5) * c * 0.65
        let cp2y = Math.sin(angle + 0.5) * c * 0.65
        let hue = (180 * angle) / Math.PI + hueOffset
        let l = Math.random() * 40 + 40
        ctx.strokeStyle = `hsla(${hue}, 90%, ${l}%, 0.6)`
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        ctx.stroke()
    }
    ctx.restore()
}

;(function () {
    setInterval(function () {
        setup()
        draw()
        clearInterval()
    }, 100)
})()

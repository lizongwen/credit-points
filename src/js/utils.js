let utils = {
	dragBall(id) {
		var block = document.getElementById(id)
		var body = document.getElementsByTagName('body')[0]
		var oW, oH
		block.addEventListener('touchstart', function (e) {
			var touches = e.touches[0]
			oW = touches.clientX - block.offsetLeft
			oH = touches.clientY - block.offsetTop
			document.addEventListener('touchmove', defaultEvent, { passive: false })
			body.style.overflow = 'hidden'
		}, { passive: false })
		block.addEventListener('touchmove', function (e) {
			var touches = e.touches[0]
			var oLeft = touches.clientX - oW
			var oTop = touches.clientY - oH
			if (oLeft < 0) {
				oLeft = 0
			} else if (oLeft > document.documentElement.clientWidth - block.offsetWidth) {
				oLeft = (document.documentElement.clientWidth - block.offsetWidth)
			}
			block.style.left = oLeft + 'px'
			block.style.top = oTop + 'px'
		}, { passive: false })
		block.addEventListener('touchend', function () {
			document.removeEventListener('touchmove', defaultEvent, { passive: false })
			body.style.overflow = ''
		}, { passive: false })

		function defaultEvent(e) {
			e.preventDefault()
		}
	},
	bb(){

	},
	cc(){

	}
}

export default utils;
let utils = {
	dragBall(id) {
		let block = document.getElementById(id)
		let body = document.getElementsByTagName('body')[0]
		let oW, oH
		block.addEventListener('touchstart', function (e) {
			let touches = e.touches[0]
			oW = touches.clientX - block.offsetLeft
			oH = touches.clientY - block.offsetTop
			document.addEventListener('touchmove', defaultEvent, { passive: false })
			body.style.overflow = 'hidden'
		}, { passive: false })
		block.addEventListener('touchmove', function (e) {
			let touches = e.touches[0]
			let oLeft = touches.clientX - oW
			let oTop = touches.clientY - oH
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
	getOS() {
		let userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
		let vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
		let appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

		if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios'
		if (/android/i.test(userAgent)) return 'android'
		if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
		if (/mac/i.test(appVersion)) return 'MacOSX'
		if (/win/i.test(appVersion)) return 'windows'
		if (/linux/i.test(appVersion)) return 'linux'
	}
}

export default utils;
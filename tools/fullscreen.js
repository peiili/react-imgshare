export const onFull = function () {
  if (document.documentElement.RequestFullScreen) {
    document.documentElement.RequestFullScreen();
  }
  //兼容火狐
  if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
  //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
  if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  }
  //兼容IE,只能写msRequestFullscreen
  if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}
export const onExitFull = function () {
  if (document.exitFullScreen) {
    document.exitFullscreen()
  }
  //兼容火狐
  if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  }
  //兼容谷歌等
  if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
  //兼容IE
  if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}


//Controllers images in little size
const imgOptionGameBoy = document.querySelector('.gameboyOption')
const imgOptionNokia = document.querySelector('.nokiaOption')

//Controllers images 
const imgBackgroundGameBoy = document.querySelector('.imgGameBoy')
const imgBackgroundNokia = document.querySelector('.imgNokia')
const textBackgroundOption = document.querySelector('.backgroundName')

//GeneralButtons
const btnGameBoy= document.querySelector('.GameBoyButtons')
const btnNokia= document.querySelector('.NokiaButtons')


//GameboyMode elements
export let GameboyMode = () =>{
    imgBackgroundNokia.style.visibility = "hidden"

    imgBackgroundGameBoy.style.visibility = "visible";
    imgBackgroundGameBoy.style.position = "absolute";
    imgBackgroundGameBoy.style.width = "75%";
    imgBackgroundGameBoy.style.top = "-0.75%";

    btnNokia.style.visibility = "hidden"
    btnGameBoy.style.visibility = "visible"
}
//NokiaMode elements
export let NokiaMode = ()=>{
 
    imgBackgroundNokia.style.visibility = "visible"
    imgBackgroundGameBoy.style.visibility = "hidden"
    btnNokia.style.visibility = "visible"
    btnGameBoy.style.visibility = "hidden"

}

export let GameboyModeInOptions = () => {
    imgOptionGameBoy.style.visibility = 'visible'
        imgOptionNokia.style.visibility = 'hidden'
        textBackgroundOption.style.visibility = 'visible'
        textBackgroundOption.innerHTML = "GB"
        textBackgroundOption.style.left="49%"       
        GameboyMode();
}
export let NokiaModeInOptions = () => {
    textBackgroundOption.style.visibility = 'visible'

    imgOptionGameBoy.style.visibility = 'hidden'
        imgOptionNokia.style.visibility = 'visible'
        textBackgroundOption.innerHTML = "Nokia"
        textBackgroundOption.style.left="48%"
        NokiaMode();
}
export let NoneModeInOptions = () => {
    textBackgroundOption.style.visibility = 'visible'

    imgOptionGameBoy.style.visibility = 'hidden'
        imgOptionNokia.style.visibility = 'hidden'
        textBackgroundOption.innerHTML = "None"
        textBackgroundOption.style.left="48.5%"
        imgBackgroundGameBoy.style.visibility = 'hidden'
        imgBackgroundNokia.style.visibility = 'hidden'

        btnNokia.style.visibility = "hidden"
    btnGameBoy.style.visibility = "hidden"
}
export let AllHiddenAssets = () => {
    imgOptionGameBoy.style.visibility = 'hidden'
    imgOptionNokia.style.visibility = 'hidden'
    textBackgroundOption.style.visibility = 'hidden'
}
export let AllDisplayAssets = () => {
    imgOptionGameBoy.style.visibility = 'visible'
    imgOptionNokia.style.visibility = 'visible'
    textBackgroundOption.style.visibility = 'visible'
}


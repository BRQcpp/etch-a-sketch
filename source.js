let container = document.querySelector('.sketch-container');
let containerMaxSize = 700; 
let squareSideSize = 15;
const minSquareSideSize = 10;
let mouseDown = false;
let widthValue = document.querySelector('#width').value;
let heightValue = document.querySelector('#height').value;
let widthInput = document.querySelector('#width');
let heightInput = document.querySelector('#height');
let submitButton = document.querySelector('.resize-button');
let pixelResizeInput = document.querySelector("#pixel-size");
let paintbrushTool = document.querySelector('.paintbursh-selection');
let rainbowbrushTool = document.querySelector('.rainbow-brush-selection');
let shadeTool = document.querySelector('.blackbrush-increase-selection');
let eraserTool = document.querySelector('.eraser-selecion');
let leftGridToggle = document.querySelector('.toggle-left');
let rightGridToggle = document.querySelector('.toggle-right');
let leftCursorToggle = document.querySelector('#toggle-cursor-l');
let rightCursorToggle = document.querySelector('#toggle-cursor-r');
let sketchContainer = document.querySelector('.sketch-container');
let gridOff = false;
let customCursors = false;

const paintburshSelected = paintbrushTool.getAttribute('id');
const eraserSelected = eraserTool.getAttribute('id');
const rainbowbrushSelected = rainbowbrushTool.getAttribute('id');
const blackbrushSelected = shadeTool.getAttribute('id');

let selectedTool = 0;

pixelResizeInput.value = squareSideSize;

pixelResizeInput.setAttribute('max', containerMaxSize);

setContainerSize(squareSideSize, containerMaxSize);

generateBoxes(widthValue, heightValue, squareSideSize);

addPaintEvent();

setSelected();

leftCursorToggle.addEventListener('click', () =>
{
    if(leftCursorToggle.classList.contains('toggle-animation-2'))
    {
        customCursors = true;
        sketchContainer.classList.add('crayon-cursor');
        transitionColorAnimation(leftCursorToggle, rightCursorToggle);
    }
});

rightCursorToggle.addEventListener('click', () =>
{
    if(rightCursorToggle.classList.contains('toggle-animation-2'))
    {
        customCursors = false;
        sketchContainer.classList.remove('crayon-cursor');
        transitionColorAnimation(rightCursorToggle, leftCursorToggle);
    }
});

leftGridToggle.addEventListener('click', () =>
{
    if(leftGridToggle.classList.contains('toggle-animation-2'))
    {
        let block = document.querySelector('.test');
        if(block.style.getPropertyValue('border') == 'none')
        {
            let blocks = document.querySelectorAll('.test');
            for(let block of blocks)
            {
                block.style.setProperty('border', '1px solid black');
            }
            gridOff = false;
        }
        transitionColorAnimation(leftGridToggle, rightGridToggle);
    }
});

rightGridToggle.addEventListener('click', () =>
{
    if(rightGridToggle.classList.contains('toggle-animation-2'))
    {
        let block = document.querySelector('.test');
        if(block.style.getPropertyValue('border') != 'none')
        {
            let blocks = document.querySelectorAll('.test');
            for(let block of blocks)
            {
                block.style.setProperty('border', 'none');
            }
            gridOff = true;
        }
        transitionColorAnimation(rightGridToggle, leftGridToggle);
    }
});

paintbrushTool.addEventListener('click', () => 
{
    unsetSelected();
    selectedTool = +paintburshSelected;
    setSelected();
});

rainbowbrushTool.addEventListener('click', () => 
{
    unsetSelected();
    selectedTool = +rainbowbrushSelected;
    setSelected();
});

shadeTool.addEventListener('click', () => 
{
    unsetSelected();
    selectedTool = +blackbrushSelected;
    setSelected();
});

eraserTool.addEventListener('click', () => 
{
    unsetSelected();
    selectedTool = +eraserSelected;
    setSelected();
});

container.addEventListener('mousedown', () => 
{
    mouseDown = true;
});

container.addEventListener('mouseup', () => 
{
    mouseDown = false;
});

container.addEventListener('mouseleave', () => 
{
    mouseDown = false;
});

submitButton.addEventListener('click', () =>
{

    if(widthInput.value < minSquareSideSize || widthInput.value > containerMaxSize || heightInput.value < minSquareSideSize || heightInput.value > containerMaxSize 
        || pixelResizeInput.value < minSquareSideSize || pixelResizeInput.value > containerMaxSize)
    {
        alert(`Values can be set from ${minSquareSideSize} to ${containerMaxSize}`);
        widthInput.value = widthValue;
        heightInput.value = heightValue;
        pixelResizeInput.value =  squareSideSize;
    }
    else
    {
        squareSideSize = pixelResizeInput.value;
        setContainerSize(squareSideSize, containerMaxSize);
        generateBoxes(widthValue, heightValue, squareSideSize);
    }

});

function transitionColorAnimation(firstElement, secondElement)
{
    if(firstElement.classList.contains('toggle-animation-2') && secondElement.classList.contains('toggle-animation-1'))
    {
        let did = true;
        firstElement.addEventListener('transitionend', () =>
        {
            if(did)
            {
                secondElement.classList.remove('toggle-animation-1');;
                secondElement.classList.add('toggle-animation-2');
                did = false;
            }
        });
        firstElement.classList.remove('toggle-animation-2');
        firstElement.classList.add('toggle-animation-1');
    }
}

function setSelected() 
{
    switch(selectedTool)
    {
        case 0 : document.getElementById('0').classList.add('tool-selected'); break;
        case 1 : document.getElementById('1').classList.add('tool-selected'); break;
        case 2 : document.getElementById('2').classList.add('tool-selected'); break;
        case 3 : 
        {
            if(customCursors)
                sketchContainer.classList.add('eraser-cursor');
            document.getElementById('3').classList.add('tool-selected'); 
        } break;
    }
}

function unsetSelected() 
{
    switch(selectedTool)
    {
        case 0 : document.getElementById('0').classList.remove('tool-selected'); break;
        case 1 : document.getElementById('1').classList.remove('tool-selected'); break;
        case 2 : document.getElementById('2').classList.remove('tool-selected'); break;
        case 3 :
        {
            if(customCursors)
                sketchContainer.classList.remove('eraser-cursor');
            document.getElementById('3').classList.remove('tool-selected'); 
        } break;
    }
}

function setPixelSize(squareSideSize)
{
    let blocks = document.querySelectorAll('.test');
    blocks.forEach( block => 
    {
        block.style.setProperty("width", `${squareSideSize}px`);
        block.style.setProperty("height", `${squareSideSize}px`);
    });
}

function getRandomNumber(min, max)
{
    return Math.random() * (+max +1 - +min) + +min;
}

function setBrushColor(block)
{
    switch(selectedTool)
    {
        case 0 : 
        {
            block.style.setProperty("background-color", `${document.querySelector('.paintbrushColor-selector').value}`); 
            if(block.style.getPropertyValue('opacity') != ' ')
                block.style.removeProperty('opacity');
        } break;
        case 1 : 
        {
            block.style.setProperty("background-color", `rgba(${getRandomNumber(0,255)}, ${getRandomNumber(0,255)}, ${getRandomNumber(0,255)})`); 
            if(block.style.getPropertyValue('opacity') != ' ')
                block.style.removeProperty('opacity');
        } break;
        case 2 : 
        {
            let colorValue = block.style.getPropertyValue("background-color");
            if(colorValue == '')
            {
                colorValue = document.querySelector('.paintbrushColor-selector').value;
                block.style.setProperty('background-color', colorValue);
            }
            else 
            {
                let opacity = block.style.getPropertyValue('opacity');
                if(opacity == '')
                    opacity = 0.9;
                else if(opacity > 0.3)
                    opacity -= 0.03;
                block.style.setProperty('opacity', opacity);
            }
        }break;
        case 3 : block.style.setProperty("background-color", 'white'); break;
    }
}

function addPaintEvent()
{
    let blocks = document.querySelectorAll('.test');
    blocks.forEach( block =>
    {
            block.addEventListener('mouseover', () =>
            {
                if(mouseDown)
                    setBrushColor(block);
            } );

            block.addEventListener('click', () =>
            {
                    mouseDown = false;
                    setBrushColor(block);
            } );

            block.addEventListener('mousedown', () =>
            {
                setBrushColor(block);
                mouseDown = false;
            });
    });
}



function setContainerSize(squareSideSize, containerMaxSize)
{
    widthValue = squareSideSize * Math.floor(document.querySelector('#width').value/squareSideSize);
    heightValue = squareSideSize * Math.floor(document.querySelector('#height').value/squareSideSize);
    document.querySelector('#width').value = widthValue;
    document.querySelector('#height').value = heightValue;
    container.style.setProperty("max-width", `${widthValue}px`);
}


function generateBoxes(widthValue, heightValue, squareSideSize)
{

    let blocks = document.querySelectorAll('.test');

    for(let block of blocks)
    {
       container.removeChild(block);
    }

    for(let i = 0; i < (widthValue/squareSideSize)*(heightValue/squareSideSize); i++)
    {
        let block = document.createElement('div');
        block.classList.add('test');
        container.appendChild(block);
        if(gridOff == false)
            block.style.setProperty('border', '1px solid black');
    }

    setPixelSize(squareSideSize);
    addPaintEvent();
}
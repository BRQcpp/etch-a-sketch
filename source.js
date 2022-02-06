let container = document.querySelector('.sketch-container');
let containerMaxSize = 700; // Max size of sketching square
let squareSideSize = 10;
let mouseDown = false;
let width = document.querySelector('#width').value;
let height = document.querySelector('#height').value;
let submitButton = document.querySelector('.resize-button');
let pixelResizeInput = document.querySelector("#pixel-size");
let paintbrushTool = document.querySelector('.paintbursh-tool');
let ereaseTool = document.querySelector('.erease-tool');


let ereaseSelected = false;
let paintburshSelected = true;

pixelResizeInput.setAttribute('max', containerMaxSize);

setContainerSize(squareSideSize, containerMaxSize);

generateBoxes(width, height, squareSideSize);

addPaintEvent();


pixelResizeInput.addEventListener('change', () => {
    squareSideSize = pixelResizeInput.value;
    setContainerSize(squareSideSize, containerMaxSize);
    let width = document.querySelector('#width').value;
    let height = document.querySelector('#height').value;
    generateBoxes(width, height, squareSideSize);
});

ereaseTool.addEventListener('click', () => {
    ereaseSelected = true;
    paintburshSelected = false;
});

paintbrushTool.addEventListener('click', () => {
    ereaseSelected = false;
    paintburshSelected = true;
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
    let width = document.querySelector('#width').value;
    let height = document.querySelector('#height').value;
    generateBoxes(width, height, squareSideSize);
});

function setPixelSize(squareSideSize)
{
    let blocks = document.querySelectorAll('.test');
    blocks.forEach( block => 
    {
        block.style.setProperty("width", `${squareSideSize}px`);
        block.style.setProperty("height", `${squareSideSize}px`);
    });
}

function addPaintEvent()
{
    let blocks = document.querySelectorAll('.test');
    blocks.forEach( block =>
    {

            block.addEventListener('mouseover', () =>
            {
                if(mouseDown)
                {
                    if(paintburshSelected)
                        block.style.setProperty("background-color", `${document.querySelector('.paintbrushColor-selector').value}`);
                    else
                        block.style.setProperty("background-color", 'white');
                }   

            } );

            block.addEventListener('click', () =>
            {
                    mouseDown = false;
                    
                    if(paintburshSelected)
                        block.style.setProperty("background-color", `${document.querySelector('.paintbrushColor-selector').value}`);
                    else
                        block.style.setProperty("background-color", 'white');
            } );
    });
}



function setContainerSize(squareSideSize, containerMaxSize)
{
    let widthValue = document.querySelector('.sketch-container').style.getPropertyValue("width");
    let heightValue = document.querySelector('.sketch-container').style.getPropertyValue("height");
    widthValue = squareSideSize * Math.floor(containerMaxSize/squareSideSize);
    heightValue = squareSideSize * Math.floor(containerMaxSize/squareSideSize);
    document.querySelector('#width').value = widthValue;
    document.querySelector('#height').value = heightValue;
    document.querySelector('#width').setAttribute('step', squareSideSize);
    document.querySelector('#height').setAttribute('step', squareSideSize);
}



function generateBoxes(width, height, squareSideSize)
{

    let blocks = document.querySelectorAll('.test');

    for(let block of blocks)
    {
       container.removeChild(block);
    }

    container.style.setProperty("max-width", `${width}px`);

    for(let i = 0; i < (width/squareSideSize)*(height/squareSideSize); i++)
    {
        let block = document.createElement('div');
        block.classList.add('test');
        container.appendChild(block);
    }

    setPixelSize(squareSideSize);
    addPaintEvent();
}









